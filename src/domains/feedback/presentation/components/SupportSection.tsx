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
                // Add a small delay for better UX if needed, or remove it if instant response is preferred
                // await new Promise(resolve => setTimeout(resolve, 300)); 
                await feedbackConfig.config.onSubmit(data);
                
                // Only close on success - or let the parent handle it? 
                // Since onSubmit in config returns Promise<void> and usually handles errors via callbacks (onError),
                // we can assume if it resolves, we should close.
                // If the App's onSubmit logic catches errors and resolves, we still close.
                setModalVisible(false);
            } catch (error) {
                // If the passed onSubmit throws, we log it.
                if (__DEV__) {
                    console.error("[SupportSection] Feedback submission error:", error);
                }
                // Optionally keep modal open? Or close it?
                // If we keep it open, user can retry.
                // But usually we close it.
                setModalVisible(false);
            } finally {
                setIsSubmitting(false);
            }
        } else {
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
            try {
                // Safely handle URL for App Store - itunes.apple.com is more reliable for deep links
                let url = config.storeUrl;
                if (url.includes('apps.apple.com')) {
                    url = url.replace('apps.apple.com', 'itunes.apple.com');
                }
                
                // Try opening the modified URL
                await Linking.openURL(url);
            } catch (error) {
                // Final fallback to original URL
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
                            onPress: feedbackConfig.config.onPress || (() => setModalVisible(true)),
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
