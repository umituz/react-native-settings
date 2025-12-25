import { ThemeMode, CustomThemeColors } from "@umituz/react-native-design-system";
import { AppearanceSettings } from "../../types";

export interface IAppearanceRepository {
    getSettings(): Promise<AppearanceSettings>;
    saveSettings(settings: AppearanceSettings): Promise<void>;
    clearSettings(): Promise<void>;
}
