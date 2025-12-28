/**
 * Video Tutorial Card Component
 * Single Responsibility: Display individual video tutorial card
 */

import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import type { VideoTutorial } from "../../types";

interface VideoTutorialCardProps {
  readonly tutorial: VideoTutorial;
  readonly onPress: () => void;
  readonly horizontal?: boolean;
}

export const VideoTutorialCard: React.FC<VideoTutorialCardProps> = ({
  tutorial,
  onPress,
  horizontal = false,
}) => {
  const tokens = useAppDesignTokens();
  const styles = getStyles(tokens);

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: tokens.colors.surface,
          borderColor: tokens.colors.border,
        },
        horizontal && styles.horizontalContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: tutorial.thumbnailUrl }}
          style={[styles.thumbnail, horizontal && styles.horizontalThumbnail]}
          resizeMode="cover"
        />
        <View
          style={[styles.durationBadge, { backgroundColor: "rgba(0,0,0,0.7)" }]}
        >
          <Text style={styles.durationText}>
            {formatDuration(tutorial.duration)}
          </Text>
        </View>
        {tutorial.featured && (
          <View
            style={[
              styles.featuredBadge,
              { backgroundColor: tokens.colors.primary },
            ]}
          >
            <Text style={[styles.featuredText, { color: "#FFFFFF" }]}>
              Featured
            </Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            { color: tokens.colors.textPrimary },
            horizontal && styles.horizontalTitle,
          ]}
          numberOfLines={2}
        >
          {tutorial.title}
        </Text>

        <Text
          style={[
            styles.description,
            { color: tokens.colors.textSecondary },
            horizontal && styles.horizontalDescription,
          ]}
          numberOfLines={horizontal ? 2 : 3}
        >
          {tutorial.description}
        </Text>

        <View style={styles.metadata}>
          <Text
            style={[styles.category, { color: tokens.colors.textTertiary }]}
          >
            {tutorial.category.replace("-", " ")}
          </Text>
          <Text
            style={[styles.difficulty, { color: tokens.colors.textSecondary }]}
          >
            {tutorial.difficulty}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    overflow: "hidden",
  },
  horizontalContainer: {
    width: 280,
    marginRight: 12,
    marginBottom: 0,
  },
  imageContainer: {
    position: "relative",
  },
  thumbnail: {
    width: "100%",
    height: 180,
  },
  horizontalThumbnail: {
    height: 140,
  },
  durationBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  featuredBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  featuredText: {
    fontSize: 11,
    fontWeight: "600",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: tokens.typography.titleMedium.responsiveFontSize,
    fontWeight: "600",
    marginBottom: 6,
  },
  horizontalTitle: {
    fontSize: tokens.typography.bodyLarge.responsiveFontSize,
  },
  description: {
    fontSize: tokens.typography.bodyMedium.responsiveFontSize,
    lineHeight: 20,
    marginBottom: 8,
  },
  horizontalDescription: {
    fontSize: tokens.typography.bodySmall.responsiveFontSize,
    lineHeight: 16,
    marginBottom: 6,
  },
  metadata: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  category: {
    fontSize: 12,
    textTransform: "capitalize",
    fontWeight: "500",
  },
  difficulty: {
    fontSize: 12,
    textTransform: "capitalize",
    fontWeight: "500",
  },
});
