/**
 * LocalizationProvider
 * Initializes i18n with app translations and manages language state
 */

import React, { useEffect, useState } from "react";
import { I18nInitializer } from "../../infrastructure/config/I18nInitializer";
import { useLocalizationStore } from "../../infrastructure/storage/LocalizationStore";

interface LocalizationProviderProps {
  children: React.ReactNode;
  translations: Record<string, Record<string, unknown>>;
  defaultLanguage?: string;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
  children,
  translations,
  defaultLanguage = "en-US",
}) => {
  const [isI18nReady, setIsI18nReady] = useState(false);
  const initialize = useLocalizationStore((state) => state.initialize);

  useEffect(() => {
    const initializeLocalization = async () => {
      I18nInitializer.initialize(translations, defaultLanguage);
      await initialize();
      setIsI18nReady(true);
    };

    initializeLocalization();
  }, [translations, defaultLanguage, initialize]);

  if (!isI18nReady) {
    return null;
  }

  return <>{children}</>;
};
