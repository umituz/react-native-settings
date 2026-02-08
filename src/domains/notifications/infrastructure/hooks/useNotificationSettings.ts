/**
 * Simple notification settings hook
 */

import { useEffect } from 'react';
import { createStore } from '@umituz/react-native-design-system';

interface NotificationSettingsState {
  notificationsEnabled: boolean;
  isLoading: boolean;
}

interface NotificationSettingsActions {
  setNotificationsEnabled: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  initialize: () => void;
}

const useNotificationSettingsStore = createStore<NotificationSettingsState, NotificationSettingsActions>({
  name: 'notification-settings-store',
  initialState: {
    notificationsEnabled: true,
    isLoading: true,
  },
  persist: true,
  actions: (set) => ({
    setNotificationsEnabled: (value: boolean) => set({ notificationsEnabled: value }),
    setLoading: (value: boolean) => set({ isLoading: value }),
    initialize: () => set({ isLoading: false }),
  }),
});

export const useNotificationSettings = () => {
  const store = useNotificationSettingsStore();
  const { notificationsEnabled, isLoading, setNotificationsEnabled, initialize } = store;

  // Initialize on first mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  return {
    notificationsEnabled,
    setNotificationsEnabled,
    isLoading,
  };
};
