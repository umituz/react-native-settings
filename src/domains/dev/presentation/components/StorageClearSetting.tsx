/**
 * Storage Clear Setting Component
 * Single Responsibility: Display storage clear setting (DEV only)
 * Only visible in __DEV__ mode
 */

import React from "react";
import { SettingsItemCard } from "../../../../presentation/components/SettingsItemCard";

export interface StorageClearSettingProps {
  title?: string;
  description?: string;
  onPress?: () => void;
  iconColor?: string;
}

export const StorageClearSetting: React.FC<StorageClearSettingProps> = ({
  title,
  description,
  onPress,
  iconColor,
}) => {
  // Only render in DEV mode
  if (!__DEV__) {
    return null;
  }

  const defaultTitle = title || "Clear All Storage";
  const defaultDescription = description || "Clear all local storage data (DEV only)";
  const defaultIconColor = iconColor || "#EF4444";

  return (
    <SettingsItemCard
      icon="trash-outline"
      title={defaultTitle}
      description={defaultDescription}
      onPress={onPress}
      iconColor={defaultIconColor}
    />
  );
};

