import React from "react";
import { View, StyleSheet } from "react-native";
import { ProfileSection } from "@umituz/react-native-auth";
import { useLocalization } from "../../../../domains/localization";
import { useAppNavigation } from "@umituz/react-native-design-system";
import { createSinglePropComparator } from "../../../../infrastructure/utils/memoComparisonUtils";

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
}

export const ProfileSectionLoader: React.FC<ProfileSectionLoaderProps> = React.memo(({ userProfile }) => {
    const { t } = useLocalization();
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
            ? `${t("profile.guest", "Guest")} ${userProfile.userId.substring(0, 8)}`
            : t("settings.profile.anonymousName", "Anonymous User");
    }, [userProfile, t]);

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
                signInText={t("auth.signIn", "Sign In")}
                anonymousText={anonymousDisplayName}
            />
        </View>
    );
}, createSinglePropComparator("userProfile"));

ProfileSectionLoader.displayName = "ProfileSectionLoader";

const styles = StyleSheet.create({
    profileContainer: {
        marginBottom: 32,
        paddingHorizontal: 0,
    },
});
