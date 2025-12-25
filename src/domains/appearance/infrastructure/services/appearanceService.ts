import {
  useTheme,
  useDesignSystemTheme,
  ThemeMode,
  CustomThemeColors
} from "@umituz/react-native-design-system";
import { IAppearanceRepository } from "../../application/ports/IAppearanceRepository";
import { getAppearanceRepository } from "../repositories/AppearanceRepository";
import { AppearanceSettings } from "../../types";

export class AppearanceService {
  constructor(private readonly repository: IAppearanceRepository = getAppearanceRepository()) { }

  async getSettings(): Promise<AppearanceSettings> {
    return this.repository.getSettings();
  }

  async setThemeMode(mode: ThemeMode): Promise<void> {
    const settings = await this.repository.getSettings();
    const newSettings = { ...settings, themeMode: mode };
    await this.repository.saveSettings(newSettings);
    this.syncWithDesignSystem(newSettings);
  }

  async setCustomColors(colors: CustomThemeColors): Promise<void> {
    const settings = await this.repository.getSettings();
    const newSettings = {
      ...settings,
      customColors: { ...settings.customColors, ...colors }
    };
    await this.repository.saveSettings(newSettings);
    this.syncWithDesignSystem(newSettings);
  }

  async resetSettings(): Promise<void> {
    await this.repository.clearSettings();
    const defaultSettings = await this.repository.getSettings();
    this.syncWithDesignSystem(defaultSettings);
  }

  private syncWithDesignSystem(settings: AppearanceSettings): void {
    useTheme.getState().setThemeMode(settings.themeMode);
    useDesignSystemTheme.getState().setThemeMode(settings.themeMode);
    if (settings.customColors) {
      useDesignSystemTheme.getState().setCustomColors(settings.customColors);
    }
  }
}

export const getAppearanceService = () => new AppearanceService();
export const appearanceService = getAppearanceService();
