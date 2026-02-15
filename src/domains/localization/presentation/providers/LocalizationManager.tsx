/**
 * LocalizationProvider
 * Initializes i18n with app translations and manages language state
 */

import React, { useEffect, useState } from "react";
import { I18nInitializer } from "../../infrastructure/config/I18nInitializer";
import { useLocalizationStore } from "../../infrastructure/storage/LocalizationStore";
import { isDev } from "../../../../utils/devUtils";

interface LocalizationProviderProps {
  children: React.ReactNode;
  translations: Record<string, Record<string, unknown>>;
  defaultLanguage?: string;
}

export const LocalizationManager: React.FC<LocalizationProviderProps> = ({
  children,
  translations,
  defaultLanguage = "en-US",
}) => {
  const [isI18nReady, setIsI18nReady] = useState(false);
  const initialize = useLocalizationStore((state) => state.initialize);

  useEffect(() => {
    let isMounted = true;

    const initializeLocalization = async () => {
      try {
        I18nInitializer.initialize(translations, defaultLanguage);
        await initialize();
        if (isMounted) {
          setIsI18nReady(true);
        }
      } catch (error) {
        if (isDev()) {
          console.error('[LocalizationManager] Initialization failed:', error);
        }
        if (isMounted) {
          setIsI18nReady(true); // Set ready even on error to prevent indefinite loading
        }
      }
    };

    initializeLocalization();

    return () => {
      isMounted = false;
    };
  }, [translations, defaultLanguage, initialize]);

  if (!isI18nReady) {
    return null;
  }

  return <>{children}</>;
};
