import { Heart, Gift, Users, MessageCircle, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollAnimated from "@/components/scroll-animated";


const Contribute = () => {
  const contributionMethods = [
    {
      icon: Gift,
      title: "Host Giveaways",
      description: "Organize and sponsor giveaways for the community. Contact our staff team to get started.",
    },
    {
      icon: Users,
      title: "Community Engagement",
      description: "Be active in the server, help new members, and participate in community events.",
    },
    {
      icon: MessageCircle,
      title: "Feedback & Suggestions",
      description: "Share your ideas to improve our server and giveaway experience for everyone.",
    },
    {
      icon: Heart,
      title: "Server Boosting",
      description: "Boost our Discord server to unlock more features and help us grow.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 min-h-screen relative">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollAnimated animation="slide-down">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contribute to Our Community
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Help us make Fakepixel Giveaways an even better place for everyone.
              There are many ways you can contribute and make a difference.
            </p>
          </ScrollAnimated>
        </div>

        {/* Contribution Methods */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {contributionMethods.map((method, index) => (
            <ScrollAnimated
              key={method.title}
              animation="slide-up"
              delay={index * 0.1}
              className="bg-white rounded-lg p-8 shadow-sm border border-gray-200"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <method.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {method.title}
                  </h3>
                  <p className="text-gray-600">
                    {method.description}
                  </p>
                </div>
              </div>
            </ScrollAnimated>
          ))}
        </div>

        {/* Guidelines */}
        <ScrollAnimated animation="slide-up" delay={0.6}>
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Contribution Guidelines
            </h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start">
                <Star className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Be respectful and follow all server rules when contributing.</span>
              </div>
              <div className="flex items-start">
                <Star className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>All giveaway contributions must be legitimate and follow Discord's terms of service.</span>
              </div>
              <div className="flex items-start">
                <Star className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Contact staff members before organizing large-scale events or giveaways.</span>
              </div>
              <div className="flex items-start">
                <Star className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Quality contributions are valued more than quantity.</span>
              </div>
            </div>
          </div>
        </ScrollAnimated>

        {/* Call to Action */}
        <ScrollAnimated animation="slide-up" delay={0.8}>
          <div className="text-center bg-blue-600 rounded-lg p-12">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our Discord server and start contributing to make our community even better.
            </p>
            <Button
                  variant="magnetic"
                  size="xl"
                  className="group ripple-effect spotlight-effect hover-lift"
                  onClick={() => window.open('https://discord.com/oauth2/authorize?client_id=1401262869752057966&response_type=code&redirect_uri=https%3A%2F%2F0412f499-7d03-4f95-9730-a832a3345043-00-zg2r94zgiia7.pike.replit.dev%2Fcallback&scope=identify', '_blank')}
                >
                  <Heart className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                  Start Contributing Today
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
          </div>
        </ScrollAnimated>
      </div>
    </section>
  );
};

export default Contribute;