/**
 * Localization Store Factory
 * Creates and manages localization state with proper separation of concerns
 */

import { create } from "zustand";
import type { LocalizationState, LocalizationActions, LocalizationGetters } from "./types/LocalizationState";
import { languageRepository } from "../repository/LanguageRepository";
import { InitializationManager, LanguageSwitchManager, localizationGetters } from "./localizationStoreUtils";

type LocalizationStoreType = LocalizationState & LocalizationActions & LocalizationGetters;

// Instance-level managers
const initManager = new InitializationManager();
const switchManager = new LanguageSwitchManager();

export const useLocalizationStore = create<LocalizationStoreType>((set, get) => ({
  // State
  currentLanguage: "en-US",
  isRTL: false,
  isInitialized: false,
  supportedLanguages: languageRepository.getLanguages(),

  // Actions
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
}));
