/**
 * ============================================================================
 * SISTERHOOD APP - TYPE DEFINITIONS
 * ============================================================================
 * 
 * This file contains all TypeScript interfaces and types used throughout
 * the application. These types are platform-agnostic and can be used
 * directly in a React Native/Expo migration.
 * 
 * @migration-note: All types here are ready for React Native - no changes needed
 */

// ============================================================================
// USER TYPES
// ============================================================================

/**
 * Represents the current authenticated user's profile
 */
export interface UserProfile {
  id: string;
  name: string;
  displayName: string;
  username: string;
  avatar: string;
  mood: Mood | null;
  cycleDay: number | null;
  birthday: Date | null;
  address: Address | null;
  createdAt: Date;
}

/**
 * User's physical address for gift delivery
 */
export interface Address {
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// ============================================================================
// MOOD TYPES
// ============================================================================

/**
 * Available mood options with visual properties
 */
export interface Mood {
  emoji: string;
  label: string;
  /** Tailwind color class - replace with StyleSheet color for RN */
  color: string;
}

/**
 * Predefined mood options
 */
export const MOOD_OPTIONS: Mood[] = [
  { emoji: "😊", label: "Happy", color: "bg-sage" },
  { emoji: "😌", label: "Calm", color: "bg-lavender" },
  { emoji: "😔", label: "Low", color: "bg-secondary" },
  { emoji: "😤", label: "Moody", color: "bg-coral/30" },
  { emoji: "🥱", label: "Tired", color: "bg-muted" },
  { emoji: "🤗", label: "Grateful", color: "bg-peach" },
  { emoji: "😢", label: "Emotional", color: "bg-lavender-dark/30" },
  { emoji: "💪", label: "Strong", color: "bg-blush-light" },
];

/**
 * Contextual quick reply suggestion based on mood
 */
export interface QuickReply {
  text: string;
  /** Tailwind color class - replace with StyleSheet color for RN */
  color: string;
}

// ============================================================================
// SISTERHOOD TYPES
// ============================================================================

/**
 * A group of sisters (friends) that share updates with each other
 */
export interface Sisterhood {
  id: string;
  name: string;
  emoji: string;
  memberCount: number;
  isAdmin: boolean;
  createdAt: Date;
}

/**
 * A member of a sisterhood
 */
export interface Sister {
  id: string;
  name: string;
  avatar: string;
  status: string;
  cycleDay?: string;
  isAdmin?: boolean;
  birthday?: Date;
  sisterhoodIds: string[];
}

// ============================================================================
// POST/FEED TYPES
// ============================================================================

/**
 * A mood update post in the feed
 */
export interface MoodPost {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  mood: string;
  moodEmoji: string;
  cycleDay: string;
  message?: string;
  time: string;
  sisterhoodId: string;
  sisterhoodName: string;
  createdAt: Date;
}

/**
 * A comment on a mood post
 */
export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  text: string;
  time: string;
  createdAt: Date;
}

// ============================================================================
// NOTIFICATION TYPES
// ============================================================================

/**
 * Types of notifications that can be received
 */
export type NotificationType = "comment" | "love" | "mood_update" | "birthday";

/**
 * A notification for the user
 */
export interface Notification {
  id: string;
  type: NotificationType;
  fromUser: string;
  fromAvatar: string;
  targetPostId?: string;
  targetUser?: string;
  message: string;
  time: string;
  read: boolean;
  createdAt: Date;
}

// ============================================================================
// WISHLIST TYPES
// ============================================================================

/**
 * A gift item on a user's wishlist
 */
export interface WishlistItem {
  id: string;
  userId: string;
  name: string;
  link?: string;
  price?: number;
  notes?: string;
  createdAt: Date;
}

// ============================================================================
// SETTINGS TYPES
// ============================================================================

/**
 * User notification preferences
 */
export interface NotificationSettings {
  moodUpdates: boolean;
  comments: boolean;
  loveReactions: boolean;
  birthdayReminders: boolean;
  cycleReminders: boolean;
}

/**
 * User privacy settings
 */
export interface PrivacySettings {
  showCycleDay: boolean;
  showBirthday: boolean;
  allowGiftSuggestions: boolean;
}

// ============================================================================
// NAVIGATION TYPES
// ============================================================================

/**
 * Main tab navigation options
 * @migration-note: Map to React Navigation tab names
 */
export type TabId = "home" | "sisters" | "gifts" | "notifications" | "profile";

/**
 * Profile sub-screen options
 * @migration-note: Map to React Navigation stack screens
 */
export type ProfileSubScreen = 
  | null 
  | "wishlist" 
  | "address" 
  | "notifications" 
  | "privacy" 
  | "editProfile";
