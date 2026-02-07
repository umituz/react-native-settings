import React from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens, AtomicText } from "@umituz/react-native-design-system";

export interface SettingsFooterProps {
  versionText?: string;
  appVersion?: string;
  versionLabel?: string;
}

export const SettingsFooter: React.FC<SettingsFooterProps> = ({
  versionText,
  appVersion,
  versionLabel,
}) => {
  const tokens = useAppDesignTokens();

  const displayText = versionText || (appVersion && versionLabel
    ? `${versionLabel} ${appVersion}`
    : appVersion);

  if (!displayText) return null;

  return (
    <View style={styles.container}>
      <AtomicText type="labelSmall" color="textSecondary">
        {displayText}
      </AtomicText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    alignItems: "center",
  },
});


