import React from "react";
import { View, Pressable, StyleSheet, ViewStyle, Switch } from "react-native";
import {
    useAppDesignTokens,
    AtomicIcon,
    AtomicText,
    type IconName,
} from "@umituz/react-native-design-system";

export interface SettingsItemCardProps {
    /** Item title */
    title: string;
    /** Optional description or current value */
    description?: string;
    /** Icon name from AtomicIcon */
    icon: IconName;
    /** On press handler - if undefined, item is not clickable */
    onPress?: () => void;
    /** Optional container style */
    containerStyle?: ViewStyle;
    /** Optional section title (shows above the card) */
    sectionTitle?: string;
    /** Optional right icon (defaults to chevron-forward, hidden if not clickable) */
    rightIcon?: IconName;
    /** Optional icon background color (defaults to primary with opacity) */
    iconBgColor?: string;
    /** Optional icon color */
    iconColor?: string;
    /** Show chevron even if not clickable */
    showChevron?: boolean;
    /** Show switch instead of chevron */
    showSwitch?: boolean;
    /** Switch value (when showSwitch is true) */
    switchValue?: boolean;
    /** Switch change handler */
    onSwitchChange?: (value: boolean) => void;
    /** Disable the item */
    disabled?: boolean;
}

/**
 * SettingsItemCard
 *
 * A premium, consistent card for settings items used across all apps.
 * Follows the visual style of the Appearance section.
 */
export const SettingsItemCard: React.FC<SettingsItemCardProps> = ({
    title,
    description,
    icon,
    onPress,
    containerStyle,
    sectionTitle,
    rightIcon = "chevron-forward",
    iconBgColor,
    iconColor,
    showChevron,
    showSwitch = false,
    switchValue,
    onSwitchChange,
    disabled = false,
}) => {
    const tokens = useAppDesignTokens();
    const colors = tokens.colors;

    const defaultIconBg = iconBgColor || `${colors.primary}15`;
    const defaultIconColor = iconColor || colors.primary;
    const isClickable = !!onPress && !showSwitch;
    const shouldShowChevron = !showSwitch && (showChevron ?? isClickable);

    const renderRightElement = () => {
        if (showSwitch) {
            return (
                <Switch
                    value={switchValue}
                    onValueChange={onSwitchChange}
                    trackColor={{
                        false: colors.surfaceVariant,
                        true: colors.primary,
                    }}
                    thumbColor={colors.surface}
                    ios_backgroundColor={colors.surfaceVariant}
                    disabled={disabled}
                />
            );
        }
        if (shouldShowChevron) {
            return <AtomicIcon name={rightIcon} size="sm" color="secondary" />;
        }
        return null;
    };

    const renderContent = () => (
        <View style={styles.content}>
            <View style={[styles.iconContainer, { backgroundColor: defaultIconBg, borderRadius: tokens.radius.md }]}>
                <AtomicIcon name={icon} size="lg" customColor={defaultIconColor} />
            </View>
            <View style={styles.textContainer}>
                <AtomicText
                    type="bodyLarge"
                    color={disabled ? "surfaceVariant" : "onSurface"}
                    numberOfLines={1}
                    style={{ marginBottom: description ? tokens.spacing.xs : 0, opacity: disabled ? 0.6 : 1 }}
                >
                    {title}
                </AtomicText>
                {!!description && (
                    <AtomicText type="bodyMedium" color="secondary" numberOfLines={2}>
                        {description}
                    </AtomicText>
                )}
            </View>
            {renderRightElement()}
        </View>
    );

    return (
        <View
            style={[
                styles.sectionContainer,
                { 
                    backgroundColor: colors.surface,
                    borderRadius: tokens.radius.lg,
                },
                containerStyle,
            ]}
        >
            {!!sectionTitle && (
                <View style={styles.headerContainer}>
                    <AtomicText type="labelMedium" color="textSecondary" style={{ textTransform: 'uppercase' }}>
                        {sectionTitle}
                    </AtomicText>
                </View>
            )}
            {isClickable ? (
                <Pressable
                    style={({ pressed }) => [
                        styles.itemContainer,
                        {
                            backgroundColor: pressed ? `${colors.primary}08` : "transparent",
                        },
                    ]}
                    onPress={onPress}
                >
                    {renderContent()}
                </Pressable>
            ) : (
                <View style={styles.itemContainer}>
                    {renderContent()}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginBottom: 16,
        overflow: "hidden",
    },
    headerContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 16,
        minHeight: 72,
    },
    content: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        width: 48,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
        marginRight: 8,
    },
});
