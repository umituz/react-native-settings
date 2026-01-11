import React from "react";
import { useAppNavigation } from "@umituz/react-native-design-system";
import { AppearanceSection } from "../../../../domains/appearance/presentation/components/AppearanceSection";
import { NotificationsSection } from "../../../../domains/notifications";
import { useLocalization, getLanguageByCode } from "@umituz/react-native-localization";
import { SettingsItemCard } from "../../../components/SettingsItemCard";
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
  const { t, currentLanguage } = useLocalization();
  const navigation = useAppNavigation();

  const handleLanguagePress = () => {
    if (normalizedConfig.language.config?.onPress) {
      normalizedConfig.language.config.onPress();
    } else {
      const route = normalizedConfig.language.config?.route || "LanguageSelection";
      navigation.navigate(route as never);
    }
  };

  const currentLanguageData = getLanguageByCode(currentLanguage);
  const languageDisplayName = currentLanguageData 
    ? `${currentLanguageData.flag} ${currentLanguageData.nativeName}`
    : currentLanguage;

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
        <SettingsItemCard
          title={t("settings.languageSelection.title")}
          description={languageDisplayName}
          icon="globe-outline"
          onPress={handleLanguagePress}
          sectionTitle={t("settings.languageSelection.title")}
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
