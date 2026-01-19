/**
 * ============================================================================
 * useUser Hook
 * ============================================================================
 * 
 * Manages the current user's profile data and authentication state.
 * 
 * @migration-note: 
 * - Replace useState with AsyncStorage or SecureStore for persistence
 * - Connect to Supabase auth for real authentication
 * - Use React Navigation's auth flow pattern
 */

import { useState, useCallback } from "react";
import type { UserProfile, Mood, Address } from "@/types";
import { CURRENT_USER } from "@/data/mockData";

export interface UseUserReturn {
  /** Current user profile */
  user: UserProfile;
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
  /** Update user's display name */
  updateDisplayName: (name: string) => void;
  /** Update user's avatar */
  updateAvatar: (avatarUrl: string) => void;
  /** Update user's current mood */
  updateMood: (mood: Mood, comment?: string) => void;
  /** Update user's cycle day */
  updateCycleDay: (day: number) => void;
  /** Update user's birthday */
  updateBirthday: (date: Date) => void;
  /** Update user's address */
  updateAddress: (address: Address) => void;
}

/**
 * Hook for managing current user data
 * 
 * @example
 * ```tsx
 * const { user, updateMood } = useUser();
 * 
 * const handleMoodChange = (mood: Mood) => {
 *   updateMood(mood, "Feeling great today!");
 * };
 * ```
 */
export function useUser(): UseUserReturn {
  const [user, setUser] = useState<UserProfile>(CURRENT_USER);

  const updateDisplayName = useCallback((name: string) => {
    setUser(prev => ({ ...prev, displayName: name, name }));
  }, []);

  const updateAvatar = useCallback((avatarUrl: string) => {
    setUser(prev => ({ ...prev, avatar: avatarUrl }));
  }, []);

  const updateMood = useCallback((mood: Mood, _comment?: string) => {
    setUser(prev => ({ ...prev, mood }));
    // In production: Send to backend, notify sisterhoods
  }, []);

  const updateCycleDay = useCallback((day: number) => {
    setUser(prev => ({ ...prev, cycleDay: day }));
  }, []);

  const updateBirthday = useCallback((date: Date) => {
    setUser(prev => ({ ...prev, birthday: date }));
  }, []);

  const updateAddress = useCallback((address: Address) => {
    setUser(prev => ({ ...prev, address }));
  }, []);

  return {
    user,
    isAuthenticated: true, // Mock - replace with real auth check
    updateDisplayName,
    updateAvatar,
    updateMood,
    updateCycleDay,
    updateBirthday,
    updateAddress,
  };
}

export default useUser;
