/**
 * LegalItem Component
 * 
 * Single Responsibility: Display a single legal document item
 * Reusable component for Privacy Policy, Terms of Service, and EULA items
 */

import React from "react";
import { ListItem } from "@umituz/react-native-design-system";

export interface LegalItemProps {
  /**
   * Icon name from theme library (Ionicons)
   * If not provided, will use emoji icon
   */
  iconName?: string;
  /**
   * Icon emoji or text (fallback if iconName not provided)
   */
  icon?: string;
  /**
   * Title text
   */
  title: string;
  /**
   * Optional description text
   */
  description?: string;
  /**
   * Callback when item is pressed
   */
  onPress?: () => void;
  /**
   * Test ID for E2E testing
   */
  testID?: string;
}

export const LegalItem: React.FC<LegalItemProps> = React.memo(({
  iconName,
  icon,
  title,
  description,
  onPress,
  testID,
}) => {
  // Use iconName if provided, otherwise fallback to default
  const finalIcon = iconName || icon || "shield-checkmark";

  return (
    <ListItem
      title={title}
      subtitle={description}
      leftIcon={finalIcon}
      rightIcon={onPress ? "chevron-forward" : undefined}
      onPress={onPress}
    />
  );
});

LegalItem.displayName = "LegalItem";
