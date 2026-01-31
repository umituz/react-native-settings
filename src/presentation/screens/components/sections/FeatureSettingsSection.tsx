import React from "react";
import { useAppNavigation } from "@umituz/react-native-design-system";
import { AppearanceSection } from "../../../../domains/appearance/presentation/components/AppearanceSection";
import { NotificationsSection } from "../../../../domains/notifications";
import { useLocalization, getLanguageByCode } from "../../../../domains/localization";
import { SettingsItemCard } from "../../../components/SettingsItemCard";
import type { NormalizedConfig } from "../../utils/normalizeConfig";

import { SettingsSection } from "../../../components/SettingsSection";

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
  const { t, currentLanguage } = useLocalization();
  const navigation = useAppNavigation();

  const handleLanguagePress = () => {
    if (normalizedConfig.language.config?.onPress) {
      normalizedConfig.language.config.onPress();
    } else {
      const route =
        normalizedConfig.language.config?.route || "LanguageSelection";
      navigation.navigate(route as never);
    }
  };

  const currentLanguageData = getLanguageByCode(currentLanguage);
  const languageDisplayName = currentLanguageData
    ? `${currentLanguageData.flag} ${currentLanguageData.nativeName}`
    : currentLanguage;

  if (!features.appearance && !features.language && !features.notifications)
    return null;

  return (
    <SettingsSection
      title={t("settings.sections.app.title") || t("settings.sections.app") || "App Settings"}
    >
      {features.appearance && (
        <AppearanceSection
          config={{
            ...normalizedConfig.appearance.config,
            title: t("settings.appearance.title"),
            description: t("settings.appearance.description"),
          }}
          noBackground={true}
          hideMargin={true}
        />
      )}

      {features.language && (
        <SettingsItemCard
          title={t("settings.languageSelection.title")}
          description={languageDisplayName}
          icon="globe-outline"
          onPress={handleLanguagePress}
          noBackground={true}
          hideMargin={true}
        />
      )}

      {features.notifications && (
        <NotificationsSection
          config={{
            ...normalizedConfig.notifications.config,
            title: t("settings.notifications.title"),
            description: t("settings.notifications.description"),
          }}
          noBackground={true}
          hideMargin={true}
        />
      )}

    </SettingsSection>
  );
};

