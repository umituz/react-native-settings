/**
 * System Theme Detection Utilities
 * 
 * Utilities for detecting device theme preferences
 */

import { Appearance, Platform } from 'react-native';
import type { ThemeMode } from '@umituz/react-native-design-system';

declare const window: any;

/**
 * Get system theme mode from device settings
 * @returns System theme mode ('light' | 'dark' | null)
 */
export const getSystemTheme = (): ThemeMode | null => {
  try {
    // On web, use matchMedia
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && (window as any).matchMedia) {
        const darkModeQuery = (window as any).matchMedia('(prefers-color-scheme: dark)');
        if (darkModeQuery.matches) {
          return 'dark';
        }
        return 'light';
      }
    }

    // On native platforms, use Appearance API
    const colorScheme = Appearance.getColorScheme();
    return colorScheme === 'dark' ? 'dark' : 'light';
  } catch (error) {
    if (__DEV__) {
      console.warn('[getSystemTheme] Failed to detect system theme:', error);
    }
    return null;
  }
};

/**
 * Check if system theme is dark
 * @returns true if system prefers dark mode
 */
export const isSystemThemeDark = (): boolean => {
  return getSystemTheme() === 'dark';
};

/**
 * Check if system theme is light
 * @returns true if system prefers light mode
 */
export const isSystemThemeLight = (): boolean => {
  return getSystemTheme() === 'light';
};

/**
 * Add system theme change listener
 * @param callback - Function to call when theme changes
 * @returns Cleanup function to remove listener
 */
export const addSystemThemeListener = (
  callback: (themeMode: ThemeMode) => void,
): (() => void) => {
  try {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      const themeMode: ThemeMode = colorScheme === 'dark' ? 'dark' : 'light';
      callback(themeMode);
    });

    return () => {
      subscription?.remove();
    };
  } catch (error) {
    if (__DEV__) {
      console.warn('[addSystemThemeListener] Failed to add listener:', error);
    }
    return () => { }; // Return empty cleanup function
  }
};