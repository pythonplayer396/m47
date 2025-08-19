import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const discordUsers = pgTable("discord_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  discordId: varchar("discord_id", { length: 20 }).notNull().unique(),
  username: text("username").notNull(),
  discriminator: varchar("discriminator", { length: 4 }),
  globalName: text("global_name"),
  avatar: text("avatar"),
  email: text("email"),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  roles: json("roles").$type<string[]>().default([]),
  isStaff: boolean("is_staff").default(false),
  joinedAt: timestamp("joined_at").defaultNow(),
  lastActive: timestamp("last_active").defaultNow(),
});

export const discordRoles = pgTable("discord_roles", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  hierarchy: integer("hierarchy").notNull(),
  permissions: json("permissions").$type<string[]>().default([]),
});

export const updates = pgTable("updates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  authorId: varchar("author_id").references(() => discordUsers.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contributions = pgTable("contributions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  authorId: varchar("author_id").references(() => discordUsers.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const serverStats = pgTable("server_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  totalMembers: integer("total_members").default(0),
  activeMembers: integer("active_members").default(0),
  staffCount: integer("staff_count").default(0),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

// Discord Users
export const insertDiscordUserSchema = createInsertSchema(discordUsers).omit({
  id: true,
  joinedAt: true,
  lastActive: true,
});

export const updateDiscordUserSchema = createInsertSchema(discordUsers).omit({
  id: true,
  discordId: true,
  joinedAt: true,
}).partial();

// Discord Roles
export const insertDiscordRoleSchema = createInsertSchema(discordRoles);

// Updates
export const insertUpdateSchema = createInsertSchema(updates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateUpdateSchema = createInsertSchema(updates).omit({
  id: true,
  authorId: true,
  createdAt: true,
}).partial();

// Contributions
export const insertContributionSchema = createInsertSchema(contributions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateContributionSchema = createInsertSchema(contributions).omit({
  id: true,
  authorId: true,
  createdAt: true,
}).partial();

// Server Stats
export const insertServerStatsSchema = createInsertSchema(serverStats).omit({
  id: true,
  lastUpdated: true,
});

// Type exports
export type DiscordUser = typeof discordUsers.$inferSelect;
export type InsertDiscordUser = z.infer<typeof insertDiscordUserSchema>;
export type UpdateDiscordUser = z.infer<typeof updateDiscordUserSchema>;

export type DiscordRole = typeof discordRoles.$inferSelect;
export type InsertDiscordRole = z.infer<typeof insertDiscordRoleSchema>;

export type Update = typeof updates.$inferSelect;
export type InsertUpdate = z.infer<typeof insertUpdateSchema>;
export type UpdateUpdate = z.infer<typeof updateUpdateSchema>;

export type Contribution = typeof contributions.$inferSelect;
export type InsertContribution = z.infer<typeof insertContributionSchema>;
export type UpdateContribution = z.infer<typeof updateContributionSchema>;

export type ServerStats = typeof serverStats.$inferSelect;
export type InsertServerStats = z.infer<typeof insertServerStatsSchema>;

// Role hierarchy mapping (from Discord role IDs to hierarchy numbers)
export const ROLE_HIERARCHY = {
  // Owner - Highest authority
  "1296065345424986183": {
    name: "Owner",
    hierarchy: 1,
    permissions: ["view", "edit", "delete", "manage_users", "manage_server"],
  },
  // Co Owner - Second highest
  "1336379731330994247": {
    name: "Co Owner", 
    hierarchy: 2,
    permissions: ["view", "edit", "delete", "manage_users", "manage_server"],
  },
  // Main Admin - Senior admin
  "1379147275346907297": {
    name: "Main Admin",
    hierarchy: 3,
    permissions: ["view", "edit", "delete", "manage_users"],
  },
  // Developer - Technical admin
  "1383482472368439376": {
    name: "Developer",
    hierarchy: 4,
    permissions: ["view", "edit", "delete", "manage_users"],
  },
  // Admin - General admin
  "1246460181110460417": {
    name: "Admin",
    hierarchy: 5,
    permissions: ["view", "edit", "delete"],
  },
  // Manager - Department manager
  "1381282844667543572": {
    name: "Manager",
    hierarchy: 6,
    permissions: ["view", "edit"],
  },
  // Trial Admin - Probationary admin
  "1268912992225984573": {
    name: "Trial Admin",
    hierarchy: 7,
    permissions: ["view", "edit"],
  },
  // Moderator - Content moderator
  "1268911588992225280": {
    name: "Moderator",
    hierarchy: 8,
    permissions: ["view"],
  },
  // Helper - Community helper
  "1246460406055178260": {
    name: "Helper",
    hierarchy: 9,
    permissions: ["view"],
  },
  // Assistant Helper - Junior helper
  "1274780898222669999": {
    name: "Assistant Helper",
    hierarchy: 10,
    permissions: ["view"],
  },
  // FxG Family - Special member role
  "1246456411697975308": {
    name: "FxG Family",
    hierarchy: 11,
    permissions: ["view"],
  },
} as const;

export type RolePermission = 'all' | 'admin' | 'edit' | 'moderate' | 'help' | 'view';

export interface DiscordUser {
  id: string;
  discordId: string;
  username: string;
  discriminator: string;
  globalName: string | null;
  avatar: string | null;
  email: string | null;
  accessToken?: string;
  refreshToken?: string;
  roles: string[];
  isStaff: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface InsertDiscordUser {
  discordId: string;
  username: string;
  discriminator: string;
  globalName: string | null;
  avatar: string | null;
  email: string | null;
  accessToken: string;
  refreshToken: string;
  roles: string[];
  isStaff: boolean;
}

export interface ServerStats {
  id?: string;
  totalMembers: number;
  activeMembers: number;
  staffCount: number;
  updatedAt: Date;
}

export interface InsertServerStats {
  totalMembers: number;
  activeMembers: number;
  staffCount: number;
}

export function hasPermission(userRoles: string[], requiredPermission: RolePermission): boolean {
  for (const roleId of userRoles) {
    const role = ROLE_HIERARCHY[roleId as keyof typeof ROLE_HIERARCHY];
    if (role && (role.permissions.includes('all') || role.permissions.includes(requiredPermission))) {
      return true;
    }
  }
  return false;
}