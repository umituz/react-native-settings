/**
 * Settings Screen
 * Presentation layer - Composition only, no business logic
 */
import React from "react";
import type { SettingsConfig, CustomSettingsSection } from "./types";
export interface SettingsScreenProps {
    config?: SettingsConfig;
    /** Show user profile header */
    showUserProfile?: boolean;
    /** User profile props */
    userProfile?: {
        displayName?: string;
        userId?: string;
        isGuest?: boolean;
        avatarUrl?: string;
        accountSettingsRoute?: string;
        onPress?: () => void;
        guestDisplayName?: string;
        avatarServiceUrl?: string;
    };
    /** Show footer with version */
    showFooter?: boolean;
    /** Custom footer text */
    footerText?: string;
    /** Custom sections to render */
    customSections?: CustomSettingsSection[];
    /** Show close button in header */
    showCloseButton?: boolean;
    /** Custom close handler */
    onClose?: () => void;
    /** Feature detection options */
    featureOptions?: {
        notificationServiceAvailable?: boolean;
    };
}
export declare const SettingsScreen: React.FC<SettingsScreenProps>;
//# sourceMappingURL=SettingsScreen.d.ts.map