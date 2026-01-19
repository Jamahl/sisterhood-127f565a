/**
 * ============================================================================
 * useSettings Hook
 * ============================================================================
 * 
 * Manages user notification and privacy settings.
 * 
 * @migration-note:
 * - Replace useState with AsyncStorage for persistence
 * - Sync with backend for cross-device settings
 */

import { useState, useCallback } from "react";
import type { NotificationSettings, PrivacySettings } from "@/types";
import { DEFAULT_NOTIFICATION_SETTINGS, DEFAULT_PRIVACY_SETTINGS } from "@/data/mockData";

export interface UseSettingsReturn {
  /** Notification preferences */
  notificationSettings: NotificationSettings;
  /** Privacy preferences */
  privacySettings: PrivacySettings;
  /** Update a single notification setting */
  updateNotificationSetting: <K extends keyof NotificationSettings>(
    key: K, 
    value: NotificationSettings[K]
  ) => void;
  /** Update a single privacy setting */
  updatePrivacySetting: <K extends keyof PrivacySettings>(
    key: K, 
    value: PrivacySettings[K]
  ) => void;
  /** Reset all settings to defaults */
  resetToDefaults: () => void;
}

/**
 * Hook for managing user settings
 * 
 * @example
 * ```tsx
 * const { notificationSettings, updateNotificationSetting } = useSettings();
 * 
 * const toggleBirthdayReminders = () => {
 *   updateNotificationSetting('birthdayReminders', !notificationSettings.birthdayReminders);
 * };
 * ```
 */
export function useSettings(): UseSettingsReturn {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(
    DEFAULT_NOTIFICATION_SETTINGS
  );
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>(
    DEFAULT_PRIVACY_SETTINGS
  );

  const updateNotificationSetting = useCallback(<K extends keyof NotificationSettings>(
    key: K, 
    value: NotificationSettings[K]
  ) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
    // In production: Save to AsyncStorage, sync with backend
  }, []);

  const updatePrivacySetting = useCallback(<K extends keyof PrivacySettings>(
    key: K, 
    value: PrivacySettings[K]
  ) => {
    setPrivacySettings(prev => ({ ...prev, [key]: value }));
    // In production: Save to AsyncStorage, sync with backend
  }, []);

  const resetToDefaults = useCallback(() => {
    setNotificationSettings(DEFAULT_NOTIFICATION_SETTINGS);
    setPrivacySettings(DEFAULT_PRIVACY_SETTINGS);
  }, []);

  return {
    notificationSettings,
    privacySettings,
    updateNotificationSetting,
    updatePrivacySetting,
    resetToDefaults,
  };
}

export default useSettings;
