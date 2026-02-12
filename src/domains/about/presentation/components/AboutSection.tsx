import React from 'react';
import { ViewStyle } from 'react-native';
import { AboutConfig } from '../../domain/entities/AppInfo';
import { SettingsItemCard } from '../../../../presentation/components/SettingsItemCard';
import { useSettingsNavigation } from '../../../../presentation/navigation/hooks/useSettingsNavigation';

export interface AboutSectionProps {
    config?: AboutConfig;
    onPress?: () => void;
    containerStyle?: ViewStyle;
    title?: string;
    description?: string;
    sectionTitle?: string;
    noBackground?: boolean;
    hideMargin?: boolean;
}


export const AboutSection: React.FC<AboutSectionProps> = ({
    config,
    onPress,
    containerStyle,
    title: propsTitle,
    description: propsDescription,
    sectionTitle: propsSectionTitle,
    noBackground,
    hideMargin,
}) => {

    const navigation = useSettingsNavigation();

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
            navigation.navigate(route as 'About');
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
            noBackground={noBackground}
            hideMargin={hideMargin}
        />
    );
};

