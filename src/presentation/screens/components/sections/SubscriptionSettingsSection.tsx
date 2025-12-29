import React from "react";
import {
  ListItem,
  AtomicBadge,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import { SettingsSection } from "../../../components/SettingsSection";
import type { SubscriptionConfig } from "../../types";

interface SubscriptionSettingsSectionProps {
  config?: SubscriptionConfig;
}

export const SubscriptionSettingsSection: React.FC<SubscriptionSettingsSectionProps> = ({
  config,
}) => {
  const { t } = useLocalization();

  if (!config) return null;

  return (
    <SettingsSection title={config.sectionTitle || t("settings.sections.subscription")}>
      <ListItem
        title={config.title || t("settings.subscription.title")}
        subtitle={config.description || t("settings.subscription.description")}
        leftIcon={config.icon || "star"}
        onPress={config.onPress}
      />
    </SettingsSection>
  );
};
