// Providers
export { LocalizationProvider } from './presentation/providers/LocalizationProvider';

// Hooks
export { useLocalization } from './infrastructure/hooks/useLocalization';
export { useLocalizationStore } from './infrastructure/storage/LocalizationStore';
export { useTranslationFunction } from './infrastructure/hooks/useTranslation';
export { useLanguageSelection } from './infrastructure/hooks/useLanguageSelection';
export { useLanguageSwitcher } from './infrastructure/components/useLanguageSwitcher';
export { useLanguageNavigation } from './infrastructure/components/useLanguageNavigation';

// Components
export { LanguageSwitcher } from './infrastructure/components/LanguageSwitcher';

// Screens
export { LanguageSelectionScreen } from './presentation/screens/LanguageSelectionScreen';
export type { LanguageSelectionScreenProps } from './presentation/screens/LanguageSelectionScreen.types';
export { LanguageSection } from './presentation/components/LanguageSection';
export type { LanguageSectionProps, LanguageSectionConfig } from './presentation/components/LanguageSection';

// Configuration
export { default as i18n } from './infrastructure/config/i18n';
export { I18nInitializer } from './infrastructure/config/I18nInitializer';
export {
  SUPPORTED_LANGUAGES,
  LANGUAGES,
  DEFAULT_LANGUAGE,
  getLanguageByCode,
  isLanguageSupported,
  getDefaultLanguage,
  getDeviceLocale,
  searchLanguages,
} from './infrastructure/config/languages';

// Types
export type { Language, ILocalizationRepository } from './domain/repositories/ILocalizationRepository';
