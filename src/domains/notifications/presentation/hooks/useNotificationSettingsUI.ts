/**
 * useNotificationSettingsUI Hook
 * Handles all business logic for notification settings screen
 */

import { useEffect, useCallback } from 'react';
import { useNotificationPreferences, useQuietHours, useNotificationStore, useRemindersLoading } from '../../infrastructure/storage/UnifiedNotificationStore';
import { notificationService } from '../../infrastructure/services/NotificationService';

export const useNotificationSettingsUI = () => {
    const preferences = useNotificationPreferences();
    const quietHours = useQuietHours();
    const { initialize, updatePreferences, updateQuietHours } = useNotificationStore();
    const isLoading = useRemindersLoading();

    useEffect(() => {
        initialize();
    }, [initialize]);

    const handleMasterToggle = useCallback(async (value: boolean) => {
        if (value) {
            const hasPermission = await notificationService.hasPermissions();
            if (!hasPermission) {
                const granted = await notificationService.requestPermissions();
                if (!granted) return;
            }
        }
        await updatePreferences({ enabled: value });
    }, [updatePreferences]);

    const handleSoundToggle = useCallback(async (value: boolean) => {
        await updatePreferences({ sound: value });
    }, [updatePreferences]);

    const handleVibrationToggle = useCallback(async (value: boolean) => {
        await updatePreferences({ vibration: value });
    }, [updatePreferences]);

    const handleQuietHoursToggle = useCallback(async (value: boolean) => {
        await updateQuietHours({ ...quietHours, enabled: value });
    }, [quietHours, updateQuietHours]);

    return {
        preferences,
        quietHours,
        isLoading,
        handleMasterToggle,
        handleSoundToggle,
        handleVibrationToggle,
        handleQuietHoursToggle,
    };
};
