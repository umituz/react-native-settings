/**
 * Trigger Builder Utility
 * Builds notification triggers from reminder data
 */

import type { NotificationTrigger, Reminder } from '../services/types';

export const buildTrigger = (reminder: Reminder): NotificationTrigger => {
  const { frequency, hour, minute, weekday, dayOfMonth } = reminder;

  switch (frequency) {
    case 'once': {
      const date = new Date();
      date.setHours(hour, minute, 0, 0);

      if (date <= new Date()) {
        date.setDate(date.getDate() + 1);
      }

      return { type: 'date', date };
    }

    case 'daily':
      return { type: 'daily', hour, minute };

    case 'weekly':
      return {
        type: 'weekly',
        weekday: weekday || 1,
        hour,
        minute,
      };

    case 'monthly':
      return {
        type: 'monthly',
        day: dayOfMonth || 1,
        hour,
        minute,
      };

    default:
      return { type: 'daily', hour, minute };
  }
};
