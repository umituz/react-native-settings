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

// =============================================================================
// PRESENTATION LAYER - Navigation
// =============================================================================

export { SettingsStackNavigator } from './presentation/navigation/SettingsStackNavigator';
export type {
  SettingsStackNavigatorProps,
  SettingsStackParamList
} from './presentation/navigation/SettingsStackNavigator';

// =============================================================================
// PRESENTATION LAYER - Types
// =============================================================================

export type {
  SettingsConfig,
  CustomSettingsSection,
  SubscriptionConfig,
} from './presentation/screens/types';

// =============================================================================
// PRESENTATION LAYER - Components
// =============================================================================

export { SettingItem } from './presentation/components/SettingItem';
export type { SettingItemProps } from './presentation/components/SettingItem';

export { SettingsSection } from './presentation/components/SettingsSection';
export type { SettingsSectionProps } from './presentation/components/SettingsSection';

export { SettingsFooter } from './presentation/components/SettingsFooter';
export type { SettingsFooterProps } from './presentation/components/SettingsFooter';

export { SettingsErrorBoundary } from './presentation/components/SettingsErrorBoundary';

export { CloudSyncSetting } from './presentation/components/CloudSyncSetting';
export type { CloudSyncSettingProps } from './presentation/components/CloudSyncSetting';

export { StorageClearSetting } from './presentation/components/StorageClearSetting';
export type { StorageClearSettingProps } from './presentation/components/StorageClearSetting';

export { DevSettingsSection } from './presentation/components/DevSettingsSection';
export type { DevSettingsProps } from './presentation/components/DevSettingsSection';

// =============================================================================
// PRESENTATION LAYER - Re-exports from Dependencies
// =============================================================================

// @ts-ignore - Re-exporting from peer dependency
export { OnboardingResetSetting } from '@umituz/react-native-onboarding';
// @ts-ignore - Re-exporting from peer dependency  
export type { OnboardingResetSettingProps } from '@umituz/react-native-onboarding';

// @ts-ignore - Re-exporting from peer dependency
export { createSentryTestSetting } from '@umituz/react-native-sentry';
// @ts-ignore - Re-exporting from peer dependency
export type { SentryTestSettingProps } from '@umituz/react-native-sentry';

