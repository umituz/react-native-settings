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
    if (!config.enabled) return null;

    return (
        <>
            {renderSection({
                title: config.title || 'Help & Support',
                children: renderItem({
                    title: config.description || 'FAQ',
                    icon: 'help-circle',
                    onPress: config.onPress || (() => console.warn('No FAQ handler')),
                    isLast: true,
                }),
            })}
        </>
    );
};
