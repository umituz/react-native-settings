/**
 * Setting Item Component
 * Single Responsibility: Render a single settings item
 * Material Design 3 style with hover effects and modern spacing
 */
import React from "react";
import { type LucideIcon } from "lucide-react-native";
export interface SettingItemProps {
    /** Icon component from lucide-react-native */
    icon: LucideIcon | React.ComponentType<{
        size?: number;
        color?: string;
    }>;
    /** Main title text */
    title: string;
    /** Optional description/value text */
    value?: string;
    /** Callback when pressed */
    onPress?: () => void;
    /** Show switch instead of chevron */
    showSwitch?: boolean;
    /** Switch value */
    switchValue?: boolean;
    /** Switch change handler */
    onSwitchChange?: (value: boolean) => void;
    /** Is last item in section (no divider) */
    isLast?: boolean;
    /** Custom icon color */
    iconColor?: string;
    /** Custom title color */
    titleColor?: string;
    /** Test ID for E2E testing */
    testID?: string;
    /** Disable the item */
    disabled?: boolean;
    /** Custom switch thumb color */
    switchThumbColor?: string;
    /** Custom switch track colors */
    switchTrackColors?: {
        false: string;
        true: string;
    };
}
export declare const SettingItem: React.FC<SettingItemProps>;
//# sourceMappingURL=SettingItem.d.ts.map