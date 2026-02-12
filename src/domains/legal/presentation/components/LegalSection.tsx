import React from 'react';
import { ViewStyle } from 'react-native';
import { LegalConfig } from '../../domain/entities/LegalConfig';
import { SettingsItemCard } from '../../../../presentation/components/SettingsItemCard';
import { useSettingsNavigation } from '../../../../presentation/navigation/hooks/useSettingsNavigation';

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

    const route = config?.route || config?.defaultRoute || 'Legal';
    const title = propsTitle || config?.title;
    const description = propsDescription || config?.description;
    const sectionTitle = propsSectionTitle;

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else if (config?.onPress) {
            config.onPress();
        } else {
            navigation.navigate(route as 'Legal');
        }
    };

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

