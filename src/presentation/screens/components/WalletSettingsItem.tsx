import React from "react";
// @ts-ignore - Optional peer dependency
import { useAppNavigation } from "@umituz/react-native-design-system";
import { SettingsItemCard } from "../../components/SettingsItemCard";
import type { IconName } from "@umituz/react-native-design-system";
import type { WalletConfig } from "../../screens/types/UserFeatureConfig";

export interface WalletSettingsItemProps {
  config: WalletConfig;
  t: (key: string) => string;
}

export const WalletSettingsItem: React.FC<WalletSettingsItemProps> = ({ config, t }) => {
  const navigation = useAppNavigation();
  const handlePress = () => {
    if (config.route) {
      navigation.navigate(config.route as never);
    }
  };
  return (
    <SettingsItemCard
      title={config.title || t("wallet.title")}
      description={config.description || t("wallet.description")}
      icon={(config.icon || "wallet") as IconName}
      onPress={handlePress}
      sectionTitle={config.sectionTitle}
    />
  );
};
