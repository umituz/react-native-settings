/**
 * Languages Configuration - Main Export
 * Central export point for all language-related functionality
 */

// Re-export from DeviceLocale
export { DEFAULT_LANGUAGE, getDeviceLocale } from './DeviceLocale';

// Re-export from LanguageQuery
export {
  getSupportedLanguages,
  getLanguageByCode,
  isLanguageSupported,
  getDefaultLanguage,
  searchLanguages,
} from './LanguageQuery';

// Re-export from LocaleMapping
export { LOCALE_MAPPING } from './LocaleMapping';
