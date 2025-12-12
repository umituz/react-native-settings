/**
 * Storage Clear Setting Component
 * Single Responsibility: Display storage clear setting (DEV only)
 * Only visible in __DEV__ mode
 */
import React from "react";
import { Trash2 } from "lucide-react-native";
import { SettingItem } from "./SettingItem";
export const StorageClearSetting = ({ title, description, onPress, iconColor, titleColor, isLast = false, }) => {
    // Default values for DEV mode
    const defaultTitle = title || "Clear All Storage";
    const defaultDescription = description || "Clear all local storage data (DEV only)";
    const defaultIconColor = iconColor || "#EF4444";
    const defaultTitleColor = titleColor || "#EF4444";
    // Only render in DEV mode
    if (!__DEV__) {
        return null;
    }
    return (<SettingItem icon={Trash2} title={defaultTitle} value={defaultDescription} onPress={onPress} iconColor={defaultIconColor} titleColor={defaultTitleColor} isLast={isLast}/>);
};
//# sourceMappingURL=StorageClearSetting.js.map