import { Request, Response, NextFunction } from 'express';
import { storage } from './storage';
import { hasPermission, RolePermission } from '@shared/schema';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    discordId?: string;
  }
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    discordId: string;
    username: string;
    roles: string[];
    isStaff: boolean;
    permissions: string[];
  };
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
}

export function requirePermission(permission: RolePermission) {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const user = await storage.getDiscordUser(req.session.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!hasPermission(user.roles || [], permission)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    // Attach user info to request
    req.user = {
      id: user.id,
      discordId: user.discordId,
      username: user.username,
      roles: user.roles || [],
      isStaff: user.isStaff || false,
      permissions: [], // Will be populated by Discord API
    };

    next();
  };
}

export async function loadUserMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (req.session && req.session.userId) {
    const user = await storage.getDiscordUser(req.session.userId);
    if (user) {
      req.user = {
        id: user.id,
        discordId: user.discordId,
        username: user.username,
        roles: user.roles || [],
        isStaff: user.isStaff || false,
        permissions: [], // Will be populated by Discord API
      };
    }
  }
  next();
}