/**
 * Unified Notification Store
 * Consolidates NotificationsStore, RemindersStore, and PreferencesStore
 *
 * Production-ready implementation with:
 * - Single source of truth for all notification state
 * - Proper state partializing (transient vs persistent)
 * - Type-safe actions and selectors
 * - Data migration support
 */

import { useMemo } from 'react';
import { createStore, storageService } from '@umituz/react-native-design-system';
import type { Reminder, QuietHoursConfig, NotificationPreferences } from '../services/types';

// ============================================================================
// STATE & ACTIONS TYPES
// ============================================================================

interface NotificationState {
  // Runtime state (not persisted)
  hasPermissions: boolean;
  isInitialized: boolean;
  isLoading: boolean;

  // Persistent state
  preferences: NotificationPreferences;
  reminders: Reminder[];
}

interface NotificationActions {
  // Permission actions
  setPermissions: (granted: boolean) => void;
  setInitialized: (initialized: boolean) => void;

  // Preference actions
  initialize: () => void;
  updatePreferences: (updates: Partial<NotificationPreferences>) => void;
  updateQuietHours: (quietHours: QuietHoursConfig) => void;

  // Reminder actions
  addReminder: (reminder: Reminder) => void;
  updateReminder: (id: string, updates: Partial<Reminder>) => void;
  deleteReminder: (id: string) => void;
  toggleReminder: (id: string) => void;

  // Reset actions
  reset: () => void;
  resetReminders: () => void;
}

// ============================================================================
// DEFAULT VALUES
// ============================================================================

const DEFAULT_PREFERENCES: NotificationPreferences = {
  enabled: true,
  sound: true,
  vibration: true,
  quietHours: {
    enabled: false,
    startHour: 22,
    startMinute: 0,
    endHour: 7,
    endMinute: 0,
  },
};

const DEFAULT_STATE: NotificationState = {
  // Runtime state
  hasPermissions: false,
  isInitialized: false,
  isLoading: true,

  // Persistent state
  preferences: DEFAULT_PREFERENCES,
  reminders: [],
};

// ============================================================================
// UNIFIED NOTIFICATION STORE
// ============================================================================

export const useNotificationStore = createStore<NotificationState, NotificationActions>({
  name: 'unified-notification-store',
  version: 1,
  persist: true,
  storage: storageService,

  // Only persist preferences and reminders (exclude runtime state)
  partialize: (state) => ({
    preferences: state.preferences,
    reminders: state.reminders,
  }),

  initialState: DEFAULT_STATE,

  actions: (set, get) => ({
    // Permission actions
    setPermissions: (granted) => set({ hasPermissions: granted }),
    setInitialized: (initialized) => set({ isInitialized: initialized }),

    // Preference actions
    initialize: () => {
      set({ isLoading: false, isInitialized: true });
    },

    updatePreferences: (updates) => {
      const { preferences } = get();
      set({ preferences: { ...preferences, ...updates } });
    },

    updateQuietHours: (quietHours) => {
      const { preferences } = get();
      set({ preferences: { ...preferences, quietHours } });
    },

    // Reminder actions
    addReminder: (reminder) => {
      const { reminders } = get();
      set({ reminders: [...reminders, reminder] });
    },

    updateReminder: (id, updates) => {
      const { reminders } = get();
      set({
        reminders: reminders.map(r =>
          r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r
        ),
      });
    },

    deleteReminder: (id) => {
      const { reminders } = get();
      set({ reminders: reminders.filter(r => r.id !== id) });
    },

    toggleReminder: (id) => {
      const { reminders } = get();
      set({
        reminders: reminders.map(r =>
          r.id === id ? { ...r, enabled: !r.enabled, updatedAt: new Date().toISOString() } : r
        ),
      });
    },

    // Reset actions
    reset: () => {
      set({
        preferences: DEFAULT_PREFERENCES,
        reminders: [],
      });
    },

    resetReminders: () => {
      set({ reminders: [] });
    },
  }),
});

// ============================================================================
// SELECTOR HOOKS - Permissions & Initialization
// ============================================================================

export const useNotificationPermissions = () =>
  useNotificationStore(state => state.hasPermissions);

export const useNotificationInitialized = () =>
  useNotificationStore(state => state.isInitialized);

export const useRemindersLoading = () =>
  useNotificationStore(state => state.isLoading);

export const useRemindersInitialized = () =>
  useNotificationStore(state => state.isInitialized);

// ============================================================================
// SELECTOR HOOKS - Preferences
// ============================================================================

export const useNotificationPreferences = () =>
  useNotificationStore(state => state.preferences);

export const useQuietHours = () =>
  useNotificationStore(state => state.preferences.quietHours);

// ============================================================================
// SELECTOR HOOKS - Reminders
// ============================================================================

export const useReminders = () =>
  useNotificationStore(state => state.reminders);

export const useEnabledReminders = () => {
  const reminders = useNotificationStore(state => state.reminders);
  return useMemo(() => reminders.filter(r => r.enabled), [reminders]);
};

export const useReminderById = (id: string) =>
  useNotificationStore(state => state.reminders.find(r => r.id === id));

