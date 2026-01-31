/**
 * @umituz/react-native-settings - Public API
 *
 * Settings management for React Native apps
 * User preferences, theme, language, notifications
 *
 * Usage:
 *   import { useSettings, SettingsScreen, AppearanceScreen, SettingsItemCard, DisclaimerSetting } from '@umituz/react-native-settings';
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
  AccountConfig,
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

export { SettingsItemCard } from './presentation/components/SettingsItemCard';
export type { SettingsItemCardProps } from './presentation/components/SettingsItemCard';

export { SettingsSection } from './presentation/components/SettingsSection';
export type { SettingsSectionProps } from './presentation/components/SettingsSection';

export { SettingsFooter } from './presentation/components/SettingsFooter';
export type { SettingsFooterProps } from './presentation/components/SettingsFooter';

export { SettingsErrorBoundary } from './presentation/components/SettingsErrorBoundary';


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

// Rating Domain - Star ratings, reviews, statistics, app store rating
export {
  StarRating,
  RatingPromptModal,
  useAppRating,
  DEFAULT_RATING_CONFIG,
  type RatingValue,
  type Rating,
  type RatingStats,
  type RatingConfig as AppStoreRatingConfig,
  type RatingState as AppStoreRatingState,
  type RatingTranslations as AppStoreRatingTranslations,
  type UseAppRatingResult,
  type StarRatingProps,
  type RatingPromptModalProps,
} from "./domains/rating";

// Video Tutorials Domain - Learning resources, tutorials
export * from "./domains/video-tutorials";

// Cloud Sync Domain - Cloud synchronization settings
export * from "./domains/cloud-sync";

// Dev Domain - Development-only settings (DEV mode)
export * from "./domains/dev";

// Gamification Domain - Achievements, levels, streaks
export * from "./domains/gamification";

// Localization Domain - i18n, language selection, translations
export * from "./domains/localization";

// =============================================================================
// PRESENTATION LAYER - Config Creator Utilities
// =============================================================================

// Notifications Domain
export * from "./domains/notifications";

export {
  createAppearanceConfig,
  createLanguageConfig,
  createNotificationsConfig,
  createAboutConfig,
  createLegalConfig,
  createFeedbackConfig,
  createRatingConfig,
  createFAQConfig,
  createSubscriptionConfig,
  createGamificationConfig,
  type TranslationFunction,
  type FeedbackFormData,
} from './presentation/utils';
