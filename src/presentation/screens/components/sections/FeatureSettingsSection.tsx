import React from "react";
import { AppearanceSection } from "../../../../domains/appearance/presentation/components/AppearanceSection";
import { NotificationsSection } from "../../../../domains/notifications";
import { getLanguageByCode } from "../../../../domains/localization";
import { SettingsItemCard } from "../../../components/SettingsItemCard";
import type { NormalizedConfig } from "../../utils/normalizeConfig";
import { SettingsSection } from "../../../components/SettingsSection";
import { useSettingsNavigation } from "../../../navigation/hooks/useSettingsNavigation";

interface FeatureSettingsSectionProps {
  normalizedConfig: NormalizedConfig;
  features: {
    appearance: boolean;
    language: boolean;
    notifications: boolean;
  };
  currentLanguage?: string;
}

export const FeatureSettingsSection: React.FC<FeatureSettingsSectionProps> = ({
  normalizedConfig,
  features,
  currentLanguage,
}) => {
  const translations = normalizedConfig.translations;
  const navigation = useSettingsNavigation();

  const handleLanguagePress = React.useCallback(() => {
    if (normalizedConfig.language.config?.onPress) {
      normalizedConfig.language.config.onPress();
    } else {
      const route = normalizedConfig.language.config?.route || "LanguageSelection";
      navigation.navigate(route as 'LanguageSelection');
    }
  }, [navigation, normalizedConfig.language.config]);

  const langCode = currentLanguage || "en-US";
  const currentLanguageData = React.useMemo(() => getLanguageByCode(langCode), [langCode]);
  
  const languageDisplayName = React.useMemo(() => {
    if (!currentLanguageData) return langCode;
    return `${currentLanguageData.flag} ${currentLanguageData.nativeName}`;
  }, [currentLanguageData, langCode]);

  if (!features.appearance && !features.language && !features.notifications) return null;

  return (
    <SettingsSection
      title={translations?.sections?.app || ''}
    >
      {features.appearance && (
        <AppearanceSection
          config={{
            ...normalizedConfig.appearance.config,
            title: translations?.features?.appearance?.title,
            description: translations?.features?.appearance?.description,
          }}
          noBackground={true}
          hideMargin={true}
        />
      )}

      {features.language && (
        <SettingsItemCard
          title={translations?.features?.language?.title || ''}
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
            title: translations?.features?.notifications?.title,
            description: translations?.features?.notifications?.description,
          }}
          noBackground={true}
          hideMargin={true}
        />
      )}

    </SettingsSection>
  );
};
