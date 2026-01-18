import { useQuery } from "@umituz/react-native-design-system";
import { getAppearanceService } from "../../../infrastructure/services/appearanceService";

export const appearanceKeys = {
    all: ["appearance"] as const,
    settings: () => [...appearanceKeys.all, "settings"] as const,
};

export const useAppearanceQuery = () => {
    const service = getAppearanceService();
    return useQuery({
        queryKey: appearanceKeys.settings(),
        queryFn: () => service.getSettings(),
    });
};
