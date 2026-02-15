/**
 * Localization Store Utilities
 * Extracted business logic for localization store
 */

import { LanguageInitializer } from "./LanguageInitializer";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { languageRepository } from "../repository/LanguageRepository";
import { isDev } from "../../../../utils/devUtils";

export const LANGUAGE_SWITCH_DEBOUNCE_MS = 300;

/**
 * Manages localization initialization state
 */
export class InitializationManager {
  private inProgress = false;
  private promise: Promise<void> | null = null;

  async initialize(
    isAlreadyInitialized: boolean,
    setState: (state: Partial<{ currentLanguage: string; isRTL: boolean; isInitialized: boolean }>) => void
  ): Promise<void> {
    // Return existing promise if initialization is in progress
    if (this.inProgress && this.promise) {
      return this.promise;
    }

    // Return if already initialized
    if (isAlreadyInitialized) {
      return;
    }

    // Set mutex and create promise
    this.inProgress = true;
    this.promise = (async () => {
      try {
        const result = await LanguageInitializer.initialize();

        setState({
          currentLanguage: result.languageCode,
          isRTL: result.isRTL,
          isInitialized: true,
        });
      } catch (error) {
        // Log and set fallback state
        if (isDev()) {
          console.error("Localization initialization failed:", error);
        }

        setState({
          currentLanguage: "en-US",
          isRTL: false,
          isInitialized: true,
        });

        throw error; // Re-throw to allow error handling
      } finally {
        this.inProgress = false;
        this.promise = null;
      }
    })();

    return this.promise;
  }

  reset(): void {
    this.inProgress = false;
    this.promise = null;
  }
}

/**
 * Manages debounced language switching with pending promise handling
 * FIXED: Properly rejects pending promises on error
 */
export class LanguageSwitchManager {
  private timer: ReturnType<typeof setTimeout> | null = null;
  private pendingResolvers: Array<{ resolve: () => void; reject: (error: Error) => void }> = [];

  /**
   * Sets language with debounce and promise handling
   */
  setLanguage(
    languageCode: string,
    setState: (state: Partial<{ currentLanguage: string; isRTL: boolean }>) => void
  ): Promise<void> {
    // Validate input
    if (!languageCode || typeof languageCode !== "string") {
      return Promise.reject(new Error("Invalid language code provided"));
    }

    // Clear existing timer
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    return new Promise<void>((resolve, reject) => {
      // Add resolver and rejector to pending list
      const pendingItem = { resolve, reject };
      this.pendingResolvers.push(pendingItem);

      this.timer = setTimeout(async () => {
        if (isDev()) {
          console.log("[Localization] Switching language to:", languageCode);
        }

        try {
          const result = await LanguageSwitcher.switchLanguage(languageCode);

          if (isDev()) {
            console.log("[Localization] Language switched successfully");
          }

          const stateUpdate = {
            currentLanguage: result.languageCode,
            isRTL: result.isRTL,
          };

          setState(stateUpdate);

          if (isDev()) {
            console.log("[Localization] State updated:", stateUpdate);
          }

          // Resolve ALL pending promises
          const resolvers = [...this.pendingResolvers];
          this.pendingResolvers = [];
          resolvers.forEach((r) => r.resolve());
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error : new Error(String(error));

          if (isDev()) {
            console.error("[Localization] Language switch failed:", errorMessage);
          }

          // Reject ALL pending promises - FIXED: Actually rejects them now
          const resolvers = [...this.pendingResolvers];
          this.pendingResolvers = [];
          resolvers.forEach((r) => r.reject(errorMessage));
        } finally {
          this.timer = null;
        }
      }, LANGUAGE_SWITCH_DEBOUNCE_MS);
    });
  }

  /**
   * Clears any pending language switch and resolves all promises
   */
  reset(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    // Resolve any pending promises to prevent hanging
    const resolvers = [...this.pendingResolvers];
    this.pendingResolvers = [];
    resolvers.forEach((r) => r.resolve());
  }
}

/**
 * Localization getters
 */
export const localizationGetters = {
  getCurrentLanguage: (currentLanguage: string) => {
    return languageRepository.getLanguageByCode(currentLanguage);
  },

  isLanguageSupported: (code: string) => {
    return languageRepository.isLanguageSupported(code);
  },

  getSupportedLanguages: () => {
    return languageRepository.getLanguages();
  },
};
