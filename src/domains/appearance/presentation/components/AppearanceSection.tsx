import React from 'react';
import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useResponsiveDesignTokens, AtomicIcon, AtomicText } from '@umituz/react-native-design-system';
import { AppearanceSectionConfig } from '../../types';

export interface AppearanceSectionProps {
    config?: AppearanceSectionConfig;
    onPress?: () => void;
    containerStyle?: ViewStyle;
    sectionTitle?: string;
    /** Optional explicit title override */
    title?: string;
    /** Optional explicit description override */
    description?: string;
}

export const AppearanceSection: React.FC<AppearanceSectionProps> = ({
    config,
    onPress,
    containerStyle,
    sectionTitle,
    title: titleProp,
    description: descriptionProp,
}) => {
    const navigation = useNavigation();
    const tokens = useResponsiveDesignTokens();
    const colors = tokens.colors;

    const route = config?.route || config?.defaultRoute || 'Appearance';
    // Use props first, then config, then strict empty string to avoid hardcoded English
    const title = titleProp || config?.title;
    const description = descriptionProp || config?.description;

    // Only display section title if provided
    const displaySectionTitle = sectionTitle || title;

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.navigate(route as never);
        }
    };

    if (!title) return null;

    return (
        <View style={[styles.sectionContainer, { backgroundColor: colors.surface }, containerStyle]}>
            {!!displaySectionTitle && (
                <View style={styles.headerContainer}>
                    <AtomicText
                        type="titleMedium"
                        color="primary"
                    >
                        {displaySectionTitle}
                    </AtomicText>
                </View>
            )}
            <Pressable
                style={({ pressed }) => [
                    styles.itemContainer,
                    {
                        backgroundColor: pressed ? `${colors.primary}08` : 'transparent',
                    },
                ]}
                onPress={handlePress}
            >
                <View style={styles.content}>
                    <View
                        style={[
                            styles.iconContainer,
                            { backgroundColor: `${colors.primary}15` },
                        ]}
                    >
                        <AtomicIcon name="water-outline" size="lg" color="primary" />
                    </View>
                    <View style={styles.textContainer}>
                        <AtomicText
                            type="bodyLarge"
                            color="primary"
                            numberOfLines={1}
                            style={{ marginBottom: 4 }}
                        >
                            {title}
                        </AtomicText>
                        {!!description && (
                            <AtomicText
                                type="bodyMedium"
                                color="secondary"
                                numberOfLines={2}
                            >
                                {description}
                            </AtomicText>
                        )}
                    </View>
                    <AtomicIcon name="chevron-forward-outline" size="md" color="secondary" />
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    headerContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        minHeight: 72,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
        marginRight: 8,
    },
});
