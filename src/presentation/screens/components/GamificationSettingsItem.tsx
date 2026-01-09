import React from "react";
// @ts-ignore - Optional peer dependency
import { useAppNavigation } from "@umituz/react-native-design-system";
import type { IconName } from "@umituz/react-native-design-system";
import { SettingsItemCard } from "../../components/SettingsItemCard";
import { useGamification } from "../../../domains/gamification";

export interface GamificationSettingsItemProps {
  config: any;
  gamificationConfig?: any;
  t: (key: string) => string;
}

export const GamificationSettingsItem: React.FC<GamificationSettingsItemProps> = ({ 
  config, 
  gamificationConfig, 
  t 
}) => {
  const navigation = useAppNavigation();
  const { level } = useGamification(gamificationConfig);
  
  const handlePress = () => {
    if (config.route) {
      navigation.navigate(config.route as never);
    } else {
      navigation.navigate("Gamification" as never);
    }
  };
  
  const icon = (config.icon || "trophy-outline") as IconName;
  const title = config.title || t("settings.gamification.title");
  
  // Dynamic description showing current level and points
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
    />
  );
};
