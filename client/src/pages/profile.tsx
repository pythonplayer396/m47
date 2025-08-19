
import { User, Shield, Calendar, Mail, LogOut, Settings, GitBranch, Activity, Star, Users, Award, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ScrollAnimated from "@/components/scroll-animated";
import { useAuthStatus, getDiscordAvatarUrl } from "@/hooks/use-discord-data";

const Profile = () => {
  const { data: authData, isLoading } = useAuthStatus();

  const handleSignIn = () => {
    window.location.href = '/api/auth/discord';
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!authData?.authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <ScrollAnimated animation="scale-in">
            <Card className="shadow-lg">
              <CardHeader className="text-center pb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">Welcome to Fakepixel</CardTitle>
                <CardDescription className="text-lg">
                  Connect your Discord account to access your profile
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button onClick={handleSignIn} className="w-full h-12 text-lg" size="lg">
                  <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Sign in with Discord
                </Button>
              </CardContent>
            </Card>
          </ScrollAnimated>
        </div>
      </div>
    );
  }

  const user = authData.user;
  const joinDate = new Date().toLocaleDateString();

  const getRoleColor = (roles: string[]) => {
    if (roles.includes('1296065345424986183')) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (roles.includes('1336379731330994247')) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (roles.includes('1379147275346907297')) return 'bg-red-100 text-red-800 border-red-300';
    if (roles.includes('1383482472368439376')) return 'bg-purple-100 text-purple-800 border-purple-300';
    if (roles.includes('1246460181110460417')) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (roles.includes('1246456411697975308')) return 'bg-pink-100 text-pink-800 border-pink-300';
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getHighestRole = (roles: string[]) => {
    const roleHierarchy = {
      '1296065345424986183': 'Owner',
      '1336379731330994247': 'Co Owner',
      '1379147275346907297': 'Main Admin',
      '1383482472368439376': 'Developer',
      '1246460181110460417': 'Admin',
      '1381282844667543572': 'Manager',
      '1268912992225984573': 'Trial Admin',
      '1268911588992225280': 'Moderator',
      '1246460406055178260': 'Helper',
      '1274780898222669999': 'Assistant Helper',
      '1246456411697975308': 'FxG Family',
    };

    for (const roleId of roles) {
      if (roleHierarchy[roleId as keyof typeof roleHierarchy]) {
        return roleHierarchy[roleId as keyof typeof roleHierarchy];
      }
    }
    return 'Member';
  };

  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <ScrollAnimated animation="scale-in">
              <div className="relative">
                <img
                  src={getDiscordAvatarUrl(user.discordId, user.avatar || null)}
                  alt={user.username}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const defaultAvatarIndex = (parseInt(user.discordId.slice(-2)) || 0) % 5;
                    target.src = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;
                  }}
                />
                {user.isStaff && (
                  <div className="absolute -bottom-2 -right-2">
                    <Badge className={`${getRoleColor(user.roles)} text-xs font-semibold px-2 py-1`}>
                      <Shield className="w-3 h-3 mr-1" />
                      {getHighestRole(user.roles)}
                    </Badge>
                  </div>
                )}
              </div>
            </ScrollAnimated>
            
            <div className="flex-1">
              <ScrollAnimated animation="slide-right" delay={0.1}>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {user.globalName || user.username}
                </h1>
                <p className="text-xl text-gray-600 mb-4">@{user.username}</p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Joined {joinDate}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {user.isStaff ? 'Staff Member' : 'Community Member'}
                  </div>
                </div>
                <Button onClick={handleSignOut} variant="outline" className="mt-2">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </ScrollAnimated>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            

            {/* Account Details */}
            <ScrollAnimated animation="slide-left" delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Discord ID</label>
                    <p className="text-sm font-mono text-gray-900 bg-gray-100 rounded px-2 py-1 mt-1">
                      {user.discordId}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <p className="text-sm text-gray-900 mt-1">
                      {user.isStaff ? 'Staff Member' : 'Community Member'}
                    </p>
                  </div>
                  {user.isStaff && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Permissions</label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.permissions.slice(0, 3).map((permission) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                        {user.permissions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{user.permissions.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </ScrollAnimated>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            

            {/* Staff Information (if applicable) */}
            {user.isStaff && (
              <ScrollAnimated animation="slide-up" delay={0.1}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Staff Information
                    </CardTitle>
                    <CardDescription>
                      Your role and responsibilities in the team
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Primary Role</label>
                        <div className="mt-2">
                          <Badge className={`${getRoleColor(user.roles)} text-sm px-3 py-1`}>
                            {getHighestRole(user.roles)}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">All Permissions</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {user.permissions.map((permission) => (
                            <Badge key={permission} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimated>
            )}

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
