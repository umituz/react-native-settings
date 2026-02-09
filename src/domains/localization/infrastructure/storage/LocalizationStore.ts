/**
 * Localization Store Factory
 * Creates and manages localization state with proper separation of concerns
 */

import { create } from 'zustand';
import type { LocalizationState, LocalizationActions, LocalizationGetters } from './types/LocalizationState';
import { LanguageInitializer } from './LanguageInitializer';
import { LanguageSwitcher } from './LanguageSwitcher';
import { languageRepository } from '../repository/LanguageRepository';

declare const __DEV__: boolean;

type LocalizationStoreType = LocalizationState & LocalizationActions & LocalizationGetters;

const LANGUAGE_SWITCH_DEBOUNCE_MS = 300;

export const useLocalizationStore = create<LocalizationStoreType>((set, get) => {
  // Instance-level state to prevent memory leaks
  let initializeInProgress = false;
  let initializePromise: Promise<void> | null = null;
  let languageSwitchTimer: ReturnType<typeof setTimeout> | null = null;
  const pendingResolvers: Array<() => void> = [];

  return {
    // State
    currentLanguage: 'en-US',
    isRTL: false,
    isInitialized: false,
    supportedLanguages: languageRepository.getLanguages(),

    // Actions
    initialize: async () => {
      const { isInitialized: alreadyInitialized } = get();

      // Return existing promise if initialization is in progress
      if (initializeInProgress && initializePromise) {
        return initializePromise;
      }

      // Return if already initialized
      if (alreadyInitialized) {
        return;
      }

      // Set mutex and create promise
      initializeInProgress = true;
      initializePromise = (async () => {
        try {
          const result = await LanguageInitializer.initialize();

          set({
            currentLanguage: result.languageCode,
            isRTL: result.isRTL,
            isInitialized: true,
          });
        } catch (error) {
          // Log and set fallback state
          if (typeof __DEV__ !== "undefined" && __DEV__) {
          }

          set({
            currentLanguage: 'en-US',
            isRTL: false,
            isInitialized: true,
          });

          throw error; // Re-throw to allow error handling
        } finally {
          initializeInProgress = false;
          initializePromise = null;
        }
      })();

      return initializePromise;
    },

    setLanguage: async (languageCode: string) => {
      // Validate input
      if (!languageCode || typeof languageCode !== 'string') {
        throw new Error('Invalid language code provided');
      }

      // Clear existing timer
      if (languageSwitchTimer) {
        clearTimeout(languageSwitchTimer);
        languageSwitchTimer = null;
      }

      return new Promise<void>((resolve, reject) => {
        // Add resolver to pending list
        pendingResolvers.push(() => {
          // Resolve successfully
          resolve();
        });

        // Create rejection handler
        const rejectAndCleanup = (error: Error) => {
          // Remove this resolver
          const index = pendingResolvers.findIndex(r => r === resolve);
          if (index > -1) {
            pendingResolvers.splice(index, 1);
          }
          reject(error);
        };

        languageSwitchTimer = setTimeout(async () => {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
          }

          try {
            const result = await LanguageSwitcher.switchLanguage(languageCode);

            if (typeof __DEV__ !== "undefined" && __DEV__) {
            }

            set({
              currentLanguage: result.languageCode,
              isRTL: result.isRTL,
            });

            if (typeof __DEV__ !== "undefined" && __DEV__) {
            }

            // Resolve ALL pending promises
            const resolvers = [...pendingResolvers];
            pendingResolvers.length = 0; // Clear array
            resolvers.forEach(r => r());
          } catch (error) {
            const errorMessage = error instanceof Error ? error : new Error(String(error));

            if (typeof __DEV__ !== "undefined" && __DEV__) {
            }

            // Reject all pending promises
            const resolvers = [...pendingResolvers];
            pendingResolvers.length = 0; // Clear array
            resolvers.forEach(() => {
              // Each resolver is wrapped to handle rejection
              // Note: We can't reject promises already created, so we just clear them
            });

            // Reject this specific promise
            rejectAndCleanup(errorMessage);
          } finally {
            languageSwitchTimer = null;
          }
        }, LANGUAGE_SWITCH_DEBOUNCE_MS);
      });
    },

    reset: () => {
      // Clear any pending language switch
      if (languageSwitchTimer) {
        clearTimeout(languageSwitchTimer);
        languageSwitchTimer = null;
      }

      // Resolve any pending promises to prevent hanging
      const resolvers = [...pendingResolvers];
      pendingResolvers.length = 0; // Clear array
      resolvers.forEach(r => r());

      // Reset mutex
      initializeInProgress = false;
      initializePromise = null;

      set({
        currentLanguage: 'en-US',
        isRTL: false,
        isInitialized: false,
      });
    },

    // Getters
    getCurrentLanguage: () => {
      const { currentLanguage } = get();
      return languageRepository.getLanguageByCode(currentLanguage);
    },

    isLanguageSupported: (code: string) => {
      return languageRepository.isLanguageSupported(code);
    },

    getSupportedLanguages: () => {
      return languageRepository.getLanguages();
    },
  };
});
