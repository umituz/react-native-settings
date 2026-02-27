import React from "react";
import { View, StyleSheet } from "react-native";
import { useAppNavigation } from "@umituz/react-native-design-system/molecules";

// ProfileSection is an optional peer — lazy require so the package works without @umituz/react-native-auth
const ProfileSection: React.ComponentType<any> | null = (() => {
  try { return require("@umituz/react-native-auth").ProfileSection ?? null; } catch { return null; }
})();

export interface ProfileSectionLoaderProps {
    userProfile?: {
        displayName?: string;
        userId?: string;
        isAnonymous?: boolean;
        avatarUrl?: string;
        accountSettingsRoute?: string;
        onPress?: () => void;
        benefits?: string[];
    };
    translations?: {
        anonymousName?: string;
        signIn?: string;
    };
}

export const ProfileSectionLoader: React.FC<ProfileSectionLoaderProps> = React.memo(({ userProfile, translations }) => {
    const navigation = useAppNavigation();

    const handlePress = React.useCallback(() => {
        if (!userProfile) return;
        if (userProfile.onPress) {
            userProfile.onPress();
        } else if (userProfile.accountSettingsRoute) {
            navigation.navigate(userProfile.accountSettingsRoute);
        }
    }, [navigation, userProfile]);

    const anonymousDisplayName = React.useMemo(() => {
        if (!userProfile) return "";
        return translations?.anonymousName || "";
    }, [translations]);

    if (!userProfile || !ProfileSection) return null;

    return (
        <View style={styles.profileContainer}>
            <ProfileSection
                profile={{
                    displayName: userProfile.displayName || anonymousDisplayName,
                    userId: userProfile.userId,
                    isAnonymous: userProfile.isAnonymous ?? true,
                    avatarUrl: userProfile.avatarUrl,
                    accountSettingsRoute: userProfile.accountSettingsRoute,
                    benefits: userProfile.benefits,
                }}
                onPress={handlePress}
                onSignIn={userProfile.onPress}
                signInText={translations?.signIn || ""}
                anonymousText={anonymousDisplayName}
            />
        </View>
    );
}, (prev, next) => prev.userProfile === next.userProfile && prev.translations === next.translations);

ProfileSectionLoader.displayName = "ProfileSectionLoader";

const styles = StyleSheet.create({
    profileContainer: {
        marginBottom: 32,
        paddingHorizontal: 0,
    },
});
