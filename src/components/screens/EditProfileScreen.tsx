import { useState, useRef } from "react";
import { ArrowLeft, Camera, Check, Cake, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface EditProfileScreenProps {
  onBack: () => void;
}

const EditProfileScreen = ({ onBack }: EditProfileScreenProps) => {
  const [profile, setProfile] = useState({
    name: "Xen Rodriguez",
    username: "xen_sisterhood",
    bio: "Living my best life with my sisters 💕",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    birthday: undefined as Date | undefined,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a local URL for preview
      const imageUrl = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, avatar: imageUrl }));
      toast({
        title: "Photo updated! 📸",
        description: "Your new profile photo looks great",
      });
    }
  };

  const handleSave = () => {
    toast({
      title: "Profile saved ✨",
      description: "Your profile has been updated",
    });
    onBack();
  };

  return (
    <div className="px-5 pb-24 h-full overflow-y-auto">
      {/* Header */}
      <div className="pt-4 pb-6 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-serif text-xl font-bold text-foreground">Edit Profile</h1>
          <p className="text-sm text-muted-foreground">Update your info</p>
        </div>
        <Button variant="soft" size="sm" onClick={handleSave}>
          <Check className="w-4 h-4 mr-1" />
          Save
        </Button>
      </div>

      {/* Profile Photo */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img 
            src={profile.avatar}
            alt="Profile"
            className="w-28 h-28 rounded-3xl object-cover border-4 border-blush-light"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-2 -right-2 p-3 bg-primary rounded-xl text-primary-foreground shadow-soft hover:scale-105 transition-transform"
          >
            <Camera className="w-5 h-5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoSelect}
            className="hidden"
          />
        </div>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="text-sm text-primary mt-3 font-medium"
        >
          Change Photo
        </button>
      </div>

      {/* Form Fields */}
      <div className="bg-card rounded-2xl p-5 shadow-card space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Display Name
          </label>
          <Input
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="rounded-xl"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Username
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
            <Input
              value={profile.username}
              onChange={(e) => setProfile({ ...profile, username: e.target.value.replace(/\s/g, '_') })}
              className="rounded-xl pl-8"
              placeholder="username"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Bio
          </label>
          <Input
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value.slice(0, 100) })}
            className="rounded-xl"
            placeholder="Tell your sisters about yourself"
          />
          <p className="text-xs text-muted-foreground text-right mt-1">
            {profile.bio.length}/100
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Cake className="w-4 h-4 text-primary" />
            Birthday
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal rounded-xl",
                  !profile.birthday && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {profile.birthday ? format(profile.birthday, "MMMM d") : "Select your birthday"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={profile.birthday}
                onSelect={(date) => setProfile({ ...profile, birthday: date })}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          <p className="text-xs text-muted-foreground mt-1">
            Your sisters will be notified to send birthday wishes 🎂
          </p>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-6">
        <p className="text-sm font-medium text-muted-foreground mb-3">Preview</p>
        <div className="bg-card rounded-2xl p-4 shadow-soft flex items-center gap-4">
          <img 
            src={profile.avatar}
            alt="Preview"
            className="w-14 h-14 rounded-2xl object-cover border-2 border-blush-light"
          />
          <div>
            <h3 className="font-bold text-foreground">{profile.name || "Your Name"}</h3>
            <p className="text-sm text-muted-foreground">@{profile.username || "username"}</p>
            {profile.bio && (
              <p className="text-xs text-muted-foreground mt-1">{profile.bio}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileScreen;
