/**
 * ============================================================================
 * useWishlist Hook
 * ============================================================================
 * 
 * Manages the user's gift wishlist.
 * 
 * @migration-note:
 * - Replace useState with AsyncStorage + Supabase
 * - Add sync for other users to view wishlists
 */

import { useState, useCallback } from "react";
import type { WishlistItem } from "@/types";
import { INITIAL_WISHLIST } from "@/data/mockData";

export interface UseWishlistReturn {
  /** All wishlist items */
  items: WishlistItem[];
  /** Add a new item to wishlist */
  addItem: (item: Omit<WishlistItem, "id" | "userId" | "createdAt">) => void;
  /** Update an existing item */
  updateItem: (id: string, updates: Partial<WishlistItem>) => void;
  /** Remove an item from wishlist */
  removeItem: (id: string) => void;
  /** Get total count of items */
  itemCount: number;
}

/**
 * Hook for managing gift wishlist
 * 
 * @example
 * ```tsx
 * const { items, addItem, removeItem } = useWishlist();
 * 
 * const handleAdd = () => {
 *   addItem({ name: "New book", price: 19.99 });
 * };
 * ```
 */
export function useWishlist(): UseWishlistReturn {
  const [items, setItems] = useState<WishlistItem[]>(INITIAL_WISHLIST);

  const addItem = useCallback((item: Omit<WishlistItem, "id" | "userId" | "createdAt">) => {
    const newItem: WishlistItem = {
      ...item,
      id: Date.now().toString(),
      userId: "current-user",
      createdAt: new Date(),
    };
    setItems(prev => [...prev, newItem]);
    // In production: Save to backend
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<WishlistItem>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  return {
    items,
    addItem,
    updateItem,
    removeItem,
    itemCount: items.length,
  };
}

export default useWishlist;
