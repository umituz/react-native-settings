/**
 * Legal Screen Wrapper Component
 */
import React from "react";
import { LegalScreen } from "../../../../domains/legal";

export interface LegalScreenWrapperProps {
  title: string;
  description: string;
  documentsHeader: string;
  privacyTitle: string;
  privacyDescription: string;
  termsTitle: string;
  termsDescription: string;
  eulaTitle: string;
  eulaDescription: string;
  onPrivacyPress: () => void;
  onTermsPress: () => void;
  onEulaPress: () => void;
}

export const LegalScreenWrapper: React.FC<LegalScreenWrapperProps> = ({
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
}) => (
  <LegalScreen
    title={title}
    description={description}
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
  />
);
