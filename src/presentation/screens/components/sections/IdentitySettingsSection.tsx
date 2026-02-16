import React from "react";
import { AboutSection } from "../../../../domains/about/presentation/components/AboutSection";
import { LegalSection } from "../../../../domains/legal/presentation/components/LegalSection";
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
        <SettingsSection title={translations?.sections?.about || ''}>
            {features.about && (
                <AboutSection
                    config={{
                        ...normalizedConfig.about.config,
                        title: translations?.features?.about?.title,
                        description: translations?.features?.about?.description,
                    }}
                    noBackground={true}
                    hideMargin={true}
                />
            )}

            {features.legal && (
                <LegalSection
                    config={{
                        ...normalizedConfig.legal.config,
                        title: translations?.features?.legal?.title,
                        description: translations?.features?.legal?.description,
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
