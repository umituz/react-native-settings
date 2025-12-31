import React from "react";
import { useLocalization } from "@umituz/react-native-localization";
import type { IconName } from "@umituz/react-native-design-system";
import { SettingsItemCard } from "../../../components/SettingsItemCard";
import type { SubscriptionConfig } from "../../types";

interface SubscriptionSettingsSectionProps {
  config?: SubscriptionConfig;
}

export const SubscriptionSettingsSection: React.FC<SubscriptionSettingsSectionProps> = ({
  config,
}) => {
  const { t } = useLocalization();

  // onPress is required for subscription section to be functional
  if (!config || !config.onPress) return null;

  return (
    <SettingsItemCard
      title={config.title || t("settings.subscription.title")}
      description={config.description || t("settings.subscription.description")}
      icon={(config.icon || "star") as IconName}
      onPress={config.onPress}
      sectionTitle={config.sectionTitle || t("settings.sections.subscription")}
    />
  );
};
