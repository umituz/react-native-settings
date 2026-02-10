/**
 * Support Settings Config Creators
 * Feedback, rating, FAQ
 */

import type {
  FeedbackConfig,
  RatingConfig,
  FAQConfig,
} from "../../screens/types";
import type { FeedbackFormData } from "./types";

/**
 * Create feedback configuration
 */
export const createFeedbackConfig = (
  onSubmit: (data: FeedbackFormData) => Promise<void>,
): FeedbackConfig => ({
  enabled: true,
  icon: "chatbubble-outline",
  onSubmit,
});

/**
 * Create rating configuration
 */
export const createRatingConfig = (
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
export const createFAQConfig = (): FAQConfig => ({
  enabled: true,
  icon: "help-circle-outline",
});
