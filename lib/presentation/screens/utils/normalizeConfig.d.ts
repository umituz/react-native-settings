/**
 * Config Normalization Utilities
 * Single Responsibility: Normalize config values to consistent format
 */
import type { AppearanceConfig, LanguageConfig, NotificationsConfig, AboutConfig, LegalConfig, AccountConfig, SupportConfig, DeveloperConfig, SettingsConfig } from "../types";
export interface NormalizedConfig {
    appearance: {
        enabled: boolean;
        config?: AppearanceConfig;
    };
    language: {
        enabled: boolean;
        config?: LanguageConfig;
    };
    notifications: {
        enabled: boolean;
        config?: NotificationsConfig;
    };
    about: {
        enabled: boolean;
        config?: AboutConfig;
    };
    legal: {
        enabled: boolean;
        config?: LegalConfig;
    };
    account: {
        enabled: boolean;
        config?: AccountConfig;
    };
    support: {
        enabled: boolean;
        config?: SupportConfig;
    };
    developer: {
        enabled: boolean;
        config?: DeveloperConfig;
    };
}
/**
 * Normalize entire SettingsConfig to consistent format
 */
export declare function normalizeSettingsConfig(config: SettingsConfig | undefined): NormalizedConfig;
//# sourceMappingURL=normalizeConfig.d.ts.map