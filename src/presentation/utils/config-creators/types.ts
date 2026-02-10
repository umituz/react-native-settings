/**
 * Config Creator Types
 */

/**
 * Translation function type
 */
export type TranslationFunction = (key: string, options?: any) => string;

/**
 * Feedback form data interface
 */
export interface FeedbackFormData {
  type: string;
  rating: number;
  description: string;
  title: string;
}
