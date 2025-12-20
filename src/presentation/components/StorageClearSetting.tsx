/**
 * Storage Clear Setting Component
 * Single Responsibility: Display storage clear setting (DEV only)
 * Only visible in __DEV__ mode
 */

import React from "react";
import { Feather } from "@expo/vector-icons";
import { SettingItem } from "./SettingItem";

export interface StorageClearSettingProps {
  title?: string;
  description?: string;
  onPress?: () => void;
  iconColor?: string;
  titleColor?: string;
  isLast?: boolean;
}

export const StorageClearSetting: React.FC<StorageClearSettingProps> = ({
  title,
  description,
  onPress,
  iconColor,
  titleColor,
  isLast = false,
}) => {
  // Default values for DEV mode
  const defaultTitle = title || "Clear All Storage";
  const defaultDescription = description || "Clear all local storage data (DEV only)";
  const defaultIconColor = iconColor || "#EF4444";
  const defaultTitleColor = titleColor || "#EF4444";
  // Only render in DEV mode
  if (!__DEV__) {
    return null;
  }

  return (
    <SettingItem
      icon={(props) => <Feather name={"trash-2" as any} {...props} />}
      title={defaultTitle}
      value={defaultDescription}
      onPress={onPress}
      iconColor={defaultIconColor}
      titleColor={defaultTitleColor}
      isLast={isLast}
    />
  );
};

