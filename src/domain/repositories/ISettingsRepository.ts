/**
 * Settings Repository Interface
 *
 * Defines contracts for settings persistence and retrieval
 * Pure business logic - no dependencies on external frameworks
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
  updatedAt: Date;
}

export interface SettingsError extends Error {
  code: 'LOAD_FAILED' | 'SAVE_FAILED' | 'NOT_FOUND' | 'INVALID_DATA';
}

export type SettingsResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: SettingsError;
};

/**
 * Settings Repository Interface
 * Repository pattern for settings management
 */
export interface ISettingsRepository {
  /**
   * Load user settings from persistent storage
   */
  loadSettings(userId: string): Promise<SettingsResult<UserSettings>>;

  /**
   * Save user settings to persistent storage
   */
  saveSettings(settings: Partial<UserSettings>): Promise<SettingsResult<UserSettings>>;

  /**
   * Reset settings to default values
   */
  resetSettings(userId: string): Promise<SettingsResult<UserSettings>>;

  /**
   * Get default settings for a user
   */
  getDefaultSettings(userId: string): UserSettings;
}

