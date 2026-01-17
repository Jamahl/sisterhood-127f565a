import { ArrowLeft, Eye, EyeOff, Users, Droplets, MapPin, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface PrivacyScreenProps {
  onBack: () => void;
}

const PrivacyScreen = ({ onBack }: PrivacyScreenProps) => {
  const [settings, setSettings] = useState({
    showMoodToSisters: true,
    showCycleDay: false,
    shareAddress: true,
    allowLoveNotifications: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: "Privacy updated",
      description: "Your sharing preferences have been saved",
    });
  };

  const privacyOptions = [
    { 
      key: "showMoodToSisters" as const, 
      icon: Heart, 
      label: "Share Mood Updates", 
      description: "Let sisters see your mood status",
      enabled: settings.showMoodToSisters
    },
    { 
      key: "showCycleDay" as const, 
      icon: Droplets, 
      label: "Show Cycle Day", 
      description: "Display your cycle day to sisters",
      enabled: settings.showCycleDay
    },
    { 
      key: "shareAddress" as const, 
      icon: MapPin, 
      label: "Share Address for Gifts", 
      description: "Allow sisters to send care packages",
      enabled: settings.shareAddress
    },
    { 
      key: "allowLoveNotifications" as const, 
      icon: Users, 
      label: "Receive Love", 
      description: "Let sisters send you love and support",
      enabled: settings.allowLoveNotifications
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
          <h1 className="font-serif text-xl font-bold text-foreground">Privacy & Sharing</h1>
          <p className="text-sm text-muted-foreground">Control what sisters see</p>
        </div>
      </div>

      {/* Privacy Options */}
      <div className="bg-card rounded-2xl overflow-hidden shadow-card mb-4">
        {privacyOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <div
              key={option.key}
              className={`flex items-center gap-4 p-4 ${
                index !== privacyOptions.length - 1 ? "border-b border-border/50" : ""
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

      {/* Important Notice */}
      <div className="bg-lavender/30 rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <EyeOff className="w-4 h-4 text-foreground" />
          <span className="font-medium text-foreground text-sm">Cycle History is Private</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Your cycle history and predictions are always private. Sisters can only see your current cycle day if you enable it above.
        </p>
      </div>

      {/* Data Notice */}
      <div className="bg-sage/30 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Eye className="w-4 h-4 text-foreground" />
          <span className="font-medium text-foreground text-sm">Your Data</span>
        </div>
        <p className="text-sm text-muted-foreground">
          All your data is encrypted and stored securely. We never share your information with third parties.
        </p>
      </div>
    </div>
  );
};

export default PrivacyScreen;
