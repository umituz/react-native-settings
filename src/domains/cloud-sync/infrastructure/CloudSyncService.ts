import { ISyncAdapter } from '../domain/ISyncAdapter';
import { SyncResult } from '../domain/SyncResult';

export class CloudSyncService {
    private adapter: ISyncAdapter;
    private enabled: boolean;

    constructor(adapter: ISyncAdapter, enabled: boolean = false) {
        this.adapter = adapter;
        this.enabled = enabled;
    }

    async syncData(data: Record<string, unknown>): Promise<SyncResult> {
        if (!this.enabled) {
            return {
                success: false,
                timestamp: Date.now(),
                error: 'Cloud sync is disabled',
            };
        }

        return this.adapter.sync(data);
    }

    async pullData(): Promise<Record<string, unknown> | null> {
        if (!this.enabled) {
            return null;
        }

        return this.adapter.pull();
    }

    setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    isEnabled(): boolean {
        return this.enabled;
    }
}
