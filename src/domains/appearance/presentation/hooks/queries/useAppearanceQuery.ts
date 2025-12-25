import { useQuery } from "@tanstack/react-query";
import { getAppearanceService } from "../../../infrastructure/services/AppearanceService";

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
