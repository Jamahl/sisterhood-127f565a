/**
 * ============================================================================
 * HomeScreen
 * ============================================================================
 * 
 * Main feed screen showing mood updates from sisters.
 * 
 * @migration-note:
 * - Replace div with View, span/p with Text
 * - Use FlatList for posts instead of map
 * - Replace MobileFrame wrapper with SafeAreaView
 */

import { useState, useEffect, useRef } from "react";
import MoodStatus from "../MoodStatus";
import MoodCard from "../MoodCard";
import SisterhoodTabs, { SisterhoodTab } from "../SisterhoodTabs";
import NotificationBell from "../NotificationBell";
import NotificationPanel from "../NotificationPanel";
import { useNotifications } from "@/hooks/useNotifications";
import { useUser, useSisterhoods, useFeed } from "@/hooks";
import { toast } from "@/hooks/use-toast";
import { getGreeting } from "@/utils/helpers";
import type { Sisterhood } from "@/types";

const HomeScreen = () => {
  // Hooks for data management
  const { user } = useUser();
  const { sisterhoods } = useSisterhoods();
  const { posts, getPostsBySisterhood, highlightedPostId, setHighlightedPostId } = useFeed();
  const { setSelectedPostId } = useNotifications();
  
  // Local UI state
  const [activeTab, setActiveTab] = useState("all");
  const [showNotifications, setShowNotifications] = useState(false);
  const postRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Transform sisterhoods for SisterhoodTabs component
  const sisterhoodTabs: SisterhoodTab[] = sisterhoods.map(s => ({
    id: s.id,
    name: s.name,
    memberCount: s.memberCount,
    emoji: s.emoji,
  }));

  // Get filtered posts based on active tab
  const filteredPosts = getPostsBySisterhood(activeTab === "all" ? null : activeTab);
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
            {getGreeting()}, <span className="text-gradient">{user.displayName}</span> ✨
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
        
        {filteredPosts.map((post) => (
          <div 
            key={post.id}
            ref={(el) => {
              if (el) postRefs.current.set(post.id, el);
            }}
            className={`transition-all duration-500 ${
              highlightedPostId === post.id 
                ? "ring-2 ring-primary ring-offset-2 rounded-3xl" 
                : ""
            }`}
          >
            <MoodCard 
              name={post.name}
              avatar={post.avatar}
              mood={post.mood}
              moodEmoji={post.moodEmoji}
              cycleDay={post.cycleDay}
              message={post.message}
              time={post.time}
              sisterhoodName={activeTab === "all" ? post.sisterhoodName : undefined}
            />
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No updates yet in this sisterhood</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
