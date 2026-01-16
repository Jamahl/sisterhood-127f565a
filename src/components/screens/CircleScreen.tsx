import { Plus, Search } from "lucide-react";
import { Button } from "../ui/button";
import CircleMember from "../CircleMember";

const CircleScreen = () => {
  const members = [
    { name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop", status: "Feeling low today", cycleDay: "2" },
    { name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop", status: "Grateful and happy", cycleDay: "14" },
    { name: "Maya Chen", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop", status: "Taking it easy", cycleDay: "1" },
    { name: "Olivia Davis", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop", status: "Crushing it at work!", cycleDay: "22" },
    { name: "Mom", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop", status: "Always here for you", cycleDay: undefined },
  ];

  return (
    <div className="px-5 pb-24">
      {/* Header */}
      <div className="pt-4 pb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Your Sisterhood
          </h1>
          <p className="text-muted-foreground mt-1">5 sisters in your circle</p>
        </div>
        <Button variant="gradient" size="icon">
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search your circle..."
          className="w-full h-12 pl-12 pr-4 bg-card rounded-2xl border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Members */}
      <div className="space-y-3">
        {members.map((member, index) => (
          <CircleMember key={index} {...member} />
        ))}
      </div>
    </div>
  );
};

export default CircleScreen;
