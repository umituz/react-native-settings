/**
 * Appearance Store
 *
 * Zustand store for appearance state management
 * Single Responsibility: Pure state management only
 */

import { create } from "zustand";
import type { AppearanceSettings, AppearanceState } from "../../types";

interface AppearanceStoreActions {
  // Pure state mutations only
  setSettings: (settings: AppearanceSettings) => void;
  setInitialized: (initialized: boolean) => void;
  updateThemeMode: (mode: AppearanceSettings["themeMode"]) => void;
  updateCustomColors: (colors: AppearanceSettings["customColors"]) => void;
  resetState: () => void;
}

type AppearanceStore = AppearanceState & AppearanceStoreActions;

const DEFAULT_SETTINGS: AppearanceSettings = {
  themeMode: "dark", // Use dark mode as default
};

export const useAppearanceStore = create<AppearanceStore>((set, get) => ({
  settings: DEFAULT_SETTINGS,
  isInitialized: false,

  // Pure state mutations with performance optimizations
  setSettings: (settings: AppearanceSettings) => {
    // Prevent unnecessary updates if settings are the same
    const currentSettings = get().settings;
    if (JSON.stringify(currentSettings) === JSON.stringify(settings)) {
      if (__DEV__) {
        console.log("[AppearanceStore] Skipping settings update - no changes");
      }
      return;
    }

    if (__DEV__) {
      console.log("[AppearanceStore] Setting appearance settings:", settings);
    }
    set({ settings });
  },

  setInitialized: (initialized: boolean) => {
    // Prevent unnecessary updates if state is the same
    const currentInitialized = get().isInitialized;
    if (currentInitialized === initialized) {
      if (__DEV__) {
        console.log("[AppearanceStore] Skipping initialized update - no change");
      }
      return;
    }

    if (__DEV__) {
      console.log("[AppearanceStore] Setting initialized state:", initialized);
    }
    set({ isInitialized: initialized });
  },

  updateThemeMode: (mode: AppearanceSettings["themeMode"]) => {
    const currentSettings = get().settings;
    
    // Prevent unnecessary updates if mode is the same
    if (currentSettings.themeMode === mode) {
      if (__DEV__) {
        console.log("[AppearanceStore] Skipping theme mode update - no change");
      }
      return;
    }

    const newSettings: AppearanceSettings = {
      ...currentSettings,
      themeMode: mode,
    };
    
    if (__DEV__) {
      console.log("[AppearanceStore] Updating theme mode:", mode);
    }
    
    set({ settings: newSettings });
  },

  updateCustomColors: (colors: AppearanceSettings["customColors"]) => {
    const currentSettings = get().settings;
    
    // Prevent unnecessary updates if colors are the same
    if (JSON.stringify(currentSettings.customColors) === JSON.stringify(colors)) {
      if (__DEV__) {
        console.log("[AppearanceStore] Skipping custom colors update - no changes");
      }
      return;
    }

    const newSettings: AppearanceSettings = {
      ...currentSettings,
      customColors: colors,
    };
    
    if (__DEV__) {
      console.log("[AppearanceStore] Updating custom colors:", colors);
    }
    
    set({ settings: newSettings });
  },

  resetState: () => {
    const currentState = get();
    
    // Prevent unnecessary reset if already at default
    if (
      currentState.isInitialized === false &&
      JSON.stringify(currentState.settings) === JSON.stringify(DEFAULT_SETTINGS)
    ) {
      if (__DEV__) {
        console.log("[AppearanceStore] Skipping reset - already at default state");
      }
      return;
    }

    if (__DEV__) {
      console.log("[AppearanceStore] Resetting to default state");
    }
    
    set({
      settings: DEFAULT_SETTINGS,
      isInitialized: false,
    });
  },
}));
