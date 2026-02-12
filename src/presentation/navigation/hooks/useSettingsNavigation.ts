/**
 * Typed Settings Navigation Hook
 *
 * Provides type-safe navigation for Settings stack screens.
 * Replaces unsafe `as never` casts throughout the codebase.
 */

import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { SettingsStackParamList } from '../types';

/**
 * Type for Settings navigation prop
 */
export type SettingsNavigationProp = StackNavigationProp<SettingsStackParamList>;

/**
 * Hook to get typed navigation for Settings screens
 *
 * @example
 * ```typescript
 * const navigation = useSettingsNavigation();
 * navigation.navigate('LanguageSelection'); // Fully typed!
 * ```
 */
export const useSettingsNavigation = () => {
  return useNavigation<SettingsNavigationProp>();
};
