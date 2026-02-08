/**
 * useSettings Hook
 *
 * Primary hook for accessing and managing user settings.
 * Integrates with TanStack Query mutations and queries.
 */

import { useSettingsQuery } from './queries/useSettingsQuery';
import { useUpdateSettingsMutation, useResetSettingsMutation } from './mutations/useSettingsMutations';
import type { UserSettings } from '../../application/ports/ISettingsRepository';

export const useSettings = (userId: string) => {
    // Validate userId
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        throw new Error(
            'Invalid userId: must be a non-empty string. ' +
            'Received: ' + (userId === null ? 'null' : typeof userId)
        );
    }

    const {
        data: settings,
        isLoading: loading,
        error: queryError
    } = useSettingsQuery(userId);

    const updateMutation = useUpdateSettingsMutation(userId);
    const resetMutation = useResetSettingsMutation(userId);

    const updateSettings = async (updates: Partial<UserSettings>) => {
        return updateMutation.mutateAsync(updates);
    };

    const resetSettings = async () => {
        return resetMutation.mutateAsync();
    };

    const error = queryError instanceof Error
        ? queryError.message
        : updateMutation.error instanceof Error
            ? updateMutation.error.message
            : resetMutation.error instanceof Error
                ? resetMutation.error.message
                : null;

    return {
        settings,
        loading: loading || updateMutation.isPending || resetMutation.isPending,
        error,
        updateSettings,
        resetSettings,
    };
};
