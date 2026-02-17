/**
 * Translation Hook
 *
 * Provides translation function with proper language change reactivity.
 * Keys use dot notation only: "namespace.key.subkey"
 * The first segment before the dot is the i18next namespace.
 */

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../config/i18n';
import { devWarn } from '../../../../utils/devUtils';

export interface TranslationOptions {
  count?: number;
  ns?: string | string[];
  defaultValue?: string;
  [key: string]: unknown;
}

/**
 * Hook for translation functionality.
 * Uses react-i18next for automatic language change reactivity.
 *
 * Keys must use dot notation: t('namespace.key.subkey')
 * The first segment is the i18next namespace: t('common.ok'), t('settings.title')
 */
export const useTranslationFunction = () => {
  const { t: i18nextT, ready } = useTranslation(undefined, { i18n });

  const translate = useCallback((key: string, defaultValueOrOptions?: string | TranslationOptions): string => {
    const options: TranslationOptions = typeof defaultValueOrOptions === 'string'
      ? { defaultValue: defaultValueOrOptions }
      : defaultValueOrOptions || {};

    if (!ready || !i18n.isInitialized) {
      return options.defaultValue || key;
    }

    // Convert dot notation to i18next namespace:key format
    // "namespace.key.subkey" → i18next "namespace:key.subkey"
    const firstDotIndex = key.indexOf('.');
    const i18nextKey = firstDotIndex > 0
      ? `${key.substring(0, firstDotIndex)}:${key.substring(firstDotIndex + 1)}`
      : key;

    // Missing translation is a critical issue — warn in development
    if (!i18n.exists(i18nextKey)) {
      devWarn(`[i18n] Missing translation: "${key}"`);
    }

    const result = i18nextT(i18nextKey, options);
    return typeof result === 'string' ? result : (options.defaultValue ?? key);
  }, [i18nextT, ready]);

  return {
    t: translate,
  };
};