/**
 * Terms of Service Screen Component
 * Display Terms of Service content
 */

import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useResponsiveDesignTokens } from "@umituz/react-native-design-system";
import { AtomicText, AtomicButton } from "@umituz/react-native-design-system";
import { UrlHandlerService } from "../../domain/services/UrlHandlerService";
import { ContentValidationService } from "../../domain/services/ContentValidationService";
import { StyleCacheService } from "../../domain/services/StyleCacheService";

export interface TermsOfServiceScreenProps {
  /**
   * Terms of Service content (HTML or plain text)
   * Either content or url must be provided
   */
  content?: string;
  /**
   * Terms of Service URL (if content is not provided, will open URL)
   * Either content or url must be provided
   */
  url?: string;
  /**
   * Custom title
   */
  title: string;
  /**
   * Text for viewing online button (required when url is provided)
   */
  viewOnlineText?: string;
  /**
   * Text for open button (required when url is provided)
   */
  openText?: string;
  /**
   * Callback when URL is pressed (if content is not provided)
   */
  onUrlPress?: () => void;
  /**
   * Test ID for E2E testing
   */
  testID?: string;
}

export const TermsOfServiceScreen: React.FC<TermsOfServiceScreenProps> = React.memo(({
  content,
  url,
  title,
  viewOnlineText,
  openText,
  onUrlPress,
  testID = "terms-of-service-screen",
}) => {
  const tokens = useResponsiveDesignTokens();
  const insets = useSafeAreaInsets();
  
  // Validate required props
  React.useEffect(() => {
    ContentValidationService.validateScreenContent(
      content,
      url,
      title,
      viewOnlineText,
      openText,
      'TermsOfServiceScreen'
    );
  }, [content, url, title, viewOnlineText, openText]);
  
  // Use cached styles
  const styles = React.useMemo(() => {
    return StyleCacheService.getCachedStyles(
      'TermsOfServiceScreen',
      'terms-of-service-styles',
      createTermsOfServiceStyles
    );
  }, []);

  // Memoize URL press handler to prevent child re-renders
  const handleUrlPress = React.useCallback(async () => {
    if (__DEV__) {
      console.log('TermsOfServiceScreen: URL pressed', { url });
    }
    
    if (onUrlPress) {
      onUrlPress();
    } else if (url) {
      try {
        await UrlHandlerService.openUrl(url);
      } catch (error) {
        if (__DEV__) {
          console.error('TermsOfServiceScreen: Error opening URL', error);
        }
      }
    }
  }, [onUrlPress, url]);

  // Memoize container style to prevent object creation
  const containerStyle = React.useMemo(() => [
    styles.container,
    {
      backgroundColor: tokens.colors.backgroundPrimary,
      paddingTop: insets.top,
    },
  ], [styles.container, tokens.colors.backgroundPrimary, insets.top]);

  // Memoize conditional rendering
  const showContent = React.useMemo(() => !!(content), [content]);
  const showUrlSection = React.useMemo(() => 
    ContentValidationService.shouldShowUrlSection(url, onUrlPress), 
    [url, onUrlPress]
  );

  // Memoize content section
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
  }, [showContent, showUrlSection, styles.text, styles.urlContainer, styles.urlText, styles.urlButton, content, viewOnlineText, openText, handleUrlPress]);

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

const createTermsOfServiceStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      padding: 20,
    },
    content: {
      flex: 1,
    },
    title: {
      marginBottom: 24,
    },
    text: {
      lineHeight: 24,
    },
    urlContainer: {
      marginTop: 32,
      alignItems: "center",
    },
    urlText: {
      marginBottom: 16,
      textAlign: "center",
    },
    urlButton: {
      marginTop: 8,
    },
  });
};











