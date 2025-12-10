/**
 * About & Legal Section Component
 * Single Responsibility: Render about and legal settings section
 */

import React from "react";
import { Info, FileText } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useLocalization } from "@umituz/react-native-localization";
import { SettingItem } from "../../components/SettingItem";
import { SettingsSection } from "../../components/SettingsSection";
import type { AboutConfig, LegalConfig } from "../types";

interface AboutLegalSectionProps {
  showAbout: boolean;
  showLegal: boolean;
  aboutConfig?: AboutConfig;
  legalConfig?: LegalConfig;
}

export const AboutLegalSection: React.FC<AboutLegalSectionProps> = ({
  showAbout,
  showLegal,
  aboutConfig,
  legalConfig,
}) => {
  const navigation = useNavigation();
  const { t } = useLocalization();

  if (!showAbout && !showLegal) {
    return null;
  }

  const aboutRoute = aboutConfig?.route || "About";
  const aboutTitle = aboutConfig?.title || t("settings.about.title");
  const aboutDescription =
    aboutConfig?.description || t("settings.about.description");

  const legalRoute = legalConfig?.route || "Legal";
  const legalTitle = legalConfig?.title || t("settings.legal.title");
  const legalDescription =
    legalConfig?.description || t("settings.legal.description");

  return (
    <SettingsSection title={t("settings.sections.about")}>
      {showAbout && (
        <SettingItem
          icon={Info}
          title={aboutTitle}
          value={aboutDescription}
          onPress={() => navigation.navigate(aboutRoute as never)}
        />
      )}
      {showLegal && (
        <SettingItem
          icon={FileText}
          title={legalTitle}
          value={legalDescription}
          onPress={() => navigation.navigate(legalRoute as never)}
          isLast={true}
        />
      )}
    </SettingsSection>
  );
};

