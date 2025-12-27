/**
 * Legal Screen Component
 * 
 * Single Responsibility: Layout and orchestration of legal documents list
 * Delegates item rendering to LegalItem component
 * 
 * All text content is passed as props (no localization dependency).
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens, type DesignTokens } from "@umituz/react-native-design-system";
import { AtomicText } from "@umituz/react-native-design-system";
import { ScreenLayout } from "@umituz/react-native-design-system";
import { LegalItem } from "../components/LegalItem";
import { UrlHandlerService } from "../../domain/services/UrlHandlerService";
import { ContentValidationService } from "../../domain/services/ContentValidationService";
import { StyleCacheService } from "../../domain/services/StyleCacheService";

export interface LegalScreenProps {
  /**
   * Title of the screen
   */
  title?: string;
  /**
   * Description/subtitle text
   */
  description?: string;
  /**
   * Header text for documents section
   */
  documentsHeader?: string;
  /**
   * Privacy Policy button text
   */
  privacyTitle?: string;
  /**
   * Privacy Policy description
   */
  privacyDescription?: string;
  /**
   * Terms of Service button text
   */
  termsTitle?: string;
  /**
   * Terms of Service description
   */
  termsDescription?: string;
  /**
   * EULA button text
   */
  eulaTitle?: string;
  /**
   * EULA description
   */
  eulaDescription?: string;
  /**
   * Callback when Privacy Policy is pressed
   */
  onPrivacyPress?: () => void;
  /**
   * Callback when Terms of Service is pressed
   */
  onTermsPress?: () => void;
  /**
   * Callback when EULA is pressed
   * Icon name from Feather library (e.g., "shield", "file-text", "file") EULA URL
   */
  onEulaPress?: () => void;
  /**
   * EULA URL (defaults to Apple's standard EULA)
   */
  eulaUrl?: string;
  /**
   * Test ID for E2E testing
   */
  testID?: string;
}

export const LegalScreen: React.FC<LegalScreenProps> = React.memo(({
  title,
  description,
  documentsHeader,
  privacyTitle,
  privacyDescription,
  termsTitle,
  termsDescription,
  eulaTitle,
  eulaDescription,
  onPrivacyPress,
  onTermsPress,
  onEulaPress,
  eulaUrl,
  testID = "legal-screen",
}) => {
  const tokens = useAppDesignTokens();

  // Memoize styles to prevent recreation on every render
  const styles = React.useMemo(() => {
    const cacheKey = StyleCacheService.createTokenCacheKey(tokens);
    return StyleCacheService.getCachedStyles(
      'LegalScreen',
      cacheKey,
      () => createLegalScreenStyles(tokens)
    );
  }, [tokens]);

  // Memoize EULA press handler to prevent child re-renders
  const handleEulaPress = React.useCallback(async () => {
    if (__DEV__) {
      console.log('LegalScreen: EULA pressed', { eulaUrl });
    }

    if (onEulaPress) {
      onEulaPress();
    } else if (eulaUrl) {
      try {
        await UrlHandlerService.openUrl(eulaUrl);
      } catch (error) {
        if (__DEV__) {
          console.error('LegalScreen: Error opening EULA URL', error);
        }
      }
    }
  }, [onEulaPress, eulaUrl]);

  // Memoize conditional rendering to prevent unnecessary re-renders
  const showHeader = React.useMemo(() => !!(title), [title]);
  const showDescription = React.useMemo(() => !!(description), [description]);
  const showSectionHeader = React.useMemo(() => !!(documentsHeader), [documentsHeader]);
  const showPrivacy = React.useMemo(() =>
    ContentValidationService.shouldShowLegalItem(onPrivacyPress, privacyTitle),
    [onPrivacyPress, privacyTitle]
  );
  const showTerms = React.useMemo(() =>
    ContentValidationService.shouldShowLegalItem(onTermsPress, termsTitle),
    [onTermsPress, termsTitle]
  );
  const showEula = React.useMemo(() =>
    !!((onEulaPress || eulaUrl) && eulaTitle),
    [onEulaPress, eulaUrl, eulaTitle]
  );

  // Memoize header content
  const headerContent = React.useMemo(() => {
    if (!showHeader) return null;

    return (
      <View style={styles.header}>
        <AtomicText type="headlineLarge" color="textPrimary">
          {title}
        </AtomicText>
        {showDescription && (
          <AtomicText
            type="bodyMedium"
            color="textSecondary"
            style={styles.headerSubtitle}
          >
            {description}
          </AtomicText>
        )}
      </View>
    );
  }, [showHeader, showDescription, styles.header, styles.headerSubtitle, title, description]);

  return (
    <ScreenLayout testID={testID} hideScrollIndicator>
      {/* Header */}
      {headerContent}

      {/* Legal Documents Section */}
      <View style={styles.section}>
        {showSectionHeader && (
          <AtomicText
            type="labelLarge"
            color="textSecondary"
            style={styles.sectionHeader}
          >
            {documentsHeader}
          </AtomicText>
        )}

        {/* Privacy Policy */}
        {showPrivacy && (
          <LegalItem
            iconName="shield"
            title={privacyTitle!}
            description={privacyDescription}
            onPress={onPrivacyPress}
            testID="privacy-policy-item"
          />
        )}

        {/* Terms of Service */}
        {showTerms && (
          <LegalItem
            iconName="document-text"
            title={termsTitle!}
            description={termsDescription}
            onPress={onTermsPress}
            testID="terms-of-service-item"
          />
        )}

        {/* EULA */}
        {showEula && (
          <LegalItem
            iconName="document"
            title={eulaTitle!}
            description={eulaDescription}
            onPress={handleEulaPress}
            testID="eula-item"
          />
        )}
      </View>
    </ScreenLayout>
  );
});

const createLegalScreenStyles = (tokens: DesignTokens) => {
  return StyleSheet.create({
    header: {
      paddingBottom: tokens.spacing.lg,
      paddingTop: tokens.spacing.md,
    },
    headerSubtitle: {
      marginTop: tokens.spacing.xs,
    },
    section: {
      marginTop: tokens.spacing.md,
    },
    sectionHeader: {
      marginBottom: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
    },
  });
};
