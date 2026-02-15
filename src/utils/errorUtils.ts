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

/**
 * Format error for logging with optional context
 * Useful for debugging and error tracking
 *
 * @param error - The error to format
 * @param context - Optional context string (e.g., function name, operation)
 * @returns Formatted error string with context
 *
 * @example
 * ```typescript
 * try {
 *   await fetchUserData();
 * } catch (err) {
 *   console.error(formatErrorForLogging(err, 'fetchUserData'));
 *   // Output: "[fetchUserData] Network timeout"
 * }
 * ```
 */
export const formatErrorForLogging = (error: unknown, context?: string): string => {
  const message = formatErrorMessage(error);
  return context ? `[${context}] ${message}` : message;
};
