/**
 * User Profile Header Component
 * Displays user avatar, name, and ID
 * Works for both guest and authenticated users
 */
import React from "react";
export interface UserProfileHeaderProps {
    /** User display name */
    displayName?: string;
    /** User ID */
    userId?: string;
    /** Whether user is guest */
    isGuest?: boolean;
    /** Avatar URL (optional) */
    avatarUrl?: string;
    /** Navigation route for account settings */
    accountSettingsRoute?: string;
    /** Custom onPress handler */
    onPress?: () => void;
    /** Custom guest user display name */
    guestDisplayName?: string;
    /** Custom avatar service URL */
    avatarServiceUrl?: string;
}
export declare const UserProfileHeader: React.FC<UserProfileHeaderProps>;
//# sourceMappingURL=UserProfileHeader.d.ts.map