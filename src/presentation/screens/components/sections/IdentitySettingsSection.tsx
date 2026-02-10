import React from "react";
import { AboutSection } from "../../../../domains/about/presentation/components/AboutSection";
import { LegalSection } from "../../../../domains/legal/presentation/components/LegalSection";
import { useLocalization } from "../../../../domains/localization";
import type { NormalizedConfig } from "../../utils/normalizeConfig";
import { SettingsSection } from "../../../components/SettingsSection";
import { compareConfigAndFeatures } from "../../../../infrastructure/utils/memoComparisonUtils";

interface IdentitySettingsSectionProps {
    normalizedConfig: NormalizedConfig;
    features: { about: boolean; legal: boolean; [key: string]: boolean };
}

export const IdentitySettingsSection: React.FC<IdentitySettingsSectionProps> = ({
    normalizedConfig,
    features,
}) => {
    const translations = normalizedConfig.translations;

    if (!features.about && !features.legal) return null;

    return (
        <SettingsSection title={translations?.sections?.about || "About"}>
            {features.about && (
                <AboutSection
                    config={{
                        ...normalizedConfig.about.config,
                        title: translations?.features?.about?.title || "About",
                        description: translations?.features?.about?.description || "About the app",
                    }}
                    noBackground={true}
                    hideMargin={true}
                />
            )}

            {features.legal && (
                <LegalSection
                    config={{
                        ...normalizedConfig.legal.config,
                        title: translations?.features?.legal?.title || "Legal",
                        description: translations?.features?.legal?.description || "Privacy Policy & Terms",
                    }}
                    noBackground={true}
                    hideMargin={true}
                />
            )}
        </SettingsSection>
    );
};

IdentitySettingsSection.displayName = "IdentitySettingsSection";

export const MemoizedIdentitySettingsSection = React.memo(IdentitySettingsSection, compareConfigAndFeatures);
MemoizedIdentitySettingsSection.displayName = "MemoizedIdentitySettingsSection";
