/**
 * Support Section Component
 * Renders Support entry points: Feedback and Rating
 * Agnostic of UI implementation via render props
 */

import React, { useState, useCallback } from "react";
import { Linking } from "react-native";
import { FeedbackModal } from "./FeedbackModal";
import type { FeedbackType } from "../../domain/entities/FeedbackEntity";

export interface FeedbackConfig {
    enabled?: boolean;
    title?: string;
    description?: string;
    initialType?: FeedbackType;
    onSubmit?: (data: { type: any; rating: number; description: string; title: string }) => Promise<void>;
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
    ratingLabel?: string;
    descriptionPlaceholder?: string;
    submitButton?: string;
    submittingButton?: string;
    feedbackTypes?: Array<{ type: FeedbackType; label: string }>;
    defaultTitle?: (type: FeedbackType) => string;
}

export interface SupportSectionProps {
    feedbackConfig: { enabled: boolean; config?: FeedbackConfig };
    ratingConfig: { enabled: boolean; config?: RatingConfig };
    renderSection: (props: { title: string; children: React.ReactNode }) => React.ReactElement | null;
    renderItem: (props: {
        title: string;
        icon: any;
        onPress: () => void;
        isLast?: boolean
    }) => React.ReactElement | null;
    /** Texts for the feedback modal */
    feedbackModalTexts?: FeedbackModalTexts;
}

export const SupportSection: React.FC<SupportSectionProps> = ({
    feedbackConfig,
    ratingConfig,
    renderSection,
    renderItem,
    feedbackModalTexts
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFeedbackSubmit = async (data: { type: any; rating: number; description: string; title: string }) => {
        if (feedbackConfig.config?.onSubmit) {
            setIsSubmitting(true);
            try {
                await feedbackConfig.config.onSubmit(data);
                setModalVisible(false);
            } catch (error) {
                if (__DEV__) {
                    console.error("Feedback submission error:", error);
                }
            } finally {
                setIsSubmitting(false);
            }
        } else {
            if (__DEV__) {
                console.warn("No onSubmit handler provided for Feedback");
            }
            setModalVisible(false);
        }
    };

    const handleRateApp = useCallback(async () => {
        const config = ratingConfig.config;
        if (config?.onRate) {
            config.onRate();
            return;
        }

        if (config?.storeUrl) {
            const supported = await Linking.canOpenURL(config.storeUrl);
            if (supported) {
                await Linking.openURL(config.storeUrl);
            } else {
                if (__DEV__) {
                    console.warn("Cannot open store URL:", config.storeUrl);
                }
            }
        } else {
            if (__DEV__) {
                console.warn("No storeUrl or onRate provided for Rating");
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
                            icon: "mail-outline",
                            onPress: () => setModalVisible(true),
                            isLast: !showRating
                        })}

                        {showRating && ratingConfig.config?.description && renderItem({
                            title: ratingConfig.config.description,
                            icon: "star-outline",
                            onPress: handleRateApp,
                            isLast: true
                        })}
                    </>
                )
            })}

            {showFeedback && feedbackModalTexts && (
                <FeedbackModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSubmit={handleFeedbackSubmit}
                    initialType={feedbackConfig.config?.initialType}
                    isSubmitting={isSubmitting}
                    title={feedbackModalTexts.title}
                    texts={{
                        ratingLabel: feedbackModalTexts.ratingLabel,
                        descriptionPlaceholder: feedbackModalTexts.descriptionPlaceholder,
                        submitButton: feedbackModalTexts.submitButton,
                        submittingButton: feedbackModalTexts.submittingButton,
                        feedbackTypes: feedbackModalTexts.feedbackTypes,
                        defaultTitle: feedbackModalTexts.defaultTitle,
                    }}
                />
            )}
        </>
    );
};
