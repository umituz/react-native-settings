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

const getDefaultSettings = (userId: string): UserSettings => ({
  userId,
  theme: 'auto',
  language: 'en-US',
  notificationsEnabled: true,
  emailNotifications: true,
  pushNotifications: true,
  soundEnabled: true,
  vibrationEnabled: true,
  privacyMode: false,
  updatedAt: new Date(),
});

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: null,
  loading: false,
  error: null,

  loadSettings: async (userId: string) => {
    set({ loading: true, error: null });

    const defaultSettings = getDefaultSettings(userId);
    const storageKey = createUserKey(StorageKey.SETTINGS, userId);

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
  },

  updateSettings: async (updates: Partial<UserSettings>) => {
    const { settings } = get();

    // ✅ CLEAN CODE: Auto-initialize if settings not loaded
    if (!settings) {
      await get().loadSettings(DEFAULT_OFFLINE_USER_ID);
    }

    // ✅ DEFENSIVE: Verify settings loaded successfully
    const currentSettings = get().settings;
    if (!currentSettings) {
      set({ error: 'Failed to initialize settings' });
      return;
    }

    set({ loading: true, error: null });

    const updatedSettings: UserSettings = {
      ...currentSettings,
      ...updates,
      updatedAt: new Date(),
    };

    const storageKey = createUserKey(StorageKey.SETTINGS, currentSettings.userId);

    // ✅ DRY: Storage domain replaces JSON.stringify + AsyncStorage + try/catch
    const result = await storageRepository.setItem(storageKey, updatedSettings);

    set({
      settings: result.success ? updatedSettings : currentSettings,
      loading: false,
      error: null,
    });
  },

  resetSettings: async (userId: string) => {
    set({ loading: true, error: null });

    const defaultSettings = getDefaultSettings(userId);
    const storageKey = createUserKey(StorageKey.SETTINGS, userId);

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

