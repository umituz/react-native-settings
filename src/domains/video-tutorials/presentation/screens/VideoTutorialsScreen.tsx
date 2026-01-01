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
  /**
   * All tutorials to display (required)
   */
  tutorials: VideoTutorial[];
  /**
   * Featured tutorials to display in horizontal scroll (optional)
   */
  featuredTutorials?: VideoTutorial[];
  /**
   * Title of the screen
   */
  title?: string;
  /**
   * Title for the featured tutorials section
   */
  featuredTitle?: string;
  /**
   * Title for all tutorials section
   */
  allTutorialsTitle?: string;
  /**
   * Empty state message when no tutorials
   */
  emptyMessage?: string;
  /**
   * Loading state (optional - defaults to false)
   */
  isLoading?: boolean;
  /**
   * Callback when a tutorial is pressed
   */
  onTutorialPress?: (tutorial: VideoTutorial) => void;
}

export const VideoTutorialsScreen: React.FC<VideoTutorialsScreenProps> =
  React.memo(
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
        (tutorial: VideoTutorial) => {
          onTutorialPress?.(tutorial);
        },
        [onTutorialPress],
      );

      const renderTutorialItem = React.useCallback(
        ({ item }: { item: VideoTutorial }) => (
          <VideoTutorialCard
            tutorial={item}
            onPress={() => handleTutorialPress(item)}
          />
        ),
        [handleTutorialPress],
      );

      const renderFeaturedItem = React.useCallback(
        ({ item }: { item: VideoTutorial }) => (
          <VideoTutorialCard
            tutorial={item}
            onPress={() => handleTutorialPress(item)}
            horizontal
          />
        ),
        [handleTutorialPress],
      );

      if (isLoading) {
        return <AtomicSpinner size="lg" fullContainer />;
      }

      const hasFeatured = featuredTutorials && featuredTutorials.length > 0;
      const hasTutorials = tutorials && tutorials.length > 0;

      if (!hasTutorials && !hasFeatured) {
        return (
          <View style={styles.emptyContainer}>
            <AtomicText color="secondary" type="bodyLarge">
              {emptyMessage}
            </AtomicText>
          </View>
        );
      }

      return (
        <ScreenLayout scrollable={false} edges={["top", "bottom"]}>
          <Text style={[styles.title, { color: tokens.colors.textPrimary }]}>
            {title}
          </Text>

          {hasFeatured && (
            <View style={styles.section}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: tokens.colors.textSecondary },
                ]}
              >
                {featuredTitle}
              </Text>
              <FlatList
                data={featuredTutorials}
                renderItem={renderFeaturedItem}
                keyExtractor={(item: VideoTutorial) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              />
            </View>
          )}

          {hasTutorials && (
            <View style={styles.section}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: tokens.colors.textSecondary },
                ]}
              >
                {allTutorialsTitle}
              </Text>
              <FlatList
                data={tutorials}
                renderItem={renderTutorialItem}
                keyExtractor={(item: VideoTutorial) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.verticalList}
              />
            </View>
          )}
        </ScreenLayout>
      );
    },
  );

const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
    title: {
      fontSize: tokens.typography.headlineLarge.fontSize,
      fontWeight: "600",
      marginBottom: 24,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: tokens.typography.titleLarge.fontSize,
      fontWeight: "500",
      marginBottom: 12,
    },
    horizontalList: {
      paddingRight: 16,
    },
    verticalList: {
      paddingBottom: 16,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
  });
