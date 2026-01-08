/**
 * Gamification Settings Item Component
 * Menu item to navigate to gamification screen
 */

import React from "react";
import { SettingsItemCard } from "../../../presentation/components/SettingsItemCard";
import type { GamificationMenuConfig } from "../types/settings";

export interface GamificationSettingsItemProps {
  config: GamificationMenuConfig;
}

/**
 * Gamification menu item for settings screen
 */
export const GamificationSettingsItem: React.FC<GamificationSettingsItemProps> = ({
  config,
}) => {
  if (!config.enabled) {
    return null;
  }

  return (
    <SettingsItemCard
      title={config.title}
      description={config.subtitle}
      icon={config.icon || "trophy"}
      onPress={config.onPress}
      showChevron
    />
  );
};
