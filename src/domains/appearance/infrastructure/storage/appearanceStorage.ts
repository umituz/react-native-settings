/**
 * Appearance Storage Service
 *
 * Handles persistence of appearance settings using AsyncStorage
 * Single Responsibility: Pure storage operations only
 */

import { storageRepository, unwrap } from "@umituz/react-native-storage";
import type { ThemeMode } from "@umituz/react-native-design-system";
import type { AppearanceSettings } from "../../types";

const STORAGE_KEYS = {
  APPEARANCE_SETTINGS: "@appearance_settings",
} as const;

const DEFAULT_SETTINGS: AppearanceSettings = {
  themeMode: "dark",
};

export class AppearanceStorage {
  /**
   * Get saved appearance settings
   * Pure storage operation - no business logic
   */
  static async getSettings(): Promise<AppearanceSettings | null> {
    try {
      const result = await storageRepository.getItem<AppearanceSettings>(
        STORAGE_KEYS.APPEARANCE_SETTINGS,
        DEFAULT_SETTINGS,
      );
      const data = unwrap(result, DEFAULT_SETTINGS);
      return data;
    } catch (error) {
      return null;
    }
  }

  /**
   * Save appearance settings
   * Pure storage operation - no business logic
   */
  static async setSettings(settings: AppearanceSettings): Promise<void> {
    const result = await storageRepository.setItem(
      STORAGE_KEYS.APPEARANCE_SETTINGS,
      settings,
    );
    if (!result.success) {
      throw new Error("Failed to save appearance settings");
    }
  }

  /**
   * Get saved theme mode
   * Pure storage operation - no business logic
   */
  static async getThemeMode(): Promise<ThemeMode | null> {
    try {
      const settings = await this.getSettings();
      return settings?.themeMode || null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Save theme mode
   * Pure storage operation - no business logic
   */
  static async setThemeMode(themeMode: ThemeMode): Promise<void> {
    const currentSettings = (await this.getSettings()) || {
      themeMode: "dark",
    };
    await this.setSettings({
      ...currentSettings,
      themeMode,
    });
  }

  /**
   * Get custom theme colors
   * Pure storage operation - no business logic
   */
  static async getCustomColors() {
    try {
      const settings = await this.getSettings();
      return settings?.customColors || null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Save custom theme colors
   * Pure storage operation - no business logic
   */
  static async setCustomColors(
    customColors: AppearanceSettings["customColors"],
  ): Promise<void> {
    const currentSettings = (await this.getSettings()) || {
      themeMode: "dark",
    };
    await this.setSettings({
      ...currentSettings,
      customColors,
    });
  }

  /**
   * Clear all appearance settings
   * Pure storage operation - no business logic
   */
  static async clear(): Promise<void> {
    const result = await storageRepository.removeItem(
      STORAGE_KEYS.APPEARANCE_SETTINGS,
    );
    if (!result.success) {
      throw new Error("Failed to clear appearance settings");
    }
  }
}
