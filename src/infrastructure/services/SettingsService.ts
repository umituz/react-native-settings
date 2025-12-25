/**
 * Settings Service
 *
 * Orchestrates settings operations using SettingsRepository
 */

import { SettingsRepository } from '../repositories/SettingsRepository';
import type { UserSettings, SettingsResult } from '../../application/ports/ISettingsRepository';

export class SettingsService {
    private repository: SettingsRepository;
    private initialized: boolean = false;

    constructor() {
        this.repository = new SettingsRepository();
    }

    async initialize(): Promise<void> {
        if (this.initialized) return;
        this.initialized = true;
    }

    async getSettings(userId: string): Promise<SettingsResult<UserSettings>> {
        return this.repository.getSettings(userId);
    }

    async saveSettings(settings: UserSettings): Promise<SettingsResult<void>> {
        return this.repository.saveSettings(settings);
    }

    async resetSettings(userId: string): Promise<SettingsResult<void>> {
        // Repository getSettings handles returning defaults if not found, 
        // but here we want to explicitly reset.
        // We can just delete and get again.
        await this.repository.deleteSettings(userId);
        return this.repository.getSettings(userId) as unknown as SettingsResult<void>;
    }
}

let settingsServiceInstance: SettingsService | null = null;

export function getSettingsService(): SettingsService {
    if (!settingsServiceInstance) {
        settingsServiceInstance = new SettingsService();
    }
    return settingsServiceInstance;
}
