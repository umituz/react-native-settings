/**
 * Video Tutorials Screen
 * Single Responsibility: Display video tutorials list
 *
 * Usage:
 *   <VideoTutorialsScreen
 *     tutorials={[...]}
 *     featuredTutorials={[...]}
 *     title="Video Tutorials"
 *     onTutorialPress={(id) => openVideo(id)}
 *   />
 */

import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import {
  useAppDesignTokens,
  ScreenLayout,
  AtomicSpinner,
  AtomicText,
} from "@umituz/react-native-design-system";
import type { VideoTutorial } from "../../types";
import { VideoTutorialCard } from "../components/VideoTutorialCard";

export interface VideoTutorialsScreenProps {
  tutorials: VideoTutorial[];
  featuredTutorials?: VideoTutorial[];
  title?: string;
  featuredTitle?: string;
  allTutorialsTitle?: string;
  emptyMessage?: string;
  isLoading?: boolean;
  onTutorialPress?: (tutorial: VideoTutorial) => void;
}

export const VideoTutorialsScreen: React.FC<VideoTutorialsScreenProps> = React.memo(
  ({
    tutorials,
    featuredTutorials,
    title = "Video Tutorials",
    featuredTitle = "Featured",
    allTutorialsTitle = "All Tutorials",
    emptyMessage = "No tutorials available.",
    isLoading = false,
    onTutorialPress,
  }) => {
    const tokens = useAppDesignTokens();
    const styles = getStyles(tokens);

    const handleTutorialPress = React.useCallback(
      (tutorial: VideoTutorial) => onTutorialPress?.(tutorial),
      [onTutorialPress]
    );

    const renderTutorialItem = React.useCallback(
      ({ item }: { item: VideoTutorial }) => (
        <VideoTutorialCard tutorial={item} onPress={() => handleTutorialPress(item)} />
      ),
      [handleTutorialPress]
    );

    const renderFeaturedItem = React.useCallback(
      ({ item }: { item: VideoTutorial }) => (
        <VideoTutorialCard tutorial={item} onPress={() => handleTutorialPress(item)} horizontal />
      ),
      [handleTutorialPress]
    );

    if (isLoading) return <AtomicSpinner size="lg" fullContainer />;

    const hasFeatured = featuredTutorials && featuredTutorials.length > 0;
    const hasTutorials = tutorials && tutorials.length > 0;

    if (!hasTutorials && !hasFeatured) {
      return (
        <View style={styles.emptyContainer}>
          <AtomicText color="secondary" type="bodyLarge">{emptyMessage}</AtomicText>
        </View>
      );
    }

    return (
      <ScreenLayout scrollable={false} edges={["top", "bottom"]}>
        <AtomicText style={styles.title}>{title}</AtomicText>

        {hasFeatured && (
          <View style={styles.section}>
            <AtomicText color="secondary" style={styles.sectionTitle}>{featuredTitle}</AtomicText>
            <FlatList
              data={featuredTutorials}
              renderItem={renderFeaturedItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </View>
        )}

        {hasTutorials && (
          <View style={styles.section}>
            <AtomicText color="secondary" style={styles.sectionTitle}>{allTutorialsTitle}</AtomicText>
            <FlatList
              data={tutorials}
              renderItem={renderTutorialItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.verticalList}
            />
          </View>
        )}
      </ScreenLayout>
    );
  }
);

const getStyles = (tokens: any) => StyleSheet.create({
  title: {
    fontSize: tokens.typography.headlineLarge.fontSize,
    color: tokens.colors.textPrimary,
    fontWeight: "600",
    marginBottom: 24,
  },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: tokens.typography.titleLarge.fontSize,
    fontWeight: "500",
    marginBottom: 12,
  },
  horizontalList: { paddingRight: 16 },
  verticalList: { paddingBottom: 16 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
});
