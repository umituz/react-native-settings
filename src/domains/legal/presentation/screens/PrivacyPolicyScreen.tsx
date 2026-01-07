/**
 * Privacy Policy Screen Component
 * Display Privacy Policy content
 */
import React from "react";
import { StyleSheet } from "react-native";
import { LegalContentScreen } from "./LegalContentScreen";

export interface PrivacyPolicyScreenProps {
  content?: string;
  url?: string;
  title: string;
  viewOnlineText?: string;
  openText?: string;
  onUrlPress?: () => void;
  testID?: string;
}

export const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = React.memo(({
  content,
  url,
  title,
  viewOnlineText,
  openText,
  onUrlPress,
  testID = "privacy-policy-screen",
}) => {
  const createStyles = (tokens: any) => StyleSheet.create({
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
      fontSize: tokens.typography.bodyMedium.responsiveFontSize,
    },
    urlContainer: {
      marginTop: 32,
      alignItems: "center",
    },
    urlText: {
      marginBottom: 16,
      textAlign: "center",
      fontSize: tokens.typography.bodyMedium.responsiveFontSize,
    },
    urlButton: {
      marginTop: 8,
    },
  });

  return (
    <LegalContentScreen
      content={content}
      url={url}
      title={title}
      viewOnlineText={viewOnlineText}
      openText={openText}
      onUrlPress={onUrlPress}
      testID={testID}
      styleCacheKey="PrivacyPolicyScreen"
      createStyles={createStyles}
    />
  );
});
