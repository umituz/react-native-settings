import * as Notifications from 'expo-notifications';
import type { ScheduleNotificationOptions, ScheduledNotification } from './types';

export class NotificationScheduler {
  async scheduleNotification(options: ScheduleNotificationOptions): Promise<string> {
    try {
      const { title, body, data = {}, trigger, sound = true, badge, categoryIdentifier } = options;

      let notificationTrigger: Notifications.NotificationTriggerInput = null;

      if (trigger.type === 'date') {
        notificationTrigger = {
          date: trigger.date,
          channelId: categoryIdentifier || 'default',
        };
      } else if (trigger.type === 'daily') {
        notificationTrigger = {
          hour: trigger.hour,
          minute: trigger.minute,
          repeats: true,
          channelId: categoryIdentifier || 'reminders',
        };
      } else if (trigger.type === 'weekly') {
        notificationTrigger = {
          weekday: trigger.weekday,
          hour: trigger.hour,
          minute: trigger.minute,
          repeats: true,
          channelId: categoryIdentifier || 'reminders',
        };
      } else if (trigger.type === 'monthly') {
        notificationTrigger = {
          day: trigger.day,
          hour: trigger.hour,
          minute: trigger.minute,
          repeats: true,
          channelId: categoryIdentifier || 'reminders',
        };
      }

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: sound === true ? 'default' : sound || undefined,
          badge,
          categoryIdentifier,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          vibrate: [0, 250, 250, 250],
        },
        trigger: notificationTrigger,
      });

      return notificationId;
    } catch (error) {
      console.error('Failed to schedule notification:', error);
      throw new Error(`Notification scheduling failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async cancelNotification(notificationId: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      console.error('Failed to cancel notification:', notificationId, error);
      // Don't throw - canceling a non-existent notification is not critical
    }
  }

  async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Failed to cancel all notifications:', error);
      throw new Error(`Failed to cancel notifications: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getScheduledNotifications(): Promise<ScheduledNotification[]> {
    try {
      const notifications = await Notifications.getAllScheduledNotificationsAsync();
      return notifications.map(notification => ({
        identifier: notification.identifier,
        content: {
          title: notification.content.title ?? '',
          body: notification.content.body ?? '',
          data: notification.content.data as Record<string, string | number | boolean | null>,
        },
        trigger: notification.trigger,
      }));
    } catch (error) {
      console.error('Failed to get scheduled notifications:', error);
      return []; // Return empty array as fallback
    }
  }
}