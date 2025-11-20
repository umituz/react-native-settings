/**
 * User Profile Header Component
 * Displays user avatar, name, and ID
 * Works for both guest and authenticated users
 */

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";
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
}

export const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  displayName,
  userId,
  isGuest = false,
  avatarUrl,
  accountSettingsRoute = "AccountSettings",
  onPress,
}) => {
  const tokens = useAppDesignTokens();
  const navigation = useNavigation();
  const colors = tokens.colors;

  const finalDisplayName = displayName || (isGuest ? "Guest" : "User");
  const finalUserId = userId || "Unknown";
  const avatarName = isGuest ? "Guest" : finalDisplayName;
  const finalAvatarUrl =
    avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(avatarName)}&background=${colors.primary.replace("#", "")}&color=fff&size=64`;

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (accountSettingsRoute) {
      navigation.navigate(accountSettingsRoute as never);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundPrimary,
          borderColor: colors.borderLight,
        },
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Image
          source={{ uri: finalAvatarUrl }}
          style={[styles.avatar, { borderColor: `${colors.primary}40` }]}
        />
        <View style={styles.textContainer}>
          <Text
            style={[styles.name, { color: colors.textPrimary }]}
            numberOfLines={1}
          >
            {finalDisplayName}
          </Text>
          <Text
            style={[styles.id, { color: colors.textSecondary }]}
            numberOfLines={1}
          >
            ID: {finalUserId.substring(0, 8)}...
          </Text>
        </View>
      </View>
      <ChevronRight size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: 0,
    marginBottom: 0,
    borderRadius: 12,
    borderWidth: 1,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  id: {
    fontSize: 12,
    fontWeight: "400",
  },
});

