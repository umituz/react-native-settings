/**
 * Support Settings Config Creators
 * Feedback, rating, FAQ
 */

import type {
  FeedbackConfig,
  RatingConfig,
  FAQConfig,
} from "../../screens/types";
import type { TranslationFunction, FeedbackFormData } from "./types";

/**
 * Create feedback configuration
 */
export const createFeedbackConfig = (
  t: TranslationFunction,
  onSubmit: (data: FeedbackFormData) => Promise<void>,
): FeedbackConfig => ({
  enabled: true,
  title: t("settings.feedback.title"),
  description: t("settings.feedback.description"),
  icon: "chatbubble-outline",
  sectionTitle: t("settings.sections.support"),
  onSubmit,
});

/**
 * Create rating configuration
 */
export const createRatingConfig = (
  t: TranslationFunction,
  onRate: () => void,
  storeUrl?: string,
): RatingConfig => ({
  enabled: true,
  onRate,
  storeUrl,
});

/**
 * Create FAQ configuration
 * Navigation is handled internally by the package - no callback needed
 */
export const createFAQConfig = (
  t: TranslationFunction,
): FAQConfig => ({
  enabled: true,
  title: t("settings.faqs.title"),
  description: t("settings.faqs.description"),
  icon: "help-circle-outline",
  sectionTitle: t("settings.sections.support").toUpperCase(),
});
