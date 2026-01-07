/**
 * Settings Header Component
 * Handles close button functionality
 */

import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDesignTokens, AtomicIcon, AtomicText } from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";

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
  const { t } = useLocalization();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, { padding: tokens.spacing.lg }]}>
      <AtomicText style={tokens.typography.headingLarge}>
        {t('settings.title')}
      </AtomicText>
      
      {showCloseButton && (
        <Pressable
          onPress={handleClose}
          style={({ pressed }) => [
            styles.closeButton,
            {
              backgroundColor: pressed ? tokens.colors.surfaceVariant : tokens.colors.surface,
              borderRadius: tokens.borderRadius.full,
            },
          ]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <AtomicIcon name="close-outline" size="lg" color="textPrimary" />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
});