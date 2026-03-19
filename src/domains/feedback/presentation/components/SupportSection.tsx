/**
 * Support Section Component
 * Renders Support entry points: Feedback and Rating
 * Agnostic of UI implementation via render props
 */

import React, { useCallback } from "react";
import { Linking } from "react-native";
import { useAppNavigation } from "@umituz/react-native-design-system/molecules";
import type { FeedbackType } from "../../domain/entities/FeedbackEntity";
import { isDev } from "../../../../utils/devUtils";

export interface FeedbackConfig {
    enabled?: boolean;
    title?: string;
    description?: string;
    initialType?: FeedbackType;
    onSubmit?: (data: { type: FeedbackType; rating: number; description: string; title: string }) => Promise<void>;
    onPress?: () => void;
}

export interface RatingConfig {
    enabled?: boolean;
    title?: string;
    description?: string;
    storeUrl?: string;
    onRate?: () => void;
}

export interface FeedbackModalTexts {
    title?: string;
    ratingLabel: string;
    descriptionPlaceholder: string;
    submitButton: string;
    submittingButton: string;
    feedbackTypes: Array<{ type: FeedbackType; label: string }>;
    defaultTitle: (type: FeedbackType) => string;
}

export interface SupportSectionProps {
    feedbackConfig: { enabled: boolean; config?: FeedbackConfig };
    ratingConfig: { enabled: boolean; config?: RatingConfig };
    renderSection: (props: { title: string; children: React.ReactNode }) => React.ReactElement | null;
    renderItem: (props: {
        title: string;
        icon: string;
        onPress: () => void;
        isLast?: boolean
    }) => React.ReactElement | null;
    /** Texts for the feedback screen */
    feedbackModalTexts?: FeedbackModalTexts;
}

export const SupportSection: React.FC<SupportSectionProps> = ({
    feedbackConfig,
    ratingConfig,
    renderSection,
    renderItem,
    feedbackModalTexts
}) => {
    const navigation = useAppNavigation();

    const handleFeedbackPress = useCallback(() => {
        if (feedbackConfig.config?.onPress) {
            feedbackConfig.config.onPress();
        } else if (feedbackModalTexts) {
            navigation.push('Feedback' as never, {
                initialType: feedbackConfig.config?.initialType,
                title: feedbackModalTexts.title,
                texts: feedbackModalTexts,
            });
        }
    }, [navigation, feedbackConfig.config, feedbackModalTexts]);

    const handleRateApp = useCallback(async () => {
        const config = ratingConfig.config;
        if (config?.onRate) {
            config.onRate();
            return;
        }

        if (config?.storeUrl) {
            try {
                let url = config.storeUrl;
                if (url.includes('apps.apple.com')) {
                    url = url.replace('apps.apple.com', 'itunes.apple.com');
                }
                await Linking.openURL(url);
            } catch {
                if (config.storeUrl) {
                    Linking.openURL(config.storeUrl).catch(() => {});
                }
            }
        }
    }, [ratingConfig.config]);

    const showFeedback = feedbackConfig.enabled;
    const showRating = ratingConfig.enabled;

    if (!showFeedback && !showRating) return null;

    // Use provided titles, no hardcoded defaults
    const sectionTitle = (showFeedback && feedbackConfig.config?.title) || (showRating && ratingConfig.config?.title);

    // If no section title provided, don't render
    if (!sectionTitle) return null;

    return (
        <>
            {renderSection({
                title: sectionTitle,
                children: (
                    <>
                        {showFeedback && feedbackConfig.config?.description && renderItem({
                            title: feedbackConfig.config.description,
                            icon: "mail",
                            onPress: handleFeedbackPress,
                            isLast: !showRating
                        })}

                        {showRating && ratingConfig.config?.description && renderItem({
                            title: ratingConfig.config.description,
                            icon: "star",
                            onPress: handleRateApp,
                            isLast: true
                        })}
                    </>
                )
            })}
        </>
    );
};
