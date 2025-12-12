/**
 * Settings Content Component
 * Renders all settings sections and custom content
 */
import React from "react";
import type { NormalizedConfig } from "../utils/normalizeConfig";
import type { CustomSettingsSection } from "../types";
interface SettingsContentProps {
    normalizedConfig: NormalizedConfig;
    config?: any;
    features: {
        appearance: boolean;
        language: boolean;
        notifications: boolean;
        about: boolean;
        legal: boolean;
    };
    showUserProfile?: boolean;
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
    showFooter?: boolean;
    footerText?: string;
    customSections?: CustomSettingsSection[];
    showCloseButton?: boolean;
}
export declare const SettingsContent: React.FC<SettingsContentProps>;
export {};
//# sourceMappingURL=SettingsContent.d.ts.map