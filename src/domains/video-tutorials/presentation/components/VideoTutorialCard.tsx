/**
 * Video Tutorial Card Component
 * Single Responsibility: Display individual video tutorial card
 */

import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useAppDesignTokens, AtomicText } from "@umituz/react-native-design-system";
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
        { backgroundColor: tokens.colors.surface, borderColor: tokens.colors.border },
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
        <View style={styles.durationBadge}>
          <AtomicText type="labelSmall" style={styles.durationText}>{formatDuration(tutorial.duration)}</AtomicText>
        </View>
        {tutorial.featured && (
          <View style={[styles.featuredBadge, { backgroundColor: tokens.colors.primary }]}>
            <AtomicText type="labelSmall" style={[styles.featuredText, { color: tokens.colors.onPrimary }]}>Featured</AtomicText>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <AtomicText
          type={horizontal ? "titleMedium" : "titleLarge"}
          style={[styles.title, horizontal && styles.horizontalTitle]}
          numberOfLines={2}
        >
          {tutorial.title}
        </AtomicText>

        <AtomicText
          type={horizontal ? "bodySmall" : "bodyMedium"}
          color="textSecondary"
          style={[styles.description, horizontal && styles.horizontalDescription]}
          numberOfLines={horizontal ? 2 : 3}
        >
          {tutorial.description}
        </AtomicText>

        <View style={styles.metadata}>
          <AtomicText type="labelSmall" color="textTertiary" style={styles.category}>
            {tutorial.category.replace("-", " ")}
          </AtomicText>
          <AtomicText type="labelSmall" color="textSecondary" style={styles.difficulty}>
            {tutorial.difficulty}
          </AtomicText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) => StyleSheet.create({
  container: { borderRadius: 12, borderWidth: 1, marginBottom: 12, overflow: "hidden" },
  horizontalContainer: { width: 280, marginRight: 12, marginBottom: 0 },
  imageContainer: { position: "relative" },
  thumbnail: { width: "100%", height: 180 },
  horizontalThumbnail: { height: 140 },
  durationBadge: { position: "absolute", bottom: 8, right: 8, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, backgroundColor: "rgba(0,0,0,0.7)" },
  durationText: { color: tokens.colors.textInverse },
  featuredBadge: { position: "absolute", top: 8, left: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  featuredText: { fontWeight: "600" },
  content: { padding: 12 },
  title: { fontWeight: "600", marginBottom: 6, color: tokens.colors.textPrimary },
  horizontalTitle: {},
  description: { marginBottom: 8 },
  horizontalDescription: { marginBottom: 6 },
  metadata: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  category: { textTransform: "capitalize", fontWeight: "500" },
  difficulty: { textTransform: "capitalize", fontWeight: "500" },
});
