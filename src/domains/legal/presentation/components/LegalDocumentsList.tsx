/**
 * Legal Documents List Component
 * 
 * Displays list of legal documents (Privacy, Terms, EULA).
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText, useAppDesignTokens } from "@umituz/react-native-design-system";
import { LegalItem } from "./LegalItem";
import { UrlHandlerService } from "../../domain/services/UrlHandlerService";

interface LegalDocumentsListProps {
  documentsHeader?: string;
  privacyTitle?: string;
  privacyDescription?: string;
  termsTitle?: string;
  termsDescription?: string;
  eulaTitle?: string;
  eulaDescription?: string;
  onPrivacyPress?: () => void;
  onTermsPress?: () => void;
  onEulaPress?: () => void;
  eulaUrl?: string;
}

export const LegalDocumentsList: React.FC<LegalDocumentsListProps> = React.memo(({
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
}) => {
  const tokens = useAppDesignTokens();

  const handleEulaPress = React.useCallback(async () => {
    if (onEulaPress) {
      onEulaPress();
    } else if (eulaUrl) {
      try {
        await UrlHandlerService.openUrl(eulaUrl);
      } catch {
        // Silent error handling
      }
    }
  }, [onEulaPress, eulaUrl]);

  const showPrivacy = !!(onPrivacyPress && privacyTitle);
  const showTerms = !!(onTermsPress && termsTitle);
  const showEula = !!((onEulaPress || eulaUrl) && eulaTitle);

  return (
    <View style={[styles.section, { marginTop: tokens.spacing.md }]}>
      {documentsHeader && (
        <AtomicText
          type="labelLarge"
          color="textSecondary"
          style={[styles.sectionHeader, {
            marginBottom: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
          }]}
        >
          {documentsHeader}
        </AtomicText>
      )}

      {showPrivacy && (
        <LegalItem
          iconName="shield"
          title={privacyTitle!}
          description={privacyDescription}
          onPress={onPrivacyPress}
          testID="privacy-policy-item"
        />
      )}

      {showTerms && (
        <LegalItem
          iconName="document-text"
          title={termsTitle!}
          description={termsDescription}
          onPress={onTermsPress}
          testID="terms-of-service-item"
        />
      )}

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
  );
});

const styles = StyleSheet.create({
  section: {},
  sectionHeader: {},
});
