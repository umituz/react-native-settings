/**
 * User Profile Header Component
 * Displays user avatar, name, and ID
 * Works for both guest and authenticated users
 */

import React, { useState, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";
import { AtomicText } from "@umituz/react-native-design-system-atoms";
import { useNavigation } from "@react-navigation/native";

export interface UserProfileHeaderProps {
  /** User display name */
  displayName?: string;
  /** User ID */
  userId?: string;
  /** Whether user is guest */
  isGuest?: boolean;
  /** Avatar URL (optional) */
  avatarUrl?: string;
  /** Navigation route for account settings */
  accountSettingsRoute?: string;
  /** Custom onPress handler */
  onPress?: () => void;
  /** Custom guest user display name */
  guestDisplayName?: string;
  /** Custom avatar service URL */
  avatarServiceUrl?: string;
  /** Default user display name when no displayName provided */
  defaultUserDisplayName?: string;
  /** Default guest display name */
  defaultGuestDisplayName?: string;
}

export const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  displayName,
  userId,
  isGuest = false,
  avatarUrl,
  accountSettingsRoute,
  onPress,
  guestDisplayName,
  avatarServiceUrl,
  defaultUserDisplayName,
  defaultGuestDisplayName,
}) => {
  const tokens = useAppDesignTokens();
  const navigation = useNavigation();
  const colors = tokens.colors;
  const spacing = tokens.spacing;
  const [imageError, setImageError] = useState(false);

  const finalDisplayName = displayName || (isGuest ? guestDisplayName || defaultGuestDisplayName || "Guest" : defaultUserDisplayName || "User");
  const avatarName = isGuest ? guestDisplayName || defaultGuestDisplayName || defaultGuestDisplayName || "Guest" : finalDisplayName;

  const defaultAvatarService = avatarServiceUrl || "https://ui-avatars.com/api";
  const finalAvatarUrl =
    (imageError ? null : avatarUrl) ||
    `${defaultAvatarService}/?name=${encodeURIComponent(avatarName)}&background=${colors.primary.replace("#", "")}&color=fff&size=64`;

  const handlePress = useCallback(() => {
    if (onPress) {
      onPress();
    } else if (accountSettingsRoute) {
      navigation.navigate(accountSettingsRoute as never);
    }
  }, [onPress, accountSettingsRoute, navigation]);

  const shouldShowChevron = !!(onPress || accountSettingsRoute);
  const isPressable = !!(onPress || accountSettingsRoute);

  const containerStyle = [
    styles.container,
    {
      backgroundColor: colors.surface,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      marginHorizontal: spacing.md,
    },
  ];

  const content = (
    <>
      <View style={styles.content}>
        <View style={[styles.avatarContainer, { borderColor: `${colors.primary}30` }]}>
          {finalAvatarUrl ? (
            <Image
              source={{ uri: finalAvatarUrl }}
              style={styles.avatar}
              onError={() => setImageError(true)}
            />
          ) : (
            <View style={[styles.avatarFallback, { backgroundColor: `${colors.primary}20` }]}>
              <AtomicText
                type="headlineMedium"
                color="primary"
                style={styles.avatarText}
              >
                {avatarName.charAt(0).toUpperCase()}
              </AtomicText>
            </View>
          )}
        </View>
        <View style={[styles.textContainer, { marginLeft: spacing.md }]}>
          <AtomicText
            type="headlineSmall"
            style={[styles.name, { color: colors.textPrimary }]}
            numberOfLines={1}
          >
            {finalDisplayName}
          </AtomicText>
        </View>
      </View>
      {shouldShowChevron && (
        <View style={[styles.chevronContainer, { marginLeft: spacing.sm }]}>
          <Feather name="chevron-right" size={22} color={colors.textSecondary} />
        </View>
      )}
    </>
  );

  if (isPressable) {
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={containerStyle}>{content}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 0,
    marginBottom: 0,
    borderRadius: 20,
    minHeight: 80,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  avatarFallback: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontWeight: "700",
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "700",
  },
  id: {
    fontWeight: "500",
    opacity: 0.7,
  },
  chevronContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});


