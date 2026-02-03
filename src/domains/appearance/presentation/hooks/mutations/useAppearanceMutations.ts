import { useMutation, useQueryClient } from "@umituz/react-native-design-system";
import { getAppearanceService } from "../../../infrastructure/services/appearanceService";
import { appearanceKeys } from "../queries/useAppearanceQuery";
import { ThemeMode, CustomThemeColors } from "@umituz/react-native-design-system";
import type { AppearanceSettings } from "../../../types";

export const useAppearanceMutations = () => {
    const queryClient = useQueryClient();
    const service = getAppearanceService();

    const updateThemeMutation = useMutation({
        mutationFn: (mode: ThemeMode) => service.setThemeMode(mode),
        onMutate: async (mode: ThemeMode) => {
            await queryClient.cancelQueries({ queryKey: appearanceKeys.settings() });
            const previousData = queryClient.getQueryData<AppearanceSettings>(appearanceKeys.settings());
            queryClient.setQueryData<AppearanceSettings>(appearanceKeys.settings(), (old) => ({
                ...old,
                themeMode: mode,
            } as AppearanceSettings));
            return { previousData };
        },
        onError: (_err, _mode, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(appearanceKeys.settings(), context.previousData);
            }
        },
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: appearanceKeys.settings() });
        },
    });

    const updateColorsMutation = useMutation({
        mutationFn: (colors: CustomThemeColors) => service.setCustomColors(colors),
        onMutate: async (colors: CustomThemeColors) => {
            await queryClient.cancelQueries({ queryKey: appearanceKeys.settings() });
            const previousData = queryClient.getQueryData<AppearanceSettings>(appearanceKeys.settings());
            queryClient.setQueryData<AppearanceSettings>(appearanceKeys.settings(), (old) => ({
                ...old,
                customColors: { ...old?.customColors, ...colors },
            } as AppearanceSettings));
            return { previousData };
        },
        onError: (_err, _colors, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(appearanceKeys.settings(), context.previousData);
            }
        },
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: appearanceKeys.settings() });
        },
    });

    const resetAppearanceMutation = useMutation({
        mutationFn: () => service.resetSettings(),
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: appearanceKeys.settings() });
        },
    });

    return {
        updateThemeMutation,
        updateColorsMutation,
        resetAppearanceMutation,
    };
};
