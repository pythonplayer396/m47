import axios from "axios";
import { DiscordUser, InsertDiscordUser, ROLE_HIERARCHY } from "@shared/schema";

const DISCORD_API_BASE = "https://discord.com/api/v10";
const CLIENT_ID = "1401262869752057966";
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || "";
const REDIRECT_URI = "https://0412f499-7d03-4f95-9730-a832a3345043-00-zg2r94zgiia7.pike.replit.dev/callback";

const GUILD_ID = "1246452712653062175"; // Fakepixel Giveaways Discord server ID

interface DiscordTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

interface DiscordUserData {
  id: string;
  username: string;
  discriminator: string;
  global_name: string | null;
  avatar: string | null;
  email: string | null;
}

interface DiscordGuildMember {
  user: DiscordUserData;
  roles: string[];
  joined_at: string;
}

interface DiscordGuild {
  id: string;
  name: string;
  member_count: number;
  approximate_member_count: number;
  approximate_presence_count: number;
}

export class DiscordAPI {
  private static instance: DiscordAPI;

  static getInstance(): DiscordAPI {
    if (!DiscordAPI.instance) {
      DiscordAPI.instance = new DiscordAPI();
    }
    return DiscordAPI.instance;
  }

  async exchangeCodeForToken(code: string): Promise<DiscordTokenResponse> {
    // Validate input
    if (!code || typeof code !== 'string' || code.length > 1000) {
      throw new Error('Invalid authorization code');
    }

    if (!CLIENT_SECRET) {
      throw new Error('Discord client secret not configured');
    }

    // Sanitize code (remove any potential malicious characters)
    const sanitizedCode = code.replace(/[^a-zA-Z0-9_-]/g, '');

    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "authorization_code",
      code: sanitizedCode,
      redirect_uri: REDIRECT_URI,
    });

    console.log("Token exchange params:", {
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      redirect_uri: REDIRECT_URI,
      code: code.substring(0, 10) + "...", // Log partial code for debugging
    });

    try {
      const response = await axios.post(
        `${DISCORD_API_BASE}/oauth2/token`,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      console.log("Token exchange successful");
      return response.data;
    } catch (error: any) {
      console.error("Token exchange failed:");
      console.error("Error message:", error.message);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error(
          "Response data:",
          JSON.stringify(error.response.data, null, 2),
        );
        console.error("Response headers:", error.response.headers);
      }
      if (error.request) {
        console.error("Request config:", {
          url: error.request.url,
          method: error.request.method,
        });
      }
      throw new Error(
        `Discord token exchange failed: ${error.response?.data?.error_description || error.response?.data?.error || error.message}`,
      );
    }
  }

  async getDiscordUser(accessToken: string): Promise<DiscordUserData> {
    const response = await axios.get(`${DISCORD_API_BASE}/users/@me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  }

  async getGuildMember(
    accessToken: string,
    userId: string,
  ): Promise<DiscordGuildMember | null> {
    try {
      const response = await axios.get(
        `${DISCORD_API_BASE}/users/@me/guilds/${GUILD_ID}/member`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return response.data;
    } catch (error: any) {
      // User might not be in the server
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async getGuildInfo(): Promise<DiscordGuild> {
    // This requires a bot token for server info
    // For now, we'll return mock data but this should be replaced with bot token API calls
    return {
      id: GUILD_ID,
      name: "Fakepixel Giveaways",
      member_count: 1250, // This should be fetched from Discord API with bot token
      approximate_member_count: 1250,
      approximate_presence_count: 350, // Active members
    };
  }

  async getServerMembers(): Promise<{
    total: number;
    active: number;
    staff: number;
  }> {
    // This requires bot token to fetch real data
    // For now returning mock data - should be replaced with actual Discord API calls
    const guildInfo = await this.getGuildInfo();

    return {
      total: guildInfo.member_count,
      active: guildInfo.approximate_presence_count,
      staff: 25, // Count of users with staff roles
    };
  }

  convertDiscordUserToInsert(
    discordUser: DiscordUserData,
    tokens: DiscordTokenResponse,
    guildMember: DiscordGuildMember | null,
  ): InsertDiscordUser {
    // Validate and sanitize Discord user data
    if (!discordUser.id || !discordUser.username) {
      throw new Error('Invalid Discord user data');
    }

    // Sanitize string inputs to prevent XSS
    const sanitizeString = (str: string | null): string | null => {
      if (!str) return null;
      return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/[<>]/g, '')
                .substring(0, 255); // Limit length
    };

    const userRoles = Array.isArray(guildMember?.roles) ? guildMember.roles : [];
    const isStaff = this.isUserStaff(userRoles);

    return {
      discordId: discordUser.id.replace(/[^0-9]/g, ''), // Only allow numbers
      username: sanitizeString(discordUser.username) || 'unknown',
      discriminator: sanitizeString(discordUser.discriminator) || '0000',
      globalName: sanitizeString(discordUser.global_name),
      avatar: sanitizeString(discordUser.avatar),
      email: sanitizeString(discordUser.email),
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      roles: userRoles.filter(role => typeof role === 'string' && role.match(/^[0-9]+$/)), // Only valid role IDs
      isStaff,
    };
  }

  isUserStaff(roles: string[]): boolean {
    return roles.some((roleId) => roleId in ROLE_HIERARCHY);
  }

  getUserPermissions(roles: string[]): string[] {
    const permissions = new Set<string>();

    for (const roleId of roles) {
      const role = ROLE_HIERARCHY[roleId as keyof typeof ROLE_HIERARCHY];
      if (role) {
        role.permissions.forEach((permission) => permissions.add(permission));
      }
    }

    return Array.from(permissions);
  }

  getStaffByRole(staffMembers: DiscordUser[]): Record<string, DiscordUser[]> {
    const staffByRole: Record<string, DiscordUser[]> = {};

    // Initialize all roles
    Object.values(ROLE_HIERARCHY).forEach((role) => {
      staffByRole[role.name] = [];
    });

    staffMembers.forEach((member) => {
      const roles = member.roles || [];
      let highestRole = null;
      let lowestHierarchy = Infinity;

      // Find the highest role (lowest hierarchy number)
      for (const roleId of roles) {
        const role = ROLE_HIERARCHY[roleId as keyof typeof ROLE_HIERARCHY];
        if (role && role.hierarchy < lowestHierarchy) {
          lowestHierarchy = role.hierarchy;
          highestRole = role.name;
        }
      }

      if (highestRole) {
        staffByRole[highestRole].push(member);
      }
    });

    return staffByRole;
  }
}

export const discordAPI = DiscordAPI.getInstance();
