import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Users, Gift, MessageSquare, Phone, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStatus, getDiscordAvatarUrl } from "@/hooks/use-discord-data";

const Navigation = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: authData } = useAuthStatus();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/staffs", label: "Staff" },
    { path: "/contribute", label: "Contribute" },
    { path: "/updates", label: "Updates" },
    { path: "/best-staffs", label: "Best Staff" },
    { path: "/contact", label: "Contact" },
    { path: "/profile", label: "Profile" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location === "/";
    }
    if (path === "/updates") {
      return location === "/updates" || location.startsWith("/updates/");
    }
    return location.startsWith(path);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <div className="text-2xl font-bold text-primary">Fakepixel Giveaways</div>
            <div className="hidden sm:block ml-2 text-sm text-neutral-500">
              Discord Giveaway Community
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 hover-lift ${
                    isActive(item.path)
                      ? "text-primary border-b-2 border-primary rounded-none"
                      : "text-neutral-600 hover:text-primary"
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-neutral-600" />
            ) : (
              <Menu className="w-6 h-6 text-neutral-600" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 py-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start px-4 py-2 text-sm font-medium transition-all duration-300 hover-lift ${
                      isActive(item.path)
                        ? "text-primary bg-primary/10"
                        : "text-neutral-600 hover:text-primary hover:bg-primary/5"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Profile Icon - Bottom Left */}
      <div className="fixed bottom-6 left-6 z-50">
        {authData?.authenticated && authData.user ? (
          <Button
            asChild
            size="sm"
            className="rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift border-2 border-white"
          >
            <a href="/profile" className="flex items-center justify-center">
              <img
                src={getDiscordAvatarUrl(authData.user.discordId, authData.user.avatar || null)}
                alt={authData.user.username}
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://cdn.discordapp.com/embed/avatars/${parseInt(authData.user.discordId) % 5}.png`;
                }}
              />
            </a>
          </Button>
        ) : (
          <Button
            asChild
            size="sm"
            className="rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
          >
            <a href="/api/auth/discord" className="flex items-center justify-center">
              <User className="w-5 h-5" />
            </a>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Navigation;