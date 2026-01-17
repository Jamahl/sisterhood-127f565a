import { Home, Users, Gift, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "sisters", icon: Users, label: "Sisters" },
    { id: "gifts", icon: Gift, label: "Gifts" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="absolute bottom-[34px] left-0 right-0 h-20 bg-card/95 backdrop-blur-xl border-t border-border/50 px-4">
      <div className="flex items-center justify-around h-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-300",
                isActive && "bg-blush-light shadow-soft"
              )}>
                <Icon className={cn(
                  "w-5 h-5 transition-all duration-300",
                  isActive && "scale-110"
                )} />
              </div>
              <span className={cn(
                "text-[10px] font-medium transition-all",
                isActive && "font-bold"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
