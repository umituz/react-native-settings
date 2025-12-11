/**
 * Cloud Sync Setting Component
 * Single Responsibility: Display cloud sync setting item
 */
import React from "react";
export interface CloudSyncSettingProps {
    title?: string;
    description?: string;
    isSyncing?: boolean;
    lastSynced?: Date | null;
    onPress?: () => void;
    iconColor?: string;
    titleColor?: string;
}
export declare const CloudSyncSetting: React.FC<CloudSyncSettingProps>;
//# sourceMappingURL=CloudSyncSetting.d.ts.map