/**
 * Language Switcher
 *
 * Handles switching between languages
 * - Language validation
 * - Persistence
 */

import { storageRepository } from '@umituz/react-native-design-system';
import i18n from '../config/i18n';
import { languageRepository } from '../repository/LanguageRepository';
import { isDev } from '../../../../utils/devUtils';

const LANGUAGE_STORAGE_KEY = '@localization:language';

export class LanguageSwitcher {
  /**
   * Switch to a new language
   */
  static async switchLanguage(languageCode: string): Promise<{
    languageCode: string;
    isRTL: boolean;
  }> {
    try {
      if (isDev()) {
      }

      const language = languageRepository.getLanguageByCode(languageCode);

      if (isDev()) {
      }

      await i18n.changeLanguage(languageCode);

      if (isDev()) {
      }

      await storageRepository.setString(LANGUAGE_STORAGE_KEY, languageCode);

      if (isDev()) {
      }

      return {
        languageCode,
        isRTL: language?.isRTL ?? false,
      };
    } catch (error) {
      console.error('[LanguageSwitcher] Failed to switch language:', languageCode, error);
      throw error;
    }
  }
}
