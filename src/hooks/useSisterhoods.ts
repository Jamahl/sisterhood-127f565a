/**
 * ============================================================================
 * useSisterhoods Hook
 * ============================================================================
 * 
 * Manages sisterhoods (groups) and their members.
 * 
 * @migration-note:
 * - Replace useState with React Query + Supabase for real data
 * - Use AsyncStorage for offline caching
 * - Add optimistic updates for better UX
 */

import { useState, useCallback, useMemo } from "react";
import type { Sisterhood, Sister } from "@/types";
import { SISTERHOODS, SISTERS } from "@/data/mockData";
import { differenceInDays } from "date-fns";

export interface UseSisterhoodsReturn {
  /** All sisterhoods the user belongs to */
  sisterhoods: Sisterhood[];
  /** All sisters across all sisterhoods */
  allSisters: Sister[];
  /** Get sisters for a specific sisterhood */
  getSistersForSisterhood: (sisterhoodId: string) => Sister[];
  /** Create a new sisterhood */
  createSisterhood: (name: string, emoji: string) => Sisterhood;
  /** Add a sister to a sisterhood */
  addSister: (sisterhoodId: string, sisterId: string) => void;
  /** Remove a sister from a sisterhood */
  removeSister: (sisterhoodId: string, sisterId: string) => void;
  /** Toggle admin status for a sister */
  toggleAdmin: (sisterhoodId: string, sisterId: string) => void;
  /** Get upcoming birthdays (next 30 days) */
  upcomingBirthdays: (Sister & { daysUntil: number })[];
}

/**
 * Hook for managing sisterhoods and members
 * 
 * @example
 * ```tsx
 * const { sisterhoods, createSisterhood, upcomingBirthdays } = useSisterhoods();
 * 
 * const handleCreate = () => {
 *   const newSisterhood = createSisterhood("College Friends", "🎓");
 * };
 * ```
 */
export function useSisterhoods(): UseSisterhoodsReturn {
  const [sisterhoods, setSisterhoods] = useState<Sisterhood[]>(SISTERHOODS);
  const [sisters, setSisters] = useState<Sister[]>(SISTERS);

  const getSistersForSisterhood = useCallback((sisterhoodId: string): Sister[] => {
    return sisters.filter(s => s.sisterhoodIds.includes(sisterhoodId));
  }, [sisters]);

  const createSisterhood = useCallback((name: string, emoji: string): Sisterhood => {
    const newSisterhood: Sisterhood = {
      id: `sisterhood-${Date.now()}`,
      name,
      emoji,
      memberCount: 0,
      isAdmin: true,
      createdAt: new Date(),
    };
    
    setSisterhoods(prev => [...prev, newSisterhood]);
    return newSisterhood;
  }, []);

  const addSister = useCallback((sisterhoodId: string, sisterId: string) => {
    setSisters(prev => prev.map(sister => 
      sister.id === sisterId
        ? { ...sister, sisterhoodIds: [...sister.sisterhoodIds, sisterhoodId] }
        : sister
    ));
    
    setSisterhoods(prev => prev.map(s => 
      s.id === sisterhoodId
        ? { ...s, memberCount: s.memberCount + 1 }
        : s
    ));
  }, []);

  const removeSister = useCallback((sisterhoodId: string, sisterId: string) => {
    setSisters(prev => prev.map(sister => 
      sister.id === sisterId
        ? { ...sister, sisterhoodIds: sister.sisterhoodIds.filter(id => id !== sisterhoodId) }
        : sister
    ));
    
    setSisterhoods(prev => prev.map(s => 
      s.id === sisterhoodId
        ? { ...s, memberCount: Math.max(0, s.memberCount - 1) }
        : s
    ));
  }, []);

  const toggleAdmin = useCallback((sisterhoodId: string, sisterId: string) => {
    setSisters(prev => prev.map(sister => 
      sister.id === sisterId && sister.sisterhoodIds.includes(sisterhoodId)
        ? { ...sister, isAdmin: !sister.isAdmin }
        : sister
    ));
  }, []);

  // Calculate upcoming birthdays (next 30 days)
  const upcomingBirthdays = useMemo(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    return sisters
      .filter(sister => sister.birthday)
      .map(sister => {
        const birthday = sister.birthday!;
        const thisYearBirthday = new Date(currentYear, birthday.getMonth(), birthday.getDate());
        const nextYearBirthday = new Date(currentYear + 1, birthday.getMonth(), birthday.getDate());
        
        const upcomingBirthday = thisYearBirthday >= today ? thisYearBirthday : nextYearBirthday;
        const daysUntil = differenceInDays(upcomingBirthday, today);
        
        return { ...sister, daysUntil };
      })
      .filter(sister => sister.daysUntil <= 30 && sister.daysUntil >= 0)
      .sort((a, b) => a.daysUntil - b.daysUntil);
  }, [sisters]);

  return {
    sisterhoods,
    allSisters: sisters,
    getSistersForSisterhood,
    createSisterhood,
    addSister,
    removeSister,
    toggleAdmin,
    upcomingBirthdays,
  };
}

export default useSisterhoods;
