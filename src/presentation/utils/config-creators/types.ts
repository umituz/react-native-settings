/**
 * Config Creator Types
 */

/**
 * Translation options for i18n parameters
 */
export type TranslationOptions = Record<string, string | number | boolean>;

/**
 * Translation function type
 */
export type TranslationFunction = (key: string, options?: TranslationOptions) => string;

/**
 * Feedback form data interface
 */
export interface FeedbackFormData {
  type: string;
  rating: number;
  description: string;
  title: string;
}
