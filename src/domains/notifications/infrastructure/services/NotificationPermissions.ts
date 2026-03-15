import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { devWarn, devError, devLog } from '../../../../utils/devUtils';

export class NotificationPermissions {
  async requestPermissions(): Promise<boolean> {
    try {
      // Lazy load expo-device
      const Device = await import('expo-device');

      if (!Device.default.isDevice) {
        devWarn('[NotificationPermissions] Notifications only work on physical devices');
        return false;
      }

      const permissionsResponse = await Notifications.getPermissionsAsync();
      const existingStatus = permissionsResponse.status || (permissionsResponse.granted ? 'granted' : 'denied');
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const requestResponse = await Notifications.requestPermissionsAsync();
        finalStatus = requestResponse.status || (requestResponse.granted ? 'granted' : 'denied');
      }

      if (Platform.OS === 'android') {
        await this.createAndroidChannels();
      }

      return finalStatus === 'granted';
    } catch (error) {
      devError('[NotificationPermissions] Permission request failed:', error);
      return false;
    }
  }

  async hasPermissions(): Promise<boolean> {
    try {
      // Lazy load expo-device
      const Device = await import('expo-device');

      if (!Device.default.isDevice) return false;
      const permissionsResponse = await Notifications.getPermissionsAsync();
      return permissionsResponse.status === 'granted' || permissionsResponse.granted === true;
    } catch (error) {
      devError('[NotificationPermissions] Permission check failed:', error);
      return false;
    }
  }

  private async createAndroidChannels(): Promise<void> {
    if (Platform.OS !== 'android') return;

    try {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    } catch (error) {
      devError('[NotificationPermissions] Android channel creation failed:', error);
    }
  }
}
