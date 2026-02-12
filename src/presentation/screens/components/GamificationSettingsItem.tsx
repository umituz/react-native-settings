import React from "react";
import type { IconName } from "@umituz/react-native-design-system";
import { SettingsItemCard } from "../../components/SettingsItemCard";
import { useGamification } from "../../../domains/gamification";
import type { GamificationItemConfig } from "../types/UserFeatureConfig";
import type { GamificationSettingsConfig } from "../../../domains/gamification";
import { compareGamificationProps } from "../../../infrastructure/utils/memoComparisonUtils";
import { useSettingsNavigation } from "../../navigation/hooks/useSettingsNavigation";

export interface GamificationSettingsItemProps {
  config: GamificationItemConfig;
  gamificationConfig?: GamificationSettingsConfig;
  t?: (key: string) => string;
  noBackground?: boolean;
  hideMargin?: boolean;
}

const GamificationSettingsItemComponent: React.FC<GamificationSettingsItemProps> = ({
  config,
  gamificationConfig,
  noBackground,
  hideMargin,
}) => {
  const navigation = useSettingsNavigation();
  const { level } = useGamification(gamificationConfig);

  const handlePress = React.useCallback(() => {
    const route = config.route || "Gamification";
    navigation.navigate(route as 'Gamification');
  }, [navigation, config.route]);

  const icon = (config.icon || "trophy-outline") as IconName;
  const title = config.title;

  const description = config.description || 
    `${level.currentLevel} • ${level.currentPoints}`;

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
