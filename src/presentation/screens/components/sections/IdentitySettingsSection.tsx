import React from "react";
import { AboutSection } from "../../../../domains/about/presentation/components/AboutSection";
import { LegalSection } from "../../../../domains/legal/presentation/components/LegalSection";
import { useLocalization } from "@umituz/react-native-localization";
import type { NormalizedConfig } from "../../utils/normalizeConfig";

interface IdentitySettingsSectionProps {
    normalizedConfig: NormalizedConfig;
    features: any;
}

export const IdentitySettingsSection: React.FC<IdentitySettingsSectionProps> = ({
    normalizedConfig,
    features,
}) => {
    const { t } = useLocalization();

    return (
        <>
            {features.about && (
                <AboutSection
                    config={{
                        ...normalizedConfig.about.config,
                        title: t("settings.about.title"),
                        description: t("settings.about.description"),
                    }}
                    sectionTitle={t("settings.about.title")}
                />
            )}

            {features.legal && (
                <LegalSection
                    config={{
                        ...normalizedConfig.legal.config,
                        title: t("settings.legal.title"),
                        description: t("settings.legal.description"),
                    }}
                    sectionTitle={t("settings.legal.title")}
                />
            )}
        </>
    );
};
