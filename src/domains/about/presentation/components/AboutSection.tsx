import React from 'react';
import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useResponsiveDesignTokens, AtomicIcon, AtomicText } from '@umituz/react-native-design-system';
import { AboutConfig } from '../../domain/entities/AppInfo';

export interface AboutSectionProps {
    config?: AboutConfig;
    onPress?: () => void;
    containerStyle?: ViewStyle;
    title?: string;
    description?: string;
    sectionTitle?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
    config,
    onPress,
    containerStyle,
    title: propsTitle,
    description: propsDescription,
    sectionTitle: propsSectionTitle,
}) => {
    const navigation = useNavigation();
    const tokens = useResponsiveDesignTokens();
    const colors = tokens.colors;

    const route = config?.route || config?.defaultRoute || 'About';
    const title = propsTitle || config?.title;
    const description = propsDescription || config?.description;
    const sectionTitle = propsSectionTitle || title;

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
            {!!sectionTitle && (
                <View style={styles.headerContainer}>
                    <AtomicText
                        type="titleMedium"
                        color="primary"
                    >
                        {sectionTitle}
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
                        <AtomicIcon name="information-circle" size="lg" color="primary" />
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
                    <AtomicIcon name="chevron-right" size="md" color="secondary" />
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
