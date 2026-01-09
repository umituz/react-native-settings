import React from "react";
// @ts-ignore - Optional peer dependency
import { useNavigation } from "@react-navigation/native";
import { SettingsItemCard } from "../../components/SettingsItemCard";
import type { IconName } from "@umituz/react-native-design-system";

export interface SubscriptionSettingsItemProps {
  config: any;
  t: (key: string) => string;
}

export const SubscriptionSettingsItem: React.FC<SubscriptionSettingsItemProps> = ({ config, t }) => {
  const navigation = useNavigation();
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
