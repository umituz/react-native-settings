/**
 * Base Legal Content Screen Component
 * Shared logic for legal document screens
 */
import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { AtomicText, AtomicButton } from "@umituz/react-native-design-system";
import { UrlHandlerService } from "../../domain/services/UrlHandlerService";
import { ContentValidationService } from "../../domain/services/ContentValidationService";
import { StyleCacheService } from "../../domain/services/StyleCacheService";

export interface LegalContentScreenProps {
  content?: string;
  url?: string;
  title: string;
  viewOnlineText?: string;
  openText?: string;
  onUrlPress?: () => void;
  testID?: string;
  styleCacheKey: string;
  createStyles: (tokens: any) => ReturnType<typeof StyleSheet.create>;
}

export const LegalContentScreen: React.FC<LegalContentScreenProps> = React.memo(({
  content,
  url,
  title,
  viewOnlineText,
  openText,
  onUrlPress,
  testID,
  styleCacheKey,
  createStyles,
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    ContentValidationService.validateScreenContent(
      content,
      url,
      title,
      viewOnlineText,
      openText,
      styleCacheKey
    );
  }, [content, url, title, viewOnlineText, openText, styleCacheKey]);

  const styles = React.useMemo(() => {
    const cacheKey = StyleCacheService.createTokenCacheKey(tokens);
    return StyleCacheService.getCachedStyles(
      styleCacheKey,
      cacheKey,
      () => createStyles(tokens)
    );
  }, [tokens, styleCacheKey, createStyles]);

  const handleUrlPress = React.useCallback(async () => {
    if (onUrlPress) {
      onUrlPress();
    } else if (url) {
      try {
        await UrlHandlerService.openUrl(url);
      } catch {
        // Silent error handling
      }
    }
  }, [onUrlPress, url]);

  const containerStyle = React.useMemo(() => [
    styles.container,
    {
      backgroundColor: tokens.colors.backgroundPrimary,
      paddingTop: insets.top,
    },
  ], [styles.container, tokens.colors.backgroundPrimary, insets.top]);

  const showContent = React.useMemo(() => !!(content), [content]);
  const showUrlSection = React.useMemo(() =>
    ContentValidationService.shouldShowUrlSection(url, onUrlPress),
    [url, onUrlPress]
  );

  const contentSection = React.useMemo(() => {
    if (showContent) {
      return (
        <AtomicText type="bodyMedium" color="onSurface" style={styles.text}>
          {content}
        </AtomicText>
      );
    }

    if (showUrlSection) {
      return (
        <View style={styles.urlContainer}>
          <AtomicText
            type="bodyMedium"
            color="secondary"
            style={styles.urlText}
          >
            {viewOnlineText}
          </AtomicText>
          <AtomicButton
            variant="primary"
            onPress={handleUrlPress}
            fullWidth
            style={styles.urlButton}
          >
            {openText}
          </AtomicButton>
        </View>
      );
    }

    return null;
  }, [showContent, showUrlSection, styles, content, viewOnlineText, openText, handleUrlPress]);

  return (
    <View style={containerStyle} testID={testID}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <AtomicText
            type="headlineLarge"
            color="primary"
            style={styles.title}
          >
            {title}
          </AtomicText>

          {contentSection}
        </View>
      </ScrollView>
    </View>
  );
});
