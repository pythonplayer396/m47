import { Crown, Shield, Star, Users, Heart, ArrowRight } from "lucide-react";
import ScrollAnimated from "@/components/scroll-animated";
import { staticStaffData, getStaffByRole, getDiscordAvatarUrl } from "@/data/staff-data";
import { Link } from "wouter";

const BestStaffs = () => {
  const staffByRole = getStaffByRole(staticStaffData);

  // Get owners and specialized staff from static data
  const getSpecializedStaff = () => {
    const owners = [
      ...(staffByRole['Owner'] || []),
      ...(staffByRole['Co Owner'] || [])
    ];

    // Management team - excluding darkwall and sigmacat who go to development
    const managementStaff = [
      ...(staffByRole['Main Admin'] || []).filter(staff => 
        !['darkwall0901_', 'sigmacat_69'].includes(staff.username)
      ),
      ...(staffByRole['Admin'] || []),
      ...(staffByRole['Manager'] || [])
    ].slice(0, 6);

    // Development team - specifically darkwall and sigmacat plus other developers
    const developmentStaff = [
      ...(staffByRole['Developer'] || []),
      // Add darkwall and sigmacat specifically if they're not already included
      ...staticStaffData.filter(staff => 
        ['darkwall0901_', 'sigmacat_69'].includes(staff.username)
      )
    ];

    return { owners, managementStaff, developmentStaff };
  };

  const { owners, managementStaff, developmentStaff } = getSpecializedStaff();

  const recognitionCriteria = [
    {
      title: "Leadership Excellence",
      description: "Consistently leading by example and inspiring the community",
      icon: Star,
    },
    {
      title: "Community Building",
      description: "Creating positive experiences and fostering growth",
      icon: Users,
    },
    {
      title: "Innovation",
      description: "Bringing fresh ideas and improving our systems",
      icon: Shield,
    },
    {
      title: "Dedication",
      description: "Showing unwavering commitment to our community values",
      icon: Heart,
    },
  ];

  const getRoleColor = (roles: string[]) => {
    if (roles.includes('Owner')) return 'border-yellow-200 bg-yellow-50';
    if (roles.includes('Co Owner')) return 'border-orange-200 bg-orange-50';
    if (roles.includes('Main Admin')) return 'border-red-200 bg-red-50';
    if (roles.includes('Developer')) return 'border-purple-200 bg-purple-50';
    if (roles.includes('Admin')) return 'border-blue-200 bg-blue-50';
    return 'border-gray-200 bg-gray-50';
  };

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <ScrollAnimated animation="slide-down">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Staff Recognition</h1>
          </ScrollAnimated>
          <ScrollAnimated animation="slide-down" delay={0.2}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Celebrating our outstanding staff members who go above and beyond to make Fakepixel Giveaways 
              an exceptional community. These individuals exemplify leadership, dedication, and excellence.
            </p>
          </ScrollAnimated>
        </div>

        <div className="space-y-16">
          {/* Recognition Criteria */}
          <div>
            <ScrollAnimated animation="slide-down">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What Makes Our Staff Outstanding</h2>
            </ScrollAnimated>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recognitionCriteria.map((criteria, index) => (
                <ScrollAnimated
                  key={criteria.title}
                  animation="slide-up"
                  delay={index * 0.1}
                  className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <criteria.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{criteria.title}</h3>
                  <p className="text-gray-600 text-sm">{criteria.description}</p>
                </ScrollAnimated>
              ))}
            </div>
          </div>

          {/* Server Owners */}
          {owners.length > 0 && (
            <div>
              <ScrollAnimated animation="slide-down">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Server Leadership</h2>
              </ScrollAnimated>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {owners.map((owner, index) => (
                  <ScrollAnimated
                    key={owner.id}
                    animation="slide-up"
                    delay={index * 0.1}
                    className={`bg-white rounded-lg p-8 shadow-sm border-2 ${getRoleColor(owner.roles)} text-center`}
                  >
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto overflow-hidden">
                        <img 
                          src={getDiscordAvatarUrl(owner.discordId, owner.avatar)}
                          alt={owner.username}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://cdn.discordapp.com/embed/avatars/${parseInt(owner.discordId) % 5}.png`;
                          }}
                        />
                      </div>
                      {owner.roles.includes('Owner') && (
                        <Crown className="w-6 h-6 text-yellow-600 absolute -top-1 -right-1" />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {owner.globalName || owner.username}
                    </h3>
                    <p className="text-gray-600 font-medium mb-3">
                      {owner.roles.includes('Owner') ? 'Server Owner' : 'Co Owner'}
                    </p>
                    <p className="text-gray-500 text-sm">@{owner.username}</p>
                  </ScrollAnimated>
                ))}
              </div>
            </div>
          )}

          {/* Management Team */}
          {managementStaff.length > 0 && (
            <div>
              <ScrollAnimated animation="slide-down">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Management Team</h2>
              </ScrollAnimated>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {managementStaff.map((manager, index) => (
                  <ScrollAnimated
                    key={manager.id}
                    animation="slide-up"
                    delay={index * 0.1}
                    className={`bg-white rounded-lg p-6 shadow-sm border ${getRoleColor(manager.roles)} text-center group`}
                  >
                    <Link href={`/staffs/${manager.id}`}>
                      <div className="cursor-pointer">
                        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 overflow-hidden">
                          <img 
                            src={getDiscordAvatarUrl(manager.discordId, manager.avatar)}
                            alt={manager.username}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              const defaultAvatarIndex = (parseInt(manager.discordId.slice(-2)) || 0) % 5;
                              target.src = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;
                            }}
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {manager.globalName || manager.username}
                        </h3>
                        <p className="text-gray-600 mb-3 text-sm">
                          {manager.roles.find(role => ['Main Admin', 'Admin', 'Manager'].includes(role))}
                        </p>
                        <div className="flex flex-wrap justify-center gap-1 mb-3">
                          {manager.roles.map((role) => (
                            <span key={role} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              {role}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm mb-3">@{manager.username}</p>
                        <p className="text-gray-500 text-xs mb-3">
                          Strategic planning and team coordination specialist
                        </p>

                        {/* Hover indicator */}
                        <div className="flex items-center justify-center text-xs text-gray-400 group-hover:text-green-600 transition-colors duration-300 opacity-0 group-hover:opacity-100">
                          <span className="mr-1">View Details</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </Link>
                  </ScrollAnimated>
                ))}
              </div>
            </div>
          )}

          {/* Development Team */}
          {developmentStaff.length > 0 && (
            <div>
              <ScrollAnimated animation="slide-down">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Development Team</h2>
              </ScrollAnimated>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {developmentStaff.map((developer, index) => (
                  <ScrollAnimated
                    key={developer.id}
                    animation="slide-up"
                    delay={index * 0.1}
                    className={`bg-white rounded-lg p-6 shadow-sm border ${getRoleColor(developer.roles)} text-center group`}
                  >
                    <Link href={`/staffs/${developer.id}`}>
                      <div className="cursor-pointer">
                        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 overflow-hidden">
                          <img 
                            src={getDiscordAvatarUrl(developer.discordId, developer.avatar)}
                            alt={developer.username}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              const defaultAvatarIndex = (parseInt(developer.discordId.slice(-2)) || 0) % 5;
                              target.src = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;
                            }}
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {developer.globalName || developer.username}
                        </h3>
                        <p className="text-gray-600 mb-3 text-sm">
                          {developer.roles.includes('Developer') ? 'Developer' : 'Tech Specialist'}
                        </p>
                        <div className="flex flex-wrap justify-center gap-1 mb-3">
                          {developer.roles.map((role) => (
                            <span key={role} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                              {role}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm mb-3">@{developer.username}</p>
                        
                        {/* Specific descriptions for darkwall and sigmacat */}
                        {developer.username === 'darkwall0901_' && (
                          <div className="text-xs text-gray-500 mb-3">
                            <p className="font-medium mb-1">Bot Creator:</p>
                            <p>• FxG Support - Ticket support system</p>
                            <p>• Demon Slayer Bot - Feature-rich utility</p>
                            <p>• FxG Carry - Ticket bot for carry system</p>
                          </div>
                        )}
                        
                        {developer.username === 'sigmacat_69' && (
                          <div className="text-xs text-gray-500 mb-3">
                            <p className="font-medium mb-1">Current Focus:</p>
                            <p>• Ongoing development projects</p>
                            <p>• System architecture improvements</p>
                          </div>
                        )}

                        {developer.username !== 'darkwall0901_' && developer.username !== 'sigmacat_69' && (
                          <p className="text-gray-500 text-xs mb-3">
                            Technical innovation and system development
                          </p>
                        )}

                        {/* Hover indicator */}
                        <div className="flex items-center justify-center text-xs text-gray-400 group-hover:text-purple-600 transition-colors duration-300 opacity-0 group-hover:opacity-100">
                          <span className="mr-1">View Details</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </Link>
                  </ScrollAnimated>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BestStaffs;