/**
 * Error Utilities
 * Centralized error message formatting and handling
 */

/**
 * Format error message from unknown error type
 * Handles Error instances, string errors, and unknown error types
 *
 * @param error - The error to format
 * @returns Formatted error message string
 *
 * @example
 * ```typescript
 * try {
 *   await riskyOperation();
 * } catch (err) {
 *   const message = formatErrorMessage(err);
 *   console.error(message);
 * }
 * ```
 */
export const formatErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Unknown error';
};

