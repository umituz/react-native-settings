/**
 * Settings Repository Implementation
 *
 * Handles data access for user settings using @umituz/react-native-design-system
 */

import { storageRepository, StorageKey, createUserKey } from '@umituz/react-native-design-system';
import type { ISettingsRepository, UserSettings, SettingsResult } from '../../application/ports/ISettingsRepository';

/**
 * Validates userId to prevent key injection attacks
 */
const validateUserId = (userId: string): void => {
    if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid userId: must be a non-empty string');
    }
    // Prevent potential key injection by restricting characters
    if (!/^[a-zA-Z0-9_-]+$/.test(userId)) {
        throw new Error('Invalid userId: contains invalid characters');
    }
    // Limit length to prevent DoS attacks
    if (userId.length > 128) {
        throw new Error('Invalid userId: exceeds maximum length');
    }
};

export class SettingsRepository implements ISettingsRepository {
    private readonly defaultSettings: (userId: string) => UserSettings = (userId: string) => ({
        userId,
        theme: 'auto',
        language: 'en-US',
        notificationsEnabled: true,
        emailNotifications: true,
        pushNotifications: true,
        soundEnabled: true,
        vibrationEnabled: true,
        privacyMode: false,
        disclaimerAccepted: false,
        updatedAt: new Date(),
    });

    async getSettings(userId: string): Promise<SettingsResult<UserSettings>> {
        try {
            // Validate input
            validateUserId(userId);

            const storageKey = createUserKey(StorageKey.USER_PREFERENCES, userId);
            const defaults = this.defaultSettings(userId);
            const result = await storageRepository.getItem<UserSettings>(storageKey, defaults);

            if (!result.success) {
                // If not found, save defaults and return them
                await this.saveSettings(defaults);
                return { success: true, data: defaults };
            }

            return {
                success: true,
                data: result.data ?? defaults,
            };
        } catch (error) {
            return {
                success: false,
                error: {
                    code: 'GET_SETTINGS_FAILED',
                    message: error instanceof Error ? error.message : 'Unknown error',
                },
            };
        }
    }

    async saveSettings(settings: UserSettings): Promise<SettingsResult<void>> {
        try {
            // Validate input
            validateUserId(settings.userId);

            const storageKey = createUserKey(StorageKey.USER_PREFERENCES, settings.userId);
            const result = await storageRepository.setItem(storageKey, settings);

            if (!result.success) {
                return {
                    success: false,
                    error: {
                        code: 'SAVE_SETTINGS_FAILED',
                        message: 'Failed to save settings to storage',
                    },
                };
            }

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: {
                    code: 'SAVE_SETTINGS_FAILED',
                    message: error instanceof Error ? error.message : 'Unknown error',
                },
            };
        }
    }

    async deleteSettings(userId: string): Promise<SettingsResult<void>> {
        try {
            // Validate input
            validateUserId(userId);

            const storageKey = createUserKey(StorageKey.USER_PREFERENCES, userId);
            const result = await storageRepository.removeItem(storageKey);

            if (!result.success) {
                return {
                    success: false,
                    error: {
                        code: 'DELETE_SETTINGS_FAILED',
                        message: 'Failed to delete settings from storage',
                    },
                };
            }

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: {
                    code: 'DELETE_SETTINGS_FAILED',
                    message: error instanceof Error ? error.message : 'Unknown error',
                },
            };
        }
    }
}
