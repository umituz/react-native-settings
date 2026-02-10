import React from "react";
import { useAppNavigation } from "@umituz/react-native-design-system";
import { AppearanceSection } from "../../../../domains/appearance/presentation/components/AppearanceSection";
import { NotificationsSection } from "../../../../domains/notifications";
import { useLocalization, getLanguageByCode } from "../../../../domains/localization";
import { SettingsItemCard } from "../../../components/SettingsItemCard";
import type { NormalizedConfig } from "../../utils/normalizeConfig";
import { SettingsSection } from "../../../components/SettingsSection";
import { compareConfigAndFeatures } from "../../../../infrastructure/utils/memoComparisonUtils";

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
  const navigation = useAppNavigation();

  const handleLanguagePress = React.useCallback(() => {
    if (normalizedConfig.language.config?.onPress) {
      normalizedConfig.language.config.onPress();
    } else {
      const route = normalizedConfig.language.config?.route || "LanguageSelection";
      navigation.navigate(route as never);
    }
  }, [navigation, normalizedConfig.language.config]);

  const currentLanguageData = React.useMemo(() => 
    currentLanguage ? getLanguageByCode(currentLanguage) : null, 
    [currentLanguage]
  );
  
  const languageDisplayName = React.useMemo(() => {
    if (!currentLanguageData) return currentLanguage || "";
    return `${currentLanguageData.flag} ${currentLanguageData.nativeName}`;
  }, [currentLanguageData, currentLanguage]);

  if (!features.appearance && !features.language && !features.notifications) return null;

  return (
    <SettingsSection
      title={translations?.sections?.app || "App Settings"}
    >
      {features.appearance && (
        <AppearanceSection
          config={{
            ...normalizedConfig.appearance.config,
            title: translations?.features?.appearance?.title || "Appearance",
            description: translations?.features?.appearance?.description || "Theme settings",
          }}
          noBackground={true}
          hideMargin={true}
        />
      )}

      {features.language && (
        <SettingsItemCard
          title={translations?.features?.language?.title || "Language"}
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
            title: translations?.features?.notifications?.title || "Notifications",
            description: translations?.features?.notifications?.description || "Push notification settings",
          }}
          noBackground={true}
          hideMargin={true}
        />
      )}

    </SettingsSection>
  );
};

export const MemoizedFeatureSettingsSection = React.memo(FeatureSettingsSection, compareConfigAndFeatures);
MemoizedFeatureSettingsSection.displayName = "MemoizedFeatureSettingsSection";
