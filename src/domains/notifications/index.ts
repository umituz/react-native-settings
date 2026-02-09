/**
 * Notifications Package - Public API
 * Offline-first local notifications using expo-notifications
 */

// ============================================================================
// TYPES
// ============================================================================

export type {
  NotificationTrigger,
  ScheduleNotificationOptions,
  ScheduledNotification,
  TimePreset,
  ReminderFrequency,
  Reminder,
  CreateReminderInput,
  UpdateReminderInput,
  QuietHoursConfig,
  NotificationPreferences,
  ReminderTranslations,
  QuietHoursTranslations,
  NotificationSettingsTranslations,
} from './infrastructure/services/types';

// ============================================================================
// CONFIGURATION
// ============================================================================

export { notificationsConfig } from './infrastructure/config/notificationsConfig';
export type {
  NotificationSetting,
  NotificationSection,
  NotificationsConfig,
} from './infrastructure/config/notificationsConfig';

export {
  DEFAULT_TIME_PRESETS,
  FREQUENCY_OPTIONS,
  WEEKDAY_OPTIONS,
  getTimePresetById,
  formatTime,
  parseTime,
} from './reminders/infrastructure/config/reminderPresets';
export type { FrequencyOption, WeekdayOption } from './reminders/infrastructure/config/reminderPresets';

// ============================================================================
// SERVICES
// ============================================================================

export { NotificationService, notificationService } from './infrastructure/services/NotificationService';
export { NotificationManager } from './infrastructure/services/NotificationManager';

// ============================================================================
// STORES
// ============================================================================

export { useNotificationsStore, useNotifications } from './infrastructure/storage/NotificationsStore';
export {
  useRemindersStore,
  usePreferencesStore,
  useReminders,
  useEnabledReminders,
  useReminderById,
  useNotificationPreferences,
  useQuietHours,
  useRemindersLoading,
  useRemindersInitialized,
} from './reminders/infrastructure/storage/RemindersStore';

// ============================================================================
// HOOKS
// ============================================================================

export { useNotificationSettings } from './infrastructure/hooks/useNotificationSettings';
export { useReminderActions } from './reminders/infrastructure/hooks/useReminderActions';
export { useQuietHoursActions } from './quietHours/infrastructure/hooks/useQuietHoursActions';
export { useNotificationSettingsUI } from './presentation/hooks/useNotificationSettingsUI';

// ============================================================================
// SCREENS
// ============================================================================

export { NotificationsScreen } from './presentation/screens/NotificationsScreen';
export type { NotificationsScreenProps } from './presentation/screens/NotificationsScreen';

export { NotificationSettingsScreen } from './presentation/screens/NotificationSettingsScreen';
export type { NotificationSettingsScreenProps } from './presentation/screens/NotificationSettingsScreen';

export { ReminderListScreen } from './reminders/presentation/screens/ReminderListScreen';
export type { ReminderListScreenProps } from './reminders/presentation/screens/ReminderListScreen';

// ============================================================================
// COMPONENTS
// ============================================================================

export { NotificationsSection } from './presentation/components/NotificationsSection';
export type { NotificationsSectionProps, NotificationsSectionConfig } from './presentation/components/NotificationsSection';

export { TimePresetSelector } from './reminders/presentation/components/TimePresetSelector';
export type { TimePresetSelectorProps } from './reminders/presentation/components/TimePresetSelector';

export { FrequencySelector } from './reminders/presentation/components/FrequencySelector';
export type { FrequencySelectorProps } from './reminders/presentation/components/FrequencySelector';

export { WeekdaySelector } from './reminders/presentation/components/WeekdaySelector';
export type { WeekdaySelectorProps } from './reminders/presentation/components/WeekdaySelector';

export { ReminderItem } from './reminders/presentation/components/ReminderItem';
export type { ReminderItemProps, ReminderItemTranslations } from './reminders/presentation/components/ReminderItem';

export { ReminderForm } from './reminders/presentation/components/ReminderForm';
export type { ReminderFormProps, ReminderFormTranslations } from './reminders/presentation/components/ReminderForm.constants';

export { FormButton } from './reminders/presentation/components/FormButton';
export type { FormButtonProps } from './reminders/presentation/components/FormButton';

export { QuietHoursCard } from './quietHours/presentation/components/QuietHoursCard';
export type { QuietHoursCardProps } from './quietHours/presentation/components/QuietHoursCard';

export { RemindersNavRow } from './presentation/components/RemindersNavRow';
export type { RemindersNavRowProps } from './presentation/components/RemindersNavRow';

export { SettingRow } from './presentation/components/SettingRow';
export type { SettingRowProps } from './presentation/components/SettingRow';

// ============================================================================
// UTILS
// ============================================================================

export { generateId, generateReminderId } from './infrastructure/utils/idGenerator';
export { buildTrigger } from './infrastructure/utils/triggerBuilder';

// ============================================================================
// HOOKS - UTILS
// ============================================================================

export { useTimePicker } from './presentation/hooks/useTimePicker';
export type { PickerMode, UseTimePickerParams, TimePickerHandlers } from './presentation/hooks/useTimePicker';
