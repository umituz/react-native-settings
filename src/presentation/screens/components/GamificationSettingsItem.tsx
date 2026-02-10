import React from "react";
import { useAppNavigation } from "@umituz/react-native-design-system";
import type { IconName } from "@umituz/react-native-design-system";
import { SettingsItemCard } from "../../components/SettingsItemCard";
import { useGamification } from "../../../domains/gamification";
import type { GamificationItemConfig } from "../types/UserFeatureConfig";
import type { GamificationSettingsConfig } from "../../../domains/gamification";
import { compareGamificationProps } from "../../../infrastructure/utils/memoComparisonUtils";

export interface GamificationSettingsItemProps {
  config: GamificationItemConfig;
  gamificationConfig?: GamificationSettingsConfig;
  t: (key: string) => string;
  noBackground?: boolean;
  hideMargin?: boolean;
}

const GamificationSettingsItemComponent: React.FC<GamificationSettingsItemProps> = ({
  config,
  gamificationConfig,
  t,
  noBackground,
  hideMargin,
}) => {
  const navigation = useAppNavigation();
  const { level } = useGamification(gamificationConfig);

  const handlePress = React.useCallback(() => {
    const route = config.route || "Gamification";
    navigation.navigate(route as never);
  }, [navigation, config.route]);

  const icon = (config.icon || "trophy-outline") as IconName;
  const title = config.title || t("settings.gamification.title");

  const description = config.description ||
    t("settings.gamification.description")
      .replace("{level}", level.currentLevel.toString())
      .replace("{points}", level.currentPoints.toString());

  return (
    <SettingsItemCard
      title={title}
      description={description}
      icon={icon}
      onPress={handlePress}
      sectionTitle={config.sectionTitle}
      noBackground={noBackground}
      hideMargin={hideMargin}
    />
  );
};

export const GamificationSettingsItem = React.memo(
  GamificationSettingsItemComponent,
  compareGamificationProps
);
GamificationSettingsItem.displayName = "GamificationSettingsItem";
