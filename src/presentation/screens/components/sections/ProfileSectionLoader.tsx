import React from "react";
import { View, StyleSheet } from "react-native";
import { ProfileSection } from "@umituz/react-native-auth";
import { useAppNavigation } from "@umituz/react-native-design-system";

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
        guest?: string;
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
        return userProfile.isAnonymous && userProfile.userId
            ? `${translations?.guest || ""} ${userProfile.userId.substring(0, 8)}`
            : (translations?.anonymousName || "");
    }, [userProfile, translations]);

    if (!userProfile) return null;

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
