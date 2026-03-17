import React from 'react';
import { ViewStyle } from 'react-native';
import { LegalConfig } from '../../domain/entities/LegalConfig';
import { SettingsItemCard } from '../../../../presentation/components/SettingsItemCard';
import { useSettingsNavigation } from '../../../../presentation/navigation/hooks/useSettingsNavigation';
import { createRouteOrPressHandler } from '../../../../presentation/navigation/utils/navigationHelpers';

export interface LegalSectionProps {
    config?: LegalConfig;
    onPress?: () => void;
    containerStyle?: ViewStyle;
    title?: string;
    description?: string;
    sectionTitle?: string;
    noBackground?: boolean;
    hideMargin?: boolean;
}


export const LegalSection: React.FC<LegalSectionProps> = ({
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
        route: config?.route || config?.defaultRoute || 'Legal',
        onPress: onPress || config?.onPress,
    });

    if (!title) return null;

    return (
        <SettingsItemCard
            title={title}
            description={description}
            icon="document-text-outline"
            onPress={handlePress}
            containerStyle={containerStyle}
            sectionTitle={sectionTitle}
            noBackground={noBackground}
            hideMargin={hideMargin}
        />
    );
};

