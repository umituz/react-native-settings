/**
 * Settings Repository Interface and Types
 *
 * Defines the contract for settings storage operations
 * and the core types used throughout the settings domain.
 */

/**
 * User settings data structure
 */
export interface UserSettings {
  userId: string;
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  privacyMode: boolean;
  disclaimerAccepted: boolean;
  updatedAt: Date;
}

/**
 * Settings operation result
 */
export interface SettingsResult<T> {
  success: boolean;
  data?: T;
  error?: SettingsError;
}

/**
 * Settings error types
 */
export interface SettingsError {
  code: string;
  message: string;
}

/**
 * Settings repository interface
 */
export interface ISettingsRepository {
  getSettings(userId: string): Promise<SettingsResult<UserSettings>>;
  saveSettings(settings: UserSettings): Promise<SettingsResult<void>>;
  deleteSettings(userId: string): Promise<SettingsResult<void>>;
}
