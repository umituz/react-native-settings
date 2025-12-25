import firestore from '@react-native-firebase/firestore';
import { ISyncAdapter } from '../domain/ISyncAdapter';
import { SyncResult } from '../domain/SyncResult';

export class FirestoreSyncAdapter implements ISyncAdapter {
    private collectionName: string;
    private userId: string;

    constructor(collectionName: string, userId: string) {
        this.collectionName = collectionName;
        this.userId = userId;
    }

    isEnabled(): boolean {
        return !!this.userId;
    }

    async sync(data: Record<string, unknown>): Promise<SyncResult> {
        if (!this.isEnabled()) {
            throw new Error('Sync adapter is not enabled (missing userId)');
        }

        try {
            await firestore()
                .collection(this.collectionName)
                .doc(this.userId)
                .set(
                    {
                        ...data,
                        updatedAt: firestore.FieldValue.serverTimestamp(),
                    },
                    { merge: true }
                );

            return {
                success: true,
                timestamp: Date.now(),
                syncedCount: Object.keys(data).length,
            };
        } catch (error) {
            return {
                success: false,
                timestamp: Date.now(),
                error: error instanceof Error ? error.message : 'Unknown sync error',
            };
        }
    }

    async pull(): Promise<Record<string, unknown> | null> {
        if (!this.isEnabled()) {
            return null;
        }

        try {
            const doc = await firestore()
                .collection(this.collectionName)
                .doc(this.userId)
                .get();

            if (doc.exists) {
                return doc.data() as Record<string, unknown>;
            }
            return null;
        } catch {
            return null;
        }
    }
}
