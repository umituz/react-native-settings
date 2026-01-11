import React from 'react';
import { ViewStyle } from 'react-native';
import { useAppNavigation } from '@umituz/react-native-design-system';
import { LegalConfig } from '../../domain/entities/LegalConfig';
import { SettingsItemCard } from '../../../../presentation/components/SettingsItemCard';

export interface LegalSectionProps {
    config?: LegalConfig;
    onPress?: () => void;
    containerStyle?: ViewStyle;
    title?: string;
    description?: string;
    sectionTitle?: string;
}

export const LegalSection: React.FC<LegalSectionProps> = ({
    config,
    onPress,
    containerStyle,
    title: propsTitle,
    description: propsDescription,
    sectionTitle: propsSectionTitle,
}) => {
    const navigation = useAppNavigation();

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
            navigation.navigate(route as never);
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
        />
    );
};
