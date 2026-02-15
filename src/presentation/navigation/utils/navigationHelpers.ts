/**
 * Navigation Helper Utilities
 * Type-safe navigation handling to eliminate type casting
 */

import type { SettingsStackParamList } from '../types';

/**
 * Type for navigation function
 */
export type NavigateFunction = <RouteName extends keyof SettingsStackParamList>(
  route: RouteName,
  params?: SettingsStackParamList[RouteName]
) => void;

/**
 * Create a type-safe navigation handler
 *
 * @param navigate - Navigation function from useNavigation
 * @param route - Target route name
 * @param fallback - Optional fallback route if primary route is undefined
 * @returns Navigation handler function
 *
 * @example
 * ```typescript
 * const navigation = useSettingsNavigation();
 * const handlePress = createNavigationHandler(
 *   navigation.navigate,
 *   config.route,
 *   'Appearance'
 * );
 * ```
 */
export const createNavigationHandler = <T extends keyof SettingsStackParamList>(
  navigate: NavigateFunction,
  route: T | undefined,
  fallback?: T
) => {
  return () => {
    const targetRoute = route || fallback;
    if (targetRoute) {
      navigate(targetRoute);
    }
  };
};

/**
 * Configuration for route or press handler
 */
export interface RouteOrPressConfig<T extends keyof SettingsStackParamList = keyof SettingsStackParamList> {
  /** Route to navigate to */
  route?: T;
  /** Custom onPress handler */
  onPress?: () => void;
  /** Fallback route if primary route is undefined */
  fallback?: T;
}

/**
 * Create a handler that supports both route navigation and custom onPress
 * Prioritizes onPress if provided, otherwise navigates to route
 *
 * @param navigate - Navigation function from useNavigation
 * @param config - Configuration with route and/or onPress
 * @returns Handler function
 *
 * @example
 * ```typescript
 * const navigation = useSettingsNavigation();
 * const handlePress = createRouteOrPressHandler(
 *   navigation.navigate,
 *   { route: config.route, onPress: config.onPress, fallback: 'Appearance' }
 * );
 * ```
 */
export const createRouteOrPressHandler = <T extends keyof SettingsStackParamList>(
  navigate: NavigateFunction,
  config: RouteOrPressConfig<T>
) => {
  return () => {
    if (config.onPress) {
      config.onPress();
    } else {
      const targetRoute = config.route || config.fallback;
      if (targetRoute) {
        navigate(targetRoute);
      }
    }
  };
};

/**
 * Create a navigation handler with parameters
 *
 * @param navigate - Navigation function from useNavigation
 * @param route - Target route name
 * @param params - Navigation parameters for the route
 * @returns Navigation handler function
 *
 * @example
 * ```typescript
 * const navigation = useSettingsNavigation();
 * const handlePress = createNavigationHandlerWithParams(
 *   navigation.navigate,
 *   'LegalDetail',
 *   { document: 'privacy' }
 * );
 * ```
 */
export const createNavigationHandlerWithParams = <T extends keyof SettingsStackParamList>(
  navigate: NavigateFunction,
  route: T,
  params: SettingsStackParamList[T]
) => {
  return () => {
    navigate(route, params);
  };
};
