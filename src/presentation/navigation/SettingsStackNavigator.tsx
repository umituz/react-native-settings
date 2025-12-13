/**
 * Settings Stack Navigator
 * 
 * Base stack navigator for settings screens
 * Can be extended by apps to add custom screens
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";
import { SettingsScreen } from "../screens/SettingsScreen";
import { AppearanceScreen } from "../screens/AppearanceScreen";
import type { SettingsConfig } from "../screens/types";

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
     * Additional screens to register
     * Apps can add their own screens here
     */
    additionalScreens?: Array<{
        name: string;
        component: React.ComponentType<any>;
        options?: any;
    }>;
}

const Stack = createStackNavigator<SettingsStackParamList>();

export const SettingsStackNavigator: React.FC<SettingsStackNavigatorProps> = ({
    config = {},
    appVersion,
    additionalScreens = [],
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
        const Wrapper = () => <SettingsScreen config={config} appVersion={appVersion} />;
        Wrapper.displayName = "SettingsScreenWrapper";
        return Wrapper;
    }, [config, appVersion]);

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
