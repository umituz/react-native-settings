/**
 * Storage Wrapper
 * Uses @umituz/react-native-design-system for persistence
 */

import { storageRepository } from '@umituz/react-native-design-system';

export const STORAGE_KEYS = {
  LANGUAGE: '@localization:language',
} as const;

export const StorageWrapper = {
  async getString(key: string, defaultValue: string): Promise<string> {
    try {
      const result = await storageRepository.getString(key, defaultValue);
      if (result.success && result.data !== null) {
        return result.data;
      }
      return defaultValue;
    } catch (error) {
      console.error('[StorageWrapper] Failed to get string:', key, error);
      return defaultValue;
    }
  },

  async setString(key: string, value: string): Promise<void> {
    try {
      await storageRepository.setString(key, value);
    } catch (error) {
      console.error('[StorageWrapper] Failed to set string:', key, error);
      throw error;
    }
  },
};
