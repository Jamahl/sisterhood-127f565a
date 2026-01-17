import { useState } from "react";
import { Plus, Search, MoreVertical, Link2, MessageCircle, Phone, UserPlus, UserMinus, Crown, X, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import CircleMember from "../CircleMember";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Sister {
  id: string;
  name: string;
  avatar: string;
  status: string;
  cycleDay?: string;
  isAdmin?: boolean;
}

interface Sisterhood {
  id: string;
  name: string;
  emoji: string;
  members: Sister[];
  isAdmin: boolean;
}

const SistersScreen = () => {
  const [activeSisterhood, setActiveSisterhood] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [showManageSheet, setShowManageSheet] = useState(false);
  const [newSisterhoodName, setNewSisterhoodName] = useState("");
  const [newSisterhoodEmoji, setNewSisterhoodEmoji] = useState("💕");
  const [searchQuery, setSearchQuery] = useState("");

  const [sisterhoods, setSisterhoods] = useState<Sisterhood[]>([
    {
      id: "crimson-wave",
      name: "Crimson Wave",
      emoji: "🌊",
      isAdmin: true,
      members: [
        { id: "1", name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop", status: "Feeling low today", cycleDay: "2", isAdmin: true },
        { id: "2", name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop", status: "Grateful and happy", cycleDay: "14" },
        { id: "3", name: "Maya Chen", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop", status: "Taking it easy", cycleDay: "1" },
      ]
    },
    {
      id: "mcmurrans",
      name: "McMurran's",
      emoji: "🍀",
      isAdmin: false,
      members: [
        { id: "4", name: "Olivia Davis", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop", status: "Crushing it at work!", cycleDay: "22", isAdmin: true },
        { id: "5", name: "Mom", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop", status: "Always here for you" },
      ]
    }
  ]);

  const allMembers: Sister[] = [
    { id: "1", name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop", status: "Feeling low today", cycleDay: "2" },
    { id: "2", name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop", status: "Grateful and happy", cycleDay: "14" },
    { id: "3", name: "Maya Chen", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop", status: "Taking it easy", cycleDay: "1" },
    { id: "4", name: "Olivia Davis", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop", status: "Crushing it at work!", cycleDay: "22" },
    { id: "5", name: "Mom", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop", status: "Always here for you" },
  ];

  const selectedSisterhood = sisterhoods.find(s => s.id === activeSisterhood);

  const filteredMembers = activeSisterhood 
    ? selectedSisterhood?.members.filter(m => 
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []
    : allMembers.filter(m => 
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleCreateSisterhood = () => {
    if (!newSisterhoodName.trim()) return;
    
    const newSisterhood: Sisterhood = {
      id: `sisterhood-${Date.now()}`,
      name: newSisterhoodName,
      emoji: newSisterhoodEmoji,
      members: [],
      isAdmin: true,
    };
    
    setSisterhoods([...sisterhoods, newSisterhood]);
    setNewSisterhoodName("");
    setNewSisterhoodEmoji("💕");
    setShowCreateDialog(false);
    setActiveSisterhood(newSisterhood.id);
    setShowInviteDialog(true);
    
    toast({
      title: `${newSisterhoodEmoji} ${newSisterhoodName} created!`,
      description: "Now invite your sisters to join",
    });
  };

  const handleCopyLink = () => {
    const inviteLink = `https://sisterhood.app/invite/${selectedSisterhood?.id || "new"}`;
    navigator.clipboard.writeText(inviteLink);
    toast({
      title: "Link copied!",
      description: "Share it with your sisters",
    });
  };

  const handleShareWhatsApp = () => {
    const inviteLink = `https://sisterhood.app/invite/${selectedSisterhood?.id || "new"}`;
    const message = `Join my Sisterhood "${selectedSisterhood?.name || newSisterhoodName}" on the Sisterhood app! ${inviteLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleShareSMS = () => {
    const inviteLink = `https://sisterhood.app/invite/${selectedSisterhood?.id || "new"}`;
    const message = `Join my Sisterhood "${selectedSisterhood?.name || newSisterhoodName}"! ${inviteLink}`;
    window.open(`sms:?body=${encodeURIComponent(message)}`, "_blank");
  };

  const handleRemoveSister = (sisterId: string) => {
    if (!activeSisterhood || !selectedSisterhood?.isAdmin) return;
    
    setSisterhoods(sisterhoods.map(s => 
      s.id === activeSisterhood 
        ? { ...s, members: s.members.filter(m => m.id !== sisterId) }
        : s
    ));
    
    toast({
      title: "Sister removed",
      description: "They can rejoin with an invite link",
    });
  };

  const handleMakeAdmin = (sisterId: string) => {
    if (!activeSisterhood || !selectedSisterhood?.isAdmin) return;
    
    setSisterhoods(sisterhoods.map(s => 
      s.id === activeSisterhood 
        ? { 
            ...s, 
            members: s.members.map(m => 
              m.id === sisterId ? { ...m, isAdmin: !m.isAdmin } : m
            )
          }
        : s
    ));
    
    toast({
      title: "Admin updated",
    });
  };

  const emojiOptions = ["💕", "🌊", "🍀", "✨", "🌸", "💜", "🦋", "🌙", "☀️", "🌈"];

  return (
    <div className="px-5 pb-24">
      {/* Header */}
      <div className="pt-4 pb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">
            {activeSisterhood ? selectedSisterhood?.name : "Your Sisters"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {activeSisterhood 
              ? `${selectedSisterhood?.members.length} sisters`
              : `${sisterhoods.length} sisterhoods • ${allMembers.length} sisters`}
          </p>
        </div>
        <div className="flex gap-2">
          {activeSisterhood && selectedSisterhood?.isAdmin && (
            <Sheet open={showManageSheet} onOpenChange={setShowManageSheet}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-3xl">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <span>{selectedSisterhood.emoji}</span>
                    Manage {selectedSisterhood.name}
                  </SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-3">
                  <button 
                    onClick={() => {
                      setShowManageSheet(false);
                      setShowInviteDialog(true);
                    }}
                    className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl hover:bg-muted/50 transition-colors"
                  >
                    <div className="p-2 bg-blush-light rounded-xl">
                      <UserPlus className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium">Add Sisters</span>
                    <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground" />
                  </button>
                  
                  <div className="bg-card rounded-2xl overflow-hidden">
                    <p className="px-4 pt-3 pb-2 text-sm font-medium text-muted-foreground">Members</p>
                    {selectedSisterhood.members.map((member) => (
                      <div key={member.id} className="flex items-center gap-3 p-4 border-t border-border/50">
                        <img 
                          src={member.avatar} 
                          alt={member.name}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{member.name}</p>
                          {member.isAdmin && (
                            <span className="text-xs text-primary flex items-center gap-1">
                              <Crown className="w-3 h-3" /> Admin
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleMakeAdmin(member.id)}
                            className="text-xs"
                          >
                            <Crown className={cn("w-4 h-4", member.isAdmin && "text-primary")} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRemoveSister(member.id)}
                            className="text-xs text-destructive"
                          >
                            <UserMinus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
          <Button variant="gradient" size="icon" onClick={() => setShowCreateDialog(true)}>
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Sisterhood Tabs */}
      {!activeSisterhood && (
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {sisterhoods.map((sisterhood) => (
            <button
              key={sisterhood.id}
              onClick={() => setActiveSisterhood(sisterhood.id)}
              className="flex items-center gap-2 px-4 py-3 bg-card rounded-2xl shadow-soft hover:shadow-card transition-all whitespace-nowrap"
            >
              <span className="text-xl">{sisterhood.emoji}</span>
              <div className="text-left">
                <p className="font-medium text-foreground text-sm">{sisterhood.name}</p>
                <p className="text-xs text-muted-foreground">{sisterhood.members.length} sisters</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground ml-2" />
            </button>
          ))}
        </div>
      )}

      {/* Back button when viewing a sisterhood */}
      {activeSisterhood && (
        <button 
          onClick={() => setActiveSisterhood(null)}
          className="flex items-center gap-2 text-primary mb-4"
        >
          <X className="w-4 h-4" />
          <span className="text-sm font-medium">Back to all sisterhoods</span>
        </button>
      )}

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search your sisters..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 pl-12 pr-4 bg-card rounded-2xl border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Members */}
      <div className="space-y-3">
        {filteredMembers.map((member) => (
          <CircleMember key={member.id} {...member} />
        ))}
      </div>

      {/* Create Sisterhood Bottom Sheet */}
      <Drawer open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DrawerContent className="rounded-t-3xl">
          <DrawerHeader>
            <DrawerTitle>Create a Sisterhood</DrawerTitle>
          </DrawerHeader>

          <div className="px-4 pb-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Choose an emoji</label>
              <div className="flex flex-wrap gap-2">
                {emojiOptions.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setNewSisterhoodEmoji(emoji)}
                    className={cn(
                      "w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all",
                      newSisterhoodEmoji === emoji
                        ? "bg-primary/20 ring-2 ring-primary"
                        : "bg-muted hover:bg-muted/80",
                    )}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Sisterhood name</label>
              <input
                type="text"
                placeholder="e.g. College Besties"
                value={newSisterhoodName}
                onChange={(e) => setNewSisterhoodName(e.target.value)}
                className="w-full h-12 px-4 bg-card rounded-2xl border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <Button
              variant="gradient"
              className="w-full"
              onClick={handleCreateSisterhood}
              disabled={!newSisterhoodName.trim()}
            >
              Create Sisterhood
            </Button>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Invite Sisters Bottom Sheet */}
      <Drawer open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DrawerContent className="rounded-t-3xl">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <span>{selectedSisterhood?.emoji || newSisterhoodEmoji}</span>
              Invite Sisters
            </DrawerTitle>
          </DrawerHeader>

          <div className="px-4 pb-6 space-y-3">
            <p className="text-sm text-muted-foreground">Share the invite link with your sisters</p>

            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl hover:bg-muted/50 transition-colors border border-border/50"
            >
              <div className="p-2 bg-blush-light rounded-xl">
                <Link2 className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left flex-1">
                <p className="font-medium text-foreground">Copy Link</p>
                <p className="text-xs text-muted-foreground">Share anywhere</p>
              </div>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl hover:bg-muted/50 transition-colors border border-border/50"
            >
              <div className="p-2 bg-accent rounded-xl">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left flex-1">
                <p className="font-medium text-foreground">WhatsApp</p>
                <p className="text-xs text-muted-foreground">Send via WhatsApp</p>
              </div>
            </button>

            <button
              onClick={handleShareSMS}
              className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl hover:bg-muted/50 transition-colors border border-border/50"
            >
              <div className="p-2 bg-accent rounded-xl">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left flex-1">
                <p className="font-medium text-foreground">SMS</p>
                <p className="text-xs text-muted-foreground">Send via text message</p>
              </div>
            </button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SistersScreen;
