/**
 * LegalItem Component
 * 
 * Single Responsibility: Display a single legal document item
 * Reusable component for Privacy Policy, Terms of Service, and EULA items
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useResponsiveDesignTokens, type DesignTokens } from "@umituz/react-native-design-system";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system";
import type { IconName } from "@umituz/react-native-design-system";
import { StyleCacheService } from "../../domain/services/StyleCacheService";

export interface LegalItemProps {
  /**
   * Icon name from Lucide library (e.g., "Shield", "FileText", "ScrollText")
   * If not provided, will use emoji icon
   */
  iconName?: IconName;
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
  const tokens = useResponsiveDesignTokens();
  
  // Memoize styles to prevent recreation on every render
  const styles = React.useMemo(() => {
    const cacheKey = StyleCacheService.createTokenCacheKey(tokens);
    return StyleCacheService.getCachedStyles(
      'LegalItem',
      cacheKey,
      () => createLegalItemStyles(tokens)
    );
  }, [tokens]);

  // Memoize icon rendering to prevent unnecessary re-renders
  const renderIcon = React.useCallback(() => {
    if (iconName) {
      return (
        <AtomicIcon
          name={iconName}
          size="md"
          color="info"
        />
      );
    }
    if (icon) {
      return (
        <AtomicText type="bodyLarge" color="info">
          {icon}
        </AtomicText>
      );
    }
    return null;
  }, [iconName, icon]);

  // Memoize icon container style to prevent object creation
  const iconContainerStyle = React.useMemo(() => [
    styles.iconContainer, 
    { backgroundColor: tokens.colors.info + "20" }
  ], [styles.iconContainer, tokens.colors.info]);

  // Memoize content to prevent unnecessary re-renders
  const content = React.useMemo(() => (
    <View style={styles.itemContent}>
      <View style={styles.itemLeft}>
        <View style={iconContainerStyle}>
          {renderIcon()}
        </View>
        <View style={styles.itemText}>
          <AtomicText type="bodyLarge" color="textPrimary">
            {title}
          </AtomicText>
          {description && (
            <AtomicText
              type="bodySmall"
              color="textSecondary"
              style={styles.itemDescription}
            >
              {description}
            </AtomicText>
          )}
        </View>
      </View>
      {onPress && (
        <AtomicText type="bodyMedium" color="textSecondary">›</AtomicText>
      )}
    </View>
  ), [styles.itemContent, styles.itemLeft, styles.itemText, styles.itemDescription, iconContainerStyle, renderIcon, title, description, onPress]);

  // Memoize press handler to prevent child re-renders
  const handlePress = React.useCallback(() => {
    onPress?.();
  }, [onPress]);

  if (onPress) {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={handlePress}
        testID={testID}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.itemContainer} testID={testID}>
      {content}
    </View>
  );
});

const createLegalItemStyles = (tokens: DesignTokens) => {
  return StyleSheet.create({
    itemContainer: {
      marginBottom: tokens.spacing.xs,
    },
    itemContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.md,
      minHeight: 64,
    },
    itemLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    iconContainer: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: "center",
      justifyContent: "center",
      marginRight: tokens.spacing.md,
    },
    itemText: {
      flex: 1,
    },
    itemDescription: {
      marginTop: tokens.spacing.xs,
    },
  });
};

