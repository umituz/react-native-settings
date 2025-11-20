/**
 * Settings Configuration Types
 * 
 * Comprehensive configuration system for SettingsScreen
 * Supports built-in features and custom sections
 */

import type { ComponentType, ReactNode } from "react";

/**
 * Feature visibility configuration
 * - true: Always show (if navigation screen exists)
 * - false: Never show
 * - 'auto': Automatically detect (check if navigation screen exists and package is available)
 */
export type FeatureVisibility = boolean | "auto";

/**
 * Appearance Settings Configuration
 */
export interface AppearanceConfig {
  /** Show appearance section */
  enabled?: FeatureVisibility;
  /** Custom navigation route for appearance screen */
  route?: string;
  /** Show language selection */
  showLanguage?: boolean;
  /** Show theme toggle */
  showTheme?: boolean;
  /** Custom appearance title */
  title?: string;
  /** Custom appearance description */
  description?: string;
}

/**
 * Notifications Settings Configuration
 */
export interface NotificationsConfig {
  /** Show notifications section */
  enabled?: FeatureVisibility;
  /** Custom navigation route for notifications screen */
  route?: string;
  /** Show notifications toggle switch */
  showToggle?: boolean;
  /** Initial notifications state */
  initialValue?: boolean;
  /** Custom toggle handler */
  onToggleChange?: (value: boolean) => void;
  /** Custom notifications title */
  title?: string;
  /** Custom notifications description */
  description?: string;
}

/**
 * About Settings Configuration
 */
export interface AboutConfig {
  /** Show about section */
  enabled?: FeatureVisibility;
  /** Custom navigation route for about screen */
  route?: string;
  /** Custom about title */
  title?: string;
  /** Custom about description */
  description?: string;
}

/**
 * Legal Settings Configuration
 */
export interface LegalConfig {
  /** Show legal section */
  enabled?: FeatureVisibility;
  /** Custom navigation route for legal screen */
  route?: string;
  /** Custom legal title */
  title?: string;
  /** Custom legal description */
  description?: string;
}

/**
 * Account Settings Configuration
 */
export interface AccountConfig {
  /** Show account section */
  enabled?: FeatureVisibility;
  /** Custom navigation route for account screen */
  route?: string;
  /** Custom account title */
  title?: string;
  /** Custom account description */
  description?: string;
}

/**
 * Support Settings Configuration
 */
export interface SupportConfig {
  /** Show support section */
  enabled?: FeatureVisibility;
  /** Support items configuration */
  items?: {
    /** Live support configuration */
    liveSupport?: {
      enabled?: boolean;
      route?: string;
      title?: string;
      description?: string;
    };
    /** Help support configuration */
    helpSupport?: {
      enabled?: boolean;
      route?: string;
      title?: string;
      description?: string;
    };
  };
  /** Custom support section title */
  title?: string;
}

/**
 * Developer Settings Configuration
 */
export interface DeveloperConfig {
  /** Show developer section (only in __DEV__ mode) */
  enabled?: boolean;
  /** Developer settings items */
  items?: Array<{
    title: string;
    description?: string;
    route?: string;
    onPress?: () => void;
    icon?: ComponentType<{ size?: number; color?: string }>;
    iconColor?: string;
    titleColor?: string;
  }>;
  /** Custom developer section title */
  title?: string;
}

/**
 * Main Settings Configuration
 * 
 * Controls which settings features are visible in the SettingsScreen.
 * Each feature can be configured with:
 * - Simple: boolean | 'auto' (quick setup)
 * - Advanced: Detailed config object (full control)
 * 
 * @example
 * // Simple configuration
 * const config: SettingsConfig = {
 *   appearance: true,
 *   notifications: 'auto',
 *   about: false,
 * };
 * 
 * @example
 * // Advanced configuration
 * const config: SettingsConfig = {
 *   appearance: {
 *     enabled: true,
 *     route: 'CustomAppearance',
 *     showLanguage: true,
 *     showTheme: true,
 *   },
 *   notifications: {
 *     enabled: 'auto',
 *     showToggle: true,
 *     initialValue: false,
 *     onToggleChange: (value) => console.log(value),
 *   },
 *   support: {
 *     enabled: true,
 *     items: {
 *       liveSupport: {
 *         enabled: true,
 *         route: 'ChatSupport',
 *         title: 'Live Chat',
 *       },
 *     },
 *   },
 * };
 */
export interface SettingsConfig {
  /**
   * Appearance settings (Theme & Language)
   * @default 'auto'
   */
  appearance?: FeatureVisibility | AppearanceConfig;

  /**
   * Notifications settings
   * @default 'auto'
   */
  notifications?: FeatureVisibility | NotificationsConfig;

  /**
   * About settings
   * @default 'auto'
   */
  about?: FeatureVisibility | AboutConfig;

  /**
   * Legal settings (Terms, Privacy Policy)
   * @default 'auto'
   */
  legal?: FeatureVisibility | LegalConfig;

  /**
   * Account settings
   * @default false
   */
  account?: FeatureVisibility | AccountConfig;

  /**
   * Support settings
   * @default false
   */
  support?: FeatureVisibility | SupportConfig;

  /**
   * Developer settings (only shown in __DEV__ mode)
   * @default false
   */
  developer?: boolean | DeveloperConfig;
}

/**
 * Custom Settings Section
 * Allows apps to add custom sections to the settings screen
 */
export interface CustomSettingsSection {
  /** Section title */
  title: string;
  /** Section content (React nodes) */
  content: ReactNode;
  /** Section order (lower = higher in list) */
  order?: number;
  /** Section ID for identification */
  id?: string;
}
