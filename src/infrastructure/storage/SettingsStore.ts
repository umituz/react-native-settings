/**
 * Settings Store - Zustand State Management
 *
 * Global settings state for app preferences
 * Manages theme, language, notifications, and privacy settings
 *
 * DDD ARCHITECTURE: Uses @umituz/react-native-storage for all storage operations
 * - Type-safe storage with StorageKey enum
 * - Result pattern for error handling
 * - Single source of truth for all storage
 */

import { create } from 'zustand';
import { storageRepository, StorageKey, createUserKey, unwrap } from '@umituz/react-native-storage';
import type { UserSettings } from '../../domain/repositories/ISettingsRepository';

interface SettingsStore {
  // State
  settings: UserSettings | null;
  loading: boolean;
  error: string | null;

  // Actions
  loadSettings: (userId: string) => Promise<void>;
  updateSettings: (updates: Partial<UserSettings>) => Promise<void>;
  resetSettings: (userId: string) => Promise<void>;
  clearError: () => void;
}

const DEFAULT_OFFLINE_USER_ID = 'offline_user';

const DEFAULT_SETTINGS_CACHE = new Map<string, UserSettings>();

const getDefaultSettings = (userId: string): UserSettings => {
  if (DEFAULT_SETTINGS_CACHE.has(userId)) {
    return DEFAULT_SETTINGS_CACHE.get(userId)!;
  }

  const settings = {
    userId,
    theme: 'auto' as const,
    language: 'en-US',
    notificationsEnabled: true,
    emailNotifications: true,
    pushNotifications: true,
    soundEnabled: true,
    vibrationEnabled: true,
    privacyMode: false,
    disclaimerAccepted: false,
    updatedAt: new Date(),
  };

  DEFAULT_SETTINGS_CACHE.set(userId, settings);
  return settings;
};

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: null,
  loading: false,
  error: null,

  loadSettings: async (userId: string) => {
    if (__DEV__) {
      console.log('SettingsStore: Loading settings for user:', userId);
    }

    set({ loading: true, error: null });

    try {
      const defaultSettings = getDefaultSettings(userId);
      const storageKey = createUserKey(StorageKey.USER_PREFERENCES, userId);

      // ✅ DRY: Storage domain handles JSON parse, error handling
      const result = await storageRepository.getItem<UserSettings>(storageKey, defaultSettings);
      const data = unwrap(result, defaultSettings);

      // ✅ CLEAN CODE: Auto-save defaults if not exists
      if (!result.success) {
        await storageRepository.setItem(storageKey, defaultSettings);
      }

      set({
        settings: data,
        loading: false,
        error: null,
      });

      if (__DEV__) {
        console.log('SettingsStore: Settings loaded successfully');
      }
    } catch (error) {
      if (__DEV__) {
        console.error('SettingsStore: Failed to load settings:', error);
      }
      set({ loading: false, error: 'Failed to load settings' });
    }
  },

  updateSettings: async (updates: Partial<UserSettings>) => {
    if (__DEV__) {
      console.log('SettingsStore: Updating settings with:', updates);
    }

    const { settings } = get();

    // ✅ CLEAN CODE: Auto-initialize if settings not loaded
    if (!settings) {
      await get().loadSettings(DEFAULT_OFFLINE_USER_ID);
    }

    // ✅ DEFENSIVE: Verify settings loaded successfully
    const currentSettings = get().settings;
    if (!currentSettings) {
      const errorMsg = 'Failed to initialize settings';
      if (__DEV__) {
        console.error('SettingsStore:', errorMsg);
      }
      set({ error: errorMsg });
      return;
    }

    set({ loading: true, error: null });

    try {
      const updatedSettings: UserSettings = {
        ...currentSettings,
        ...updates,
        updatedAt: new Date(),
      };

      const storageKey = createUserKey(StorageKey.USER_PREFERENCES, currentSettings.userId);

      // ✅ DRY: Storage domain replaces JSON.stringify + AsyncStorage + try/catch
      const result = await storageRepository.setItem(storageKey, updatedSettings);

      set({
        settings: result.success ? updatedSettings : currentSettings,
        loading: false,
        error: null,
      });

      if (__DEV__) {
        console.log('SettingsStore: Settings updated successfully');
      }
    } catch (error) {
      if (__DEV__) {
        console.error('SettingsStore: Failed to update settings:', error);
      }
      set({ loading: false, error: 'Failed to update settings' });
    }
  },

  resetSettings: async (userId: string) => {
    set({ loading: true, error: null });

    const defaultSettings = getDefaultSettings(userId);
    const storageKey = createUserKey(StorageKey.USER_PREFERENCES, userId);

    // ✅ DRY: Storage domain replaces JSON.stringify + AsyncStorage + try/catch
    const result = await storageRepository.setItem(storageKey, defaultSettings);

    set({
      settings: result.success ? defaultSettings : get().settings,
      loading: false,
      error: null,
    });
  },

  clearError: () => set({ error: null }),
}));

/**
 * Hook for accessing settings state
 */
export const useSettings = () => {
  const { settings, loading, error, loadSettings, updateSettings, resetSettings, clearError } =
    useSettingsStore();

  return {
    settings,
    loading,
    error,
    loadSettings,
    updateSettings,
    resetSettings,
    clearError,
  };
};

