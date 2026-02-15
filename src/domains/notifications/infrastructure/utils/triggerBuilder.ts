/**
 * Trigger Builder Utility
 * Builds notification triggers from reminder data
 */

import type { NotificationTrigger, Reminder } from '../services/types';

export const buildTrigger = (reminder: Reminder): NotificationTrigger => {
  const { frequency, hour, minute, weekday, dayOfMonth } = reminder;

  switch (frequency) {
    case 'once': {
      const now = new Date();
      const date = new Date();
      date.setHours(hour, minute, 0, 0);

      // If scheduled time has passed today, schedule for tomorrow
      if (date <= now) {
        date.setDate(date.getDate() + 1);
      }

      return { type: 'date', date };
    }

    case 'daily':
      return { type: 'daily', hour, minute };

    case 'weekly':
      return {
        type: 'weekly',
        weekday: weekday ?? 1,
        hour,
        minute,
      };

    case 'monthly':
      return {
        type: 'monthly',
        day: dayOfMonth ?? 1,
        hour,
        minute,
      };

    default:
      return { type: 'daily', hour, minute };
  }
};
