/**
 * Sanitization Utilities
 *
 * Provides sanitization functions for user input and props.
 */

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
  return sanitizeString(title, 200) || "";
}

/**
 * Sanitize description prop
 */
export function sanitizeDescription(description: string | undefined): string | undefined {
  return sanitizeString(description || "", 500);
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
