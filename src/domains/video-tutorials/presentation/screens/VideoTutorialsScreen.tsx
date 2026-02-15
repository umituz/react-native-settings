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
import { View, FlatList, StyleSheet } from "react-native";
import {
  useAppDesignTokens,
  ScreenLayout,
  AtomicSpinner,
  AtomicText,
  useAppNavigation,
  NavigationHeader,
} from "@umituz/react-native-design-system";
import type { DesignTokens } from "@umituz/react-native-design-system";
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
    const navigation = useAppNavigation();
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

    const hasFeatured = featuredTutorials && featuredTutorials.length > 0;
    const hasTutorials = tutorials && tutorials.length > 0;

    const header = (
      <NavigationHeader
        title={title}
        onBackPress={() => navigation.goBack()}
      />
    );

    if (isLoading) {
      return (
        <ScreenLayout header={header}>
          <AtomicSpinner size="lg" fullContainer color="primary" />
        </ScreenLayout>
      );
    }

    if (!hasTutorials && !hasFeatured) {
      return (
        <ScreenLayout header={header}>
          <View style={styles.emptyContainer}>
            <AtomicText color="textSecondary" type="bodyLarge" style={{ textAlign: 'center' }}>{emptyMessage}</AtomicText>
          </View>
        </ScreenLayout>
      );
    }

    const ListHeader = () => (
      <>
        {hasFeatured && (
          <View style={styles.section}>
            <AtomicText color="textSecondary" type="titleLarge" style={styles.sectionTitle}>{featuredTitle}</AtomicText>
            <FlatList
              data={featuredTutorials}
              renderItem={renderFeaturedItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              initialNumToRender={3}
              maxToRenderPerBatch={2}
              windowSize={5}
              removeClippedSubviews={true}
            />
          </View>
        )}
        {hasTutorials && (
          <AtomicText color="textSecondary" type="titleLarge" style={styles.sectionTitle}>{allTutorialsTitle}</AtomicText>
        )}
      </>
    );

    return (
      <ScreenLayout header={header} scrollable={false}>
        <FlatList
          data={tutorials}
          renderItem={renderTutorialItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.verticalList}
          ListHeaderComponent={ListHeader}
          initialNumToRender={8}
          maxToRenderPerBatch={5}
          windowSize={10}
          removeClippedSubviews={true}
        />
      </ScreenLayout>
    );
  }
);

const getStyles = (tokens: DesignTokens) => StyleSheet.create({
  section: {
    marginBottom: tokens.spacing.lg,
  },
  sectionTitle: {
    fontWeight: "600",
    marginBottom: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
  },
  horizontalList: {
    paddingHorizontal: tokens.spacing.md,
  },
  verticalList: {
    paddingBottom: tokens.spacing.xl,
    paddingHorizontal: tokens.spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: tokens.spacing.lg,
  },
});
