import { SyncResult } from './SyncResult';

export interface ISyncAdapter {
    sync(data: Record<string, unknown>): Promise<SyncResult>;
    pull(): Promise<Record<string, unknown> | null>;
    isEnabled(): boolean;
}
