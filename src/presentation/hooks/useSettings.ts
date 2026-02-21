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
    const isValidUserId = !!userId && typeof userId === 'string' && userId.trim() !== '';

    const {
        data: settings,
        isLoading: loading,
        error: queryError
    } = useSettingsQuery(isValidUserId ? userId : '__invalid__');

    const updateMutation = useUpdateSettingsMutation(isValidUserId ? userId : '__invalid__');
    const resetMutation = useResetSettingsMutation(isValidUserId ? userId : '__invalid__');

    const updateSettings = async (updates: Partial<UserSettings>) => {
        if (!isValidUserId) {
            throw new Error('Invalid userId: must be a non-empty string');
        }
        return updateMutation.mutateAsync(updates);
    };

    const resetSettings = async () => {
        if (!isValidUserId) {
            throw new Error('Invalid userId: must be a non-empty string');
        }
        return resetMutation.mutateAsync();
    };

    const error = !isValidUserId
        ? 'Invalid userId: must be a non-empty string'
        : queryError instanceof Error
            ? queryError.message
            : updateMutation.error instanceof Error
                ? updateMutation.error.message
                : resetMutation.error instanceof Error
                    ? resetMutation.error.message
                    : null;

    return {
        settings: isValidUserId ? settings : undefined,
        loading: isValidUserId ? (loading || updateMutation.isPending || resetMutation.isPending) : false,
        error,
        updateSettings,
        resetSettings,
    };
};
