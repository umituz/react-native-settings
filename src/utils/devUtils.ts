/**
 * Development Mode Utilities
 *
 * Provides safe, standardized helpers for development-only code.
 * All utilities check for __DEV__ existence to prevent runtime errors.
 */

/**
 * Safe development mode check
 * Handles cases where __DEV__ is not defined
 *
 * @returns true if in development mode, false otherwise
 */
export const isDev = (): boolean => {
  return typeof __DEV__ !== 'undefined' && __DEV__;
};

/**
 * Log only in development mode
 *
 * @param args - Arguments to log
 */
export const devLog = (...args: unknown[]): void => {
  if (isDev()) {
    console.log('[DEV]', ...args);
  }
};

/**
 * Warn only in development mode
 *
 * @param args - Arguments to warn
 */
export const devWarn = (...args: unknown[]): void => {
  if (isDev()) {
    console.warn('[DEV]', ...args);
  }
};

/**
 * Error only in development mode
 *
 * @param args - Arguments to error
 */
export const devError = (...args: unknown[]): void => {
  if (isDev()) {
    console.error('[DEV]', ...args);
  }
};

