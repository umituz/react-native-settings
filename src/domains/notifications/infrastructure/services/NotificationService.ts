/**
 * NotificationService
 *
 * Simple facade for offline notification system.
 * Works in ALL apps - offline, online, hybrid - no backend required.
 *
 * @module NotificationService
 */

import { NotificationManager } from './NotificationManager';

export * from './types';

/**
 * Notification service singleton
 * Provides simple access to notification manager
 */
export class NotificationService {
  private static instance: NotificationService | null = null;
  private isConfigured = false;

  readonly notifications = new NotificationManager();

  private constructor() {
    // Configuration deferred to first use
  }

  private ensureConfigured() {
    if (!this.isConfigured) {
      try {
        NotificationManager.configure();
        this.isConfigured = true;
      } catch (error) {
        console.error('[NotificationService] Failed to configure NotificationManager:', error);
      }
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
    return await this.notifications.requestPermissions();
  }

  /**
   * Check if permissions are granted
   */
  async hasPermissions(): Promise<boolean> {
    this.ensureConfigured();
    return await this.notifications.hasPermissions();
  }
}

// Lazy initialization - don't create on module load
export const notificationService = NotificationService.getInstance();
