/**
 * useQuietHoursActions Hook
 * Manages quiet hours configuration
 */

import { useCallback } from 'react';
import { useNotificationStore, useQuietHours } from '../../../infrastructure/storage/UnifiedNotificationStore';
import type { QuietHoursConfig } from '../../../infrastructure/services/types';

export const useQuietHoursActions = () => {
  const quietHours = useQuietHours();
  const { updateQuietHours } = useNotificationStore();

  const setQuietHoursEnabled = useCallback(async (enabled: boolean): Promise<void> => {
    // Use getState() to avoid stale closure and race conditions
    const currentQuietHours = useNotificationStore.getState().preferences.quietHours;
    await updateQuietHours({ ...currentQuietHours, enabled });
  }, [updateQuietHours]);

  const setStartTime = useCallback(async (hour: number, minute: number): Promise<void> => {
    // Use getState() to avoid stale closure and race conditions
    const currentQuietHours = useNotificationStore.getState().preferences.quietHours;
    await updateQuietHours({ ...currentQuietHours, startHour: hour, startMinute: minute });
  }, [updateQuietHours]);

  const setEndTime = useCallback(async (hour: number, minute: number): Promise<void> => {
    // Use getState() to avoid stale closure and race conditions
    const currentQuietHours = useNotificationStore.getState().preferences.quietHours;
    await updateQuietHours({ ...currentQuietHours, endHour: hour, endMinute: minute });
  }, [updateQuietHours]);

  const setQuietHours = useCallback(async (config: QuietHoursConfig): Promise<void> => {
    await updateQuietHours(config);
  }, [updateQuietHours]);

  const isInQuietHours = useCallback((): boolean => {
    // Use getState() to get current quietHours for consistency
    const currentQuietHours = useNotificationStore.getState().preferences.quietHours;

    if (!currentQuietHours.enabled) return false;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const startMinutes = currentQuietHours.startHour * 60 + currentQuietHours.startMinute;
    const endMinutes = currentQuietHours.endHour * 60 + currentQuietHours.endMinute;

    // Validate time values
    if (startMinutes < 0 || startMinutes >= 1440 || endMinutes < 0 || endMinutes >= 1440) {
      return false;
    }

    // Handle case where quiet hours span midnight
    if (startMinutes <= endMinutes) {
      // Same day period (e.g., 22:00 - 06:00 is not this case)
      return currentMinutes >= startMinutes && currentMinutes < endMinutes;
    } else {
      // Spans midnight (e.g., 22:00 - 06:00)
      // Current time is after start OR before end
      return currentMinutes >= startMinutes || currentMinutes < endMinutes;
    }
  }, []);

  return {
    quietHours,
    setQuietHoursEnabled,
    setStartTime,
    setEndTime,
    setQuietHours,
    isInQuietHours,
  };
};
