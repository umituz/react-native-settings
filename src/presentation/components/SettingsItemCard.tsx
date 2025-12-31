import React from "react";
import { View, Pressable, StyleSheet, ViewStyle } from "react-native";
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
}) => {
    const tokens = useAppDesignTokens();
    const colors = tokens.colors;

    const defaultIconBg = iconBgColor || `${colors.primary}15`;
    const defaultIconColor = iconColor || colors.primary;
    const isClickable = !!onPress;
    const shouldShowChevron = showChevron ?? isClickable;

    const renderContent = () => (
        <View style={styles.content}>
            <View style={[styles.iconContainer, { backgroundColor: defaultIconBg }]}>
                <AtomicIcon name={icon} size="lg" customColor={defaultIconColor} />
            </View>
            <View style={styles.textContainer}>
                <AtomicText
                    type="bodyLarge"
                    color="onSurface"
                    numberOfLines={1}
                    style={{ marginBottom: 4 }}
                >
                    {title}
                </AtomicText>
                {!!description && (
                    <AtomicText type="bodyMedium" color="secondary" numberOfLines={2}>
                        {description}
                    </AtomicText>
                )}
            </View>
            {shouldShowChevron && (
                <AtomicIcon name={rightIcon} size="sm" color="secondary" />
            )}
        </View>
    );

    return (
        <View
            style={[
                styles.sectionContainer,
                { backgroundColor: colors.surface },
                containerStyle,
            ]}
        >
            {!!sectionTitle && (
                <View style={styles.headerContainer}>
                    <AtomicText type="titleMedium" color="primary">
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
        borderRadius: 12,
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
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
        marginRight: 8,
    },
});
