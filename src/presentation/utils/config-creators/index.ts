/**
 * Config Creators - Barrel export
 */

// Types
export type { TranslationFunction, FeedbackFormData } from "./types";

// Base configs
export {
  createAppearanceConfig,
  createLanguageConfig,
  createNotificationsConfig,
  createAboutConfig,
  createLegalConfig,
} from "./base-configs";

// Support configs
export {
  createFeedbackConfig,
  createRatingConfig,
  createFAQConfig,
} from "./support-configs";

// Feature configs
export {
  createSubscriptionConfig,
  createGamificationConfig,
} from "./feature-configs";
