import React from "react";
import { View, StyleSheet } from "react-native";
import { ProfileSection } from "@umituz/react-native-auth";
import { useLocalization } from "@umituz/react-native-localization";
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
}


export const ProfileSectionLoader: React.FC<ProfileSectionLoaderProps> = ({ userProfile }) => {
    const { t } = useLocalization();
    const navigation = useAppNavigation();

    if (!userProfile) return null;

    const handlePress = () => {
        if (userProfile.onPress) {
            userProfile.onPress();
        } else if (userProfile.accountSettingsRoute) {
            navigation.navigate(userProfile.accountSettingsRoute);
        }
    };

    return (
        <View style={styles.profileContainer}>
            <ProfileSection
                profile={{
                    displayName: userProfile.displayName || "",
                    userId: userProfile.userId,
                    isAnonymous: userProfile.isAnonymous ?? true,
                    avatarUrl: userProfile.avatarUrl,
                    accountSettingsRoute: userProfile.accountSettingsRoute,
                    benefits: userProfile.benefits,
                }}
                onPress={handlePress}
                onSignIn={userProfile.onPress}
                signInText={t("auth.signIn")}
                anonymousText={t("settings.profile.anonymousName")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    profileContainer: {
        marginBottom: 32,
        paddingHorizontal: 0,
    },
});
