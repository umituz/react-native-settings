/**
 * Translation Configuration
 * Re-exports from @umituz/react-native-google-translate package
 * This file provides backward compatibility for existing imports
 */

export {
  LANGUAGE_MAP,
  SKIP_WORDS,
  LANGUAGE_NAMES,
  getTargetLanguage,
  isEnglishVariant,
  getLanguageDisplayName,
  shouldSkipWord,
} from '@umituz/react-native-google-translate/services';

// Backward compatibility alias
export function getLangDisplayName(code) {
  return getLanguageDisplayName(code);
}
