import React from 'react';
import { ViewStyle } from 'react-native';
import { AppearanceSectionConfig } from '../../types';
import { SettingsItemCard } from '../../../../presentation/components/SettingsItemCard';
import { useSettingsNavigation } from '../../../../presentation/navigation/hooks/useSettingsNavigation';
import { createRouteOrPressHandler } from '../../../../presentation/navigation/utils/navigationHelpers';

export interface AppearanceSectionProps {
    config?: AppearanceSectionConfig;
    onPress?: () => void;
    containerStyle?: ViewStyle;
    sectionTitle?: string;
    /** Optional explicit title override */
    title?: string;
    /** Optional explicit description override */
    description?: string;
    noBackground?: boolean;
    hideMargin?: boolean;
}


export const AppearanceSection: React.FC<AppearanceSectionProps> = ({
    config,
    onPress,
    containerStyle,
    sectionTitle,
    title: titleProp,
    description: descriptionProp,
    noBackground,
    hideMargin,
}) => {

    const navigation = useSettingsNavigation();

    const title = titleProp || config?.title;
    const description = descriptionProp || config?.description;

    const handlePress = createRouteOrPressHandler(navigation.navigate, {
        route: config?.route || config?.defaultRoute || 'Appearance',
        onPress: onPress || config?.onPress,
    });

    if (!title) return null;

    return (
        <SettingsItemCard
            title={title}
            description={description}
            icon="color-palette"
            onPress={handlePress}
            containerStyle={containerStyle}
            sectionTitle={sectionTitle}
            noBackground={noBackground}
            hideMargin={hideMargin}
        />
    );
};


