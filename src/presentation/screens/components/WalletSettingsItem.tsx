import React from "react";
import { SettingsItemCard } from "../../components/SettingsItemCard";
import type { IconName } from "@umituz/react-native-design-system";
import type { WalletConfig } from "../types/UserFeatureConfig";
import { compareConfigAndTranslate } from "../../../infrastructure/utils/memoComparisonUtils";
import { useSettingsNavigation } from "../../navigation/hooks/useSettingsNavigation";

export interface WalletSettingsItemProps {
  config: WalletConfig;
}

const WalletSettingsItemComponent: React.FC<WalletSettingsItemProps> = ({ config }) => {
  const navigation = useSettingsNavigation();

  const handlePress = React.useCallback(() => {
    if (config.route) {
      navigation.navigate(config.route as any);
    }
  }, [navigation, config.route]);

  return (
    <SettingsItemCard
      title={config.title}
      description={config.description}
      icon={(config.icon || "wallet") as IconName}
      onPress={handlePress}
      sectionTitle={config.sectionTitle}
    />
  );
};

export const WalletSettingsItem = React.memo(
  WalletSettingsItemComponent,
  compareConfigAndTranslate
);
WalletSettingsItem.displayName = "WalletSettingsItem";
