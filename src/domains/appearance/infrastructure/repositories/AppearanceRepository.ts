import { storageRepository, unwrap } from "@umituz/react-native-design-system";
import { IAppearanceRepository } from "../../application/ports/IAppearanceRepository";
import { AppearanceSettings } from "../../types";

const STORAGE_KEY = "@appearance_settings";
const DEFAULT_SETTINGS: AppearanceSettings = {
    themeMode: "dark",
};

export class AppearanceRepository implements IAppearanceRepository {
    async getSettings(): Promise<AppearanceSettings> {
        const result = await storageRepository.getItem<AppearanceSettings>(
            STORAGE_KEY,
            DEFAULT_SETTINGS
        );
        return unwrap(result, DEFAULT_SETTINGS);
    }

    async saveSettings(settings: AppearanceSettings): Promise<void> {
        const result = await storageRepository.setItem(STORAGE_KEY, settings);
        if (!result.success) {
            throw new Error("Failed to save appearance settings");
        }
    }

    async clearSettings(): Promise<void> {
        const result = await storageRepository.removeItem(STORAGE_KEY);
        if (!result.success) {
            throw new Error("Failed to clear appearance settings");
        }
    }
}

export const getAppearanceRepository = () => new AppearanceRepository();
