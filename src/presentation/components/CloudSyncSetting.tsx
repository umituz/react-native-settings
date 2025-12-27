/**
 * Cloud Sync Setting Component
 * Displays cloud sync status and allows triggering sync
 */

import React, { useMemo } from "react";
import { SettingItem } from "./SettingItem";

export interface CloudSyncSettingProps {
  title?: string;
  description?: string;
  isSyncing?: boolean;
  lastSynced?: Date | null;
  onPress?: () => void;
  disabled?: boolean;
  isLast?: boolean;
}

const formatLastSynced = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) {
    return "last_synced_just_now";
  }
  if (diffMinutes < 60) {
    return `last_synced_${diffMinutes}m_ago`;
  }
  if (diffHours < 24) {
    return `last_synced_${diffHours}h_ago`;
  }
  return `last_synced_${diffDays}d_ago`;
};

export const CloudSyncSetting: React.FC<CloudSyncSettingProps> = ({
  title = "cloud_sync",
  description,
  isSyncing = false,
  lastSynced,
  onPress,
  disabled = false,
  isLast = false,
}) => {
  const displayValue = useMemo(() => {
    if (isSyncing) {
      return "syncing";
    }
    if (description) {
      return description;
    }
    if (lastSynced) {
      return formatLastSynced(lastSynced);
    }
    return undefined;
  }, [isSyncing, description, lastSynced]);

  return (
    <SettingItem
      icon="cloud"
      title={title}
      value={displayValue}
      onPress={onPress}
      disabled={disabled || isSyncing}
      isLast={isLast}
    />
  );
};
