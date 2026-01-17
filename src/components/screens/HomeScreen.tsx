import { useState, useEffect, useRef } from "react";
import MoodStatus from "../MoodStatus";
import MoodCard from "../MoodCard";
import SisterhoodTabs, { Sisterhood } from "../SisterhoodTabs";
import NotificationBell from "../NotificationBell";
import NotificationPanel from "../NotificationPanel";
import { useNotifications } from "@/hooks/useNotifications";
import { toast } from "@/hooks/use-toast";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showNotifications, setShowNotifications] = useState(false);
  const [highlightedPostId, setHighlightedPostId] = useState<string | null>(null);
  const postRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const { setSelectedPostId } = useNotifications();

  const sisterhoods: Sisterhood[] = [
    { id: "crimson-wave", name: "Crimson Wave", memberCount: 4, emoji: "🌊" },
    { id: "mcmurrans", name: "McMurran's", memberCount: 3, emoji: "🍀" },
  ];

  const allFriends = [
    {
      id: "1",
      name: "Sarah",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      mood: "Feeling low today",
      moodEmoji: "😔",
      cycleDay: "Day 2",
      message: "Could really use some chocolate and a good movie recommendation 🍫",
      time: "2h ago",
      sisterhoodId: "crimson-wave",
      sisterhoodName: "Crimson Wave"
    },
    {
      id: "2",
      name: "Emma",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      mood: "Grateful",
      moodEmoji: "🤗",
      cycleDay: "Day 14",
      message: "Thank you all for the love yesterday! You're the best sisters 💕",
      time: "4h ago",
      sisterhoodId: "crimson-wave",
      sisterhoodName: "Crimson Wave"
    },
    {
      id: "3",
      name: "Maya",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
      mood: "Tired but pushing through",
      moodEmoji: "🥱",
      cycleDay: "Day 1",
      message: "First day is always the hardest. Sending love to everyone going through it 🫶",
      time: "5h ago",
      sisterhoodId: "mcmurrans",
      sisterhoodName: "McMurran's"
    },
    {
      id: "4",
      name: "Lily",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop",
      mood: "Happy",
      moodEmoji: "😊",
      cycleDay: "Day 20",
      message: "Just booked our girls weekend trip! Can't wait 🎉",
      time: "6h ago",
      sisterhoodId: "crimson-wave",
      sisterhoodName: "Crimson Wave"
    },
    {
      id: "5",
      name: "Ava",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
      mood: "Calm",
      moodEmoji: "😌",
      cycleDay: "Day 18",
      message: "Morning yoga really helped today 🧘‍♀️",
      time: "8h ago",
      sisterhoodId: "mcmurrans",
      sisterhoodName: "McMurran's"
    },
  ];

  const filteredFriends = activeTab === "all" 
    ? allFriends 
    : allFriends.filter(f => f.sisterhoodId === activeTab);

  const activeSisterhood = sisterhoods.find(s => s.id === activeTab);

  const handleMoodShare = (mood: { emoji: string; label: string }, comment?: string) => {
    toast({
      title: `${mood.emoji} Mood shared with your sisters!`,
      description: comment || `You're feeling ${mood.label.toLowerCase()}`,
    });
  };

  const handleNotificationClick = (postId: string) => {
    setShowNotifications(false);
    setActiveTab("all"); // Show all posts to find the target
    setHighlightedPostId(postId);
    setSelectedPostId(postId);
    
    // Scroll to the post after a brief delay
    setTimeout(() => {
      const postElement = postRefs.current.get(postId);
      if (postElement) {
        postElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);

    // Clear highlight after animation
    setTimeout(() => {
      setHighlightedPostId(null);
    }, 2000);
  };

  // Clear highlight when changing tabs
  useEffect(() => {
    setHighlightedPostId(null);
  }, [activeTab]);

  if (showNotifications) {
    return (
      <NotificationPanel 
        onClose={() => setShowNotifications(false)}
        onNotificationClick={handleNotificationClick}
      />
    );
  }

  return (
    <div className="px-5 pb-24">
      {/* Header */}
      <div className="pt-4 pb-4 flex items-start justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">
            {getGreeting()}, <span className="text-gradient">Xen</span> ✨
          </h1>
          <p className="text-muted-foreground mt-1">Your sisters are thinking of you</p>
        </div>
        <NotificationBell onClick={() => setShowNotifications(true)} />
      </div>

      {/* Sisterhood Tabs */}
      <div className="mb-4">
        <SisterhoodTabs 
          sisterhoods={sisterhoods}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Mood Status */}
      <div className="mb-6">
        <MoodStatus onMoodSelect={handleMoodShare} />
      </div>

      {/* Feed */}
      <div className="space-y-4">
        <h2 className="font-serif text-lg font-semibold text-foreground">
          {activeTab === "all" 
            ? "All Sisters Updates" 
            : `${activeSisterhood?.emoji || ""} ${activeSisterhood?.name || ""} Updates`}
        </h2>
        
        {filteredFriends.map((friend) => (
          <div 
            key={friend.id}
            ref={(el) => {
              if (el) postRefs.current.set(friend.id, el);
            }}
            className={`transition-all duration-500 ${
              highlightedPostId === friend.id 
                ? "ring-2 ring-primary ring-offset-2 rounded-3xl" 
                : ""
            }`}
          >
            <MoodCard 
              {...friend} 
              sisterhoodName={activeTab === "all" ? friend.sisterhoodName : undefined}
            />
          </div>
        ))}

        {filteredFriends.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No updates yet in this sisterhood</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
