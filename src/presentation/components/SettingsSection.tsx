import React from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens, AtomicText } from "@umituz/react-native-design-system";

export interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
}) => {
  const tokens = useAppDesignTokens();
  const colors = tokens.colors;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.titleContainer}>
        <AtomicText type="titleLarge" color="primary">
          {title}
        </AtomicText>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
});


