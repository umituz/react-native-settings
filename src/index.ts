/**
 * @umituz/react-native-settings - Public API
 *
 * Settings management for React Native apps
 * User preferences, theme, language, notifications
 *
 * Usage:
 *   import { useSettings, useSettingsStore, SettingsScreen, AppearanceScreen, LanguageSelectionScreen, SettingItem, DisclaimerSetting } from '@umituz/react-native-settings';
 */

// =============================================================================
// DOMAIN LAYER - Repository Interfaces
// =============================================================================

export type {
  ISettingsRepository,
  UserSettings,
  SettingsError,
  SettingsResult,
} from './domain/repositories/ISettingsRepository';

// =============================================================================
// INFRASTRUCTURE LAYER - Storage
// =============================================================================

export {
  useSettingsStore,
  useSettings,
} from './infrastructure/storage/SettingsStore';

// =============================================================================
// PRESENTATION LAYER - Screens
// =============================================================================

export { SettingsScreen } from './presentation/screens/SettingsScreen';
export type { SettingsScreenProps } from './presentation/screens/SettingsScreen';
export { AppearanceScreen } from './presentation/screens/AppearanceScreen';
export { LanguageSelectionScreen } from './presentation/screens/LanguageSelectionScreen';

// =============================================================================
// PRESENTATION LAYER - Types
// =============================================================================

export type { SettingsConfig } from './presentation/screens/types';

// =============================================================================
// PRESENTATION LAYER - Components
// =============================================================================

export { SettingItem } from './presentation/components/SettingItem';
export type { SettingItemProps } from './presentation/components/SettingItem';

export { SettingsSection } from './presentation/components/SettingsSection';
export type { SettingsSectionProps } from './presentation/components/SettingsSection';

export { SettingsFooter } from './presentation/components/SettingsFooter';
export type { SettingsFooterProps } from './presentation/components/SettingsFooter';

export { UserProfileHeader } from './presentation/components/UserProfileHeader';
export type { UserProfileHeaderProps } from './presentation/components/UserProfileHeader';

export { DisclaimerSetting } from './presentation/components/DisclaimerSetting';

