import React from "react";
import { View } from "react-native";
import {
  ListItem,
  AtomicBadge,
  useAppDesignTokens,
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
  const tokens = useAppDesignTokens();

  if (!config) return null;

  return (
    <SettingsSection title={config.sectionTitle || t("settings.sections.subscription")}>
      <ListItem
        title={config.title || t("settings.subscription.title")}
        description={config.description || t("settings.subscription.description")}
        leftIcon={config.icon || "star"}
        onPress={config.onPress}
        rightElement={
          config.isPremium ? (
            <AtomicBadge
              label={t("common.premium")}
              variant="success"
              size="small"
            />
          ) : (
            <AtomicBadge
              label={t("common.free")}
              variant="warning"
              size="small"
            />
          )
        }
      />
    </SettingsSection>
  );
};
