import React from "react";
import { SettingsItemCard } from "../../components/SettingsItemCard";
import type { IconName } from "@umituz/react-native-design-system";
import type { SubscriptionConfig } from "../types/UserFeatureConfig";
import { compareConfigAndTranslate } from "../../../infrastructure/utils/memoComparisonUtils";
import { useSettingsNavigation } from "../../navigation/hooks/useSettingsNavigation";

export interface SubscriptionSettingsItemProps {
  config: SubscriptionConfig;
}

const SubscriptionSettingsItemComponent: React.FC<SubscriptionSettingsItemProps> = ({ config }) => {
  const navigation = useSettingsNavigation();

  const handlePress = React.useCallback(() => {
    if (config.route) {
      navigation.navigate(config.route as any);
    } else if (config.onPress) {
      config.onPress();
    }
  }, [navigation, config.route, config.onPress]);

  return (
    <SettingsItemCard
      title={config.title}
      description={config.description}
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
