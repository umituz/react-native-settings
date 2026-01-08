# CloudSyncSetting Component

## Purpose

Component for displaying cloud synchronization status, last sync time, and sync controls. Provides users with clear visibility into their data sync state and manual control over synchronization processes.

## File Paths

- **CloudSyncSetting**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/cloud-sync/presentation/components/CloudSyncSetting.tsx`
- **Cloud Sync Components**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/cloud-sync/presentation/components/`
- **Cloud Sync Services**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/cloud-sync/services/`

## Strategy

1. **Clear Status Communication**: Uses visual indicators (colors, icons, animations) to instantly communicate sync status to users, reducing confusion about whether data is up to date.

2. **Relative Time Display**: Shows last sync time in relative format ("Just now", "5 minutes ago") which is more user-friendly and easier to understand than absolute timestamps.

3. **Manual Control**: Provides users with manual sync trigger buttons, giving them control over when synchronization occurs and peace of mind about data freshness.

4. **Error Recovery**: Displays clear error messages with retry buttons when sync fails, allowing users to quickly recover from temporary network issues without technical knowledge.

5. **Progress Feedback**: Shows progress indicators during active sync, keeping users informed about ongoing operations and preventing premature actions.

## Restrictions

### ❌ DO NOT

- Sync data unnecessarily or too frequently
- Hide sync status from users
- Display technical error messages directly
- Block UI during entire sync process
- Assume sync will always succeed

### ❌ NEVER

- Allow simultaneous sync operations
- Ignore or suppress sync errors
- Show incorrect sync status
- Start sync without user consent in manual mode
- Bypass network availability checks

### ❌ AVOID

- Excessive auto-sync frequency (minimum 5 minutes)
- Overly verbose sync status messages
- Confusing sync state transitions
- Silent background synces without user notification
- Blocking app startup on sync

## Rules

### ✅ ALWAYS

- Display current sync status clearly (synced/syncing/error)
- Show last sync time in user-friendly format
- Provide retry option when sync fails
- Use appropriate visual indicators for each status
- Show progress during active synchronization

### ✅ MUST

- Update status immediately when sync state changes
- Handle network errors gracefully
- Provide manual sync trigger (onSyncPress)
- Display actionable error messages
- Prevent duplicate sync operations

### ✅ SHOULD

- Implement auto-sync with reasonable intervals (5-15 min)
- Show sync statistics (items synced, conflicts)
- Use color coding for status (green=synced, blue=syncing, red=error)
- Allow users to disable auto-sync
- Sync on app foreground events
- Show sync success confirmation

## AI Agent Guidelines

1. **Status Management**: Always reflect the true sync state. Use "synced" when data is current, "syncing" during active sync operations, and "error" when the last sync attempt failed. Update status immediately on state changes.

2. **Time Formatting**: Display last sync time in relative format for better UX. Use "Just now" for syncs under 1 minute, "X minutes ago" for recent syncs, "X hours ago" for same day, and date/time for older syncs.

3. **Error Handling**: When sync fails, show user-friendly error messages that explain what went wrong and suggest solutions. Always provide a retry button for quick recovery. Log technical details for debugging while showing simplified messages to users.

4. **Manual Sync**: Provide manual sync button even when auto-sync is enabled. Users appreciate control and want to trigger syncs after making important changes. Disable the button during active sync to prevent duplicate operations.

5. **Auto-Sync Strategy**: Implement smart auto-sync that respects battery and network conditions. Sync on app foreground if more than 5 minutes have passed. Consider user activity - sync more frequently when actively using the app, less frequently when idle.

## Reference

- **Component Implementation**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/cloud-sync/presentation/components/CloudSyncSetting.tsx`
- **Cloud Sync Services**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/cloud-sync/services/`
- **Cloud Sync Components**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/cloud-sync/presentation/components/`
- **Sync Hooks**: Check for cloud sync related hooks for state management
