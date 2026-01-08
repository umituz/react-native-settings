# CloudSyncSetting

Component for displaying cloud synchronization status, last sync time, and sync controls.

## Features

- **Status Display**: Shows current sync status (synced, syncing, error)
- **Last Sync**: Shows relative time of last synchronization
- **Manual Sync**: Trigger manual synchronization
- **Progress**: Display sync progress
- **Error Handling**: Show error messages and retry options
- **Customizable**: Custom messages and styles

## Installation

This component is part of `@umituz/react-native-settings`.

## Usage

### Basic Usage

```tsx
import { CloudSyncSetting } from '@umituz/react-native-settings';

function SettingsScreen() {
  return (
    <CloudSyncSetting
      status="synced"
      lastSync={new Date()}
      onSyncPress={() => console.log('Sync pressed')}
    />
  );
}
```

### With Custom Status

```tsx
function CloudSyncStatus() {
  const [status, setStatus] = useState('syncing');

  return (
    <CloudSyncSetting
      status={status}
      lastSync={new Date()}
      onSyncPress={() => {
        setStatus('syncing');
        // Perform sync
        setTimeout(() => setStatus('synced'), 2000);
      }}
    />
  );
}
```

### With Error State

```tsx
function CloudSyncWithError() {
  const [syncState, setSyncState] = useState({
    status: 'error',
    error: 'Network connection failed',
    lastSync: new Date(Date.now() - 3600000),
  });

  return (
    <CloudSyncSetting
      status={syncState.status}
      lastSync={syncState.lastSync}
      error={syncState.error}
      onSyncPress={() => retrySync()}
      onRetryPress={() => retrySync()}
    />
  );
}
```

## Props

### CloudSyncSettingProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `'synced' \| 'syncing' \| 'error'` | **Required** | Current sync status |
| `lastSync` | `Date` | **Required** | Last sync timestamp |
| `onSyncPress` | `() => void` | `undefined` | Manual sync handler |
| `error` | `string` | `undefined` | Error message |
| `onRetryPress` | `() => void` | `undefined` | Retry handler |
| `syncMessage` | `string` | `undefined` | Custom sync message |
| `showProgress` | `boolean` | `true` | Show progress indicator |
| `title` | `string` | `'Cloud Sync'` | Custom title |
| `description` | `string` | `undefined` | Custom description |
| `style` | `ViewStyle` | `undefined` | Custom container style |

## Component Structure

```
CloudSyncSetting
├── Icon (cloud icon with status indicator)
├── Content
│   ├── Title
│   ├── Status Message
│   └── Last Sync Time
└── Right Element
    ├── Sync Button (if syncing or manual sync)
    └── Retry Button (if error)
```

## Examples

### Synced State

```tsx
<CloudSyncSetting
  status="synced"
  lastSync={new Date()}
  title="Cloud Sync"
  description="All data is up to date"
/>
```

Shows:
```
☁️ Cloud Sync
   Synced
   Last synced: Just now
```

### Syncing State

```tsx
<CloudSyncSetting
  status="syncing"
  lastSync={new Date(Date.now() - 3600000)}
  showProgress={true}
/>
```

Shows:
```
☁️ Cloud Sync
   Syncing...
   Last synced: 1 hour ago
   [⏳ Syncing...]
```

### Error State

```tsx
<CloudSyncSetting
  status="error"
  lastSync={new Date(Date.now() - 7200000)}
  error="Connection failed"
  onRetryPress={() => retry()}
/>
```

Shows:
```
☁️ Cloud Sync
   ❌ Connection failed
   Last synced: 2 hours ago
   [Retry]
```

### With Custom Messages

```tsx
<CloudSyncSetting
  status="synced"
  lastSync={new Date()}
  title="Backup"
  description="Last backup completed successfully"
  syncMessage="All files backed up"
/>
```

### Manual Sync Button

```tsx
function ManualSync() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(new Date());

  const handleSync = useCallback(async () => {
    setIsSyncing(true);
    try {
      await performSync();
      setLastSync(new Date());
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  return (
    <CloudSyncSetting
      status={isSyncing ? 'syncing' : 'synced'}
      lastSync={lastSync}
      onSyncPress={handleSync}
      showProgress={isSyncing}
    />
  );
}
```

### With Auto Sync

```tsx
function AutoSync() {
  const [status, setStatus] = useState('synced');
  const [lastSync, setLastSync] = useState(new Date());

  useEffect(() => {
    // Auto sync every 5 minutes
    const interval = setInterval(async () => {
      setStatus('syncing');
      try {
        await performSync();
        setStatus('synced');
        setLastSync(new Date());
      } catch (error) {
        setStatus('error');
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <CloudSyncSetting
      status={status}
      lastSync={lastSync}
      onSyncPress={() => performSync()}
    />
  );
}
```

### With Detailed Status

```tsx
function DetailedSyncStatus() {
  const syncInfo = {
    status: 'synced',
    lastSync: new Date(),
    itemsSynced: 152,
    totalItems: 152,
    conflictsResolved: 0,
  };

  return (
    <CloudSyncSetting
      status={syncInfo.status}
      lastSync={syncInfo.lastSync}
      description={`${syncInfo.itemsSynced} items synced`}
      syncMessage="No conflicts"
    />
  );
}
```

## Status Types

### Synced

Indicates successful synchronization.

```tsx
<CloudSyncSetting
  status="synced"
  lastSync={new Date()}
/>
```

Visual:
- Green checkmark
- "Synced" message
- Last sync time

### Syncing

Indicates active synchronization.

```tsx
<CloudSyncSetting
  status="syncing"
  lastSync={new Date()}
  showProgress={true}
/>
```

Visual:
- Spinning indicator
- "Syncing..." message
- Last sync time
- Progress bar (optional)

### Error

Indicates synchronization failed.

```tsx
<CloudSyncSetting
  status="error"
  lastSync={new Date()}
  error="Network error"
  onRetryPress={() => retry()}
/>
```

Visual:
- Red error icon
- Error message
- Last sync time
- Retry button

## Time Formatting

### Relative Time Display

The component uses relative time formatting:

```typescript
// Examples:
"Just now"
"1 minute ago"
"5 minutes ago"
"1 hour ago"
"2 hours ago"
"1 day ago"
"1 week ago"
"1 month ago"
```

### Custom Time Format

```tsx
function CustomTimeFormat() {
  const formatTime = (date: Date) => {
    return format(date, 'MMM d, yyyy h:mm a');
  };

  return (
    <CloudSyncSetting
      status="synced"
      lastSync={new Date()}
      description={`Last sync: ${formatTime(new Date())}`}
    />
  );
}
```

## Styling

### Status Colors

```tsx
// Synced - Green
<CloudSyncSetting
  status="synced"
  lastSync={new Date()}
/>

// Syncing - Blue
<CloudSyncSetting
  status="syncing"
  lastSync={new Date()}
/>

// Error - Red
<CloudSyncSetting
  status="error"
  lastSync={new Date()}
  error="Sync failed"
/>
```

### Custom Styles

```tsx
<CloudSyncSetting
  status="synced"
  lastSync={new Date()}
  style={{
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
  }}
/>
```

### Icon Customization

The component automatically selects icons based on status:

```typescript
const icons = {
  synced: 'cloud-checkmark-outline',      // Green
  syncing: 'cloud-sync-outline',           // Blue, animated
  error: 'cloud-offline-outline',          // Red
};
```

## Error Handling

### Display Error Message

```tsx
<CloudSyncSetting
  status="error"
  lastSync={new Date()}
  error="Failed to connect to server. Check your internet connection."
/>
```

### Retry Action

```tsx
<CloudSyncSetting
  status="error"
  lastSync={new Date()}
  error="Sync failed"
  onRetryPress={async () => {
    try {
      await retrySync();
    } catch (error) {
      console.error('Retry failed:', error);
    }
  }}
/>
```

### Error Recovery

```tsx
function ErrorRecovery() {
  const [state, setState] = useState({
    status: 'error',
    error: 'Connection failed',
    lastSync: new Date(),
  });

  const handleRetry = useCallback(async () => {
    setState(prev => ({ ...prev, status: 'syncing' }));

    try {
      await performSync();
      setState({
        status: 'synced',
        error: undefined,
        lastSync: new Date(),
      });
    } catch (error) {
      setState({
        status: 'error',
        error: error.message,
        lastSync: state.lastSync,
      });
    }
  }, [state.lastSync]);

  return (
    <CloudSyncSetting
      status={state.status}
      lastSync={state.lastSync}
      error={state.error}
      onRetryPress={handleRetry}
    />
  );
}
```

## Best Practices

1. **Clear Status**: Always show current sync status
2. **Relative Time**: Use relative time for last sync
3. **Error Messages**: Provide clear, actionable error messages
4. **Retry Option**: Always provide retry on error
5. **Manual Sync**: Allow manual sync trigger
6. **Progress**: Show progress during sync
7. **Feedback**: Provide immediate feedback

## Related

- **Cloud Sync Domain**: Cloud sync domain documentation
- **Settings Screen**: Main settings screen
- **SettingsItemCard**: Settings item component

## License

MIT
