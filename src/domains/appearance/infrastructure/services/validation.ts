/**
 * Appearance Validation Utilities
 * 
 * Validation functions for appearance settings and colors
 */

import type { ThemeMode, CustomThemeColors } from '@umituz/react-native-design-system';

/**
 * Validate theme mode
 * @param mode - Theme mode to validate
 * @returns true if valid theme mode
 */
export const isValidThemeMode = (mode: string): mode is ThemeMode => {
  return mode === 'light' || mode === 'dark';
};

/**
 * Validate hex color format
 * @param color - Color string to validate
 * @returns true if valid hex color
 */
export const isValidHexColor = (color: string): boolean => {
  if (!color || typeof color !== 'string') {
    return false;
  }
  
  const hexRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;
  return hexRegex.test(color);
};

/**
 * Validate custom colors object
 * @param colors - Custom colors to validate
 * @returns Validation result with errors
 */
export const validateCustomColors = (
  colors: CustomThemeColors
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Check each color if provided
  const colorFields: (keyof CustomThemeColors)[] = [
    'primary', 'primaryLight', 'primaryDark',
    'secondary', 'secondaryLight', 'secondaryDark', 
    'accent', 'accentLight', 'accentDark',
    'buttonPrimary', 'buttonSecondary'
  ];
  
  for (const field of colorFields) {
    const color = colors[field];
    if (color && !isValidHexColor(color)) {
      errors.push(`Invalid ${field} color: ${color}`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate appearance settings
 * @param settings - Settings to validate
 * @returns Validation result with errors
 */
export const validateAppearanceSettings = (settings: {
  themeMode?: string;
  customColors?: CustomThemeColors;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Validate theme mode
  if (settings.themeMode && !isValidThemeMode(settings.themeMode)) {
    errors.push(`Invalid theme mode: ${settings.themeMode}`);
  }
  
  // Validate custom colors
  if (settings.customColors) {
    const colorValidation = validateCustomColors(settings.customColors);
    if (!colorValidation.isValid) {
      errors.push(...colorValidation.errors);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};