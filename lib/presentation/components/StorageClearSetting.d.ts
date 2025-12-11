/**
 * Storage Clear Setting Component
 * Single Responsibility: Display storage clear setting (DEV only)
 * Only visible in __DEV__ mode
 */
import React from "react";
export interface StorageClearSettingProps {
    title?: string;
    description?: string;
    onPress?: () => void;
    iconColor?: string;
    titleColor?: string;
    isLast?: boolean;
}
export declare const StorageClearSetting: React.FC<StorageClearSettingProps>;
//# sourceMappingURL=StorageClearSetting.d.ts.map