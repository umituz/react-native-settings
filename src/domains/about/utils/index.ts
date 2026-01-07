/**
 * Utility functions for About package
 * General purpose utilities for all applications
 */

export { createDefaultAppInfo } from './AppInfoFactory';

/**
 * Create default configuration with overrides
 */
export const createDefaultConfig = (overrides: Record<string, unknown> = {}) => {
  if (!overrides || typeof overrides !== 'object') {
    overrides = {};
  }
  const overridesObj = overrides as Record<string, Record<string, unknown>>;
  return {
    appInfo: {
      name: '',
      version: '1.0.0',
      description: '',
      developer: '',
      contactEmail: '',
      websiteUrl: '',
      websiteDisplay: '',
      moreAppsUrl: '',
      privacyPolicyUrl: '',
      termsOfServiceUrl: '',
      ...(overridesObj.appInfo || {}),
    },
    theme: {
      primary: '#007AFF',
      secondary: '#5856D6',
      background: '#FFFFFF',
      text: '#000000',
      border: '#E5E5E5',
      ...(overridesObj.theme || {}),
    },
    style: {
      containerStyle: {},
      itemStyle: {},
      textStyle: {},
      iconStyle: {},
      ...(overridesObj.style || {}),
    },
    actions: {
      onWebsitePress: undefined,
      onEmailPress: undefined,
      onPrivacyPress: undefined,
      onTermsPress: undefined,
      onMoreAppsPress: undefined,
      ...(overridesObj.actions || {}),
    },
  };
};

/**
 * Validate configuration object
 */
export const validateConfig = (config: unknown): boolean => {
  if (!config || typeof config !== 'object') {
    return false;
  }

  const configObj = config as Record<string, unknown>;
  if (!configObj.appInfo || typeof configObj.appInfo !== 'object') {
    return false;
  }

  return true;
};

/**
 * Merge multiple configurations
 */
export const mergeConfigs = (...configs: Record<string, unknown>[]) => {
  const result: Record<string, unknown> = {};

  for (const config of configs.filter(Boolean)) {
    if (config && typeof config === 'object') {
      for (const [key, value] of Object.entries(config)) {
        if (value && typeof value === 'object' && !Array.isArray(value) && result[key] && typeof result[key] === 'object' && !Array.isArray(result[key])) {
          // Deep merge for nested objects
          result[key] = { ...result[key] as Record<string, unknown>, ...value as Record<string, unknown> };
        } else {
          result[key] = value;
        }
      }
    }
  }

  return result;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Additional check to prevent consecutive dots
  return emailRegex.test(email) && !email.includes('..');
};

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    // Only allow http and https protocols
    return (urlObj as any).protocol === 'http:' || (urlObj as any).protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Open URL in external browser
 */
export const openUrl = async (url: string): Promise<boolean> => {
  try {
    const { Linking } = await import('react-native');
    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      await Linking.openURL(url);
      return true;
    }

    return false;
  } catch {
    return false;
  }
};

/**
 * Send email
 */
export const sendEmail = async (email: string, subject?: string): Promise<boolean> => {
  try {
    const { Linking } = await import('react-native');
    const url = subject
      ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
      : `mailto:${email}`;

    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      await Linking.openURL(url);
      return true;
    }

    return false;
  } catch {
    return false;
  }
};