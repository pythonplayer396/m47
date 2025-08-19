import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { discordAPI } from "./discord";
import nodemailer from "nodemailer";
import {
  requireAuth,
  requirePermission,
  loadUserMiddleware,
  AuthenticatedRequest,
} from "./auth";
import {
  insertUpdateSchema,
  updateUpdateSchema,
  insertContributionSchema,
  updateContributionSchema,
} from "@shared/schema";
import express from "express";
import { z } from "zod";

// Simple rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting middleware
const rateLimit = (maxRequests: number, windowMs: number) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const clientId = req.ip || 'unknown';
    const now = Date.now();
    const key = `${clientId}:${req.path}`;

    const current = rateLimitStore.get(key);

    if (!current || now > current.resetTime) {
      rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (current.count >= maxRequests) {
      return res.status(429).json({ error: 'Too many requests' });
    }

    current.count++;
    next();
  };
};

// Security headers middleware
const securityHeaders = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
};


export async function registerRoutes(app: Express): Promise<Server> {
  // Apply security headers to all routes
  app.use(securityHeaders);

  // Apply user loading middleware to all routes
  app.use(loadUserMiddleware);

  // Discord OAuth2 Routes
  app.get("/api/auth/discord", rateLimit(5, 60000), (req, res) => {
    const discordAuthUrl =
      "https://discord.com/oauth2/authorize?client_id=1401262869752057966&response_type=code&redirect_uri=https%3A%2F%2F0412f499-7d03-4f95-9730-a832a3345043-00-zg2r94zgiia7.pike.replit.dev%2Fcallback&scope=identify+guilds.members.read";
    res.redirect(discordAuthUrl);
  });

  app.get("/callback", rateLimit(10, 60000), async (req, res) => {
    const { code, error } = req.query;

    // Validate and sanitize query parameters
    if (error && typeof error === 'string') {
      console.error("Discord OAuth error:", error.substring(0, 100)); // Limit log length
      return res.redirect("/?error=oauth_failed");
    }

    if (!code || typeof code !== "string" || code.length > 1000 || !/^[a-zA-Z0-9_-]+$/.test(code)) {
      console.error("Invalid or missing authorization code");
      return res.redirect("/?error=invalid_code");
    }

    try {
      console.log("Exchanging code for token...");
      // Exchange code for token
      const tokens = await discordAPI.exchangeCodeForToken(code);
      console.log("Token exchange successful");

      // Get Discord user info
      console.log("Fetching Discord user info...");
      const discordUser = await discordAPI.getDiscordUser(tokens.access_token);
      console.log("Discord user fetched:", discordUser.username);

      // Get guild member info (if user is in server)
      console.log("Fetching guild member info...");
      const guildMember = await discordAPI.getGuildMember(
        tokens.access_token,
        discordUser.id,
      );
      console.log("Guild member status:", guildMember ? "Member" : "Not in server");

      // Check if user exists in our database
      let user = await storage.getDiscordUserByDiscordId(discordUser.id);

      if (!user) {
        // Create new user
        console.log("Creating new user...");
        const newUserData = discordAPI.convertDiscordUserToInsert(
          discordUser,
          tokens,
          guildMember,
        );
        user = await storage.createDiscordUser(newUserData);
        console.log("New user created:", user.id);
      } else {
        // Update existing user
        console.log("Updating existing user...");
        const updateData = discordAPI.convertDiscordUserToInsert(
          discordUser,
          tokens,
          guildMember,
        );
        user = (await storage.updateDiscordUser(user.id, updateData)) || user;
        console.log("User updated:", user.id);
      }

      // Set session
      req.session.userId = user.id;
      req.session.discordId = user.discordId;

      // Redirect to dashboard
      console.log("Authentication successful, redirecting...");
      res.redirect("/");
    } catch (error) {
      console.error("Discord auth error:", error);
      if (error instanceof Error) {
        console.error("Error details:", error.message);
        console.error("Stack trace:", error.stack);
      }
      res.redirect("/?error=auth_failed");
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  // User Info Routes
  app.get("/api/user", requireAuth, async (req: AuthenticatedRequest, res) => {
    const user = await storage.getDiscordUser(req.session.userId!);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id: user.id,
      discordId: user.discordId,
      username: user.username,
      globalName: user.globalName,
      avatar: user.avatar,
      roles: user.roles,
      isStaff: user.isStaff,
      permissions: discordAPI.getUserPermissions(user.roles || []),
    });
  });

  // Server Stats Routes
  app.get("/api/server/stats", rateLimit(60, 60000), async (req, res) => {
    try {
      const stats = await discordAPI.getServerMembers();

      // Update or create server stats in database
      await storage.updateServerStats({
        totalMembers: stats.total,
        activeMembers: stats.active,
        staffCount: stats.staff,
      });

      res.json(stats);
    } catch (error) {
      console.error("Server stats error:", error);
      res.status(500).json({ error: "Failed to fetch server stats" });
    }
  });

  // Staff Routes
  app.get("/api/staff", rateLimit(60, 60000), async (req, res) => {
    try {
      const allStaff = await storage.getAllStaff();
      const staffByRole = discordAPI.getStaffByRole(allStaff);

      res.json({
        staff: allStaff,
        byRole: staffByRole,
      });
    } catch (error) {
      console.error("Staff fetch error:", error);
      res.status(500).json({ error: "Failed to fetch staff" });
    }
  });

  // Contact Form Route
  app.post("/api/contact", rateLimit(10, 60000), async (req, res) => {
    try {
      const { firstName, lastName, email, subject, message } = req.body;

      // Validation
      if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !subject || !message?.trim()) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email address" });
      }

      // Sanitize inputs
      const sanitizedFirstName = firstName.trim().substring(0, 50);
      const sanitizedLastName = lastName.trim().substring(0, 50);
      const sanitizedEmail = email.trim().toLowerCase().substring(0, 100);
      const sanitizedSubject = subject.trim().substring(0, 100);
      const sanitizedMessage = message.trim().substring(0, 1000);


      // Log the contact form submission with more details
      const contactSubmission = {
        firstName: sanitizedFirstName,
        lastName: sanitizedLastName,
        email: sanitizedEmail,
        subject: sanitizedSubject,
        message: sanitizedMessage,
        timestamp: new Date().toISOString(),
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent')
      };

      console.log("📧 Contact form submission received:", contactSubmission);

      // Create transporter for sending emails
      const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER || 'xjnavaty@gmail.com',
          pass: process.env.EMAIL_PASSWORD // You need to set this as an environment variable
        }
      });

      // Email to admin
      const adminMailOptions = {
        from: process.env.EMAIL_USER || 'xjnavaty@gmail.com',
        to: 'xjnavaty@gmail.com',
        subject: `New Contact Form: ${sanitizedSubject}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>From:</strong> ${sanitizedFirstName} ${sanitizedLastName}</p>
          <p><strong>Email:</strong> ${sanitizedEmail}</p>
          <p><strong>Subject:</strong> ${sanitizedSubject}</p>
          <p><strong>Message:</strong></p>
          <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
          <p><small>IP: ${req.ip}</small></p>
        `
      };

      // Send email to admin
      await transporter.sendMail(adminMailOptions);

      // Send confirmation email to user
      const userMailOptions = {
        from: process.env.EMAIL_USER || 'xjnavaty@gmail.com',
        to: sanitizedEmail,
        subject: 'Thank you for contacting Fakepixel Giveaways',
        html: `
          <h3>Thank you for reaching out!</h3>
          <p>Hi ${sanitizedFirstName},</p>
          <p>We've received your message regarding: <strong>${sanitizedSubject}</strong></p>
          <p>Our team will get back to you as soon as possible.</p>
          <br>
          <p>Best regards,<br>Fakepixel Giveaways Team</p>
          <hr>
          <p><small>This is an automated response. Please do not reply to this email.</small></p>
        `
      };

      await transporter.sendMail(userMailOptions);

      res.json({
        success: true,
        message: "Message sent successfully! Check your email for confirmation."
      });
    } catch (error) {
      console.error("Contact form error:", error);

      // If email fails, still log the submission
      if (error.code === 'EAUTH' || error.code === 'ENOTFOUND') {
        console.log("📧 Email sending failed, but form submitted:", { firstName, lastName, email, subject });
        res.json({
          success: true,
          message: "Message received! We'll get back to you soon via Discord or alternative contact."
        });
      } else {
        res.status(500).json({ error: "Failed to submit contact form. Please try again or contact us directly on Discord." });
      }
    }
  });

  // Updates Routes
  app.get("/api/updates", rateLimit(60, 60000), async (req, res) => {
    try {
      const updates = await storage.getAllUpdates();
      res.json(updates);
    } catch (error) {
      console.error("Updates fetch error:", error);
      res.status(500).json({ error: "Failed to fetch updates" });
    }
  });

  app.post(
    "/api/updates",
    requirePermission("edit"),
    async (req: AuthenticatedRequest, res) => {
      try {
        const validatedData = insertUpdateSchema.parse(req.body);
        const update = await storage.createUpdate({
          ...validatedData,
          authorId: req.user!.id,
        });
        res.status(201).json(update);
      } catch (error) {
        console.error("Update creation error:", error);
        res.status(400).json({ error: "Invalid update data" });
      }
    },
  );

  app.put(
    "/api/updates/:id",
    requirePermission("edit"),
    async (req: AuthenticatedRequest, res) => {
      try {
        const { id } = req.params;
        const validatedData = updateUpdateSchema.parse(req.body);
        const update = await storage.updateUpdate(id, validatedData);

        if (!update) {
          return res.status(404).json({ error: "Update not found" });
        }

        res.json(update);
      } catch (error) {
        console.error("Update modification error:", error);
        res.status(400).json({ error: "Invalid update data" });
      }
    },
  );

  app.delete(
    "/api/updates/:id",
    requirePermission("edit"),
    async (req: AuthenticatedRequest, res) => {
      try {
        const { id } = req.params;
        const deleted = await storage.deleteUpdate(id);

        if (!deleted) {
          return res.status(404).json({ error: "Update not found" });
        }

        res.json({ success: true });
      } catch (error) {
        console.error("Update deletion error:", error);
        res.status(500).json({ error: "Failed to delete update" });
      }
    },
  );

  // Contributions Routes
  app.get("/api/contributions", rateLimit(60, 60000), async (req, res) => {
    try {
      const contributions = await storage.getAllContributions();
      res.json(contributions);
    } catch (error) {
      console.error("Contributions fetch error:", error);
      res.status(500).json({ error: "Failed to fetch contributions" });
    }
  });

  app.post(
    "/api/contributions",
    requirePermission("edit"),
    async (req: AuthenticatedRequest, res) => {
      try {
        const validatedData = insertContributionSchema.parse(req.body);
        const contribution = await storage.createContribution({
          ...validatedData,
          authorId: req.user!.id,
        });
        res.status(201).json(contribution);
      } catch (error) {
        console.error("Contribution creation error:", error);
        res.status(400).json({ error: "Invalid contribution data" });
      }
    },
  );

  app.put(
    "/api/contributions/:id",
    requirePermission("edit"),
    async (req: AuthenticatedRequest, res) => {
      try {
        const { id } = req.params;
        const validatedData = updateContributionSchema.parse(req.body);
        const contribution = await storage.updateContribution(
          id,
          validatedData,
        );

        if (!contribution) {
          return res.status(404).json({ error: "Contribution not found" });
        }

        res.json(contribution);
      } catch (error) {
        console.error("Contribution modification error:", error);
        res.status(400).json({ error: "Invalid contribution data" });
      }
    },
  );

  app.delete(
    "/api/contributions/:id",
    requirePermission("edit"),
    async (req: AuthenticatedRequest, res) => {
      try {
        const { id } = req.params;
        const deleted = await storage.deleteContribution(id);

        if (!deleted) {
          return res.status(404).json({ error: "Contribution not found" });
        }

        res.json({ success: true });
      } catch (error) {
        console.error("Contribution deletion error:", error);
        res.status(500).json({ error: "Failed to delete contribution" });
      }
    },
  );

  // Development only - Add test staff
  app.post("/api/dev/add-test-staff", async (req, res) => {
    if (process.env.NODE_ENV !== 'development') {
      return res.status(403).json({ error: "Only available in development" });
    }

    try {
      const testStaffMembers = [
        {
          discordId: "123456789012345678",
          username: "TestOwner",
          discriminator: "0001",
          globalName: "Test Owner",
          avatar: null,
          email: "owner@test.com",
          accessToken: "test_token",
          refreshToken: "test_refresh",
          roles: ["1296065345424986183"], // Owner role
          isStaff: true,
        },
        {
          discordId: "234567890123456789",
          username: "TestAdmin",
          discriminator: "0002",
          globalName: "Test Admin",
          avatar: null,
          email: "admin@test.com",
          accessToken: "test_token2",
          refreshToken: "test_refresh2",
          roles: ["1246460181110460417"], // Admin role
          isStaff: true,
        },
        {
          discordId: "345678901234567890",
          username: "TestDeveloper",
          discriminator: "0003",
          globalName: "Test Developer",
          avatar: null,
          email: "dev@test.com",
          accessToken: "test_token3",
          refreshToken: "test_refresh3",
          roles: ["1383482472368439376"], // Developer role
          isStaff: true,
        }
      ];

      for (const staffData of testStaffMembers) {
        // Basic validation for test data before insertion
        if (!staffData.discordId || !staffData.username || !staffData.email) {
          console.error("Skipping invalid test staff data:", staffData);
          continue;
        }
        await storage.createDiscordUser(staffData);
      }

      res.json({ success: true, message: "Test staff added" });
    } catch (error) {
      console.error("Test staff creation error:", error);
      res.status(500).json({ error: "Failed to create test staff" });
    }
  });

  // Check authentication status
  app.get("/api/auth/status", rateLimit(60, 60000), (req: AuthenticatedRequest, res) => {
    res.json({
      authenticated: !!req.session.userId,
      user: req.user || null,
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}