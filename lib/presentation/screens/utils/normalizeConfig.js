/**
 * Config Normalization Utilities
 * Single Responsibility: Normalize config values to consistent format
 */
/**
 * Normalize a config value to enabled boolean and optional config object
 */
function normalizeConfigValue(value, defaultValue) {
    if (value === undefined) {
        return { enabled: defaultValue === true };
    }
    if (typeof value === "boolean" || value === "auto") {
        return { enabled: value === true };
    }
    // It's a config object
    const config = value;
    const enabled = config?.enabled ?? defaultValue;
    return {
        enabled: enabled === true,
        config,
    };
}
/**
 * Normalize entire SettingsConfig to consistent format
 */
export function normalizeSettingsConfig(config) {
    return {
        appearance: normalizeConfigValue(config?.appearance, "auto"),
        language: normalizeConfigValue(config?.language, "auto"),
        notifications: normalizeConfigValue(config?.notifications, "auto"),
        about: normalizeConfigValue(config?.about, "auto"),
        legal: normalizeConfigValue(config?.legal, "auto"),
        account: normalizeConfigValue(config?.account, false),
        support: normalizeConfigValue(config?.support, false),
        developer: normalizeConfigValue(config?.developer, false),
    };
}
//# sourceMappingURL=normalizeConfig.js.map