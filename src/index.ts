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
} from './application/ports/ISettingsRepository';

// =============================================================================
// INFRASTRUCTURE LAYER - Services
// =============================================================================

export { getSettingsService } from './infrastructure/services/SettingsService';
export { SettingsRepository } from './infrastructure/repositories/SettingsRepository';

// =============================================================================
// PRESENTATION LAYER - Hooks
// =============================================================================

export { useSettings } from './presentation/hooks/useSettings';
export { useSettingsQuery } from './presentation/hooks/queries/useSettingsQuery';
export {
  useUpdateSettingsMutation,
  useResetSettingsMutation
} from './presentation/hooks/mutations/useSettingsMutations';


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
  SettingsStackParamList,
  AppInfo,
  LegalUrls,
  UserProfileConfig,
  AdditionalScreen,
  FAQData,
} from './presentation/navigation/types';

// =============================================================================
// PRESENTATION LAYER - Types
// =============================================================================

export type {
  SettingsConfig,
  CustomSettingsSection,
} from './presentation/screens/types';

// =============================================================================
// PRESENTATION LAYER - Components
// =============================================================================

export { SettingItem } from './presentation/components/SettingItem';
export type { SettingItemProps } from './presentation/components/SettingItem';

export { SettingsItemCard } from './presentation/components/SettingsItemCard';
export type { SettingsItemCardProps } from './presentation/components/SettingsItemCard';

export { SettingsSection } from './presentation/components/SettingsSection';
export type { SettingsSectionProps } from './presentation/components/SettingsSection';

export { SettingsFooter } from './presentation/components/SettingsFooter';
export type { SettingsFooterProps } from './presentation/components/SettingsFooter';

export { SettingsErrorBoundary } from './presentation/components/SettingsErrorBoundary';

export { StorageClearSetting } from './presentation/components/StorageClearSetting';
export type { StorageClearSettingProps } from './presentation/components/StorageClearSetting';

export { CloudSyncSetting } from './presentation/components/CloudSyncSetting';
export type { CloudSyncSettingProps } from './presentation/components/CloudSyncSetting';

export { DevSettingsSection } from './presentation/components/DevSettingsSection';
export type { DevSettingsProps } from './presentation/components/DevSettingsSection';

// =============================================================================
// DOMAIN EXPORTS - Consolidated Features
// =============================================================================

// About Domain - User info, app details, version
export * from './domains/about';

// Legal Domain - Terms, privacy, licenses
export * from './domains/legal';

// Disclaimer Domain - Disclaimer card, modal, settings
export * from './domains/disclaimer';

// Appearance Domain - Theme, dark mode
export * from './domains/appearance';

// Feedback Domain - User feedback, bug reports
export * from './domains/feedback';

// FAQs Domain - Frequently asked questions
export * from './domains/faqs';

// Rating Domain - Star ratings, reviews, statistics
export * from "./domains/rating";

// Video Tutorials Domain - Learning resources, tutorials
export * from "./domains/video-tutorials";

// =============================================================================
// PRESENTATION LAYER - Re-exports from Dependencies
// =============================================================================

// @ts-ignore - Re-exporting from peer dependency
export { OnboardingResetSetting } from '@umituz/react-native-onboarding';
// @ts-ignore - Re-exporting from peer dependency  
export type { OnboardingResetSettingProps } from '@umituz/react-native-onboarding';

// @ts-ignore - Re-exporting from peer dependency
// @ts-ignore - Re-exporting from peer dependency
