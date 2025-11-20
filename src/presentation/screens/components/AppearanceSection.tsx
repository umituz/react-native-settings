/**
 * Appearance Section Component
 * Single Responsibility: Render appearance settings section
 */

import React from "react";
import { Palette } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useLocalization } from "@umituz/react-native-localization";
import { SettingItem } from "../../components/SettingItem";
import { SettingsSection } from "../../components/SettingsSection";
import type { AppearanceConfig } from "../types";

interface AppearanceSectionProps {
  config?: AppearanceConfig;
}

export const AppearanceSection: React.FC<AppearanceSectionProps> = ({
  config,
}) => {
  const navigation = useNavigation();
  const { t } = useLocalization();

  const route = config?.route || "Appearance";
  const title = config?.title || t("settings.appearance.title");
  const description = config?.description || t("settings.appearance.description");

  return (
    <SettingsSection title={t("settings.sections.app.title")}>
      <SettingItem
        icon={Palette}
        title={title}
        value={description}
        onPress={() => navigation.navigate(route as never)}
      />
    </SettingsSection>
  );
};

