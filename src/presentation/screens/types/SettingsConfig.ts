/**
 * Main Settings Configuration Type
 * Combines all feature configurations
 */

import type { FeatureVisibility } from "./FeatureConfig";
import type {
  AppearanceConfig,
  LanguageConfig,
  NotificationsConfig,
  AboutConfig,
  LegalConfig,
} from "./FeatureConfig";
import type {
  AccountConfig,
  SupportConfig,
  DeveloperConfig,
} from "./ExtendedConfig";

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
   * Appearance settings (Theme customization)
   * @default 'auto'
   */
  appearance?: FeatureVisibility | AppearanceConfig;

  /**
   * Language settings
   * @default 'auto'
   */
  language?: FeatureVisibility | LanguageConfig;

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