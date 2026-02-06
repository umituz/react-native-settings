/**
 * Video Tutorial Section Component
 * Renders Video Tutorial entry point for settings
 */

import React from 'react';

export interface VideoTutorialConfig {
    enabled?: boolean;
    title?: string;
    description?: string;
    onPress?: () => void;
}

export interface VideoTutorialSectionProps {
    config: VideoTutorialConfig;
    renderSection: (props: {
        title: string;
        children: React.ReactNode;
    }) => React.ReactElement | null;
    renderItem: (props: {
        title: string;
        icon: string;
        onPress: () => void;
        isLast?: boolean;
    }) => React.ReactElement | null;
}

export const VideoTutorialSection: React.FC<VideoTutorialSectionProps> = ({
    config,
    renderSection,
    renderItem,
}) => {
    // onPress is required for VideoTutorial section to be functional
    if (!config.enabled || !config.title || !config.description || !config.onPress) {
        return null;
    }

    return (
        <>
            {renderSection({
                title: config.title,
                children: renderItem({
                    title: config.description,
                    icon: 'play-circle',
                    onPress: config.onPress,
                    isLast: true,
                }),
            })}
        </>
    );
};
