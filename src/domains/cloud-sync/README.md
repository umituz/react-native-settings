# Cloud Sync Domain

The Cloud Sync domain provides components for displaying and managing cloud synchronization status in your React Native app.

## Features

- **Sync Status Display**: Show current sync status with visual indicators
- **Last Synced Info**: Display relative time of last synchronization
- **Sync Progress**: Show syncing state during active synchronization
- **Interactive Sync**: Allow users to trigger manual sync
- **Customizable Messages**: Custom sync status descriptions

## Installation

This domain is part of `@umituz/react-native-settings`. Install the package to use it:

```bash
npm install @umituz/react-native-settings
```

## Components

### CloudSyncSetting

Display cloud sync status and allow triggering manual sync.

```tsx
import { CloudSyncSetting } from '@umituz/react-native-settings';

function MySettings() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState(new Date());

  const handleSync = async () => {
    setIsSyncing(true);
    await performSync();
    setIsSyncing(false);
    setLastSynced(new Date());
  };

  return (
    <CloudSyncSetting
      isSyncing={isSyncing}
      lastSynced={lastSynced}
      onPress={handleSync}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'cloud_sync'` | Setting title |
| `description` | `string` | `undefined` | Custom status description |
| `isSyncing` | `boolean` | `false` | Syncing state |
| `lastSynced` | `Date \| null` | `undefined` | Last sync timestamp |
| `onPress` | `() => void` | `undefined` | Press handler |
| `disabled` | `boolean` | `false` | Disable interaction |

#### Relative Time Display

The component automatically formats the `lastSynced` timestamp into relative time:
- `"last_synced_just_now"` - Less than 1 minute ago
- `"last_synced_5m_ago"` - 5 minutes ago
- `"last_synced_2h_ago"` - 2 hours ago
- `"last_synced_3d_ago"` - 3 days ago

You can use these as translation keys or provide your own `description` prop.

## Examples

### Basic Cloud Sync

```tsx
import { CloudSyncSetting } from '@umituz/react-native-settings';
import { useState } from 'react';

function BasicCloudSync() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await syncData();
      setLastSynced(new Date());
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <CloudSyncSetting
      isSyncing={isSyncing}
      lastSynced={lastSynced}
      onPress={handleSync}
    />
  );
}
```

### With Custom Description

```tsx
function CloudSyncWithDescription() {
  const syncStatus = 'Synced 5 minutes ago';

  return (
    <CloudSyncSetting
      title="iCloud Sync"
      description={syncStatus}
      onPress={() => console.log('Sync pressed')}
    />
  );
}
```

### Disabled State

```tsx
function DisabledCloudSync() {
  return (
    <CloudSyncSetting
      title="Cloud Sync"
      description="Sync disabled"
      disabled={true}
    />
  );
}
```

### With Translations

```tsx
import { useTranslation } from 'react-i18next';
import { CloudSyncSetting } from '@umituz/react-native-settings';

function LocalizedCloudSync() {
  const { t } = useTranslation();
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);

  // Get translation key based on state
  const getDescription = () => {
    if (isSyncing) return t('sync.syncing');
    if (!lastSynced) return t('sync.never');
    // Calculate relative time and return appropriate translation key
    const timeAgo = calculateTimeAgo(lastSynced);
    return t(`sync.${timeAgo}`);
  };

  return (
    <CloudSyncSetting
      title={t('sync.title')}
      description={getDescription()}
      isSyncing={isSyncing}
      lastSynced={lastSynced}
      onPress={handleSync}
    />
  );
}
```

### Complete Integration

```tsx
import { CloudSyncSetting } from '@umituz/react-native-settings';
import { SettingsSection } from '@umituz/react-native-settings';

function CloudSyncSettings() {
  const [syncState, setSyncState] = useState({
    isSyncing: false,
    lastSynced: null as Date | null,
    error: null as string | null,
  });

  const handleSync = async () => {
    setSyncState(prev => ({ ...prev, isSyncing: true, error: null }));

    try {
      await cloudSyncService.sync();
      setSyncState({
        isSyncing: false,
        lastSynced: new Date(),
        error: null,
      });
    } catch (error) {
      setSyncState(prev => ({
        ...prev,
        isSyncing: false,
        error: error.message,
      }));
    }
  };

  return (
    <SettingsSection title="Sync">
      <CloudSyncSetting
        title="Cloud Backup"
        isSyncing={syncState.isSyncing}
        lastSynced={syncState.lastSynced}
        description={syncState.error || undefined}
        onPress={handleSync}
        disabled={syncState.isSyncing}
      />
    </SettingsSection>
  );
}
```

### With Auto-Sync

```tsx
import { useEffect, useState } from 'react';
import { CloudSyncSetting } from '@umituz/react-native-settings';

function AutoSyncCloudSync() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const [autoSync, setAutoSync] = useState(true);

  // Auto-sync every 5 minutes
  useEffect(() => {
    if (!autoSync) return;

    const interval = setInterval(async () => {
      await performSync();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [autoSync]);

  const performSync = async () => {
    setIsSyncing(true);
    try {
      await syncData();
      setLastSynced(new Date());
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <SettingsSection title="Sync Settings">
      <SettingsItemCard
        title="Auto-Sync"
        value={autoSync ? 'Enabled' : 'Disabled'}
        onPress={() => setAutoSync(!autoSync)}
      />
      <CloudSyncSetting
        isSyncing={isSyncing}
        lastSynced={lastSynced}
        onPress={performSync}
      />
    </SettingsSection>
  );
}
```

### Real-Time Sync Status

```tsx
import { useState, useEffect } from 'react';
import { CloudSyncSetting } from '@umituz/react-native-settings';

function RealTimeCloudSync() {
  const [syncStatus, setSyncStatus] = useState({
    isSyncing: false,
    lastSynced: null as Date | null,
    syncCount: 0,
  });

  useEffect(() => {
    // Subscribe to sync events
    const unsubscribe = cloudSyncService.onSyncChange((status) => {
      setSyncStatus(status);
    });

    return unsubscribe;
  }, []);

  return (
    <CloudSyncSetting
      title="Real-time Sync"
      isSyncing={syncStatus.isSyncing}
      lastSynced={syncStatus.lastSynced}
      onPress={() => cloudSyncService.triggerSync()}
    />
  );
}
```

## Architecture

```
src/domains/cloud-sync/
├── presentation/
│   └── components/
│       ├── CloudSyncSetting.tsx    # Main sync setting component
│       └── __tests__/
│           └── CloudSyncSetting.test.tsx
└── index.ts                        # Public API exports
```

## Best Practices

1. **Clear Status**: Always show current sync status clearly
2. **Error Handling**: Display sync errors prominently
3. **Manual Trigger**: Allow users to manually trigger sync
4. **Prevent Duplicate Syncs**: Disable sync button while syncing
5. **Auto-Sync**: Implement automatic sync intervals
6. **Conflict Resolution**: Handle sync conflicts gracefully
7. **Background Sync**: Use background sync for better UX
8. **Progress Indicators**: Show progress for large syncs

## Testing

```tsx
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { CloudSyncSetting } from '@umituz/react-native-settings';

describe('CloudSyncSetting', () => {
  it('displays syncing state', () => {
    const { getByText } = render(
      <CloudSyncSetting
        isSyncing={true}
        onPress={() => {}}
      />
    );

    expect(getByText(/syncing/i)).toBeTruthy();
  });

  it('displays last synced time', () => {
    const lastSynced = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago
    const { getByText } = render(
      <CloudSyncSetting
        lastSynced={lastSynced}
        onPress={() => {}}
      />
    );

    expect(getByText(/5m_ago/i)).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockPress = jest.fn();
    const { getByTestId } = render(
      <CloudSyncSetting
        onPress={mockPress}
      />
    );

    fireEvent.press(getByTestId('settings-item-card'));
    expect(mockPress).toHaveBeenCalled();
  });

  it('does not respond to press when syncing', () => {
    const mockPress = jest.fn();
    const { getByTestId } = render(
      <CloudSyncSetting
        isSyncing={true}
        onPress={mockPress}
      />
    );

    fireEvent.press(getByTestId('settings-item-card'));
    expect(mockPress).not.toHaveBeenCalled();
  });

  it('shows custom description when provided', () => {
    const { getByText } = render(
      <CloudSyncSetting
        description="Custom sync message"
        onPress={() => {}}
      />
    );

    expect(getByText('Custom sync message')).toBeTruthy();
  });
});
```

## Integration Examples

### With Cloud Services

```tsx
// iCloud sync (iOS)
import CloudSyncSetting from '@umituz/react-native-settings';

function iCloudSync() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);

  const syncWithiCloud = async () => {
    setIsSyncing(true);
    try {
      await CKContainer.defaultContainer().sync();
      setLastSynced(new Date());
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <CloudSyncSetting
      title="iCloud"
      isSyncing={isSyncing}
      lastSynced={lastSynced}
      onPress={syncWithiCloud}
    />
  );
}

// Firebase sync
function FirebaseSync() {
  const [isSyncing, setIsSyncing] = useState(false);

  const syncWithFirebase = async () => {
    setIsSyncing(true);
    try {
      await firebase.firestore().sync();
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <CloudSyncSetting
      title="Firebase"
      isSyncing={isSyncing}
      onPress={syncWithFirebase}
    />
  );
}
```

## Related

- **Settings**: Main settings management
- **Storage**: Data persistence layer
- **Dev**: Development utilities including storage clearing

## License

MIT
