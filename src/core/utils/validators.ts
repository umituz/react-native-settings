/**
 * Common Validators
 *
 * Reusable validation functions for domains.
 * All validators should be pure functions.
 *
 * @example
 * ```ts
 * import { validators } from '@/core/utils/validators';
 *
 * if (!validators.isValidEmail(email)) {
 *   return { error: 'Invalid email' };
 * }
 * ```
 */

/**
 * Common validation utilities
 */
export const validators = {
  /**
   * Check if value is not empty (null, undefined, or empty string)
   */
  isNotEmpty: <T>(value: T | null | undefined | ''): value is T => {
    return value !== null && value !== undefined && value !== '';
  },

  /**
   * Check if string is a valid email format
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Check if string is a valid URL
   */
  isValidUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Check if value is within range (inclusive)
   */
  isInRange: (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
  },

  /**
   * Check if value is a positive number
   */
  isPositive: (value: number): boolean => {
    return value > 0;
  },

  /**
   * Check if value is a non-negative number
   */
  isNonNegative: (value: number): boolean => {
    return value >= 0;
  },

  /**
   * Check if array has items
   */
  hasItems: <T>(array: T[] | readonly T[]): boolean => {
    return Array.isArray(array) && array.length > 0;
  },

  /**
   * Check if value is a valid ISO date string
   */
  isValidISODate: (dateString: string): boolean => {
    if (!dateString) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  },

  /**
   * Check if date is in the past
   */
  isPastDate: (dateString: string): boolean => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime()) && date < new Date();
  },

  /**
   * Check if date is in the future
   */
  isFutureDate: (dateString: string): boolean => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime()) && date > new Date();
  },

  /**
   * Check if object has required properties
   */
  hasProperties: <T extends object>(
    obj: T,
    properties: (keyof T)[]
  ): boolean => {
    return properties.every((prop) => prop in obj);
  },

  /**
   * Check if string meets minimum length
   */
  hasMinLength: (str: string, min: number): boolean => {
    return typeof str === 'string' && str.length >= min;
  },

  /**
   * Check if string meets maximum length
   */
  hasMaxLength: (str: string, max: number): boolean => {
    return typeof str === 'string' && str.length <= max;
  },

  /**
   * Check if value is one of the allowed values
   */
  isOneOf: <T>(value: T, allowed: readonly T[]): boolean => {
    return allowed.includes(value);
  },

  /**
   * Check if time is valid (hour: minute)
   */
  isValidTime: (hour: number, minute: number): boolean => {
    return (
      validators.isInRange(hour, 0, 23) &&
      validators.isInRange(minute, 0, 59)
    );
  },

  /**
   * Check if time range is valid (start before end)
   */
  isValidTimeRange: (
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number
  ): boolean => {
    if (!validators.isValidTime(startHour, startMinute)) return false;
    if (!validators.isValidTime(endHour, endMinute)) return false;

    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    // Allow ranges that span midnight (e.g., 22:00 - 06:00)
    return startMinutes !== endMinutes;
  },
};

/**
 * Validation result type
 */
export type ValidationResult<T> =
  | { valid: true; data: T }
  | { valid: false; error: string };

/**
 * Create a validation result
 */
export function valid<T>(data: T): ValidationResult<T> {
  return { valid: true, data };
}

/**
 * Create an invalid validation result
 */
export function invalid(error: string): ValidationResult<never> {
  return { valid: false, error };
}

/**
 * Chain multiple validations
 *
 * @example
 * ```ts
 * const result = validateAll(
 *   validators.isValidEmail(email) || 'Invalid email',
 *   validators.hasMinLength(email, 5) || 'Email too short'
 * );
 * ```
 */
export function validateAll(
  ...checks: (boolean | string)[]
): ValidationResult<null> {
  for (const check of checks) {
    if (check !== true) {
      return invalid(typeof check === 'string' ? check : 'Validation failed');
    }
  }
  return valid(null);
}
