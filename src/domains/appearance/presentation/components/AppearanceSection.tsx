import React from 'react';
import { ViewStyle } from 'react-native';
import { useAppNavigation } from '@umituz/react-native-design-system';
import { AppearanceSectionConfig } from '../../types';
import { SettingsItemCard } from '../../../../presentation/components/SettingsItemCard';

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

    const navigation = useAppNavigation();

    const route = config?.route || config?.defaultRoute || 'Appearance';
    const title = titleProp || config?.title;
    const description = descriptionProp || config?.description;

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
            icon="color-palette"
            onPress={handlePress}
            containerStyle={containerStyle}
            sectionTitle={sectionTitle}
            noBackground={noBackground}
            hideMargin={hideMargin}
        />
    );
};


