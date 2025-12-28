/**
 * Legal Screen Component
 * 
 * Single Responsibility: Layout and orchestration of legal documents list
 * Uses ScreenLayout from design system for consistent UI.
 */

import React from "react";
import { ScreenLayout } from "@umituz/react-native-design-system";
import { LegalScreenHeader } from "../components/LegalScreenHeader";
import { LegalDocumentsList } from "../components/LegalDocumentsList";

export interface LegalScreenProps {
  title?: string;
  description?: string;
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
  testID?: string;
}

export const LegalScreen: React.FC<LegalScreenProps> = React.memo((props) => {
  const {
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
  } = props;

  return (
    <ScreenLayout testID={testID} hideScrollIndicator>
      <LegalScreenHeader title={title} description={description} />
      
      <LegalDocumentsList
        documentsHeader={documentsHeader}
        privacyTitle={privacyTitle}
        privacyDescription={privacyDescription}
        termsTitle={termsTitle}
        termsDescription={termsDescription}
        eulaTitle={eulaTitle}
        eulaDescription={eulaDescription}
        onPrivacyPress={onPrivacyPress}
        onTermsPress={onTermsPress}
        onEulaPress={onEulaPress}
        eulaUrl={eulaUrl}
      />
    </ScreenLayout>
  );
});
