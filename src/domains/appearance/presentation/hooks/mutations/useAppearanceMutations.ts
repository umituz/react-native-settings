import { useMutation, useQueryClient } from "@umituz/react-native-design-system";
import { getAppearanceService } from "../../../infrastructure/services/AppearanceService";
import { appearanceKeys } from "../queries/useAppearanceQuery";
import { ThemeMode, CustomThemeColors } from "@umituz/react-native-design-system";

export const useAppearanceMutations = () => {
    const queryClient = useQueryClient();
    const service = getAppearanceService();

    const updateThemeMutation = useMutation({
        mutationFn: (mode: ThemeMode) => service.setThemeMode(mode),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: appearanceKeys.settings() });
        },
    });

    const updateColorsMutation = useMutation({
        mutationFn: (colors: CustomThemeColors) => service.setCustomColors(colors),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: appearanceKeys.settings() });
        },
    });

    const resetAppearanceMutation = useMutation({
        mutationFn: () => service.resetSettings(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: appearanceKeys.settings() });
        },
    });

    return {
        updateThemeMutation,
        updateColorsMutation,
        resetAppearanceMutation,
    };
};
