/**
 * Repository interface for About data
 * Defines contract for data access layer
 */
import { AppInfo } from '../entities/AppInfo';

export interface IAboutRepository {
  /**
   * Get application information
   */
  getAppInfo(): Promise<AppInfo>;
  
  /**
   * Save application information
   */
  saveAppInfo(appInfo: AppInfo): Promise<void>;
  
  /**
   * Update application information
   */
  updateAppInfo(updates: Partial<AppInfo>): Promise<AppInfo>;
}