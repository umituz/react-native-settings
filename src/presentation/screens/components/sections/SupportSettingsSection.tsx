import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLocalization } from "@umituz/react-native-localization";
import { SupportSection } from "../../../../domains/feedback/presentation/components/SupportSection";
import { SettingsSection } from "../../../components/SettingsSection";
import { SettingsItemCard } from "../../../components/SettingsItemCard";

interface SupportSettingsSectionProps {
    features: any;
    normalizedConfig: any;
}

export const SupportSettingsSection: React.FC<SupportSettingsSectionProps> = ({
    features,
    normalizedConfig,
}) => {
    const { t } = useLocalization();
    const navigation = useNavigation();

    const handleFAQPress = useCallback(() => {
        navigation.navigate("FAQ" as never);
    }, [navigation]);

    if (!(features.feedback || features.rating || features.faqs)) return null;

    return (
        <SettingsSection title={t("settings.support.title")}>
            {(features.feedback || features.rating) && (
                <SupportSection
                    renderSection={(props: any) => <>{props.children}</>}
                    renderItem={(props: any) => <SettingsItemCard title={props.title} icon={props.icon} onPress={props.onPress} />}
                    feedbackConfig={{
                        enabled: features.feedback,
                        config: {
                            ...normalizedConfig.feedback.config,
                            title: normalizedConfig.feedback.config?.title || t("settings.feedback.title"),
                            description: normalizedConfig.feedback.config?.description || t("settings.feedback.description"),
                        }
                    }}
                    ratingConfig={{
                        enabled: features.rating,
                        config: {
                            ...normalizedConfig.rating.config,
                            title: normalizedConfig.rating.config?.title || t("settings.rating.title"),
                            description: normalizedConfig.rating.config?.description || t("settings.rating.description"),
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
                />
            )}
        </SettingsSection>
    );
};
