import React from "react";
import { Pressable } from "react-native";
import { useAppDesignTokens, AtomicIcon, useAppNavigation, NavigationHeader } from "@umituz/react-native-design-system";


interface SettingsHeaderProps {
  showCloseButton?: boolean;
  onClose?: () => void;
  title?: string;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  showCloseButton = false,
  onClose,
  title,
}) => {
  const navigation = useAppNavigation();
  const tokens = useAppDesignTokens();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigation.goBack();
    }
  };

  const rightElement = showCloseButton ? (
    <Pressable
      onPress={handleClose}
      style={({ pressed }) => [
        {
          width: 44,
          height: 44,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: pressed ? tokens.colors.surfaceVariant : tokens.colors.surface,
          borderRadius: tokens.borders.radius.full,
        },
      ]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <AtomicIcon name="close-outline" size="lg" color="textPrimary" />
    </Pressable>
  ) : undefined;

  return (
    <NavigationHeader
      title={title || ''}
      rightElement={rightElement}
      // If NOT showing close button, we might want a back button? 
      // But usually Settings is a root screen in a modal or stack.
      onBackPress={!showCloseButton ? handleClose : undefined}
    />
  );
};