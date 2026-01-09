/**
 * Reminders Store - Zustand State Management
 * Manages reminder state with AsyncStorage persistence
 */

import { createStore } from '@umituz/react-native-storage';
import type { Reminder, QuietHoursConfig, NotificationPreferences } from '../../../infrastructure/services/types';

// ============================================================================
// REMINDERS STORE
// ============================================================================

interface RemindersState {
  reminders: Reminder[];
}

interface RemindersActions {
  addReminder: (reminder: Reminder) => void;
  updateReminder: (id: string, updates: Partial<Reminder>) => void;
  deleteReminder: (id: string) => void;
  toggleReminder: (id: string) => void;
  resetReminders: () => void;
}

const DEFAULT_REMINDERS_STATE: RemindersState = {
  reminders: [],
};

export const useRemindersStore = createStore<RemindersState, RemindersActions>({
  name: 'reminders-store',
  initialState: DEFAULT_REMINDERS_STATE,
  persist: true,
  actions: (set, get) => ({
    addReminder: (reminder: Reminder) => {
      const { reminders } = get();
      set({ reminders: [...reminders, reminder] });
    },

    updateReminder: (id: string, updates: Partial<Reminder>) => {
      const { reminders } = get();
      set({
        reminders: reminders.map(r =>
          r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r
        ),
      });
    },

    deleteReminder: (id: string) => {
      const { reminders } = get();
      set({ reminders: reminders.filter(r => r.id !== id) });
    },

    toggleReminder: (id: string) => {
      const { reminders } = get();
      set({
        reminders: reminders.map(r =>
          r.id === id ? { ...r, enabled: !r.enabled, updatedAt: new Date().toISOString() } : r
        ),
      });
    },

    resetReminders: () => {
      set({ reminders: [] });
    },
  }),
});

// ============================================================================
// PREFERENCES STORE
// ============================================================================

interface PreferencesState {
  preferences: NotificationPreferences;
  isLoading: boolean;
  isInitialized: boolean;
}

interface PreferencesActions {
  initialize: () => Promise<void>;
  updatePreferences: (updates: Partial<NotificationPreferences>) => void;
  updateQuietHours: (quietHours: QuietHoursConfig) => void;
  reset: () => void;
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

const initialPreferencesState: PreferencesState = {
  preferences: DEFAULT_PREFERENCES,
  isLoading: true,
  isInitialized: false,
};

export const usePreferencesStore = createStore<PreferencesState, PreferencesActions>({
  name: 'preferences-store',
  initialState: initialPreferencesState,
  persist: true,
  actions: (set, get) => ({
    initialize: async () => {
      set({ isLoading: false, isInitialized: true });
    },

    updatePreferences: (updates: Partial<NotificationPreferences>) => {
      const { preferences } = get();
      set({ preferences: { ...preferences, ...updates } });
    },

    updateQuietHours: (quietHours: QuietHoursConfig) => {
      const { preferences } = get();
      set({ preferences: { ...preferences, quietHours } });
    },

    reset: () => {
      set({ preferences: DEFAULT_PREFERENCES });
    },
  }),
});

// ============================================================================
// SELECTOR HOOKS - REMINDERS
// ============================================================================

export const useReminders = () => useRemindersStore(state => state.reminders);
export const useEnabledReminders = () => useRemindersStore(state => state.reminders.filter(r => r.enabled));
export const useReminderById = (id: string) => useRemindersStore(state => state.reminders.find(r => r.id === id));

// ============================================================================
// SELECTOR HOOKS - PREFERENCES
// ============================================================================

export const useNotificationPreferences = () => usePreferencesStore(state => state.preferences);
export const useQuietHours = () => usePreferencesStore(state => state.preferences.quietHours);
export const useRemindersLoading = () => usePreferencesStore(state => state.isLoading);
export const useRemindersInitialized = () => usePreferencesStore(state => state.isInitialized);
