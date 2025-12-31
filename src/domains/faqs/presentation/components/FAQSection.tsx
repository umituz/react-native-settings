/**
 * FAQ Section Component
 * Renders FAQ entry point for settings
 */

import React from 'react';
import { AtomicIcon } from '@umituz/react-native-design-system';

export interface FAQConfig {
    enabled?: boolean;
    title?: string;
    description?: string;
    onPress?: () => void;
}

export interface FAQSectionProps {
    config: FAQConfig;
    renderSection: (props: {
        title: string;
        children: React.ReactNode;
    }) => React.ReactElement | null;
    renderItem: (props: {
        title: string;
        icon: any;
        onPress: () => void;
        isLast?: boolean;
    }) => React.ReactElement | null;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
    config,
    renderSection,
    renderItem,
}) => {
    // onPress is required for FAQ section to be functional
    if (!config.enabled || !config.title || !config.description || !config.onPress) {
        return null;
    }

    return (
        <>
            {renderSection({
                title: config.title,
                children: renderItem({
                    title: config.description,
                    icon: 'help-circle',
                    onPress: config.onPress,
                    isLast: true,
                }),
            })}
        </>
    );
};
