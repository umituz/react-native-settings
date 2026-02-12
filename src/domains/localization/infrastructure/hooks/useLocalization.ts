import { useCallback, useEffect } from 'react';
import { useLocalizationStore } from '../storage/LocalizationStore';
import { useTranslationFunction } from './useTranslation';
import type { Language } from '../../domain/repositories/ILocalizationRepository';

export const useLocalization = () => {
  const store = useLocalizationStore();
  const { t } = useTranslationFunction();

  // Destructure to avoid recreating callbacks when store object changes
  const { isInitialized, initialize } = store;

  const getCurrentLanguageObject = useCallback((): Language | undefined => {
    return store.getCurrentLanguage();
  }, [store]);

  const handleSetLanguage = useCallback(async (languageCode: string) => {
    await store.setLanguage(languageCode);
  }, [store]);

  const handleInitialize = useCallback(async () => {
    await initialize();
  }, [initialize]);

  const isLanguageSupported = useCallback((code: string) => {
    return store.isLanguageSupported(code);
  }, [store]);

  const getSupportedLanguages = useCallback(() => {
    return store.getSupportedLanguages();
  }, [store]);

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  return {
    t,
    currentLanguage: store.currentLanguage,
    currentLanguageObject: getCurrentLanguageObject(),
    isRTL: store.isRTL,
    isInitialized: store.isInitialized,
    setLanguage: handleSetLanguage,
    initialize: handleInitialize,
    isLanguageSupported,
    supportedLanguages: getSupportedLanguages(),
  };
};
