import { Calendar, Star, Shield, Users, Trophy, Gift, Sword, ShoppingCart, ArrowRight, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ScrollAnimated from "@/components/scroll-animated";
import { Link } from "wouter";

const Updates = () => {
  const updates = [
    {
      id: 1,
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
      color: "bg-purple-100 text-purple-700 border-purple-200"
    },
    {
      id: 2,
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
      color: "bg-red-100 text-red-700 border-red-200"
    },
    {
      id: 3,
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
      color: "bg-green-100 text-green-700 border-green-200"
    },
    {
      id: 4,
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
      color: "bg-orange-100 text-orange-700 border-orange-200"
    },
    {
      id: 5,
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
      color: "bg-blue-100 text-blue-700 border-blue-200"
    },
    {
      id: 6,
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
      color: "bg-yellow-100 text-yellow-700 border-yellow-200"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 min-h-screen relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollAnimated animation="slide-down">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Updates Throughout the Year
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Below are all the major updates we introduced. Each update represents a significant
              improvement to our community and gaming experience.
            </p>
          </ScrollAnimated>

          {/* Update Stats */}
          <ScrollAnimated animation="slide-up" delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
                <div className="text-gray-600 font-medium text-sm">Major Updates</div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <div className="text-3xl font-bold text-green-600 mb-2">25+</div>
                <div className="text-gray-600 font-medium text-sm">New Features</div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <div className="text-3xl font-bold text-purple-600 mb-2">2024</div>
                <div className="text-gray-600 font-medium text-sm">Active Year</div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                <div className="text-gray-600 font-medium text-sm">Community Driven</div>
              </div>
            </div>
          </ScrollAnimated>
        </div>

        {/* Updates Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {updates.map((update, index) => (
            <ScrollAnimated
              key={update.id}
              animation="slide-up"
              delay={index * 0.1}
            >
              <Card className="h-full border border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-500 group cursor-pointer card-hover-effect backdrop-blur-sm bg-white/90">
                <Link href={`/updates/${update.id}`}>
                  <CardHeader className="pb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 flex items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100 group-hover:border-blue-300 transition-all duration-500 shadow-sm">
                          <update.icon className="w-7 h-7 text-gray-700 group-hover:text-blue-600 transition-colors duration-300" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                            {update.title}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className={update.color}>
                              <Tag className="w-3 h-3 mr-1" />
                              {update.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                        <Calendar className="w-4 h-4 mr-1" />
                        {update.date}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-600 mb-6 text-base leading-relaxed">
                      {update.summary}
                    </CardDescription>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900 text-sm flex items-center">
                          <Star className="w-4 h-4 mr-2 text-yellow-500" />
                          Key Features
                        </h4>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {update.details.length} features
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {update.details.slice(0, 4).map((detail, detailIndex) => (
                          <li key={detailIndex} className="text-sm text-gray-600 flex items-start group/item">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0 group-hover/item:bg-blue-600 transition-colors"></span>
                            <span className="group-hover/item:text-gray-800 transition-colors">{detail}</span>
                          </li>
                        ))}
                        {update.details.length > 4 && (
                          <li className="text-sm text-blue-600 italic font-medium flex items-center">
                            <Clock className="w-3 h-3 mr-2" />
                            +{update.details.length - 4} more features to discover...
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 group-hover:border-blue-100 transition-colors">
                      <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">
                        Read full details
                      </span>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-400">Click to explore</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300" />
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </ScrollAnimated>
          ))}
        </div>

        {/* Call to Action */}
        <ScrollAnimated animation="slide-up" delay={0.8}>
          <div className="text-center bg-blue-600 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-3">
              Experience All These Updates
            </h3>
            <p className="text-sm text-blue-100 mb-4 max-w-xl mx-auto">
              Join our Discord server to take advantage of all these amazing features and be part of our growing community.
            </p>
            <Button size="sm" variant="secondary" className="text-sm px-6 py-2" asChild>
              <a href="https://discord.gg/We6pY3TARP" target="_blank" rel="noopener noreferrer">
                Join Discord Server
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </ScrollAnimated>
      </div>
    </section>
  );
};

export default Updates;