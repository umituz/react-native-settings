import React from "react";
import { useAppNavigation } from "@umituz/react-native-design-system";
import { SettingsItemCard } from "../../components/SettingsItemCard";
import type { IconName } from "@umituz/react-native-design-system";
import type { WalletConfig } from "../types/UserFeatureConfig";
import { compareConfigAndTranslate } from "../../../infrastructure/utils/memoComparisonUtils";

export interface WalletSettingsItemProps {
  config: WalletConfig;
}

const WalletSettingsItemComponent: React.FC<WalletSettingsItemProps> = ({ config }) => {
  const navigation = useAppNavigation();

  const handlePress = React.useCallback(() => {
    if (config.route) {
      navigation.navigate(config.route as never);
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
