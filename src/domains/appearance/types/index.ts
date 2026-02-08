/**
 * Appearance Domain Types
 *
 * Types for appearance settings including theme mode and custom colors
 */

import type {
  ThemeMode as BaseThemeMode,
  CustomThemeColors,
} from "@umituz/react-native-design-system";

// Extended theme mode to support 'auto' option
export type ThemeMode = BaseThemeMode | 'auto';

export type { CustomThemeColors };

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
  /** Custom onPress handler (overrides navigation) */
  onPress?: () => void;
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
  featuresSectionTitle?: string;
  colorsSectionTitle?: string;
  colorsSectionDescription?: string;
  previewSectionTitle?: string;
  previewSectionDescription?: string;
  resetButtonText?: string;
  lightMode?: ThemeModeTextConfig;
  darkMode?: ThemeModeTextConfig;
}
