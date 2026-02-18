/**
 * Navigation Helper Utilities
 * Type-safe navigation handling to eliminate type casting
 */

import type { SettingsStackParamList } from '../types';

type NavigateFunction = <RouteName extends keyof SettingsStackParamList>(
  route: RouteName,
  params?: SettingsStackParamList[RouteName]
) => void;

interface RouteOrPressConfig<T extends keyof SettingsStackParamList = keyof SettingsStackParamList> {
  route?: T;
  onPress?: () => void;
  fallback?: T;
}

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
