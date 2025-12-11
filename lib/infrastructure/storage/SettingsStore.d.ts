/**
 * Settings Store - Zustand State Management
 *
 * Global settings state for app preferences
 * Manages theme, language, notifications, and privacy settings
 *
 * DDD ARCHITECTURE: Uses @umituz/react-native-storage for all storage operations
 * - Type-safe storage with StorageKey enum
 * - Result pattern for error handling
 * - Single source of truth for all storage
 */
import type { UserSettings } from '../../domain/repositories/ISettingsRepository';
interface SettingsStore {
    settings: UserSettings | null;
    loading: boolean;
    error: string | null;
    loadSettings: (userId: string) => Promise<void>;
    updateSettings: (updates: Partial<UserSettings>) => Promise<void>;
    resetSettings: (userId: string) => Promise<void>;
    clearError: () => void;
}
export declare const useSettingsStore: import("zustand").UseBoundStore<import("zustand").StoreApi<SettingsStore>>;
/**
 * Hook for accessing settings state
 */
export declare const useSettings: () => {
    settings: UserSettings | null;
    loading: boolean;
    error: string | null;
    loadSettings: (userId: string) => Promise<void>;
    updateSettings: (updates: Partial<UserSettings>) => Promise<void>;
    resetSettings: (userId: string) => Promise<void>;
    clearError: () => void;
};
export {};
//# sourceMappingURL=SettingsStore.d.ts.map