/**
 * Translation Helper Utilities
 *
 * Provides safe translation utilities that handle cases where
 * the translation function might not be available yet.
 */

export type TranslationFunction = (key: string, params?: Record<string, string | number>) => string;

/**
 * Safely get a translation with fallback
 * @param t Translation function
 * @param key Translation key
 * @param fallback Fallback text if translation fails
 * @returns Translated text or fallback
 */
export function getTranslationWithFallback(
  t: TranslationFunction | unknown,
  key: string,
  fallback: string
): string {
  if (typeof t === "function") {
    try {
      return t(key);
    } catch {
      return fallback;
    }
  }
  return fallback;
}

/**
 * Get translation with parameters support
 * @param t Translation function
 * @param key Translation key
 * @param params Parameters for translation
 * @param fallback Fallback text if translation fails
 * @returns Translated text or fallback
 */
export function getTranslationWithParams(
  t: TranslationFunction | unknown,
  key: string,
  params: Record<string, string | number>,
  fallback: string
): string {
  if (typeof t === "function") {
    try {
      return t(key, params);
    } catch {
      return fallback;
    }
  }
  return fallback;
}

/**
 * Check if translation function is available
 * @param t Translation function to check
 * @returns true if translation function is available
 */
export function isTranslationFunctionAvailable(t: unknown): t is TranslationFunction {
  return typeof t === "function";
}

/**
 * Create a safe translation wrapper that always returns a string
 * @param t Translation function
 * @returns Safe translation function
 */
export function createSafeTranslator(t: TranslationFunction | unknown): TranslationFunction {
  return (key: string, params?: Record<string, string | number>) => {
    if (isTranslationFunctionAvailable(t)) {
      try {
        return t(key, params);
      } catch {
        return key;
      }
    }
    return key;
  };
}
