import { useState } from "react";
import { Settings, Edit2, Gift, Heart, Calendar, ChevronRight, Droplets, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import CycleTracker from "../CycleTracker";

const ProfileScreen = () => {
  const [cycleDialogOpen, setCycleDialogOpen] = useState(false);

  const stats = [
    { icon: Heart, label: "Love Sent", value: "128" },
    { icon: Gift, label: "Gifts Given", value: "12" },
    { icon: Calendar, label: "Days Tracked", value: "89" },
  ];

  const menuItems = [
    { label: "My Gift Wishlist", icon: Gift },
    { label: "Cycle Settings", icon: Droplets, action: () => setCycleDialogOpen(true) },
    { label: "My Address", icon: MapPin },
    { label: "Notification Preferences", icon: Settings },
    { label: "Privacy & Sharing", icon: Settings },
  ];

  return (
    <div className="px-5 pb-24">
      {/* Header */}
      <div className="pt-4 pb-2 flex items-center justify-end">
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Profile Card */}
      <div className="bg-card rounded-3xl p-6 shadow-card text-center mb-6">
        <div className="relative inline-block">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop"
            alt="Profile"
            className="w-24 h-24 rounded-3xl object-cover border-4 border-blush-light mx-auto"
          />
          <button className="absolute -bottom-1 -right-1 p-2 bg-primary rounded-xl text-primary-foreground shadow-soft">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
        
        <h2 className="font-serif text-xl font-bold text-foreground mt-4">Xen Rodriguez</h2>
        <p className="text-muted-foreground text-sm">@xen_sisterhood</p>
        
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="text-2xl">😊</span>
          <span className="text-sm font-medium text-primary">Feeling Happy</span>
          <span className="text-xs text-muted-foreground bg-lavender/50 px-2 py-0.5 rounded-full">
            Day 14
          </span>
        </div>
      </div>

      {/* Quick Cycle Card */}
      <Dialog open={cycleDialogOpen} onOpenChange={setCycleDialogOpen}>
        <DialogTrigger asChild>
          <button className="w-full bg-gradient-to-r from-rose/20 to-blush-light p-4 rounded-2xl mb-6 text-left shadow-soft hover:shadow-card transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rose/30 rounded-xl">
                <Droplets className="w-5 h-5 text-rose" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">Cycle Tracker</h3>
                <p className="text-xs text-muted-foreground">Log your period & see predictions</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-sm mx-auto max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-rose" />
              Cycle Tracker
            </DialogTitle>
          </DialogHeader>
          <CycleTracker onClose={() => setCycleDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-card rounded-2xl p-4 text-center shadow-soft">
              <Icon className="w-6 h-6 mx-auto text-primary mb-2" />
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Menu */}
      <div className="bg-card rounded-2xl overflow-hidden shadow-soft">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={item.action}
              className={`w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors ${
                index !== menuItems.length - 1 ? "border-b border-border/50" : ""
              }`}
            >
              <div className="p-2 bg-blush-light rounded-xl">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <span className="flex-1 text-left font-medium text-foreground">{item.label}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileScreen;
