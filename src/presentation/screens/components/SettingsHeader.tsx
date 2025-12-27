/**
 * Settings Header Component
 * Handles close button functionality
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { AtomicIcon } from "@umituz/react-native-design-system";

interface SettingsHeaderProps {
  showCloseButton?: boolean;
  onClose?: () => void;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  showCloseButton = false,
  onClose,
}) => {
  const navigation = useNavigation();
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigation.goBack();
    }
  };

  if (!showCloseButton) {
    return null;
  }

  return (
    <View
      style={[
        styles.closeButtonContainer,
        {
          paddingTop: insets.top + tokens.spacing.xs,
          paddingRight: tokens.spacing.md,
        },
      ]}
    >
      <TouchableOpacity
        onPress={handleClose}
        style={[
          styles.closeButton,
          {
            backgroundColor: tokens.colors.surface,
          },
        ]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <AtomicIcon name="x" size="lg" color="primary" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  closeButtonContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
    alignItems: "flex-end",
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
});