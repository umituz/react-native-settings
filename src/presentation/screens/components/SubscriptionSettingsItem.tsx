import React from "react";
import { useAppNavigation } from "@umituz/react-native-design-system";
import { SettingsItemCard } from "../../components/SettingsItemCard";
import type { IconName } from "@umituz/react-native-design-system";
import type { SubscriptionConfig } from "../../screens/types/UserFeatureConfig";

export interface SubscriptionSettingsItemProps {
  config: SubscriptionConfig;
  t: (key: string) => string;
}

export const SubscriptionSettingsItem: React.FC<SubscriptionSettingsItemProps> = ({ config, t }) => {
  const navigation = useAppNavigation();
  const handlePress = () => {
    if (config.route) {
      navigation.navigate(config.route as never);
    } else if (config.onPress) {
      config.onPress();
    }
  };
  return (
    <SettingsItemCard
      title={config.title || t("settings.subscription.title")}
      description={config.description || t("settings.subscription.description")}
      icon={(config.icon || "star") as IconName}
      onPress={handlePress}
      sectionTitle={config.sectionTitle}
    />
  );
};
