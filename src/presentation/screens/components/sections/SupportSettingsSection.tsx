import React, { useCallback } from "react";
import { SupportSection } from "../../../../domains/feedback/presentation/components/SupportSection";
import { SettingsSection } from "../../../components/SettingsSection";
import { SettingsItemCard } from "../../../components/SettingsItemCard";
import { SettingsNavigationItem } from "../../../components/SettingsNavigationItem";
import type { NormalizedConfig } from "../../utils/normalizeConfig";
import { compareConfigAndFeatures } from "../../../../infrastructure/utils/memoComparisonUtils";
import { useSettingsNavigation } from "../../../navigation/hooks/useSettingsNavigation";

interface SupportSettingsSectionProps {
    features: { feedback: boolean; rating: boolean; faqs: boolean; [key: string]: boolean };
    normalizedConfig: NormalizedConfig;
}

export const SupportSettingsSection: React.FC<SupportSettingsSectionProps> = ({
    features,
    normalizedConfig,
}) => {
    const translations = normalizedConfig.translations;
    const navigation = useSettingsNavigation();

    const handleFAQPress = useCallback(() => {
        navigation.navigate("FAQ");
    }, [navigation]);

    if (!(features.feedback || features.rating || features.faqs || features.videoTutorial)) return null;

    return (
        <SettingsSection title={translations?.sections?.support}>
            {(features.feedback || features.rating) && (
                <SupportSection
                    renderSection={(props: { title: string; children: React.ReactNode }) => <>{props.children}</>}
                    renderItem={(props: { title: string; icon: string; onPress: () => void; isLast?: boolean }) => (
                        <SettingsItemCard
                            title={props.title}
                            icon={props.icon}
                            onPress={props.onPress}
                            noBackground={true}
                            hideMargin={true}
                        />
                    )}
                    feedbackConfig={{
                        enabled: features.feedback,
                        config: {
                            title: normalizedConfig.feedback.config?.title || translations?.features?.feedback?.title,
                            description: normalizedConfig.feedback.config?.description || translations?.features?.feedback?.description,
                            initialType: normalizedConfig.feedback.config?.initialType,
                            onSubmit: normalizedConfig.feedback.config?.onSubmit,
                            onPress: normalizedConfig.feedback.config?.onPress,
                        }
                    }}
                    ratingConfig={{
                        enabled: features.rating,
                        config: {
                            title: normalizedConfig.rating.config?.title || translations?.features?.rating?.title,
                            description: normalizedConfig.rating.config?.description || translations?.features?.rating?.description,
                            storeUrl: normalizedConfig.rating.config?.storeUrl,
                            onRate: normalizedConfig.rating.config?.onRate,
                        }
                    }}
                    feedbackModalTexts={{
                        title: translations?.feedbackModal?.title,
                        ratingLabel: translations?.feedbackModal?.ratingLabel,
                        descriptionPlaceholder: translations?.feedbackModal?.descriptionPlaceholder,
                        submitButton: translations?.feedbackModal?.submitButton,
                        submittingButton: translations?.feedbackModal?.submittingButton,
                        feedbackTypes: [
                            { type: 'general', label: translations?.feedbackModal?.types?.general },
                            { type: 'bug_report', label: translations?.feedbackModal?.types?.bugReport },
                            { type: 'feature_request', label: translations?.feedbackModal?.types?.featureRequest },
                            { type: 'improvement', label: translations?.feedbackModal?.types?.improvement },
                            { type: 'other', label: translations?.feedbackModal?.types?.other },
                        ],
                        defaultTitle: (type) => {
                            const titles: Record<string, string> = {
                                general: translations?.feedbackModal?.types?.general || type,
                                bug_report: translations?.feedbackModal?.types?.bugReport || type,
                                feature_request: translations?.feedbackModal?.types?.featureRequest || type,
                                improvement: translations?.feedbackModal?.types?.improvement || type,
                                other: translations?.feedbackModal?.types?.other || type,
                            };
                            return titles[type] || type;
                        },
                    }}
                />
            )}

            {features.faqs && (
                <SettingsItemCard
                    title={normalizedConfig.faqs.config?.title || translations?.features?.faqs?.title}
                    description={normalizedConfig.faqs.config?.description || translations?.features?.faqs?.description}
                    icon="help-circle-outline"
                    onPress={handleFAQPress}
                    noBackground={true}
                    hideMargin={true}
                />
            )}

            {features.videoTutorial && (
                <SettingsNavigationItem
                    config={normalizedConfig.videoTutorial.config || {}}
                    defaultIcon="play-circle-outline"
                    defaultRoute="VideoTutorial"
                    noBackground={true}
                    hideMargin={true}
                />
            )}
        </SettingsSection>
    );
};

SupportSettingsSection.displayName = "SupportSettingsSection";

export const MemoizedSupportSettingsSection = React.memo(SupportSettingsSection, compareConfigAndFeatures);
MemoizedSupportSettingsSection.displayName = "MemoizedSupportSettingsSection";
