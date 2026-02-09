/**
 * Base Legal Content Screen Component
 * Shared logic for legal document screens
 */
import React from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens, type DesignTokens, ScreenLayout } from "@umituz/react-native-design-system";
import { AtomicText, AtomicButton } from "@umituz/react-native-design-system";
import { UrlHandlerService } from "../../domain/services/UrlHandlerService";
import { ContentValidationService } from "../../domain/services/ContentValidationService";
import { StyleCacheService } from "../../domain/services/StyleCacheService";
import { useAppNavigation, NavigationHeader } from "@umituz/react-native-design-system";

export interface LegalContentScreenProps {
  content?: string;
  url?: string;
  title: string;
  viewOnlineText?: string;
  openText?: string;
  onUrlPress?: () => void;
  testID?: string;
  styleCacheKey: string;
  createStyles: (tokens: DesignTokens) => ReturnType<typeof StyleSheet.create>;
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
  const navigation = useAppNavigation();

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
    <ScreenLayout
      testID={testID}
      scrollable={true}
      hideScrollIndicator={false}
      header={
        <NavigationHeader
          title={title}
          onBackPress={() => navigation.goBack()}
        />
      }
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.content}>
        {contentSection}
      </View>
    </ScreenLayout>
  );
});
