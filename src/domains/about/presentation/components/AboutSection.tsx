import React from 'react';
import { ViewStyle } from 'react-native';
import { useAppNavigation } from '@umituz/react-native-design-system';
import { AboutConfig } from '../../domain/entities/AppInfo';
import { SettingsItemCard } from '../../../../presentation/components/SettingsItemCard';

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
    const navigation = useAppNavigation();

    const route = config?.route || config?.defaultRoute || 'About';
    const title = propsTitle || config?.title;
    const description = propsDescription || config?.description;
    const sectionTitle = propsSectionTitle;

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else if (config?.onPress) {
            config.onPress();
        } else {
            navigation.navigate(route as never);
        }
    };

    if (!title) return null;

    return (
        <SettingsItemCard
            title={title}
            description={description}
            icon="information-circle-outline"
            onPress={handlePress}
            containerStyle={containerStyle}
            sectionTitle={sectionTitle}
        />
    );
};
