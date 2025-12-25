import React from "react";
import { AppearanceSection } from "../../../../domains/appearance/presentation/components/AppearanceSection";
import { LanguageSection } from "@umituz/react-native-localization";
import { NotificationsSection } from "@umituz/react-native-notifications";
import { useLocalization } from "@umituz/react-native-localization";
import type { NormalizedConfig } from "../../utils/normalizeConfig";

interface FeatureSettingsSectionProps {
  normalizedConfig: NormalizedConfig;
  features: {
    appearance: boolean;
    language: boolean;
    notifications: boolean;
  };
}

export const FeatureSettingsSection: React.FC<FeatureSettingsSectionProps> = ({
  normalizedConfig,
  features,
}) => {
  const { t } = useLocalization();

  return (
    <>
      {features.appearance && (
        <AppearanceSection
          config={{
            ...normalizedConfig.appearance.config,
            title: t("settings.appearance.title"),
            description: t("settings.appearance.description"),
          }}
          sectionTitle={t("settings.appearance.title")}
        />
      )}

      {features.language && (
        <LanguageSection
          config={{
            ...normalizedConfig.language.config,
            title: t("settings.languageSelection.title"),
            description:
              normalizedConfig.language.config?.description ||
              t("settings.languageSelection.description"),
          }}
        />
      )}

      {features.notifications && (
        <NotificationsSection
          config={{
            ...normalizedConfig.notifications.config,
            title: t("settings.notifications.title"),
            description: t("settings.notifications.description"),
          }}
        />
      )}
    </>
  );
};
