/**
 * ============================================================================
 * HOOKS INDEX
 * ============================================================================
 * 
 * Central export point for all custom hooks.
 * 
 * @migration-note: All hooks are platform-agnostic and ready for React Native
 */

// User management
export { useUser } from "./useUser";
export type { UseUserReturn } from "./useUser";

// Sisterhoods and members
export { useSisterhoods } from "./useSisterhoods";
export type { UseSisterhoodsReturn } from "./useSisterhoods";

// Feed and posts
export { useFeed } from "./useFeed";
export type { UseFeedReturn } from "./useFeed";

// Settings
export { useSettings } from "./useSettings";
export type { UseSettingsReturn } from "./useSettings";

// Wishlist
export { useWishlist } from "./useWishlist";
export type { UseWishlistReturn } from "./useWishlist";

// Notifications (existing)
export { useNotifications, NotificationProvider } from "./useNotifications";

// Utilities
export { useToast, toast } from "./use-toast";
export { useIsMobile } from "./use-mobile";
