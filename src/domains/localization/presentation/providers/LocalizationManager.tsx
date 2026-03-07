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

const INIT_TIMEOUT_MS = 5000;

export const LocalizationManager: React.FC<LocalizationProviderProps> = ({
  children,
  translations,
  defaultLanguage = "en-US",
}) => {
  const [isI18nReady, setIsI18nReady] = useState(false);
  const initialize = useLocalizationStore((state) => state.initialize);

  useEffect(() => {
    let isMounted = true;

    // Safety timeout: proceed even if initialization hangs
    const safetyTimer = setTimeout(() => {
      if (isMounted && !isI18nReady) {
        if (isDev()) {
          console.warn('[LocalizationManager] Initialization timed out, proceeding with defaults');
        }
        // Initialize i18n synchronously with defaults as fallback
        try {
          if (!require('i18next').default?.isInitialized) {
            I18nInitializer.initialize(translations, defaultLanguage);
          }
        } catch {
          // Best effort
        }
        setIsI18nReady(true);
      }
    }, INIT_TIMEOUT_MS);

    const initializeLocalization = async () => {
      try {
        I18nInitializer.initialize(translations, defaultLanguage);
        await initialize();
        if (isMounted) {
          clearTimeout(safetyTimer);
          setIsI18nReady(true);
        }
      } catch (error) {
        if (isDev()) {
          console.error('[LocalizationManager] Initialization failed:', error);
        }
        if (isMounted) {
          clearTimeout(safetyTimer);
          setIsI18nReady(true);
        }
      }
    };

    initializeLocalization();

    return () => {
      isMounted = false;
      clearTimeout(safetyTimer);
    };
  }, [translations, defaultLanguage, initialize]);

  if (!isI18nReady) {
    return null;
  }

  return <>{children}</>;
};
