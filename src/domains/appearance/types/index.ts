/**
 * Appearance Domain Types
 *
 * Types for appearance settings including theme mode and custom colors
 */

import type {
  ThemeMode,
  CustomThemeColors,
} from "@umituz/react-native-design-system";

export type { ThemeMode, CustomThemeColors };

export interface AppearanceSettings {
  themeMode: ThemeMode;
  customColors?: CustomThemeColors;
}

export interface AppearanceState {
  settings: AppearanceSettings;
  isInitialized: boolean;
}

export interface AppearanceSectionConfig {
  /** Section title */
  title?: string;
  /** Section description/value */
  description?: string;
  /** Navigation route name */
  route?: string;
  /** Default navigation route name */
  defaultRoute?: string;
}

export interface ThemeModeTextConfig {
  title: string;
  subtitle?: string;
  description?: string;
  features: string[];
}

export interface AppearanceTexts {
  title?: string;
  subtitle?: string;
  themeSectionTitle?: string;
  themeSectionDescription?: string;
  colorsSectionTitle?: string;
  colorsSectionDescription?: string;
  previewSectionTitle?: string;
  previewSectionDescription?: string;
  resetButtonText?: string;
  lightMode?: ThemeModeTextConfig;
  darkMode?: ThemeModeTextConfig;
}
