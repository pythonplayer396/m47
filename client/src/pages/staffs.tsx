import { Crown, Shield, Settings, Users, HelpCircle, ArrowRight } from "lucide-react";
import ScrollAnimated from "@/components/scroll-animated";
import { staticStaffData, getStaffByRole, getDiscordAvatarUrl } from "@/data/staff-data";
import { Link } from "wouter";

const Staffs = () => {
  const staffByRole = getStaffByRole(staticStaffData);
  const founderData = staffByRole['Founder'] || [];
  const ownerData = staffByRole['Owner'] || [];
  const adminData = [...(staffByRole['Main Admin'] || []), ...(staffByRole['Admin'] || [])];
  const moderatorData = staffByRole['Moderator'] || [];
  const supportData = [...(staffByRole['Helper'] || []), ...(staffByRole['Staff'] || [])];

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'founder':
        return Crown;
      case 'owner':
        return Crown;
      case 'admin':
        return Shield;
      case 'moderator':
        return Settings;
      case 'support':
        return HelpCircle;
      default:
        return Users;
    }
  };

  const getRoleColor = (roles: string[]) => {
    const roleString = roles.join(' ').toLowerCase();
    if (roleString.includes('founder')) return 'border-orange-200 bg-orange-50';
    if (roleString.includes('owner')) return 'border-red-200 bg-red-50';
    if (roleString.includes('admin')) return 'border-purple-200 bg-purple-50';
    if (roleString.includes('moderator')) return 'border-blue-200 bg-blue-50';
    if (roleString.includes('helper') || roleString.includes('staff')) return 'border-green-200 bg-green-50';
    return 'border-gray-200 bg-gray-50';
  };

  const StaffSection = ({ title, members, role }: { title: string; members: any[]; role: string }) => {
    const RoleIcon = getRoleIcon(role);

    return (
      <div className="mb-12">
        <ScrollAnimated animation="slide-down" className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <RoleIcon className="w-8 h-8 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <span className="text-sm text-gray-500">({members.length})</span>
          </div>
        </ScrollAnimated>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member, memberIndex) => (
            <ScrollAnimated
              key={member.id}
              animation="slide-up"
              delay={memberIndex * 0.1}
            >
              <Link href={`/staffs/${member.id}`}>
                <div className={`bg-white rounded-lg p-6 border ${getRoleColor(member.roles)} hover:shadow-lg transition-shadow duration-300 cursor-pointer card-hover-effect backdrop-blur-sm bg-white/90`}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full mb-4 overflow-hidden">
                      <img
                        src={getDiscordAvatarUrl(member.discordId, member.avatar)}
                        alt={member.username}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const defaultAvatarIndex = (parseInt(member.discordId.slice(-2)) || 0) % 5;
                          target.src = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;
                        }}
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{member.username}</h3>
                    <p className="text-sm text-gray-500 capitalize mb-3">{member.roles.join(', ')}</p>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      View Profile
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollAnimated>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <ScrollAnimated animation="fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Staff Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated team members who make our Discord community great.
              Our staff work around the clock to ensure a safe and enjoyable experience for everyone.
            </p>
          </ScrollAnimated>
        </div>

        <StaffSection title="Founders" members={founderData} role="founder" />
        <StaffSection title="Owners" members={ownerData} role="owner" />
        <StaffSection title="Administrators" members={adminData} role="admin" />
        <StaffSection title="Moderators" members={moderatorData} role="moderator" />
        <StaffSection title="Support Team" members={supportData} role="support" />
      </div>
    </div>
  );
};

export default Staffs;