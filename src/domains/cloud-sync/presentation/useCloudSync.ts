import { useState, useCallback } from 'react';
import { CloudSyncService } from '../infrastructure/CloudSyncService';
import { SyncResult } from '../domain/SyncResult';

export const useCloudSync = (service: CloudSyncService) => {
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSyncResult, setLastSyncResult] = useState<SyncResult | null>(null);

    const sync = useCallback(async (data: Record<string, unknown>) => {
        setIsSyncing(true);
        try {
            const result = await service.syncData(data);
            setLastSyncResult(result);
            return result;
        } finally {
            setIsSyncing(false);
        }
    }, [service]);

    const pull = useCallback(async () => {
        setIsSyncing(true);
        try {
            return await service.pullData();
        } finally {
            setIsSyncing(false);
        }
    }, [service]);

    return {
        sync,
        pull,
        isSyncing,
        lastSyncResult,
        isEnabled: service.isEnabled(),
    };
};
