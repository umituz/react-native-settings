/**
 * useReminderActions Hook
 * Handles reminder CRUD operations with notification scheduling
 */

import { useCallback, useMemo } from 'react';
import { useRemindersStore } from '../storage/RemindersStore';
import { NotificationScheduler } from '../../../infrastructure/services/NotificationScheduler';
import { generateReminderId } from '../../../infrastructure/utils/idGenerator';
import { buildTrigger } from '../../../infrastructure/utils/triggerBuilder';
import type { Reminder, CreateReminderInput, UpdateReminderInput } from '../../../infrastructure/services/types';

export const useReminderActions = () => {
  const { addReminder, updateReminder, deleteReminder, toggleReminder: _toggleReminder } = useRemindersStore();

  // Lazy initialization of scheduler
  const scheduler = useMemo(() => new NotificationScheduler(), []);

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
    } catch (error) {
      // Log error for debugging
      reminder.enabled = false;
    }

    await addReminder(reminder);

    return reminder;
  }, [addReminder]);

  const editReminder = useCallback(async (id: string, input: UpdateReminderInput): Promise<void> => {
    // Get current state BEFORE async operations to prevent race condition
    const existing = useRemindersStore.getState().reminders.find(r => r.id === id);

    if (!existing) {
      throw new Error(`Reminder with id ${id} not found`);
    }

    if (existing.notificationId) {
      try {
        await scheduler.cancelNotification(existing.notificationId);
      } catch (error) {
        // Continue with update even if cancellation fails
      }
    }

    const updated: Reminder = { ...existing, ...input, updatedAt: new Date().toISOString() };

    if (updated.enabled) {
      try {
        const trigger = buildTrigger(updated);
        const notificationId = await scheduler.scheduleNotification({
          title: updated.title,
          body: updated.body,
          trigger,
          data: { reminderId: updated.id },
        });
        updated.notificationId = notificationId;
      } catch (error) {
        updated.enabled = false;
        updated.notificationId = undefined;
      }
    } else {
      updated.notificationId = undefined;
    }

    await updateReminder(id, updated);
  }, [updateReminder]);

  const removeReminder = useCallback(async (id: string): Promise<void> => {
    // Get current state BEFORE async operations to prevent race condition
    const reminder = useRemindersStore.getState().reminders.find(r => r.id === id);

    if (!reminder) {
      throw new Error(`Reminder with id ${id} not found`);
    }

    if (reminder.notificationId) {
      try {
        await scheduler.cancelNotification(reminder.notificationId);
      } catch (error) {
        // Continue with deletion even if cancellation fails
      }
    }

    await deleteReminder(id);
  }, [deleteReminder]);

  const toggleReminderEnabled = useCallback(async (id: string): Promise<void> => {
    // Get current state BEFORE async operations to prevent race condition
    const reminder = useRemindersStore.getState().reminders.find(r => r.id === id);

    if (!reminder) {
      throw new Error(`Reminder with id ${id} not found`);
    }

    if (reminder.enabled && reminder.notificationId) {
      try {
        await scheduler.cancelNotification(reminder.notificationId);
        await updateReminder(id, { enabled: false, notificationId: undefined });
      } catch (error) {
        throw error; // Re-throw to allow caller to handle
      }
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
      } catch (error) {
        await updateReminder(id, { enabled: false }); // Ensure disabled state
        throw error; // Re-throw to allow caller to handle
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
