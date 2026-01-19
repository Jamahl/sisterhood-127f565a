/**
 * ============================================================================
 * SISTERHOOD APP - MOCK DATA
 * ============================================================================
 * 
 * This file contains all mock/seed data for development and testing.
 * In production, this data would come from a database (e.g., Supabase).
 * 
 * @migration-note: Replace with API calls or local storage in React Native
 */

import type { 
  UserProfile, 
  Sister, 
  Sisterhood, 
  MoodPost, 
  Notification,
  WishlistItem,
  NotificationSettings,
  PrivacySettings
} from "@/types";

// ============================================================================
// CURRENT USER
// ============================================================================

/**
 * The currently logged-in user's profile
 * @migration-note: Replace with auth context/async storage
 */
export const CURRENT_USER: UserProfile = {
  id: "current-user",
  name: "Xen Rodriguez",
  displayName: "Xen",
  username: "xen_sisterhood",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
  mood: { emoji: "😊", label: "Happy", color: "bg-sage" },
  cycleDay: 14,
  birthday: new Date(1996, 5, 15),
  address: null,
  createdAt: new Date(2024, 0, 1),
};

// ============================================================================
// DEFAULT SETTINGS
// ============================================================================

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  moodUpdates: true,
  comments: true,
  loveReactions: true,
  birthdayReminders: true,
  cycleReminders: true,
};

export const DEFAULT_PRIVACY_SETTINGS: PrivacySettings = {
  showCycleDay: true,
  showBirthday: true,
  allowGiftSuggestions: true,
};

// ============================================================================
// SISTERHOODS
// ============================================================================

export const SISTERHOODS: Sisterhood[] = [
  { 
    id: "crimson-wave", 
    name: "Crimson Wave", 
    memberCount: 4, 
    emoji: "🌊",
    isAdmin: true,
    createdAt: new Date(2024, 0, 15),
  },
  { 
    id: "mcmurrans", 
    name: "McMurran's", 
    memberCount: 3, 
    emoji: "🍀",
    isAdmin: false,
    createdAt: new Date(2024, 2, 1),
  },
];

// ============================================================================
// SISTERS (FRIENDS)
// ============================================================================

export const SISTERS: Sister[] = [
  { 
    id: "1", 
    name: "Sarah Johnson", 
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop", 
    status: "Feeling low today", 
    cycleDay: "2", 
    isAdmin: true, 
    birthday: new Date(1995, 0, 25),
    sisterhoodIds: ["crimson-wave"],
  },
  { 
    id: "2", 
    name: "Emma Wilson", 
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop", 
    status: "Grateful and happy", 
    cycleDay: "14", 
    birthday: new Date(1993, 1, 14),
    sisterhoodIds: ["crimson-wave"],
  },
  { 
    id: "3", 
    name: "Maya Chen", 
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop", 
    status: "Taking it easy", 
    cycleDay: "1", 
    birthday: new Date(1997, 6, 8),
    sisterhoodIds: ["crimson-wave", "mcmurrans"],
  },
  { 
    id: "4", 
    name: "Olivia Davis", 
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop", 
    status: "Crushing it at work!", 
    cycleDay: "22", 
    isAdmin: true, 
    birthday: new Date(1994, 3, 22),
    sisterhoodIds: ["mcmurrans"],
  },
  { 
    id: "5", 
    name: "Mom", 
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop", 
    status: "Always here for you", 
    birthday: new Date(1965, 8, 10),
    sisterhoodIds: ["mcmurrans"],
  },
];

// ============================================================================
// MOOD POSTS (FEED)
// ============================================================================

export const MOOD_POSTS: MoodPost[] = [
  {
    id: "1",
    userId: "1",
    name: "Sarah",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    mood: "Feeling low today",
    moodEmoji: "😔",
    cycleDay: "Day 2",
    message: "Could really use some chocolate and a good movie recommendation 🍫",
    time: "2h ago",
    sisterhoodId: "crimson-wave",
    sisterhoodName: "Crimson Wave",
    createdAt: new Date(),
  },
  {
    id: "2",
    userId: "2",
    name: "Emma",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    mood: "Grateful",
    moodEmoji: "🤗",
    cycleDay: "Day 14",
    message: "Thank you all for the love yesterday! You're the best sisters 💕",
    time: "4h ago",
    sisterhoodId: "crimson-wave",
    sisterhoodName: "Crimson Wave",
    createdAt: new Date(),
  },
  {
    id: "3",
    userId: "3",
    name: "Maya",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    mood: "Tired but pushing through",
    moodEmoji: "🥱",
    cycleDay: "Day 1",
    message: "First day is always the hardest. Sending love to everyone going through it 🫶",
    time: "5h ago",
    sisterhoodId: "mcmurrans",
    sisterhoodName: "McMurran's",
    createdAt: new Date(),
  },
  {
    id: "4",
    userId: "4",
    name: "Lily",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop",
    mood: "Happy",
    moodEmoji: "😊",
    cycleDay: "Day 20",
    message: "Just booked our girls weekend trip! Can't wait 🎉",
    time: "6h ago",
    sisterhoodId: "crimson-wave",
    sisterhoodName: "Crimson Wave",
    createdAt: new Date(),
  },
  {
    id: "5",
    userId: "5",
    name: "Ava",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
    mood: "Calm",
    moodEmoji: "😌",
    cycleDay: "Day 18",
    message: "Morning yoga really helped today 🧘‍♀️",
    time: "8h ago",
    sisterhoodId: "mcmurrans",
    sisterhoodName: "McMurran's",
    createdAt: new Date(),
  },
];

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "love",
    fromUser: "Sarah",
    fromAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    targetPostId: "1",
    targetUser: "you",
    message: "sent you love 💕",
    time: "5 min ago",
    read: false,
    createdAt: new Date(),
  },
  {
    id: "2",
    type: "comment",
    fromUser: "Emma",
    fromAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    targetPostId: "2",
    targetUser: "you",
    message: "commented: \"You've got this! 💪\"",
    time: "15 min ago",
    read: false,
    createdAt: new Date(),
  },
  {
    id: "3",
    type: "mood_update",
    fromUser: "Maya",
    fromAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    targetPostId: "3",
    message: "updated their mood to 😔 Feeling low today",
    time: "1h ago",
    read: true,
    createdAt: new Date(),
  },
  {
    id: "4",
    type: "comment",
    fromUser: "Lily",
    fromAvatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop",
    targetPostId: "4",
    message: "commented on Sarah's post: \"We're here for you! 🫶\"",
    time: "2h ago",
    read: true,
    createdAt: new Date(),
  },
];

// ============================================================================
// WISHLIST
// ============================================================================

export const INITIAL_WISHLIST: WishlistItem[] = [
  {
    id: "1",
    userId: "current-user",
    name: "Cozy throw blanket",
    link: "https://example.com/blanket",
    price: 49.99,
    notes: "Any neutral color works!",
    createdAt: new Date(),
  },
  {
    id: "2",
    userId: "current-user",
    name: "Lavender candle set",
    price: 25.00,
    createdAt: new Date(),
  },
];

// ============================================================================
// EMOJI OPTIONS
// ============================================================================

export const EMOJI_OPTIONS = ["💕", "🌊", "🍀", "✨", "🌸", "💜", "🦋", "🌙", "☀️", "🌈"];
