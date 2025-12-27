/**
 * Settings Stack Navigator
 * 
 * Base stack navigator for settings screens
 * Can be extended by apps to add custom screens
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { SettingsScreen } from "../screens/SettingsScreen";
import { AppearanceScreen } from "../screens/AppearanceScreen";
import type { SettingsConfig, CustomSettingsSection } from "../screens/types";
import type { DevSettingsProps } from "../components/DevSettingsSection";

// Default param list - can be extended by apps
export type SettingsStackParamList = {
    Settings: { config?: SettingsConfig };
    Appearance: undefined;
    // About and Legal screens will be handled by external packages
};

export interface SettingsStackNavigatorProps {
    /**
     * Settings configuration
     */
    config?: SettingsConfig;

    /**
     * App version number from app config (e.g., "1.0.0")
     */
    appVersion?: string;

    /**
     * Show user profile header
     */
    showUserProfile?: boolean;

    /**
     * User profile props for anonymous/authenticated users
     */
    userProfile?: {
        displayName?: string;
        userId?: string;
        isAnonymous?: boolean;
        avatarUrl?: string;
        accountSettingsRoute?: string;
        onPress?: () => void;
        anonymousDisplayName?: string;
        avatarServiceUrl?: string;
    };

    /**
     * Additional screens to register
     * Apps can add their own screens here
     */
    additionalScreens?: Array<{
        name: string;
        component: React.ComponentType<any>;
        options?: any;
    }>;

    /**
     * Dev settings (only shown in __DEV__ mode)
     */
    devSettings?: DevSettingsProps;

    /**
     * Custom sections to render in settings list
     * Use this to add app-specific items like subscription
     */
    customSections?: CustomSettingsSection[];
}

const Stack = createStackNavigator<SettingsStackParamList>();

export const SettingsStackNavigator: React.FC<SettingsStackNavigatorProps> = ({
    config = {},
    appVersion,
    showUserProfile = false,
    userProfile,
    additionalScreens = [],
    devSettings,
    customSections = [],
}) => {
    const tokens = useAppDesignTokens();

    const screenOptions = {
        headerStyle: {
            backgroundColor: tokens.colors.surface,
            borderBottomColor: tokens.colors.borderLight,
            borderBottomWidth: 1,
        },
        headerTitleStyle: {
            fontSize: 18,
            fontWeight: "600" as const,
            color: tokens.colors.textPrimary,
        },
        headerTintColor: tokens.colors.textPrimary,
    };

    // Memoize SettingsScreen wrapper to prevent remounting on every render
    const SettingsScreenWrapper = React.useMemo(() => {
        const Wrapper = () => (
            <SettingsScreen
                config={config}
                appVersion={appVersion}
                showUserProfile={showUserProfile}
                userProfile={userProfile}
                devSettings={devSettings}
                customSections={customSections}
            />
        );
        Wrapper.displayName = "SettingsScreenWrapper";
        return Wrapper;
    }, [config, appVersion, showUserProfile, userProfile, devSettings, customSections]);

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="Settings"
                component={SettingsScreenWrapper}
                options={{
                    headerShown: false,
                    title: "Settings",
                }}
            />

            <Stack.Screen
                name="Appearance"
                component={AppearanceScreen}
                options={{
                    headerShown: true,
                    headerTitle: "Appearance",
                    headerTitleAlign: "center",
                    headerBackTitle: "Settings",
                }}
            />

            {/* Render additional screens */}
            {additionalScreens.map((screen) => (
                <Stack.Screen
                    key={screen.name}
                    name={screen.name as any}
                    component={screen.component}
                    options={screen.options}
                />
            ))}
        </Stack.Navigator>
    );
};
