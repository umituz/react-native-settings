/**
 * Settings Service
 *
 * Orchestrates settings operations using SettingsRepository.
 * Refactored to extend BaseService for consistent error handling.
 */

import { SettingsRepository } from '../repositories/SettingsRepository';
import { BaseService } from '../../core/base/BaseService';
import type { UserSettings, SettingsResult } from '../../application/ports/ISettingsRepository';

export class SettingsService extends BaseService {
  protected serviceName = 'SettingsService';
  private repository: SettingsRepository;

  constructor() {
    super();
    this.repository = new SettingsRepository();
  }

  async getSettings(userId: string): Promise<SettingsResult<UserSettings>> {
    return await this.repository.getSettings(userId);
  }

  async saveSettings(settings: UserSettings): Promise<SettingsResult<void>> {
    return await this.repository.saveSettings(settings);
  }

  async resetSettings(userId: string): Promise<SettingsResult<void>> {
    return await this.repository.deleteSettings(userId);
  }
}

let settingsServiceInstance: SettingsService | null = null;

export function getSettingsService(): SettingsService {
  if (!settingsServiceInstance) {
    settingsServiceInstance = new SettingsService();
  }
  return settingsServiceInstance;
}
