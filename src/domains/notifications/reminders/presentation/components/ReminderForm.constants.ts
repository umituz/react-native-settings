import type { Reminder, CreateReminderInput, TimePreset } from '../../../infrastructure/services/types';

export const DEFAULT_HOUR = 9;
export const DEFAULT_MINUTE = 0;
export const DEFAULT_WEEKDAY = 2; // Tuesday
export const MAX_TITLE_LENGTH = 100;
export const MAX_BODY_LENGTH = 500;

export interface ReminderFormTranslations {
  titleLabel: string;
  titlePlaceholder: string;
  bodyLabel: string;
  bodyPlaceholder: string;
  timeLabel: string;
  frequencyLabel: string;
  weekdayLabel: string;
  saveButton: string;
  cancelButton: string;
  customTimeLabel: string;
  getPresetLabel: (key: string) => string;
  getFrequencyLabel: (key: string) => string;
  getWeekdayLabel: (key: string) => string;
}

export interface ReminderFormProps {
  initialData?: Reminder;
  translations: ReminderFormTranslations;
  onSave: (data: CreateReminderInput) => void;
  onCancel: () => void;
  timePresets?: TimePreset[];
}
