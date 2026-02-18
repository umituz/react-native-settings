/**
 * Sanitization Utilities
 *
 * Provides sanitization functions for user input and props.
 */

import { TEXT_LENGTH_LIMITS } from './constants/textLimits';

function sanitizeString(str: string | undefined, maxLength: number): string {
  if (!str) return "";
  return str.trim().slice(0, maxLength);
}

/**
 * Sanitize title prop
 */
export function sanitizeTitle(title: string): string {
  return sanitizeString(title, TEXT_LENGTH_LIMITS.TITLE) || "";
}

/**
 * Sanitize description prop
 */
export function sanitizeDescription(description: string | undefined): string | undefined {
  return sanitizeString(description || "", TEXT_LENGTH_LIMITS.DESCRIPTION);
}

