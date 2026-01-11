/**
 * Environment Viewer Setting Item
 * List item to navigate to environment variables screen
 * DEV-only feature
 */

import React from "react";
import { useAppDesignTokens, useAppNavigation } from "@umituz/react-native-design-system";
import { SettingsItemCard } from "../../../../presentation/components/SettingsItemCard";
import type { EnvConfig } from "../../types";

export interface EnvViewerSettingProps {
  /** Environment configuration to pass to viewer screen */
  config: EnvConfig;
  /** Custom title (default: "Environment Variables") */
  title?: string;
  /** Custom description (default: "View app configuration") */
  description?: string;
  /** Screen name to navigate to */
  screenName: string;
  /** Custom navigation handler (overrides route) */
  onPress?: () => void;
}

export const EnvViewerSetting: React.FC<EnvViewerSettingProps> = ({
  config,
  title = "Environment Variables",
  description = "View app configuration",
  screenName,
  onPress,
}) => {
  const tokens = useAppDesignTokens();
  const navigation = useAppNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate(screenName as never, { config } as never);
    }
  };

  return (
    <SettingsItemCard
      icon="code"
      title={title}
      description={description}
      onPress={handlePress}
      iconColor={tokens.colors.primary}
      showChevron
    />
  );
};
