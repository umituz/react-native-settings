/**
 * Storage Clear Setting Component
 * Single Responsibility: Display storage clear setting (DEV only)
 * Only visible in __DEV__ mode
 */
import React from "react";
import { Trash2 } from "lucide-react-native";
import { SettingItem } from "./SettingItem";
export const StorageClearSetting = ({ title = "Clear All Storage", description = "Clear all local storage data (DEV only)", onPress, iconColor = "#EF4444", titleColor = "#EF4444", isLast = false, }) => {
    // Only render in DEV mode
    if (!__DEV__) {
        return null;
    }
    return (<SettingItem icon={Trash2} title={title} value={description} onPress={onPress} iconColor={iconColor} titleColor={titleColor} isLast={isLast}/>);
};
//# sourceMappingURL=StorageClearSetting.js.map