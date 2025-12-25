import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    useResponsiveDesignTokens,
    AtomicText,
    ListItem
} from '@umituz/react-native-design-system';
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
        <View style={[styles.sectionContainer, { backgroundColor: tokens.colors.surface }, containerStyle]}>
            {!!sectionTitle && (
                <View style={styles.headerContainer}>
                    <AtomicText type="titleMedium" color="primary">
                        {sectionTitle}
                    </AtomicText>
                </View>
            )}
            <ListItem
                title={title}
                subtitle={description}
                leftIcon="information-circle"
                rightIcon="chevron-forward"
                onPress={handlePress}
            />
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
});
