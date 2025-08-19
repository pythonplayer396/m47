import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface ServerStats {
  total: number;
  active: number;
  staff: number;
}

interface StaffMember {
  id: string;
  discordId: string;
  username: string;
  globalName: string | null;
  avatar: string | null;
  roles: string[];
  isStaff: boolean;
}

interface StaffData {
  staff: StaffMember[];
  byRole: Record<string, StaffMember[]>;
}

interface AuthStatus {
  authenticated: boolean;
  user: {
    id: string;
    discordId: string;
    username: string;
    roles: string[];
    isStaff: boolean;
    permissions: string[];
  } | null;
}

export function useServerStats() {
  return useQuery({
    queryKey: ['/api/server/stats'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}

export function useStaffData() {
  return useQuery({
    queryKey: ['/api/staff'],
    refetchInterval: 60000, // Refresh every minute
  });
}

export function useAuthStatus() {
  return useQuery({
    queryKey: ['/api/auth/status'],
    refetchInterval: 300000, // Refresh every 5 minutes
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['/api/user'],
    enabled: false, // Only fetch when authenticated
  });
}

// Helper function to get Discord avatar URL
export function getDiscordAvatarUrl(discordId: string, avatar: string | null): string {
  if (!avatar) {
    return `https://cdn.discordapp.com/embed/avatars/${parseInt(discordId) % 5}.png`;
  }
  return `https://cdn.discordapp.com/avatars/${discordId}/${avatar}.png?size=256`;
}

// Helper function to calculate server age
export function getServerAge(): string {
  const serverCreated = new Date('2023-01-01'); // Approximate 2-year server age
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - serverCreated.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);
  
  if (years > 0) {
    return `${years} Year${years > 1 ? 's' : ''}`;
  }
  return `${months} Month${months > 1 ? 's' : ''}`;
}