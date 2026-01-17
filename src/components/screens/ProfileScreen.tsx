import { useState } from "react";
import { Edit2, Gift, Heart, Calendar, ChevronRight, Droplets, MapPin, Bell, Lock } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import CycleTracker from "../CycleTracker";
import WishlistScreen from "./WishlistScreen";
import AddressScreen from "./AddressScreen";
import NotificationSettingsScreen from "./NotificationSettingsScreen";
import PrivacyScreen from "./PrivacyScreen";
import EditProfileScreen from "./EditProfileScreen";

type SubScreen = null | "wishlist" | "address" | "notifications" | "privacy" | "editProfile";

const ProfileScreen = () => {
  const [cycleDrawerOpen, setCycleDrawerOpen] = useState(false);
  const [activeSubScreen, setActiveSubScreen] = useState<SubScreen>(null);

  const stats = [
    { icon: Heart, label: "Love Sent", value: "128" },
    { icon: Gift, label: "Gifts Given", value: "12" },
    { icon: Calendar, label: "Days Tracked", value: "89" },
  ];

  const menuItems = [
    { label: "My Gift Wishlist", icon: Gift, action: () => setActiveSubScreen("wishlist") },
    { label: "Cycle Settings", icon: Droplets, action: () => setCycleDrawerOpen(true) },
    { label: "My Address", icon: MapPin, action: () => setActiveSubScreen("address") },
    { label: "Notification Preferences", icon: Bell, action: () => setActiveSubScreen("notifications") },
    { label: "Privacy & Sharing", icon: Lock, action: () => setActiveSubScreen("privacy") },
  ];

  // Render sub-screens
  if (activeSubScreen === "wishlist") {
    return <WishlistScreen onBack={() => setActiveSubScreen(null)} />;
  }
  if (activeSubScreen === "address") {
    return <AddressScreen onBack={() => setActiveSubScreen(null)} />;
  }
  if (activeSubScreen === "notifications") {
    return <NotificationSettingsScreen onBack={() => setActiveSubScreen(null)} />;
  }
  if (activeSubScreen === "privacy") {
    return <PrivacyScreen onBack={() => setActiveSubScreen(null)} />;
  }
  if (activeSubScreen === "editProfile") {
    return <EditProfileScreen onBack={() => setActiveSubScreen(null)} />;
  }

  return (
    <div className="px-5 pb-24">
      {/* Profile Card */}
      <div className="bg-card rounded-3xl p-6 shadow-card text-center mb-6">
        <div className="relative inline-block">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop"
            alt="Profile"
            className="w-24 h-24 rounded-3xl object-cover border-4 border-blush-light mx-auto"
          />
          <button 
            onClick={() => setActiveSubScreen("editProfile")}
            className="absolute -bottom-1 -right-1 p-2 bg-primary rounded-xl text-primary-foreground shadow-soft"
          >
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
      <button 
        onClick={() => setCycleDrawerOpen(true)}
        className="w-full bg-gradient-to-r from-rose/20 to-blush-light p-4 rounded-2xl mb-6 text-left shadow-soft hover:shadow-card transition-shadow"
      >
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

      {/* Cycle Tracker Drawer */}
      <Drawer open={cycleDrawerOpen} onOpenChange={setCycleDrawerOpen}>
        <DrawerContent className="rounded-t-3xl" style={{ position: "absolute" }}>
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-rose" />
              Cycle Tracker
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6">
            <CycleTracker onClose={() => setCycleDrawerOpen(false)} />
          </div>
        </DrawerContent>
      </Drawer>

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
