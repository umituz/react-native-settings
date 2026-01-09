import React from "react";
import { View, Pressable, StyleSheet, ViewStyle, Switch } from "react-native";
import {
    useAppDesignTokens,
    AtomicIcon,
    AtomicText,
    type IconName,
    withAlpha
} from "@umituz/react-native-design-system";

export interface SettingsItemCardProps {
    title: string;
    description?: string;
    icon: IconName;
    onPress?: () => void;
    containerStyle?: ViewStyle;
    sectionTitle?: string;
    rightIcon?: IconName;
    iconBgColor?: string;
    iconColor?: string;
    showChevron?: boolean;
    showSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
    disabled?: boolean;
}

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

    const defaultIconBg = iconBgColor || withAlpha(colors.primary, 0.15);
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
            <View style={[styles.iconContainer, { backgroundColor: defaultIconBg, borderRadius: tokens.borderRadius.md }]}>
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
                    borderRadius: tokens.borderRadius.lg,
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
                            backgroundColor: pressed ? withAlpha(colors.primary, 0.08) : "transparent",
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
