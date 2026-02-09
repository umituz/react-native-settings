/**
 * Date Utilities
 *
 * Helper functions for date manipulation and calculations.
 */

/**
 * Calculate days between two dates
 * @param dateString ISO date string
 * @param now Current date (defaults to new Date())
 * @returns Number of days between dates
 */
export function daysBetween(dateString: string, now: Date = new Date()): number {
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Format date to ISO string
 * @param date Date to format
 * @returns ISO date string
 */
export function toISOString(date: Date = new Date()): string {
  return date.toISOString();
}

/**
 * Check if a date is within the last N days
 * @param dateString ISO date string to check
 * @param days Number of days to check within
 * @returns true if date is within the last N days
 */
export function isWithinLastDays(dateString: string, days: number): boolean {
  const daysDiff = daysBetween(dateString);
  return daysDiff >= 0 && daysDiff <= days;
}

/**
 * Check if a date has passed (is older than N days ago)
 * @param dateString ISO date string to check
 * @param days Number of days threshold
 * @returns true if date is older than N days
 */
export function isOlderThanDays(dateString: string, days: number): boolean {
  const daysDiff = daysBetween(dateString);
  return daysDiff > days;
}

/**
 * Add days to a date
 * @param dateString ISO date string
 * @param days Number of days to add
 * @returns New date with days added
 */
export function addDays(dateString: string, days: number): Date {
  const date = new Date(dateString);
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
