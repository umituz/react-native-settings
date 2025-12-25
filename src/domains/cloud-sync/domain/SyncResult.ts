export interface SyncResult {
    success: boolean;
    timestamp: number;
    syncedCount?: number;
    error?: string;
}
