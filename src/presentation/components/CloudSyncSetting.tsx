/**
 * Cloud Sync Setting Component
 * Single Responsibility: Display cloud sync setting item
 */

import React, { useCallback } from "react";
import { SettingItem } from "./SettingItem";
import type { SettingItemProps } from "./SettingItem";

export interface CloudSyncSettingProps {
  title?: string;
  description?: string;
  isSyncing?: boolean;
  lastSynced?: Date | null;
  onPress?: () => void;
  iconColor?: string;
  titleColor?: string;
}

export const CloudSyncSetting: React.FC<CloudSyncSettingProps> = ({
  title,
  description,
  isSyncing = false,
  lastSynced,
  onPress,
  iconColor,
  titleColor,
}) => {
  const formatLastSynced = useCallback((date: Date | null | undefined): string => {
    if (!date) return "never_synced";
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "just_now";
    if (minutes < 60) return `${minutes}m_ago`;
    if (hours < 24) return `${hours}h_ago`;
    if (days < 7) return `${days}d_ago`;
    return date.toLocaleDateString();
  }, []);

  const displayDescription = description || (isSyncing ? "syncing" : lastSynced ? `last_synced_${formatLastSynced(lastSynced)}` : "sync_to_cloud");

  return (
    <SettingItem
      icon="cloud-outline"
      title={title || "cloud_sync"}
      value={displayDescription}
      onPress={onPress}
      iconColor={iconColor}
      titleColor={titleColor}
      disabled={isSyncing}
    />
  );
};

