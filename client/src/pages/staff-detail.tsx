
import { ArrowLeft, Calendar, Shield, Users, Star, Award, Clock, Activity, MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ScrollAnimated from "@/components/scroll-animated";
import { Link, useParams } from "wouter";
import { staticStaffData, getDiscordAvatarUrl } from "@/data/staff-data";

const StaffDetail = () => {
  const params = useParams();
  const staffId = params.id;
  
  const staff = staticStaffData.find(member => member.id === staffId);
  
  if (!staff) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Staff Member Not Found</h1>
          <Link href="/staffs">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Staff
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getHighestRole = (roles: string[]) => {
    const roleHierarchy = ['Founder', 'Owner', 'Co Owner', 'Main Admin', 'Developer', 'Admin', 'Manager', 'Trial Admin', 'Moderator', 'Helper', 'Staff+', 'Staff'];
    for (const role of roleHierarchy) {
      if (roles.includes(role)) return role;
    }
    return 'Staff';
  };

  const getRoleDescription = (role: string) => {
    const descriptions = {
      'Founder': 'Original creator and visionary of Fakepixel community. Responsible for establishing the foundation of the entire Fakepixel ecosystem, including FxG as a sub-server. Sets the fundamental direction and values for all related communities.',
      'Owner': 'Ultimate authority and founder of the community. Responsible for overall vision, strategic decisions, and ensuring the community maintains its core values and mission.',
      'Co Owner': 'Trusted partner with the Owner, sharing major responsibilities and decision-making. Acts as the primary backup leader and helps manage high-level operations.',
      'Main Admin': 'Senior administrator with extensive permissions and responsibilities. Handles complex situations, manages other staff members, and implements major policy changes.',
      'Developer': 'Technical expert responsible for creating and maintaining bots, websites, and other technological infrastructure. Implements new features and fixes technical issues.',
      'Admin': 'Experienced moderator with advanced permissions. Handles serious infractions, manages complex situations, and mentors lower-tier staff members.',
      'Manager': 'Specialized administrator focused on specific areas like events, partnerships, or community growth. Coordinates projects and manages dedicated teams.',
      'Trial Admin': 'Probationary administrator being evaluated for full Admin status. Learning advanced moderation techniques while being closely supervised.',
      'Moderator': 'Active community moderator responsible for maintaining order, enforcing rules, and helping community members. First line of defense against rule violations.',
      'Helper': 'Supportive staff member focused on assisting community members with questions, problems, and general guidance. Creates a welcoming environment for new members.',
      'FxG Family': 'Special trusted community member with close ties to the server leadership. Provides valuable support and represents core community values.',
      'Staff+': 'Enhanced staff member with additional responsibilities beyond basic moderation. Often specializes in specific areas or helps train new staff.',
      'Staff': 'Basic staff member responsible for general moderation duties, helping members, and maintaining community standards. Essential backbone of the moderation team.',
    };
    return descriptions[role as keyof typeof descriptions] || 'Dedicated staff member contributing to the community.';
  };

  const getContributions = (roles: string[]) => {
    const contributions = [];
    
    // Special contributions for darkwall
    if (staff.username === 'darkwall0901_') {
      contributions.push(
        'FxG Support Bot - Ticket System',
        'Demon Slayer Bot - Multi-Feature Utility',
        'FxG Carry Bot - Carry System Management',
        'Technical Innovation',
        'System Architecture',
        'Advanced Bot Development'
      );
      return contributions;
    }
    
    // Special contributions for sigmacat
    if (staff.username === 'sigmacat_69') {
      contributions.push(
        'Ongoing Development Projects',
        'System Architecture Improvements',
        'Technical Innovation',
        'Code Optimization',
        'Feature Implementation',
        'Infrastructure Management'
      );
      return contributions;
    }
    
    if (roles.includes('Founder')) {
      contributions.push('Ecosystem Creation', 'Community Foundation', 'Original Vision', 'Network Establishment');
    }
    if (roles.includes('Owner') || roles.includes('Co Owner')) {
      contributions.push('Community Leadership', 'Strategic Planning', 'Vision Setting', 'Major Decision Making');
    }
    if (roles.includes('Developer')) {
      contributions.push('Bot Development', 'Website Maintenance', 'Technical Innovation', 'System Architecture');
    }
    if (roles.includes('Main Admin') || roles.includes('Admin')) {
      contributions.push('Advanced Moderation', 'Policy Implementation', 'Staff Training', 'Conflict Resolution');
    }
    if (roles.includes('Manager')) {
      contributions.push('Project Management', 'Team Coordination', 'Event Planning', 'Partnership Management');
    }
    if (roles.includes('Moderator') || roles.includes('Helper')) {
      contributions.push('Community Moderation', 'Member Assistance', 'Rule Enforcement', 'New Member Welcome');
    }
    if (roles.includes('Staff+') || roles.includes('Staff')) {
      contributions.push('Daily Moderation', 'Community Support', 'Active Monitoring', 'Member Engagement');
    }
    
    return contributions.slice(0, 6); // Limit to 6 main contributions
  };

  const getAchievements = (roles: string[]) => {
    const achievements = [];
    
    // Special achievements for darkwall
    if (staff.username === 'darkwall0901_') {
      achievements.push(
        'Developed 3+ Production Discord Bots',
        'Created Comprehensive Ticket Systems',
        'Built Multi-Server Bot Infrastructure',
        'Implemented Advanced Carry Management',
        'Delivered Feature-Rich Gaming Utilities'
      );
      return achievements;
    }
    
    // Special achievements for sigmacat
    if (staff.username === 'sigmacat_69') {
      achievements.push(
        'Leading Ongoing Development Initiatives',
        'System Architecture Specialist',
        'Technical Innovation Leader',
        'Code Quality Improvements',
        'Infrastructure Optimization'
      );
      return achievements;
    }
    
    if (roles.includes('Founder')) {
      achievements.push('Created Fakepixel Ecosystem', 'Established FxG Sub-Community', 'Built Foundation Network');
    }
    if (roles.includes('Owner')) {
      achievements.push('Founded the Community', 'Built Strong Leadership Team', 'Established Community Values');
    }
    if (roles.includes('Developer')) {
      achievements.push('Created Custom Discord Bots', 'Developed Community Website', 'Implemented Technical Solutions');
    }
    if (roles.includes('Main Admin') || roles.includes('Admin')) {
      achievements.push('Resolved Major Conflicts', 'Trained New Staff Members', 'Improved Moderation Processes');
    }
    if (roles.includes('Manager')) {
      achievements.push('Organized Successful Events', 'Managed Team Projects', 'Streamlined Operations');
    }
    
    // Add some general achievements based on role count
    if (roles.length > 3) {
      achievements.push('Multi-Role Specialist', 'Versatile Team Member');
    }
    
    return achievements.slice(0, 5);
  };

  const roleColors = {
    'Founder': 'border-orange-200 bg-orange-50 text-orange-700',
    'Owner': 'border-yellow-200 bg-yellow-50 text-yellow-700',
    'Co Owner': 'border-orange-200 bg-orange-50 text-orange-700',
    'Main Admin': 'border-red-200 bg-red-50 text-red-700',
    'Developer': 'border-purple-200 bg-purple-50 text-purple-700',
    'Admin': 'border-blue-200 bg-blue-50 text-blue-700',
    'Manager': 'border-green-200 bg-green-50 text-green-700',
    'Trial Admin': 'border-orange-200 bg-orange-50 text-orange-700',
    'Moderator': 'border-indigo-200 bg-indigo-50 text-indigo-700',
    'Helper': 'border-teal-200 bg-teal-50 text-teal-700',
    'FxG Family': 'border-pink-200 bg-pink-50 text-pink-700',
    'Staff+': 'border-pink-200 bg-pink-50 text-pink-700',
    'Staff': 'border-gray-200 bg-gray-50 text-gray-700',
  };

  const highestRole = getHighestRole(staff.roles);
  const cardColor = roleColors[highestRole as keyof typeof roleColors];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Back Button */}
        <ScrollAnimated animation="slide-down">
          <Link href="/staffs">
            <Button variant="ghost" className="mb-6 group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Staff
            </Button>
          </Link>
        </ScrollAnimated>

        {/* Staff Profile Header */}
        <ScrollAnimated animation="slide-up" delay={0.1}>
          <Card className={`mb-8 ${cardColor} border-2`}>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar */}
                <div className="w-32 h-32 bg-white rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={getDiscordAvatarUrl(staff.discordId, staff.avatar)}
                    alt={staff.username}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const defaultAvatarIndex = (parseInt(staff.discordId.slice(-2)) || 0) % 5;
                      target.src = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;
                    }}
                  />
                </div>

                {/* Staff Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {staff.globalName || staff.username}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4">@{staff.username}</p>
                  
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                    {staff.roles.map((role) => (
                      <Badge key={role} variant="secondary" className="text-sm px-3 py-1">
                        {role}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-center md:justify-start text-sm text-gray-600">
                    <Activity className="w-4 h-4 mr-1" />
                    Staff Member
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollAnimated>

        {/* Role Description */}
        <ScrollAnimated animation="slide-up" delay={0.2}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                Primary Role: {highestRole}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                {getRoleDescription(highestRole)}
              </p>
            </CardContent>
          </Card>
        </ScrollAnimated>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contributions */}
          <ScrollAnimated animation="slide-up" delay={0.3}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-600" />
                  Key Contributions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getContributions(staff.roles).map((contribution, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">{contribution}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollAnimated>

          {/* Achievements */}
          <ScrollAnimated animation="slide-up" delay={0.4}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-green-600" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getAchievements(staff.roles).map((achievement, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollAnimated>
        </div>

        {/* Bot Details for darkwall */}
        {staff.username === 'darkwall0901_' && (
          <ScrollAnimated animation="slide-up" delay={0.5}>
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-purple-600" />
                  Bot Development Portfolio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">FxG Support Bot</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Advanced ticket support system for Fakepixel Giveaways support server. 
                      Features automated ticket creation, staff assignment, and resolution tracking.
                    </p>
                    <div className="text-xs text-blue-600">
                      <span className="px-2 py-1 bg-blue-100 rounded-full">Ticket System</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-2">Demon Slayer Bot</h4>
                    <p className="text-sm text-red-700 mb-3">
                      Feature-rich gaming utility bot with character profiles, ranking systems, 
                      mini-games, economy features, and interactive Demon Slayer themed commands.
                    </p>
                    <div className="text-xs text-red-600 space-x-1">
                      <span className="px-2 py-1 bg-red-100 rounded-full">Gaming</span>
                      <span className="px-2 py-1 bg-red-100 rounded-full">Economy</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">FxG Carry Bot</h4>
                    <p className="text-sm text-green-700 mb-3">
                      Specialized ticket bot managing the carry system for game services. 
                      Handles carry requests, carrier assignment, and service completion tracking.
                    </p>
                    <div className="text-xs text-green-600">
                      <span className="px-2 py-1 bg-green-100 rounded-full">Carry System</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimated>
        )}

        {/* Staff Impact */}
        <ScrollAnimated animation="slide-up" delay={0.5}>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-600" />
                Community Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">Active</div>
                  <div className="text-sm text-gray-600">Community Contributor</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">Helpful</div>
                  <div className="text-sm text-gray-600">Always Available</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">Reliable</div>
                  <div className="text-sm text-gray-600">Consistent Performance</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 text-center italic">
                  "A dedicated team member who consistently contributes to making Fakepixel Giveaways 
                  a welcoming and enjoyable community for everyone."
                </p>
              </div>
            </CardContent>
          </Card>
        </ScrollAnimated>

        {/* Contact */}
        <ScrollAnimated animation="slide-up" delay={0.6}>
          <Card className="mt-8 bg-blue-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
              <p className="text-blue-100 mb-6">
                Have questions or need assistance? Our staff members are here to help you in our Discord server.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <a href="https://discord.gg/We6pY3TARP" target="_blank" rel="noopener noreferrer">
                  <Users className="mr-2 w-5 h-5" />
                  Join Discord Server
                </a>
              </Button>
            </CardContent>
          </Card>
        </ScrollAnimated>
      </div>
    </div>
  );
};

export default StaffDetail;
