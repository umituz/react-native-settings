/**
 * Localization Store
 * Manages localization state using createStore pattern for consistency
 */

import { createStore, storageService } from "@umituz/react-native-design-system";
import type { LocalizationState, LocalizationActions, LocalizationGetters } from "./types/LocalizationState";
import { languageRepository } from "../repository/LanguageRepository";
import { InitializationManager, LanguageSwitchManager, localizationGetters } from "./localizationStoreUtils";

// Instance-level managers
const initManager = new InitializationManager();
const switchManager = new LanguageSwitchManager();

const DEFAULT_STATE: LocalizationState = {
  currentLanguage: "en-US",
  isRTL: false,
  isInitialized: false,
  supportedLanguages: languageRepository.getLanguages(),
};

type LocalizationStoreActions = LocalizationActions & LocalizationGetters;

export const useLocalizationStore = createStore<LocalizationState, LocalizationStoreActions>({
  name: "localization-storage",
  initialState: DEFAULT_STATE,
  persist: true,
  storage: storageService,
  version: 1,
  partialize: (state) => ({
    currentLanguage: state.currentLanguage,
    isRTL: state.isRTL,
    isInitialized: false, // Don't persist initialization state
    supportedLanguages: state.supportedLanguages,
  }),
  actions: (set, get) => ({
    initialize: async () => {
      const { isInitialized } = get();
      await initManager.initialize(isInitialized, set);
    },

    setLanguage: async (languageCode: string) => {
      await switchManager.setLanguage(languageCode, set);
    },

    reset: () => {
      initManager.reset();
      switchManager.reset();

      set({
        currentLanguage: "en-US",
        isRTL: false,
        isInitialized: false,
      });
    },

    // Getters
    getCurrentLanguage: () => {
      const { currentLanguage } = get();
      return localizationGetters.getCurrentLanguage(currentLanguage);
    },

    isLanguageSupported: (code: string) => {
      return localizationGetters.isLanguageSupported(code);
    },

    getSupportedLanguages: () => {
      return localizationGetters.getSupportedLanguages();
    },
  }),
});
