import React from 'react';
import { ViewStyle } from 'react-native';
import { AboutConfig } from '../../domain/entities/AppInfo';
import { SettingsItemCard } from '../../../../presentation/components/SettingsItemCard';
import { useSettingsNavigation } from '../../../../presentation/navigation/hooks/useSettingsNavigation';
import { createRouteOrPressHandler } from '../../../../presentation/navigation/utils/navigationHelpers';

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

    const title = propsTitle || config?.title;
    const description = propsDescription || config?.description;
    const sectionTitle = propsSectionTitle;

    const handlePress = createRouteOrPressHandler(navigation.navigate, {
        route: config?.route || config?.defaultRoute || 'About',
        onPress: onPress || config?.onPress,
    });

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

