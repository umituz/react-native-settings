import React, { useCallback } from "react";
import { useLocalization } from "../../../../domains/localization";
import { useAppNavigation } from "@umituz/react-native-design-system";
import { SupportSection } from "../../../../domains/feedback/presentation/components/SupportSection";
import { SettingsSection } from "../../../components/SettingsSection";
import { SettingsItemCard } from "../../../components/SettingsItemCard";
import type { NormalizedConfig } from "../../utils/normalizeConfig";
import { compareConfigAndFeatures } from "../../../../infrastructure/utils/memoComparisonUtils";

interface SupportSettingsSectionProps {
    features: { feedback: boolean; rating: boolean; faqs: boolean; [key: string]: boolean };
    normalizedConfig: NormalizedConfig;
}

export const SupportSettingsSection: React.FC<SupportSettingsSectionProps> = ({
    features,
    normalizedConfig,
}) => {
    const translations = normalizedConfig.translations;
    const navigation = useAppNavigation();

    const handleFAQPress = useCallback(() => {
        navigation.navigate("FAQ" as never);
    }, [navigation]);

    if (!(features.feedback || features.rating || features.faqs)) return null;

    return (
        <SettingsSection title={translations?.sections?.support || "Support"}>
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
                            title: normalizedConfig.feedback.config?.title || translations?.features?.feedback?.title || "Feedback",
                            description: normalizedConfig.feedback.config?.description || translations?.features?.feedback?.description || "Give us your feedback",
                            initialType: normalizedConfig.feedback.config?.initialType,
                            onSubmit: normalizedConfig.feedback.config?.onSubmit,
                            onPress: normalizedConfig.feedback.config?.onPress,
                        }
                    }}
                    ratingConfig={{
                        enabled: features.rating,
                        config: {
                            title: normalizedConfig.rating.config?.title || translations?.features?.rating?.title || "Rate Us",
                            description: normalizedConfig.rating.config?.description || translations?.features?.rating?.description || "Love the app? Rate us!",
                            storeUrl: normalizedConfig.rating.config?.storeUrl,
                            onRate: normalizedConfig.rating.config?.onRate,
                        }
                    }}
                    feedbackModalTexts={{
                        title: translations?.feedbackModal?.title || "Send Feedback",
                        ratingLabel: translations?.feedbackModal?.ratingLabel || "Rating",
                        descriptionPlaceholder: translations?.feedbackModal?.descriptionPlaceholder || "Feedback",
                        submitButton: translations?.feedbackModal?.submitButton || "Submit",
                        submittingButton: translations?.feedbackModal?.submittingButton || "Submitting...",
                        feedbackTypes: [
                            { type: 'general', label: translations?.feedbackModal?.types?.general || "General" },
                            { type: 'bug_report', label: translations?.feedbackModal?.types?.bugReport || "Bug Report" },
                            { type: 'feature_request', label: translations?.feedbackModal?.types?.featureRequest || "Feature Request" },
                            { type: 'improvement', label: translations?.feedbackModal?.types?.improvement || "Improvement" },
                            { type: 'other', label: translations?.feedbackModal?.types?.other || "Other" },
                        ],
                        defaultTitle: (type) => {
                            const titles: Record<string, string> = {
                                general: translations?.feedbackModal?.types?.general || "General",
                                bug_report: translations?.feedbackModal?.types?.bugReport || "Bug Report",
                                feature_request: translations?.feedbackModal?.types?.featureRequest || "Feature Request",
                                improvement: translations?.feedbackModal?.types?.improvement || "Improvement",
                                other: translations?.feedbackModal?.types?.other || "Other",
                            };
                            return titles[type] || type;
                        },
                    }}
                />
            )}

            {features.faqs && (
                <SettingsItemCard
                    title={normalizedConfig.faqs.config?.title || translations?.features?.faqs?.title || "FAQ"}
                    description={normalizedConfig.faqs.config?.description || translations?.features?.faqs?.description || "Frequently Asked Questions"}
                    icon="help-circle-outline"
                    onPress={handleFAQPress}
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
