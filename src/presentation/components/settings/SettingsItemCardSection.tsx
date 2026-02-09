import React from "react";
import { View } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system";

export interface SettingsItemCardSectionProps {
  sectionTitle?: string;
}

export const SettingsItemCardSection: React.FC<SettingsItemCardSectionProps> = React.memo(({ sectionTitle }) => {
  if (!sectionTitle) return null;

  return (
    <View style={styles.headerContainer}>
      <AtomicText type="labelMedium" color="textSecondary" style={{ textTransform: "uppercase" }}>
        {sectionTitle}
      </AtomicText>
    </View>
  );
});

SettingsItemCardSection.displayName = "SettingsItemCardSection";

const styles = {
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
} as const;
