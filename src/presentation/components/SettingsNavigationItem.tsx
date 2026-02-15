/**
 * Generic Settings Navigation Item
 * Consolidates VideoTutorialSettingsItem, GamificationSettingsItem,
 * WalletSettingsItem, and SubscriptionSettingsItem into one reusable component
 */

import React from "react";
import type { IconName } from "@umituz/react-native-design-system";
import { SettingsItemCard } from "./SettingsItemCard";
import { useSettingsNavigation } from "../navigation/hooks/useSettingsNavigation";
import { createRouteOrPressHandler } from "../navigation/utils/navigationHelpers";
import type { SettingsStackParamList } from "../navigation/types";

/**
 * Base configuration for navigation items
 */
export interface SettingsNavigationItemConfig {
  title?: string;
  description?: string;
  icon?: string;
  sectionTitle?: string;
  route?: keyof SettingsStackParamList;
  onPress?: () => void;
}

/**
 * Props for generic settings navigation item
 */
export interface SettingsNavigationItemProps<T extends SettingsNavigationItemConfig = SettingsNavigationItemConfig> {
  /** Item configuration */
  config: T;
  /** Default icon if not specified in config */
  defaultIcon?: IconName;
  /** Default route if not specified in config */
  defaultRoute?: keyof SettingsStackParamList;
  /** Function to render custom description */
  renderDescription?: (config: T) => string | undefined;
  /** Remove background styling */
  noBackground?: boolean;
  /** Remove margin */
  hideMargin?: boolean;
}

/**
 * Generic Settings Navigation Item Component
 *
 * @example
 * ```tsx
 * <SettingsNavigationItem
 *   config={videoConfig}
 *   defaultIcon="play-circle-outline"
 *   defaultRoute="VideoTutorial"
 * />
 * ```
 *
 * @example With custom description
 * ```tsx
 * <SettingsNavigationItem
 *   config={gamificationConfig}
 *   defaultIcon="trophy-outline"
 *   defaultRoute="Gamification"
 *   renderDescription={(cfg) => `${level} • ${points}`}
 * />
 * ```
 */
const SettingsNavigationItemComponent = <T extends SettingsNavigationItemConfig>({
  config,
  defaultIcon = "apps-outline",
  defaultRoute,
  renderDescription,
  noBackground,
  hideMargin,
}: SettingsNavigationItemProps<T>) => {
  const navigation = useSettingsNavigation();

  const handlePress = React.useMemo(
    () => createRouteOrPressHandler(navigation.navigate, {
      route: config.route,
      onPress: config.onPress,
      fallback: defaultRoute,
    }),
    [navigation, config.route, config.onPress, defaultRoute]
  );

  const icon = (config.icon || defaultIcon) as IconName;
  const description = renderDescription ? renderDescription(config) : config.description;

  return (
    <SettingsItemCard
      title={config.title}
      description={description}
      icon={icon}
      onPress={handlePress}
      sectionTitle={config.sectionTitle}
      noBackground={noBackground}
      hideMargin={hideMargin}
    />
  );
};

/**
 * Memoized Settings Navigation Item
 * Uses shallow comparison by default
 */
export const SettingsNavigationItem = React.memo(
  SettingsNavigationItemComponent
) as typeof SettingsNavigationItemComponent & { displayName?: string };

SettingsNavigationItem.displayName = "SettingsNavigationItem";
