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
    const { t } = useLocalization();
    const navigation = useAppNavigation();

    const handleFAQPress = useCallback(() => {
        navigation.navigate("FAQ" as never);
    }, [navigation]);

    if (!(features.feedback || features.rating || features.faqs)) return null;

    return (
        <SettingsSection title={t("settings.support.title")}>
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
                            title: normalizedConfig.feedback.config?.title || t("settings.feedback.title"),
                            description: normalizedConfig.feedback.config?.description || t("settings.feedback.description"),
                            initialType: normalizedConfig.feedback.config?.initialType,
                            onSubmit: normalizedConfig.feedback.config?.onSubmit,
                            onPress: normalizedConfig.feedback.config?.onPress,
                        }
                    }}
                    ratingConfig={{
                        enabled: features.rating,
                        config: {
                            title: normalizedConfig.rating.config?.title || t("settings.rating.title"),
                            description: normalizedConfig.rating.config?.description || t("settings.rating.description"),
                            storeUrl: normalizedConfig.rating.config?.storeUrl,
                            onRate: normalizedConfig.rating.config?.onRate,
                        }
                    }}
                    feedbackModalTexts={{
                        title: t("settings.feedback.modal.title"),
                        ratingLabel: t("settings.feedback.modal.ratingLabel"),
                        descriptionPlaceholder: t("settings.feedback.modal.descriptionPlaceholder"),
                        submitButton: t("settings.feedback.modal.submitButton"),
                        submittingButton: t("settings.feedback.modal.submittingButton"),
                        feedbackTypes: [
                            { type: 'general', label: t("settings.feedback.types.general") },
                            { type: 'bug_report', label: t("settings.feedback.types.bugReport") },
                            { type: 'feature_request', label: t("settings.feedback.types.featureRequest") },
                            { type: 'improvement', label: t("settings.feedback.types.improvement") },
                            { type: 'other', label: t("settings.feedback.types.other") },
                        ],
                        defaultTitle: (type) => {
                            const titles: Record<string, string> = {
                                general: t("settings.feedback.types.general"),
                                bug_report: t("settings.feedback.types.bugReport"),
                                feature_request: t("settings.feedback.types.featureRequest"),
                                improvement: t("settings.feedback.types.improvement"),
                                other: t("settings.feedback.types.other"),
                            };
                            return titles[type] || type;
                        },
                    }}
                />
            )}

            {features.faqs && (
                <SettingsItemCard
                    title={normalizedConfig.faqs.config?.title || t("settings.faqs.title")}
                    description={normalizedConfig.faqs.config?.description || t("settings.faqs.description")}
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
