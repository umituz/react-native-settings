/**
 * Settings Service
 *
 * Orchestrates settings operations using SettingsRepository
 */

import { SettingsRepository } from '../repositories/SettingsRepository';
import type { UserSettings, SettingsResult } from '../../application/ports/ISettingsRepository';

export class SettingsService {
    private repository: SettingsRepository;

    constructor() {
        this.repository = new SettingsRepository();
    }

    async getSettings(userId: string): Promise<SettingsResult<UserSettings>> {
        return this.repository.getSettings(userId);
    }

    async saveSettings(settings: UserSettings): Promise<SettingsResult<void>> {
        return this.repository.saveSettings(settings);
    }

    async resetSettings(userId: string): Promise<SettingsResult<void>> {
        return this.repository.deleteSettings(userId);
    }
}

let settingsServiceInstance: SettingsService | null = null;

export function getSettingsService(): SettingsService {
    if (!settingsServiceInstance) {
        settingsServiceInstance = new SettingsService();
    }
    return settingsServiceInstance;
}
