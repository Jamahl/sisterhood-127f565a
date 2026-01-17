import { ArrowLeft, Bell, Heart, Gift, MessageCircle, Droplets, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface NotificationSettingsScreenProps {
  onBack: () => void;
}

const NotificationSettingsScreen = ({ onBack }: NotificationSettingsScreenProps) => {
  const [settings, setSettings] = useState({
    moodUpdates: true,
    loveSent: true,
    comments: true,
    giftReminders: true,
    cycleReminders: false,
    newSisters: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: "Settings updated",
      description: "Your notification preferences have been saved",
    });
  };

  const notificationOptions = [
    { 
      key: "moodUpdates" as const, 
      icon: Heart, 
      label: "Mood Updates", 
      description: "When sisters share their mood" 
    },
    { 
      key: "loveSent" as const, 
      icon: Heart, 
      label: "Love Received", 
      description: "When someone sends you love" 
    },
    { 
      key: "comments" as const, 
      icon: MessageCircle, 
      label: "Comments", 
      description: "When sisters comment on your updates" 
    },
    { 
      key: "giftReminders" as const, 
      icon: Gift, 
      label: "Gift Reminders", 
      description: "Care package opportunities" 
    },
    { 
      key: "cycleReminders" as const, 
      icon: Droplets, 
      label: "Cycle Reminders", 
      description: "Your upcoming period predictions" 
    },
    { 
      key: "newSisters" as const, 
      icon: Users, 
      label: "New Sisters", 
      description: "When someone joins your sisterhood" 
    },
  ];

  return (
    <div className="px-5 pb-24 h-full overflow-y-auto">
      {/* Header */}
      <div className="pt-4 pb-6 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-serif text-xl font-bold text-foreground">Notifications</h1>
          <p className="text-sm text-muted-foreground">Manage your alerts</p>
        </div>
      </div>

      {/* Notification Options */}
      <div className="bg-card rounded-2xl overflow-hidden shadow-card">
        {notificationOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <div
              key={option.key}
              className={`flex items-center gap-4 p-4 ${
                index !== notificationOptions.length - 1 ? "border-b border-border/50" : ""
              }`}
            >
              <div className="p-2 bg-blush-light rounded-xl">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{option.label}</h3>
                <p className="text-xs text-muted-foreground">{option.description}</p>
              </div>
              <Switch
                checked={settings[option.key]}
                onCheckedChange={() => handleToggle(option.key)}
              />
            </div>
          );
        })}
      </div>

      {/* Push Notifications Notice */}
      <div className="bg-sage/30 rounded-2xl p-4 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <Bell className="w-4 h-4 text-foreground" />
          <span className="font-medium text-foreground text-sm">Push Notifications</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Make sure push notifications are enabled in your device settings to receive alerts.
        </p>
      </div>
    </div>
  );
};

export default NotificationSettingsScreen;
