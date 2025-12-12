/**
 * About & Legal Section Component
 * Single Responsibility: Render about and legal settings section
 */

import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useLocalization } from "@umituz/react-native-localization";
import type { NavigationProp } from "@react-navigation/native";
import { SettingItem } from "../../components/SettingItem";
import { SettingsSection } from "../../components/SettingsSection";
import type { AboutConfig, LegalConfig } from "../types";

interface AboutLegalSectionProps {
  showAbout: boolean;
  showLegal: boolean;
  aboutConfig?: AboutConfig;
  legalConfig?: LegalConfig;
}

type RootStackParamList = {
  About: undefined;
  Legal: undefined;
  [key: string]: undefined;
};

type NavigationType = NavigationProp<RootStackParamList>;

export const AboutLegalSection: React.FC<AboutLegalSectionProps> = ({
  showAbout,
  showLegal,
  aboutConfig,
  legalConfig,
}) => {
  const navigation = useNavigation<NavigationType>();
  const { t } = useLocalization();

  if (!showAbout && !showLegal) {
    return null;
  }

  const aboutRoute = aboutConfig?.route || aboutConfig?.defaultRoute || "About";
  const aboutTitle = aboutConfig?.title || t("settings.about.title");
  const aboutDescription =
    aboutConfig?.description || t("settings.about.description");

  const legalRoute = legalConfig?.route || legalConfig?.defaultRoute || "Legal";
  const legalTitle = legalConfig?.title || t("settings.legal.title");
  const legalDescription =
    legalConfig?.description || t("settings.legal.description");

  return (
    <SettingsSection title={t("settings.sections.about")}>
      {showAbout && (
        <SettingItem
          icon={(props) => <Feather name={"info" as any} {...props} />}
          title={aboutTitle}
          value={aboutDescription}
          onPress={() => navigation.navigate(aboutRoute as string)}
        />
      )}
      {showLegal && (
        <SettingItem
          icon={(props) => <Feather name={"file-text" as any} {...props} />}
          title={legalTitle}
          value={legalDescription}
          onPress={() => navigation.navigate(legalRoute as string)}
          isLast={true}
        />
      )}
    </SettingsSection>
  );
};

