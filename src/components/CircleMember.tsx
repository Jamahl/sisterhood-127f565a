import { Bell, BellOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CircleMemberProps {
  name: string;
  avatar: string;
  status: string;
  cycleDay?: string;
}

const CircleMember = ({ name, avatar, status, cycleDay }: CircleMemberProps) => {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex items-center gap-4 p-4 bg-card rounded-2xl shadow-soft">
      <div className="relative">
        <img 
          src={avatar} 
          alt={name}
          className="w-14 h-14 rounded-2xl object-cover border-2 border-lavender"
        />
        {cycleDay && (
          <span className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            D{cycleDay}
          </span>
        )}
      </div>
      
      <div className="flex-1">
        <h4 className="font-semibold text-foreground">{name}</h4>
        <p className="text-sm text-muted-foreground">{status}</p>
      </div>
      
      <button
        onClick={() => setNotifications(!notifications)}
        className={cn(
          "p-3 rounded-xl transition-all duration-300",
          notifications 
            ? "bg-blush-light text-primary" 
            : "bg-muted text-muted-foreground"
        )}
      >
        {notifications ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default CircleMember;
