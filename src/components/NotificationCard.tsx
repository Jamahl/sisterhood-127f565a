import { Heart, Gift, Bell, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationCardProps {
  type: "love" | "gift" | "alert" | "circle";
  title: string;
  message: string;
  time: string;
  isNew?: boolean;
}

const NotificationCard = ({ type, title, message, time, isNew }: NotificationCardProps) => {
  const icons = {
    love: Heart,
    gift: Gift,
    alert: Bell,
    circle: Users,
  };
  
  const colors = {
    love: "bg-blush-light text-primary",
    gift: "bg-peach text-coral",
    alert: "bg-lavender text-lavender-dark",
    circle: "bg-sage/50 text-sage",
  };

  const Icon = icons[type];

  return (
    <div className={cn(
      "flex items-start gap-4 p-4 rounded-2xl transition-all duration-300",
      isNew ? "bg-blush-light/30" : "bg-card",
      "shadow-soft hover:shadow-card"
    )}>
      <div className={cn(
        "p-3 rounded-xl",
        colors[type]
      )}>
        <Icon className="w-5 h-5" />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-foreground">{title}</h4>
          {isNew && (
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse-soft" />
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">{message}</p>
        <span className="text-xs text-muted-foreground mt-2 block">{time}</span>
      </div>
    </div>
  );
};

export default NotificationCard;
