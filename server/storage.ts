import { 
  type DiscordUser, 
  type InsertDiscordUser, 
  type UpdateDiscordUser,
  type DiscordRole, 
  type InsertDiscordRole,
  type Update, 
  type InsertUpdate, 
  type UpdateUpdate,
  type Contribution, 
  type InsertContribution, 
  type UpdateContribution,
  type ServerStats, 
  type InsertServerStats 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Discord Users
  getDiscordUser(id: string): Promise<DiscordUser | undefined>;
  getDiscordUserByDiscordId(discordId: string): Promise<DiscordUser | undefined>;
  createDiscordUser(user: InsertDiscordUser): Promise<DiscordUser>;
  updateDiscordUser(id: string, user: UpdateDiscordUser): Promise<DiscordUser | undefined>;
  getAllStaff(): Promise<DiscordUser[]>;
  
  // Discord Roles
  getDiscordRole(id: string): Promise<DiscordRole | undefined>;
  createDiscordRole(role: InsertDiscordRole): Promise<DiscordRole>;
  getAllDiscordRoles(): Promise<DiscordRole[]>;
  
  // Updates
  getUpdate(id: string): Promise<Update | undefined>;
  getAllUpdates(): Promise<Update[]>;
  createUpdate(update: InsertUpdate): Promise<Update>;
  updateUpdate(id: string, update: UpdateUpdate): Promise<Update | undefined>;
  deleteUpdate(id: string): Promise<boolean>;
  
  // Contributions
  getContribution(id: string): Promise<Contribution | undefined>;
  getAllContributions(): Promise<Contribution[]>;
  createContribution(contribution: InsertContribution): Promise<Contribution>;
  updateContribution(id: string, contribution: UpdateContribution): Promise<Contribution | undefined>;
  deleteContribution(id: string): Promise<boolean>;
  
  // Server Stats
  getLatestServerStats(): Promise<ServerStats | undefined>;
  createServerStats(stats: InsertServerStats): Promise<ServerStats>;
  updateServerStats(stats: InsertServerStats): Promise<ServerStats>;
}

export class MemStorage implements IStorage {
  private discordUsers: Map<string, DiscordUser>;
  private discordRoles: Map<string, DiscordRole>;
  private updates: Map<string, Update>;
  private contributions: Map<string, Contribution>;
  private serverStats: ServerStats | undefined;

  constructor() {
    this.discordUsers = new Map();
    this.discordRoles = new Map();
    this.updates = new Map();
    this.contributions = new Map();
    this.serverStats = undefined;
  }

  // Discord Users
  async getDiscordUser(id: string): Promise<DiscordUser | undefined> {
    return this.discordUsers.get(id);
  }

  async getDiscordUserByDiscordId(discordId: string): Promise<DiscordUser | undefined> {
    return Array.from(this.discordUsers.values()).find(
      (user) => user.discordId === discordId,
    );
  }

  async createDiscordUser(insertUser: InsertDiscordUser): Promise<DiscordUser> {
    const id = randomUUID();
    const now = new Date();
    const user: DiscordUser = { 
      ...insertUser, 
      id,
      discriminator: insertUser.discriminator || null,
      globalName: insertUser.globalName || null,
      avatar: insertUser.avatar || null,
      email: insertUser.email || null,
      accessToken: insertUser.accessToken || null,
      refreshToken: insertUser.refreshToken || null,
      roles: insertUser.roles || [],
      isStaff: insertUser.isStaff || false,
      joinedAt: now,
      lastActive: now
    };
    this.discordUsers.set(id, user);
    return user;
  }

  async updateDiscordUser(id: string, updateUser: UpdateDiscordUser): Promise<DiscordUser | undefined> {
    const existingUser = this.discordUsers.get(id);
    if (!existingUser) return undefined;
    
    const updatedUser: DiscordUser = { 
      ...existingUser, 
      ...updateUser,
      lastActive: new Date()
    };
    this.discordUsers.set(id, updatedUser);
    return updatedUser;
  }

  async getAllStaff(): Promise<DiscordUser[]> {
    return Array.from(this.discordUsers.values()).filter(user => user.isStaff);
  }

  // Discord Roles
  async getDiscordRole(id: string): Promise<DiscordRole | undefined> {
    return this.discordRoles.get(id);
  }

  async createDiscordRole(role: InsertDiscordRole): Promise<DiscordRole> {
    const discordRole: DiscordRole = { ...role };
    this.discordRoles.set(role.id, discordRole);
    return discordRole;
  }

  async getAllDiscordRoles(): Promise<DiscordRole[]> {
    return Array.from(this.discordRoles.values());
  }

  // Updates
  async getUpdate(id: string): Promise<Update | undefined> {
    return this.updates.get(id);
  }

  async getAllUpdates(): Promise<Update[]> {
    return Array.from(this.updates.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async createUpdate(insertUpdate: InsertUpdate): Promise<Update> {
    const id = randomUUID();
    const now = new Date();
    const update: Update = { 
      ...insertUpdate, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.updates.set(id, update);
    return update;
  }

  async updateUpdate(id: string, updateUpdate: UpdateUpdate): Promise<Update | undefined> {
    const existingUpdate = this.updates.get(id);
    if (!existingUpdate) return undefined;
    
    const updatedUpdate: Update = { 
      ...existingUpdate, 
      ...updateUpdate,
      updatedAt: new Date()
    };
    this.updates.set(id, updatedUpdate);
    return updatedUpdate;
  }

  async deleteUpdate(id: string): Promise<boolean> {
    return this.updates.delete(id);
  }

  // Contributions
  async getContribution(id: string): Promise<Contribution | undefined> {
    return this.contributions.get(id);
  }

  async getAllContributions(): Promise<Contribution[]> {
    return Array.from(this.contributions.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async createContribution(insertContribution: InsertContribution): Promise<Contribution> {
    const id = randomUUID();
    const now = new Date();
    const contribution: Contribution = { 
      ...insertContribution, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.contributions.set(id, contribution);
    return contribution;
  }

  async updateContribution(id: string, updateContribution: UpdateContribution): Promise<Contribution | undefined> {
    const existingContribution = this.contributions.get(id);
    if (!existingContribution) return undefined;
    
    const updatedContribution: Contribution = { 
      ...existingContribution, 
      ...updateContribution,
      updatedAt: new Date()
    };
    this.contributions.set(id, updatedContribution);
    return updatedContribution;
  }

  async deleteContribution(id: string): Promise<boolean> {
    return this.contributions.delete(id);
  }

  // Server Stats
  async getLatestServerStats(): Promise<ServerStats | undefined> {
    return this.serverStats;
  }

  async createServerStats(stats: InsertServerStats): Promise<ServerStats> {
    const id = randomUUID();
    const serverStats: ServerStats = { 
      ...stats, 
      id,
      lastUpdated: new Date()
    };
    this.serverStats = serverStats;
    return serverStats;
  }

  async updateServerStats(stats: InsertServerStats): Promise<ServerStats> {
    const id = this.serverStats?.id || randomUUID();
    const serverStats: ServerStats = { 
      ...stats, 
      id,
      lastUpdated: new Date()
    };
    this.serverStats = serverStats;
    return serverStats;
  }
}

export const storage = new MemStorage();