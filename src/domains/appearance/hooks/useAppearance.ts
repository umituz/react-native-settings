import { useAppearanceQuery } from "../presentation/hooks/queries/useAppearanceQuery";
import { useAppearanceMutations } from "../presentation/hooks/mutations/useAppearanceMutations";
import { ThemeMode, CustomThemeColors } from "@umituz/react-native-design-system";

export const useAppearance = () => {
    const { data: settings, isLoading } = useAppearanceQuery();
    const {
        updateThemeMutation,
        updateColorsMutation,
        resetAppearanceMutation
    } = useAppearanceMutations();

    return {
        themeMode: settings?.themeMode || "light",
        customColors: settings?.customColors,
        isLoading,
        setThemeMode: (mode: ThemeMode) => updateThemeMutation.mutate(mode),
        setCustomColors: (colors: CustomThemeColors) => updateColorsMutation.mutate(colors),
        reset: () => resetAppearanceMutation.mutate(),
    };
};
