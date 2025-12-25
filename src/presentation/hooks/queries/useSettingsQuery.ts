/**
 * useSettingsQuery Hook
 *
 * Fetches user settings using TanStack Query
 */

import { useQuery } from '@tanstack/react-query';
import { getSettingsService } from '../../../infrastructure/services/SettingsService';
import type { UserSettings } from '../../../application/ports/ISettingsRepository';

export const SETTINGS_QUERY_KEY = ['settings'];

export const useSettingsQuery = (userId: string) => {
    const settingsService = getSettingsService();

    return useQuery({
        queryKey: [...SETTINGS_QUERY_KEY, userId],
        queryFn: async () => {
            const result = await settingsService.getSettings(userId);
            if (!result.success || !result.data) {
                throw new Error(result.error?.message || 'Failed to load settings');
            }
            return result.data;
        },
        enabled: !!userId,
    });
};
