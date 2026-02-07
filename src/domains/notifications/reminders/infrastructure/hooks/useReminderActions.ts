/**
 * useReminderActions Hook
 * Handles reminder CRUD operations with notification scheduling
 */

import { useCallback } from 'react';
import { useRemindersStore } from '../storage/RemindersStore';
import { NotificationScheduler } from '../../../infrastructure/services/NotificationScheduler';
import { generateReminderId } from '../../../infrastructure/utils/idGenerator';
import { buildTrigger } from '../../../infrastructure/utils/triggerBuilder';
import type { Reminder, CreateReminderInput, UpdateReminderInput } from '../../../infrastructure/services/types';

const scheduler = new NotificationScheduler();

export const useReminderActions = () => {
  const { addReminder, updateReminder, deleteReminder, toggleReminder } = useRemindersStore();

  const createReminder = useCallback(async (input: CreateReminderInput): Promise<Reminder> => {
    const now = new Date().toISOString();
    const reminder: Reminder = {
      id: generateReminderId(),
      ...input,
      enabled: true,
      createdAt: now,
      updatedAt: now,
    };

    try {
      const trigger = buildTrigger(reminder);
      const notificationId = await scheduler.scheduleNotification({
        title: reminder.title,
        body: reminder.body,
        trigger,
        data: { reminderId: reminder.id },
      });
      reminder.notificationId = notificationId;
    } catch {
      reminder.enabled = false;
    }

    await addReminder(reminder);

    return reminder;
  }, [addReminder]);

  const editReminder = useCallback(async (id: string, input: UpdateReminderInput): Promise<void> => {
    const { reminders } = useRemindersStore.getState();
    const existing = reminders.find(r => r.id === id);
    if (!existing) return;

    if (existing.notificationId) {
      await scheduler.cancelNotification(existing.notificationId);
    }

    const updated: Reminder = { ...existing, ...input, updatedAt: new Date().toISOString() };

    if (updated.enabled) {
      const trigger = buildTrigger(updated);
      const notificationId = await scheduler.scheduleNotification({
        title: updated.title,
        body: updated.body,
        trigger,
        data: { reminderId: updated.id },
      });
      updated.notificationId = notificationId;
    } else {
      updated.notificationId = undefined;
    }

    await updateReminder(id, updated);
  }, [updateReminder]);

  const removeReminder = useCallback(async (id: string): Promise<void> => {
    const { reminders } = useRemindersStore.getState();
    const reminder = reminders.find(r => r.id === id);

    if (reminder?.notificationId) {
      await scheduler.cancelNotification(reminder.notificationId);
    }

    await deleteReminder(id);
  }, [deleteReminder]);

  const toggleReminderEnabled = useCallback(async (id: string): Promise<void> => {
    const { reminders } = useRemindersStore.getState();
    const reminder = reminders.find(r => r.id === id);
    if (!reminder) return;

    if (reminder.enabled && reminder.notificationId) {
      await scheduler.cancelNotification(reminder.notificationId);
      await updateReminder(id, { enabled: false, notificationId: undefined });
    } else if (!reminder.enabled) {
      try {
        const trigger = buildTrigger(reminder);
        const notificationId = await scheduler.scheduleNotification({
          title: reminder.title,
          body: reminder.body,
          trigger,
          data: { reminderId: reminder.id },
        });
        await updateReminder(id, { enabled: true, notificationId });
      } catch {
        await updateReminder(id, { enabled: false });
      }
    }
  }, [updateReminder]);

  return {
    createReminder,
    editReminder,
    removeReminder,
    toggleReminderEnabled,
  };
};
