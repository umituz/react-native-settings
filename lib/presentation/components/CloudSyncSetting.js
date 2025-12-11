/**
 * Cloud Sync Setting Component
 * Single Responsibility: Display cloud sync setting item
 */
import React from "react";
import { Cloud } from "lucide-react-native";
import { SettingItem } from "./SettingItem";
export const CloudSyncSetting = ({ title = "Cloud Sync", description, isSyncing = false, lastSynced, onPress, iconColor, titleColor, }) => {
    const formatLastSynced = (date) => {
        if (!date)
            return "Never synced";
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (minutes < 1)
            return "Just now";
        if (minutes < 60)
            return `${minutes}m ago`;
        if (hours < 24)
            return `${hours}h ago`;
        if (days < 7)
            return `${days}d ago`;
        return date.toLocaleDateString();
    };
    const displayDescription = description ||
        (isSyncing
            ? "Syncing..."
            : lastSynced
                ? `Last synced: ${formatLastSynced(lastSynced)}`
                : "Sync your data to the cloud");
    return (<SettingItem icon={Cloud} title={title} value={displayDescription} onPress={onPress} iconColor={iconColor} titleColor={titleColor} disabled={isSyncing}/>);
};
//# sourceMappingURL=CloudSyncSetting.js.map