/**
 * Simple notification settings hook
 */

import { createStore } from '@umituz/react-native-storage';

interface NotificationSettingsState {
  notificationsEnabled: boolean;
  isLoading: boolean;
}

interface NotificationSettingsActions {
  setNotificationsEnabled: (value: boolean) => void;
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
  }),
});

export const useNotificationSettings = () => {
  const store = useNotificationSettingsStore();
  const { notificationsEnabled, isLoading, setNotificationsEnabled } = store;

  return {
    notificationsEnabled,
    setNotificationsEnabled,
    isLoading,
  };
};
