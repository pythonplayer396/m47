import { CheckCircle, Users, Award, Clock, Gift, Star, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollAnimated from "@/components/scroll-animated";
import { staticStaffData } from "@/data/staff-data";
import { useServerStats } from "@/hooks/use-discord-data";

const Home = () => {
  const { data: serverStats } = useServerStats();
  const totalStaff = staticStaffData.length;

  const features = [
    {
      icon: Gift,
      title: "Regular Giveaways",
      description: "Participate in daily giveaways with amazing prizes including Nitro, games, and more."
    },
    {
      icon: Users,
      title: "Active Community",
      description: "Join thousands of members in our vibrant Discord community."
    },
    {
      icon: Award,
      title: "Fair & Transparent",
      description: "All giveaways are conducted fairly with transparent winner selection."
    },
    {
      icon: CheckCircle,
      title: "Verified Server",
      description: "Official Discord verified server with trusted moderators and staff."
    }
  ];

  const stats = [
    {
      value: "2,000+",
      label: "Community Members"
    },
    {
      value: "100,000+",
      label: "Giveaways Hosted"
    },
    {
      value: totalStaff.toString(),
      label: "Staff Members"
    },
    {
      value: "24/7",
      label: "Community Support"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center">
            <ScrollAnimated animation="fade-in" delay={0.2}>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                Fakepixel
                <span className="text-blue-600"> Giveaways</span>
              </h1>
            </ScrollAnimated>
            <ScrollAnimated animation="fade-in" delay={0.4}>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Join the ultimate Discord giveaway community. Participate in daily giveaways,
                win amazing prizes, and connect with fellow gamers and enthusiasts.
              </p>
            </ScrollAnimated>
            <ScrollAnimated animation="slide-up" delay={0.6}>
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                asChild
              >
                <a href="https://discord.gg/7KMDWuNy7B" target="_blank" rel="noopener noreferrer">
                  <Gift className="mr-2 w-5 h-5" />
                  Join Discord Server
                </a>
              </Button>
            </ScrollAnimated>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollAnimated
                key={stat.label}
                animation="scale-in"
                delay={index * 0.1}
                className="text-center"
              >
                <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </ScrollAnimated>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <ScrollAnimated animation="slide-down">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Fakepixel Giveaways?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide the best giveaway experience with fair competitions and amazing prizes.
              </p>
            </ScrollAnimated>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <ScrollAnimated
                key={feature.title}
                animation="slide-up"
                delay={index * 0.1}
              >
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </ScrollAnimated>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <ScrollAnimated animation="slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Win Amazing Prizes?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of members in our Discord server and participate in daily giveaways.
            </p>
            <Button
              variant="premium"
              size="xl"
              className="group ripple-effect spotlight-effect hover-lift"
              onClick={() => window.open('https://discord.gg/7KMDWuNy7B', '_blank')}
            >
              <MessageCircle className="w-6 h-6 mr-3 group-hover:animate-bounce" />
              Join Our Discord Community
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </ScrollAnimated>
        </div>
      </section>
    </div>
  );
};

export default Home;