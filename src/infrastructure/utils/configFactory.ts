/**
 * Configuration Factory
 * Generic configuration creator to reduce duplication in base-configs
 */

import type { FeatureVisibility } from "../../presentation/screens/types/BaseTypes";

/**
 * Base configuration type for all settings items
 */
export interface BaseConfigType {
  enabled?: FeatureVisibility;
  title?: string;
  description?: string;
  icon?: string;
  route?: string;
  onPress?: () => void;
}

/**
 * Configuration parameters for creating a settings item config
 */
export interface ConfigCreatorParams {
  icon?: string;
  routeOrOnPress?: string | (() => void);
  defaultRoute?: string;
}

/**
 * Generic configuration creator function
 * Reduces duplication across all config creators
 */
export const createBaseConfig = <T extends BaseConfigType = BaseConfigType>(
  params: ConfigCreatorParams
): T => {
  const { icon, routeOrOnPress, defaultRoute } = params;

  return {
    enabled: true,
    icon,
    route: typeof routeOrOnPress === "string" ? routeOrOnPress : defaultRoute,
    onPress: typeof routeOrOnPress === "function" ? routeOrOnPress : undefined,
  } as T;
};

/**
 * Create a configuration with extended properties
 */
export const createConfigWithExtensions = <T extends BaseConfigType>(
  baseParams: ConfigCreatorParams,
  extensions: Partial<Omit<T, keyof BaseConfigType>>
): T => {
  const baseConfig = createBaseConfig<T>(baseParams);
  return { ...baseConfig, ...extensions };
};

