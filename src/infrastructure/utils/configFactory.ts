/**
 * Configuration Factory
 * Generic configuration creator to reduce duplication in base-configs
 */

import type { TranslationFunction } from "../../presentation/utils/config-creators/types";

/**
 * Feature visibility configuration
 * - true: Always show (if navigation screen exists)
 * - false: Never show
 * - 'auto': Automatically detect (check if navigation screen exists and package is available)
 */
export type FeatureVisibility = boolean | "auto";

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
  t: TranslationFunction;
  titleKey: string;
  descriptionKey: string;
  icon: string;
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
  const { t, titleKey, descriptionKey, icon, routeOrOnPress, defaultRoute } = params;

  return {
    enabled: true,
    title: t(titleKey),
    description: t(descriptionKey),
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

/**
 * Create a disabled configuration
 */
export const createDisabledConfig = <T extends BaseConfigType>(
  params: Omit<ConfigCreatorParams, "routeOrOnPress" | "defaultRoute">
): T => {
  const baseConfig = createBaseConfig<T>(params);
  return { ...baseConfig, enabled: false } as T;
};

/**
 * Batch create configurations
 */
export const createBatchConfigs = <T extends BaseConfigType>(
  items: Array<{
    titleKey: string;
    descriptionKey: string;
    icon: string;
    routeOrOnPress?: string | (() => void);
  }>,
  t: TranslationFunction
): T[] => {
  return items.map((item) =>
    createBaseConfig<T>({
      t,
      titleKey: item.titleKey,
      descriptionKey: item.descriptionKey,
      icon: item.icon,
      routeOrOnPress: item.routeOrOnPress,
    })
  );
};
