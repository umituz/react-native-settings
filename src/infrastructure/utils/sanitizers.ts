/**
 * Sanitization Utilities
 *
 * Provides sanitization functions for user input and props.
 */

import { TEXT_LENGTH_LIMITS } from './constants/textLimits';

/**
 * Sanitize string by trimming and limiting length
 */
export function sanitizeString(str: string | undefined, maxLength: number): string {
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

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

/**
 * Escape HTML entities (for security)
 */
export function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}
