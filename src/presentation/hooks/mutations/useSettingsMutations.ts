/**
 * useSettingsMutations Hook
 *
 * Mutations for updating and resetting user settings
 */

import { useMutation, useQueryClient } from '@umituz/react-native-design-system';
import { getSettingsService } from '../../../infrastructure/services/SettingsService';
import { SETTINGS_QUERY_KEY } from '../queries/useSettingsQuery';
import type { UserSettings } from '../../../application/ports/ISettingsRepository';

export const useUpdateSettingsMutation = (userId: string) => {
    const queryClient = useQueryClient();
    const settingsService = getSettingsService();

    return useMutation({
        mutationFn: async (updates: Partial<UserSettings>) => {
            const currentResult = await settingsService.getSettings(userId);
            if (!currentResult.success || !currentResult.data) {
                throw new Error('Could not find existing settings to update');
            }

            const updatedSettings = {
                ...currentResult.data,
                ...updates,
                updatedAt: new Date(),
            };

            const result = await settingsService.saveSettings(updatedSettings);
            if (!result.success) {
                throw new Error(result.error?.message || 'Failed to update settings');
            }
            return updatedSettings;
        },
        onSuccess: (data) => {
            queryClient.setQueryData([...SETTINGS_QUERY_KEY, userId], data);
        },
    });
};

export const useResetSettingsMutation = (userId: string) => {
    const queryClient = useQueryClient();
    const settingsService = getSettingsService();

    return useMutation({
        mutationFn: async () => {
            const result = await settingsService.resetSettings(userId);
            // resetSettings returns the defaults as data
            if (!result.success) {
                throw new Error(result.error?.message || 'Failed to reset settings');
            }
            // After reset, fetch fresh settings (defaults)
            const freshResult = await settingsService.getSettings(userId);
            if (!freshResult.success || !freshResult.data) {
                throw new Error('Failed to fetch settings after reset');
            }
            return freshResult.data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData([...SETTINGS_QUERY_KEY, userId], data);
        },
    });
};
