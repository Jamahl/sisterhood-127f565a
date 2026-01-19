/**
 * ============================================================================
 * useFeed Hook
 * ============================================================================
 * 
 * Manages the mood post feed, including filtering, comments, and reactions.
 * 
 * @migration-note:
 * - Replace useState with React Query for data fetching
 * - Add real-time subscriptions for live updates
 * - Implement optimistic updates for likes/comments
 */

import { useState, useCallback, useMemo } from "react";
import type { MoodPost, Comment, QuickReply } from "@/types";
import { MOOD_POSTS } from "@/data/mockData";

export interface UseFeedReturn {
  /** All posts in the feed */
  posts: MoodPost[];
  /** Get posts filtered by sisterhood */
  getPostsBySisterhood: (sisterhoodId: string | null) => MoodPost[];
  /** Add a like to a post */
  likePost: (postId: string) => void;
  /** Remove a like from a post */
  unlikePost: (postId: string) => void;
  /** Check if current user liked a post */
  isLiked: (postId: string) => boolean;
  /** Add a comment to a post */
  addComment: (postId: string, text: string) => void;
  /** Get comments for a post */
  getComments: (postId: string) => Comment[];
  /** Get contextual quick replies based on mood */
  getQuickReplies: (mood: string) => QuickReply[];
  /** Currently highlighted post (for navigation) */
  highlightedPostId: string | null;
  /** Set highlighted post */
  setHighlightedPostId: (id: string | null) => void;
}

/**
 * Get contextual quick reply suggestions based on the mood
 */
function getQuickRepliesForMood(mood: string): QuickReply[] {
  const moodLower = mood.toLowerCase();
  
  // Positive moods
  if (moodLower.includes('happy') || moodLower.includes('joy') || moodLower.includes('grateful') || moodLower.includes('excited')) {
    return [
      { text: "Smashing it! 🌟", color: "bg-sage/50" },
      { text: "Love this energy ✨", color: "bg-lavender/60" },
      { text: "You're glowing! 💫", color: "bg-peach/60" },
      { text: "So proud of you 💕", color: "bg-blush-light" },
    ];
  }
  
  // Calm/peaceful moods
  if (moodLower.includes('calm') || moodLower.includes('peaceful') || moodLower.includes('relaxed') || moodLower.includes('content')) {
    return [
      { text: "Love that vibe 🌸", color: "bg-lavender/60" },
      { text: "You deserve it 💆‍♀️", color: "bg-sage/50" },
      { text: "Keep glowing ✨", color: "bg-peach/60" },
      { text: "So serene 🤍", color: "bg-secondary/60" },
    ];
  }
  
  // Productive/working hard moods
  if (moodLower.includes('productive') || moodLower.includes('focus') || moodLower.includes('crushing') || moodLower.includes('working') || moodLower.includes('motivated')) {
    return [
      { text: "Go queen! 👑", color: "bg-sage/50" },
      { text: "You're unstoppable 🔥", color: "bg-peach/60" },
      { text: "Smashing it! 💪", color: "bg-blush-light" },
      { text: "So inspiring ✨", color: "bg-lavender/60" },
    ];
  }
  
  // Tired/low energy moods
  if (moodLower.includes('tired') || moodLower.includes('exhausted') || moodLower.includes('drained') || moodLower.includes('sleepy')) {
    return [
      { text: "Rest up, babe 💤", color: "bg-lavender/60" },
      { text: "Take it easy 🫂", color: "bg-sage/50" },
      { text: "You've earned it 💕", color: "bg-blush-light" },
      { text: "Sending calm vibes 🌙", color: "bg-secondary/60" },
    ];
  }
  
  // Sad/low moods
  if (moodLower.includes('sad') || moodLower.includes('low') || moodLower.includes('down') || moodLower.includes('upset') || moodLower.includes('crying')) {
    return [
      { text: "I'm here for you 💕", color: "bg-lavender/60" },
      { text: "Sending hugs 🫂", color: "bg-sage/50" },
      { text: "You are so loved 🤍", color: "bg-secondary/60" },
      { text: "This will pass 💫", color: "bg-blush-light" },
    ];
  }
  
  // Anxious/stressed moods
  if (moodLower.includes('anxious') || moodLower.includes('stress') || moodLower.includes('worried') || moodLower.includes('overwhelmed')) {
    return [
      { text: "Breathe, babe 🌿", color: "bg-sage/50" },
      { text: "You've got this 💪", color: "bg-blush-light" },
      { text: "Here if you need me 💕", color: "bg-lavender/60" },
      { text: "One step at a time 🤍", color: "bg-secondary/60" },
    ];
  }
  
  // Default supportive replies
  return [
    { text: "Thinking of you 💭", color: "bg-lavender/60" },
    { text: "You are loved 🤍", color: "bg-secondary/60" },
    { text: "Sending love 💕", color: "bg-blush-light" },
    { text: "Here for you 🫂", color: "bg-sage/50" },
  ];
}

/**
 * Hook for managing the mood post feed
 * 
 * @example
 * ```tsx
 * const { posts, likePost, addComment, getQuickReplies } = useFeed();
 * 
 * const handleLike = (postId: string) => {
 *   likePost(postId);
 * };
 * ```
 */
export function useFeed(): UseFeedReturn {
  const [posts] = useState<MoodPost[]>(MOOD_POSTS);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [comments, setComments] = useState<Map<string, Comment[]>>(new Map());
  const [highlightedPostId, setHighlightedPostId] = useState<string | null>(null);

  const getPostsBySisterhood = useCallback((sisterhoodId: string | null): MoodPost[] => {
    if (!sisterhoodId || sisterhoodId === "all") {
      return posts;
    }
    return posts.filter(p => p.sisterhoodId === sisterhoodId);
  }, [posts]);

  const likePost = useCallback((postId: string) => {
    setLikedPosts(prev => new Set([...prev, postId]));
    // In production: Send to backend, notify post author
  }, []);

  const unlikePost = useCallback((postId: string) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      next.delete(postId);
      return next;
    });
  }, []);

  const isLiked = useCallback((postId: string): boolean => {
    return likedPosts.has(postId);
  }, [likedPosts]);

  const addComment = useCallback((postId: string, text: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      authorId: "current-user",
      authorName: "You",
      text,
      time: "Just now",
      createdAt: new Date(),
    };
    
    setComments(prev => {
      const existing = prev.get(postId) || [];
      return new Map(prev).set(postId, [...existing, newComment]);
    });
    // In production: Send to backend, notify post author
  }, []);

  const getComments = useCallback((postId: string): Comment[] => {
    return comments.get(postId) || [];
  }, [comments]);

  const getQuickReplies = useCallback((mood: string): QuickReply[] => {
    return getQuickRepliesForMood(mood);
  }, []);

  return {
    posts,
    getPostsBySisterhood,
    likePost,
    unlikePost,
    isLiked,
    addComment,
    getComments,
    getQuickReplies,
    highlightedPostId,
    setHighlightedPostId,
  };
}

export default useFeed;
