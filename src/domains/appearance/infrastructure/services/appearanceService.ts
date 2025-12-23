/**
 * Appearance Service
 *
 * Business logic for appearance management
 * Single Responsibility: Business logic only, no presentation logic
 */

import { AppearanceStorage } from "../storage/appearanceStorage";
import { useAppearanceStore } from "../stores/appearanceStore";
import {
  useTheme,
  useDesignSystemTheme,
  type ThemeMode,
  type CustomThemeColors,
} from "@umituz/react-native-design-system";
import { getSystemTheme } from "./systemThemeDetection";
import { validateAppearanceSettings } from "./validation";
import type { AppearanceSettings } from "../../types";

export class AppearanceService {
  private readonly DEFAULT_THEME_MODE: ThemeMode = "light"; // Use system preference as default
  private _isInitialized = false;
  private initPromise: Promise<void> | null = null;

  /**
   * Initialize appearance settings
   * Business logic: Coordinate initialization process
   */
  async initialize(): Promise<void> {
    // Prevent multiple initializations
    if (this._isInitialized || this.initPromise) {
      return this.initPromise || Promise.resolve();
    }

    this.initPromise = this._performInitialization();
    return this.initPromise;
  }

  private async _performInitialization(): Promise<void> {
    try {
      if (__DEV__) {
        console.log("[AppearanceService] Initializing appearance settings");
      }

      const savedSettings = await AppearanceStorage.getSettings();

      if (savedSettings) {
        // Load saved settings
        useAppearanceStore.getState().setSettings(savedSettings);
        useAppearanceStore.getState().setInitialized(true);

        // Sync with design system theme
        await this.syncWithDesignSystem(savedSettings);
      } else {
        // Use system theme as default, fallback to light
        const systemTheme = getSystemTheme();
        const defaultSettings: AppearanceSettings = {
          themeMode: systemTheme || this.DEFAULT_THEME_MODE,
        };

        useAppearanceStore.getState().setSettings(defaultSettings);
        useAppearanceStore.getState().setInitialized(true);

        // Sync with design system theme
        await this.syncWithDesignSystem(defaultSettings);
      }

      this._isInitialized = true;
    } catch (error) {
      if (__DEV__) {
        console.error("[AppearanceService] Initialization failed:", error);
      }

      // Fallback to system theme or light mode on error
      const systemTheme = getSystemTheme();
      const fallbackSettings: AppearanceSettings = {
        themeMode: systemTheme || this.DEFAULT_THEME_MODE,
      };

      useAppearanceStore.getState().setSettings(fallbackSettings);
      useAppearanceStore.getState().setInitialized(true);

      await this.syncWithDesignSystem(fallbackSettings);
      this._isInitialized = true;
    } finally {
      this.initPromise = null;
    }
  }

  /**
   * Get current theme mode
   * Business logic: Provide theme mode data
   */
  getThemeMode(): ThemeMode {
    return useAppearanceStore.getState().settings.themeMode;
  }

  /**
   * Set theme mode
   * Business logic: Validate and apply theme mode
   */
  async setThemeMode(mode: ThemeMode): Promise<void> {
    try {
      if (__DEV__) {
        console.log("[AppearanceService] Setting theme mode:", mode);
      }

      // Validate theme mode
      if (!mode || (mode !== 'light' && mode !== 'dark')) {
        throw new Error(`Invalid theme mode: ${mode}`);
      }

      const currentSettings = useAppearanceStore.getState().settings;
      const newSettings: AppearanceSettings = {
        ...currentSettings,
        themeMode: mode,
      };

      // Update store
      useAppearanceStore.getState().updateThemeMode(mode);

      // Persist to storage
      await AppearanceStorage.setSettings(newSettings);

      // Sync with design system
      await this.syncWithDesignSystem(newSettings);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (__DEV__) {
        console.error("[AppearanceService] Failed to set theme mode:", errorMessage);
      }
      throw error;
    }
  }

  /**
   * Toggle theme mode
   * Business logic: Toggle between light and dark
   */
  async toggleTheme(): Promise<void> {
    try {
      const currentMode = this.getThemeMode();
      const newMode: ThemeMode = 
        currentMode === "light" ? "dark" : "light";
      
      await this.setThemeMode(newMode);
    } catch (error) {
      if (__DEV__) {
        console.error("[AppearanceService] Failed to toggle theme:", error);
      }
      throw error;
    }
  }

  /**
   * Get custom colors
   * Business logic: Provide custom colors data
   */
  getCustomColors(): CustomThemeColors | undefined {
    return useAppearanceStore.getState().settings.customColors;
  }

  /**
   * Set custom colors
   * Business logic: Validate and apply custom colors
   */
  async setCustomColors(colors: CustomThemeColors): Promise<void> {
    try {
      if (__DEV__) {
        console.log("[AppearanceService] Setting custom colors:", colors);
      }

      // Validate custom colors
      const validation = validateAppearanceSettings({ customColors: colors });
      if (!validation.isValid) {
        throw new Error(`Invalid custom colors: ${validation.errors.join(', ')}`);
      }

      const currentSettings = useAppearanceStore.getState().settings;
      const newSettings: AppearanceSettings = {
        ...currentSettings,
        customColors: {
          ...currentSettings.customColors,
          ...colors,
        },
      };

      // Update store
      useAppearanceStore.getState().updateCustomColors(newSettings.customColors);

      // Persist to storage
      await AppearanceStorage.setSettings(newSettings);

      // Sync with design system
      await this.syncWithDesignSystem(newSettings);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (__DEV__) {
        console.error("[AppearanceService] Failed to set custom colors:", errorMessage);
      }
      throw error;
    }
  }

  /**
   * Reset custom colors to defaults
   * Business logic: Reset custom colors
   */
  async resetCustomColors(): Promise<void> {
    try {
      if (__DEV__) {
        console.log("[AppearanceService] Resetting custom colors");
      }

      const currentSettings = useAppearanceStore.getState().settings;
      const newSettings: AppearanceSettings = {
        ...currentSettings,
        customColors: undefined,
      };

      // Update store
      useAppearanceStore.getState().updateCustomColors(undefined);

      // Persist to storage
      await AppearanceStorage.setSettings(newSettings);

      // Sync with design System
      await this.syncWithDesignSystem(newSettings);
    } catch (error) {
      if (__DEV__) {
        console.error("[AppearanceService] Failed to reset custom colors:", error);
      }
      throw error;
    }
  }

  /**
   * Reset all appearance settings
   * Business logic: Reset all settings
   */
  async reset(): Promise<void> {
    try {
      if (__DEV__) {
        console.log("[AppearanceService] Resetting all appearance settings");
      }

      // Clear storage
      await AppearanceStorage.clear();

      // Reset store to defaults
      useAppearanceStore.getState().resetState();

      // Reset design system theme to system preference
      const systemTheme = getSystemTheme();
      const defaultSettings: AppearanceSettings = {
        themeMode: systemTheme || this.DEFAULT_THEME_MODE,
      };

      await this.syncWithDesignSystem(defaultSettings);
    } catch (error) {
      if (__DEV__) {
        console.error("[AppearanceService] Failed to reset appearance:", error);
      }
      throw error;
    }
  }

  /**
   * Check if appearance is initialized
   * Business logic: Provide initialization status
   */
  isInitialized(): boolean {
    return useAppearanceStore.getState().isInitialized;
  }

  /**
   * Sync appearance settings with design system
   * Private helper method
   */
  private async syncWithDesignSystem(settings: AppearanceSettings): Promise<void> {
    try {
      // Sync theme mode
      useTheme.getState().setThemeMode(settings.themeMode);
      useDesignSystemTheme.getState().setThemeMode(settings.themeMode);

      // Sync custom colors
      useDesignSystemTheme.getState().setCustomColors(settings.customColors);

      if (__DEV__) {
        console.log("[AppearanceService] Synced with design system:", settings);
      }
    } catch (error) {
      if (__DEV__) {
        console.error("[AppearanceService] Failed to sync with design system:", error);
      }
      throw error;
    }
  }
}

export const appearanceService = new AppearanceService();