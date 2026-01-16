import { Heart, MessageCircle, Gift } from "lucide-react";
import { Button } from "./ui/button";

interface MoodCardProps {
  name: string;
  avatar: string;
  mood: string;
  moodEmoji: string;
  cycleDay: string;
  message?: string;
  time: string;
}

const MoodCard = ({ name, avatar, mood, moodEmoji, cycleDay, message, time }: MoodCardProps) => {
  return (
    <div className="bg-card rounded-3xl p-5 shadow-card animate-slide-up border border-border/30">
      <div className="flex items-start gap-4">
        <div className="relative">
          <img 
            src={avatar} 
            alt={name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-blush-light"
          />
          <span className="absolute -bottom-1 -right-1 text-xl">{moodEmoji}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-foreground">{name}</h3>
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>
          
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-primary">{mood}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground bg-lavender/50 px-2 py-0.5 rounded-full">
              {cycleDay}
            </span>
          </div>
          
          {message && (
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {message}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
        <Button variant="soft" size="sm" className="flex-1 gap-2">
          <Heart className="w-4 h-4" />
          Send Love
        </Button>
        <Button variant="lavender" size="sm" className="flex-1 gap-2">
          <Gift className="w-4 h-4" />
          Care Package
        </Button>
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <MessageCircle className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default MoodCard;
