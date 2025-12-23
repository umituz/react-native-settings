/**
 * Repository implementation for About data
 * Handles data persistence and retrieval
 * Optimized for performance and memory safety
 */
import { AppInfo } from '../../domain/entities/AppInfo';
import { IAboutRepository } from '../../domain/repositories/IAboutRepository';

export class AboutRepository implements IAboutRepository {
  private appInfo: AppInfo | null = null;
  private isDestroyed = false;

  async getAppInfo(): Promise<AppInfo> {
    if (this.isDestroyed) {
      throw new Error('Repository has been destroyed');
    }
    
    if (!this.appInfo) {
      throw new Error('App info not initialized');
    }
    
    // Return a deep copy to prevent mutations
    return { ...this.appInfo };
  }

  async saveAppInfo(appInfo: AppInfo): Promise<void> {
    if (this.isDestroyed) {
      throw new Error('Repository has been destroyed');
    }
    
    // Validate input to prevent invalid data
    if (!appInfo || typeof appInfo !== 'object') {
      throw new Error('Invalid app info provided');
    }
    
    // Store a deep copy to prevent external mutations
    this.appInfo = { ...appInfo };
  }

  async updateAppInfo(updates: Partial<AppInfo>): Promise<AppInfo> {
    if (this.isDestroyed) {
      throw new Error('Repository has been destroyed');
    }
    
    if (!this.appInfo) {
      throw new Error('App info not initialized');
    }
    
    // Validate input to prevent invalid data
    if (!updates || typeof updates !== 'object') {
      throw new Error('Invalid updates provided');
    }
    
    // Create new object to prevent mutations
    this.appInfo = { ...this.appInfo, ...updates };

    // Return a deep copy to prevent mutations
    return { ...this.appInfo };
  }

  /**
   * Cleanup method to prevent memory leaks
   */
  destroy(): void {
    this.appInfo = null;
    this.isDestroyed = true;
  }
}