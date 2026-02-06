import React from "react";
import { AboutSection } from "../../../../domains/about/presentation/components/AboutSection";
import { LegalSection } from "../../../../domains/legal/presentation/components/LegalSection";
import { useLocalization } from "../../../../domains/localization";
import type { NormalizedConfig } from "../../utils/normalizeConfig";

import { SettingsSection } from "../../../components/SettingsSection";

interface IdentitySettingsSectionProps {
    normalizedConfig: NormalizedConfig;
    features: { about: boolean; legal: boolean; [key: string]: boolean };
}

export const IdentitySettingsSection: React.FC<IdentitySettingsSectionProps> = ({
    normalizedConfig,
    features,
}) => {
    const { t } = useLocalization();

    if (!features.about && !features.legal) return null;

    return (
        <SettingsSection title={t("settings.about.title")}>
            {features.about && (
                <AboutSection
                    config={{
                        ...normalizedConfig.about.config,
                        title: t("settings.about.title"),
                        description: t("settings.about.description"),
                    }}
                    noBackground={true}
                    hideMargin={true}
                />
            )}

            {features.legal && (
                <LegalSection
                    config={{
                        ...normalizedConfig.legal.config,
                        title: t("settings.legal.title"),
                        description: t("settings.legal.description"),
                    }}
                    noBackground={true}
                    hideMargin={true}
                />
            )}
        </SettingsSection>
    );
};


