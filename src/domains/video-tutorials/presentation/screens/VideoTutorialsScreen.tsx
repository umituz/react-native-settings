/**
 * Video Tutorials Screen
 * Single Responsibility: Display video tutorials list
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
import { useVideoTutorials, useFeaturedTutorials } from "../hooks";

export interface VideoTutorialsScreenProps {
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
   * Error message to show when tutorials fail to load
   */
  errorLoadingMessage?: string;
  /**
   * Maximum number of featured tutorials to show
   */
  maxFeaturedCount?: number;
  /**
   * Callback when a tutorial is pressed
   */
  onTutorialPress?: (tutorialId: string) => void;
  /**
   * Optional manual override for loading state
   */
  customIsLoading?: boolean;
  /**
   * Optional manual override for all tutorials data
   */
  customAllTutorials?: VideoTutorial[];
  /**
   * Optional manual override for featured tutorials data
   */
  customFeaturedTutorials?: VideoTutorial[];
}

export const VideoTutorialsScreen: React.FC<VideoTutorialsScreenProps> =
  React.memo(
    ({
      title = "Video Tutorials",
      featuredTitle = "Featured",
      allTutorialsTitle = "All Tutorials",
      errorLoadingMessage = "Failed to load tutorials.",
      maxFeaturedCount = 3,
      onTutorialPress,
      customIsLoading,
      customAllTutorials,
      customFeaturedTutorials,
    }) => {
      const tokens = useAppDesignTokens();
      const styles = getStyles(tokens);

      const featuredQuery = useFeaturedTutorials(maxFeaturedCount);
      const allQuery = useVideoTutorials();

      const isLoading =
        customIsLoading !== undefined
          ? customIsLoading
          : featuredQuery.isLoading || allQuery.isLoading;
      const error = featuredQuery.error || allQuery.error;

      const featuredTutorials =
        customFeaturedTutorials || featuredQuery.data || [];
      const allTutorials = customAllTutorials || allQuery.data || [];

      const handleTutorialPress = React.useCallback(
        (tutorialId: string) => {
          if (onTutorialPress) {
            onTutorialPress(tutorialId);
          } else if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log("VideoTutorialsScreen: No onTutorialPress handler", {
              tutorialId,
            });
          }
        },
        [onTutorialPress],
      );

      const renderTutorialItem = React.useCallback(
        ({ item }: { item: VideoTutorial }) => (
          <VideoTutorialCard
            tutorial={item}
            onPress={() => handleTutorialPress(item.id)}
          />
        ),
        [handleTutorialPress],
      );

      if (isLoading) {
        return <AtomicSpinner size="lg" fullContainer />;
      }

      if (error) {
        return (
          <View style={styles.errorContainer}>
            <AtomicText color="error" type="bodyLarge">
              {errorLoadingMessage}
            </AtomicText>
          </View>
        );
      }

      return (
        <ScreenLayout scrollable={false} edges={["top", "bottom"]}>
          <Text style={[styles.title, { color: tokens.colors.textPrimary }]}>
            {title}
          </Text>

          {featuredTutorials && featuredTutorials.length > 0 && (
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
                renderItem={renderTutorialItem}
                keyExtractor={(item: VideoTutorial) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              />
            </View>
          )}

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
              data={allTutorials}
              renderItem={renderTutorialItem}
              keyExtractor={(item: VideoTutorial) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.verticalList}
            />
          </View>
        </ScreenLayout>
      );
    },
  );

const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
  title: {
    fontSize: tokens.typography.headlineLarge.responsiveFontSize,
    fontWeight: "600",
    marginBottom: 24 * tokens.spacingMultiplier,
  },
  section: {
    marginBottom: 24 * tokens.spacingMultiplier,
  },
  sectionTitle: {
    fontSize: tokens.typography.titleLarge.responsiveFontSize,
    fontWeight: "500",
    marginBottom: 12 * tokens.spacingMultiplier,
  },
  horizontalList: {
    paddingRight: 16 * tokens.spacingMultiplier,
  },
  verticalList: {
    paddingBottom: 16 * tokens.spacingMultiplier,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20 * tokens.spacingMultiplier,
  },
});
