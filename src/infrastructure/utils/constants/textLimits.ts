/**
 * Text Length Limits
 * Standardized text length constraints used across the application
 */

export const TEXT_LENGTH_LIMITS = {
  /** Short titles and labels (100 characters) */
  TITLE_SHORT: 100,

  /** Standard titles (200 characters) */
  TITLE: 200,

  /** Descriptions and short text (500 characters) */
  DESCRIPTION: 500,

  /** Long text and body content (1000 characters) */
  BODY: 1000,

  /** User ID maximum length (128 characters) */
  USER_ID: 128,
} as const;
