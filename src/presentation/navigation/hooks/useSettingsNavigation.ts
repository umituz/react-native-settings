/**
 * Settings Navigation Hook
 *
 * Provides standardized navigation for Settings stack screens.
 * Uses useAppNavigation from design system for consistency.
 *
 * @example
 * ```typescript
 * import { useSettingsNavigation } from '@umituz/react-native-settings/presentation/navigation';
 *
 * function LanguageSelectionScreen() {
 *   const navigation = useSettingsNavigation();
 *   navigation.navigate('Appearance');
 *   navigation.goBack();
 * }
 * ```
 */

import { useAppNavigation } from '@umituz/react-native-design-system/molecules';

/**
 * Navigation result type inferred from useAppNavigation
 */
type SettingsNavigation = ReturnType<typeof useAppNavigation>;

/**
 * Hook to get navigation for Settings screens
 * Delegates to useAppNavigation for consistent API
 */
export const useSettingsNavigation = (): SettingsNavigation => {
  return useAppNavigation();
};
