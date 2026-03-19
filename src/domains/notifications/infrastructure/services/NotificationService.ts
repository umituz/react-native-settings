/**
 * Notification Service
 *
 * Simple facade for offline notification system.
 * Works in ALL apps - offline, online, hybrid - no backend required.
 * Refactored to extend BaseService.
 *
 * @module NotificationService
 */

import { NotificationManager } from './NotificationManager';
import { BaseService } from '../../../../core/base/BaseService';

export * from './types';

/**
 * Notification service singleton
 * Provides simple access to notification manager
 */
export class NotificationService extends BaseService {
  protected serviceName = 'NotificationService';
  private static instance: NotificationService | null = null;
  private isConfigured = false;

  readonly notifications = new NotificationManager();

  private constructor() {
    super();
    // Configuration deferred to first use
  }

  private ensureConfigured() {
    if (!this.isConfigured) {
      NotificationManager.configure();
      this.isConfigured = true;
    }
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  /**
   * Request notification permissions
   */
  async requestPermissions(): Promise<boolean> {
    this.ensureConfigured();
    const result = await this.execute('requestPermissions', async () => {
      return await this.notifications.requestPermissions();
    });
    return result.success ? result.data : false;
  }

  /**
   * Check if permissions are granted
   */
  async hasPermissions(): Promise<boolean> {
    this.ensureConfigured();
    const result = await this.execute('hasPermissions', async () => {
      return await this.notifications.hasPermissions();
    });
    return result.success ? result.data : false;
  }
}

// Lazy initialization - don't create on module load
export const notificationService = NotificationService.getInstance();
