
import { ArrowLeft, Calendar, Tag, Star, Gift, Shield, Users, Trophy, Sword, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScrollAnimated from "@/components/scroll-animated";
import { Link, useParams } from "wouter";

const UpdateDetail = () => {
  const params = useParams();
  const updateId = params.id;

  const updates = [
    {
      id: "1",
      title: "Booster Update",
      date: "2024",
      icon: Star,
      category: "Server Enhancement",
      summary: "Exclusive perks for Discord server boosters including custom roles, faster assistance, and special benefits.",
      details: [
        "🎨 Custom Role (with your own picture & color)",
        "⚡ Faster Assistance",
        "💰 Faster Payouts",
        "🛒 10% Discount on Carries",
        "📌 Role Displayed Separately"
      ],
      color: "bg-purple-100 text-purple-700 border-purple-200",
      fullDescription: "Our Booster Update introduces a comprehensive rewards system for Discord server boosters who support our community. This update recognizes the valuable contribution of our boosters and provides them with exclusive benefits that enhance their experience in our community."
    },
    {
      id: "2",
      title: "Carrier System (FxG Carry Update)",
      date: "2024",
      icon: Sword,
      category: "Gaming System",
      summary: "Professional carry service for Fakepixel Skyblock players struggling with Slayers and Dungeon Floors.",
      details: [
        "Hire carriers to complete content quickly",
        "F7 Dungeon completed in just 10 minutes!",
        "Hardest Slayer (Eman 4 / Atoned Void 4) beaten in 7 minutes!",
        "Built for players who need help progressing"
      ],
      color: "bg-red-100 text-red-700 border-red-200",
      fullDescription: "The Carrier System revolutionizes how players approach challenging content in Fakepixel Skyblock. Our professional carriers are experienced players who can help you complete difficult dungeons and slayer bosses efficiently, allowing you to progress faster in the game."
    },
    {
      id: "3",
      title: "Fakepixel Marketplace",
      date: "2024",
      icon: ShoppingCart,
      category: "Trading Platform",
      summary: "A community-driven marketplace for easy and safe trading of items between players.",
      details: [
        "Post your items for sale or trade",
        "Other players can interact directly with your post",
        "Easy, safe, and community-driven trading system",
        "Simplified finding and trading process"
      ],
      color: "bg-green-100 text-green-700 border-green-200",
      fullDescription: "The Fakepixel Marketplace creates a centralized hub for all trading activities within our community. This platform ensures secure transactions while providing an intuitive interface for players to buy, sell, and trade items effectively."
    },
    {
      id: "4",
      title: "Demon Slayer Bot",
      date: "2024",
      icon: Shield,
      category: "Bot Integration",
      summary: "Custom bot based on Demon Slayer anime with seasonal competitions and rewards.",
      details: [
        "Created by darkwall0901_ (see Staff Tab for more info)",
        "Based on the Demon Slayer anime",
        "Hunt demons, earn points, and spend them on Breathing Styles & Swords",
        "Every season, the Top #1 Player gets a special prize",
        "💡 Recent Prize: 300M Fakepixel Skyblock Coins!"
      ],
      color: "bg-orange-100 text-orange-700 border-orange-200",
      fullDescription: "The Demon Slayer Bot brings the excitement of the popular anime directly into our Discord server. This interactive bot allows members to engage in demon hunting activities, collect points, and compete for seasonal rewards, creating an engaging gaming experience within our community."
    },
    {
      id: "5",
      title: "Sponsor Giveaways",
      date: "2024",
      icon: Gift,
      category: "Community System",
      summary: "Recognition system for community members who contribute prizes for giveaway events.",
      details: [
        "🌟 Recognition with a custom role",
        "🎉 Help the community grow",
        "💝 Spread joy with rewards",
        "@Giveaway Sponsor → 5M Donated",
        "@Giveaway Sponsor+ → 25M Donated",
        "@Giveaway Sponsor++ → 75M Donated", 
        "@Giveaway Sponsor+++ → 150M Donated",
        "@Supreme Giveaway Sponsor → 200M Donated",
        "⚠ Note: These ranks are for recognition only (no exclusive benefits)"
      ],
      color: "bg-blue-100 text-blue-700 border-blue-200",
      fullDescription: "The Sponsor Giveaways system acknowledges and celebrates community members who contribute to our giveaway events. This tiered recognition system encourages community participation and helps create more exciting giveaway events for everyone."
    },
    {
      id: "6",
      title: "Guinness Book of Fakepixel Records",
      date: "2024",
      icon: Trophy,
      category: "Competition System",
      summary: "Official record-keeping system for community achievements and competitions.",
      details: [
        "Submit records of anything unique you've achieved",
        "Fastest F7 Run (solo or team)",
        "Funniest or ugliest island",
        "Any unique achievement!",
        "Submit your record in the 📩┃submit-record channel",
        "A staff member will verify it",
        "Your record will be posted officially",
        "Makes challenges fun, competitive, and community-driven"
      ],
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
      fullDescription: "The Guinness Book of Fakepixel Records celebrates extraordinary achievements within our community. This system allows players to showcase their unique accomplishments, from speedrun records to creative builds, fostering a competitive and engaging environment."
    }
  ];

  const update = updates.find(u => u.id === updateId);

  if (!update) {
    return (
      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Update Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">The update you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/updates">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Updates
            </Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Back Button */}
        <ScrollAnimated animation="slide-down">
          <Button variant="ghost" asChild className="mb-8 hover:bg-white">
            <Link href="/updates">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Updates
            </Link>
          </Button>
        </ScrollAnimated>

        {/* Update Header */}
        <ScrollAnimated animation="slide-down" delay={0.1}>
          <Card className="mb-8 border border-gray-200">
            <CardHeader className="pb-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                  <update.icon className="w-8 h-8 text-gray-700" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                    {update.title}
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${update.color}`}>
                      {update.category}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {update.date}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </ScrollAnimated>

        {/* Update Content */}
        <div className="grid gap-8">
          {/* Overview */}
          <ScrollAnimated animation="slide-up" delay={0.2}>
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <update.icon className="w-6 h-6 mr-3 text-blue-600" />
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
                    {update.summary}
                  </p>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {update.fullDescription}
                  </p>
                </div>
                
                {/* Update Metadata */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Release Year</div>
                        <div className="text-sm text-gray-500">{update.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Tag className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Category</div>
                        <div className="text-sm text-gray-500">{update.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Star className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Features</div>
                        <div className="text-sm text-gray-500">{update.details.length} Total</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimated>

          {/* Features */}
          <ScrollAnimated animation="slide-up" delay={0.3}>
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Gift className="w-6 h-6 mr-3 text-green-600" />
                  Key Features & Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {update.details.map((detail, index) => (
                    <ScrollAnimated 
                      key={index} 
                      animation="slide-up" 
                      delay={0.4 + (index * 0.1)}
                    >
                      <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-300 group">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-blue-600 transition-colors">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <span className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                            {detail}
                          </span>
                        </div>
                      </div>
                    </ScrollAnimated>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollAnimated>

          {/* How it Works */}
          <ScrollAnimated animation="slide-up" delay={0.4}>
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-orange-600" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Join Our Discord Server</h4>
                      <p className="text-gray-600">Connect with our community and get access to all features and updates.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Explore the Feature</h4>
                      <p className="text-gray-600">Navigate to the appropriate channels and start using the new functionality.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Enjoy the Benefits</h4>
                      <p className="text-gray-600">Take advantage of all the perks and improvements this update brings to your experience.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimated>

          {/* Call to Action */}
          <ScrollAnimated animation="slide-up" delay={0.5}>
            <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Ready to Experience This Update?</h3>
                <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                  Join our Discord server to take advantage of this feature and be part of our growing community of {" "}
                  <span className="font-semibold text-white">2,000+ active members</span>.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
                    <a href="https://discord.gg/We6pY3TARP" target="_blank" rel="noopener noreferrer">
                      Join Discord Server
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-blue-600 hover:text-blue-700" asChild>
                    <Link href="/updates">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      View All Updates
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimated>
        </div>
      </div>
    </section>
  );
};

export default UpdateDetail;
