import React from "react";
import { useAppNavigation } from "@umituz/react-native-design-system";
import { SettingsItemCard } from "../../components/SettingsItemCard";
import type { IconName } from "@umituz/react-native-design-system";
import type { SubscriptionConfig } from "../types/UserFeatureConfig";
import { compareConfigAndTranslate } from "../../../infrastructure/utils/memoComparisonUtils";

export interface SubscriptionSettingsItemProps {
  config: SubscriptionConfig;
  t: (key: string) => string;
}

const SubscriptionSettingsItemComponent: React.FC<SubscriptionSettingsItemProps> = ({ config, t }) => {
  const navigation = useAppNavigation();

  const handlePress = React.useCallback(() => {
    if (config.route) {
      navigation.navigate(config.route as never);
    } else if (config.onPress) {
      config.onPress();
    }
  }, [navigation, config.route, config.onPress]);

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

export const SubscriptionSettingsItem = React.memo(
  SubscriptionSettingsItemComponent,
  compareConfigAndTranslate
);
SubscriptionSettingsItem.displayName = "SubscriptionSettingsItem";
