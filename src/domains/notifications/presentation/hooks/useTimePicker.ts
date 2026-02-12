/**
 * useTimePicker Hook
 * Encapsulates DateTimePicker logic for notification settings
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { QuietHoursConfig } from '../../infrastructure/services/types';

export type PickerMode = 'start' | 'end' | null;

export interface UseTimePickerParams {
  quietHours: QuietHoursConfig;
  onStartTimeChange: (hours: number, minutes: number) => void;
  onEndTimeChange: (hours: number, minutes: number) => void;
}

export interface TimePickerHandlers {
  pickerMode: PickerMode;
  handleStartTimePress: () => void;
  handleEndTimePress: () => void;
  handleTimeChange: (event: { type: string }, selectedDate?: Date) => void;
  getPickerDate: () => Date;
}

export const useTimePicker = ({
  quietHours,
  onStartTimeChange,
  onEndTimeChange,
}: UseTimePickerParams): TimePickerHandlers => {
  const [pickerMode, setPickerMode] = useState<PickerMode>(null);

  // Use ref to avoid stale closure in handleTimeChange
  const pickerModeRef = useRef<PickerMode>(null);

  // Keep ref in sync with state
  useEffect(() => {
    pickerModeRef.current = pickerMode;
  }, [pickerMode]);

  const handleStartTimePress = useCallback(() => {
    setPickerMode('start');
  }, []);

  const handleEndTimePress = useCallback(() => {
    setPickerMode('end');
  }, []);

  const handleTimeChange = useCallback((event: { type: string }, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      const hours = selectedDate.getHours();
      const minutes = selectedDate.getMinutes();

      // Use ref to get current mode without recreating callback
      if (pickerModeRef.current === 'start') {
        onStartTimeChange(hours, minutes);
      } else if (pickerModeRef.current === 'end') {
        onEndTimeChange(hours, minutes);
      }
    }
    setPickerMode(null);
    pickerModeRef.current = null;
  }, [onStartTimeChange, onEndTimeChange]);

  const getPickerDate = useCallback((): Date => {
    const date = new Date();
    if (pickerMode === 'start') {
      date.setHours(quietHours.startHour, quietHours.startMinute);
    } else if (pickerMode === 'end') {
      date.setHours(quietHours.endHour, quietHours.endMinute);
    }
    return date;
  }, [pickerMode, quietHours]);

  return {
    pickerMode,
    handleStartTimePress,
    handleEndTimePress,
    handleTimeChange,
    getPickerDate,
  };
};
