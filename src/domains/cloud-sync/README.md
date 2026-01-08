# Cloud Sync Domain

## Purpose

Provides components for displaying and managing cloud synchronization status with relative time display and manual sync triggering.

## File Paths

**Components:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/cloud-sync/presentation/components/CloudSyncSetting.tsx`

**Tests:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/cloud-sync/presentation/components/__tests__/CloudSyncSetting.test.tsx`

**Index:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/cloud-sync/index.ts`

## Strategy

1. **Relative Time Display**: Automatically format lastSynced timestamp into relative time strings (5m ago, 2h ago, etc.)
2. **Sync State Management**: Display current sync status clearly with visual indicators
3. **Manual Trigger**: Allow users to manually trigger sync with proper state management
4. **Error Handling**: Display sync errors prominently with user-friendly messages
5. **Prevent Duplicates**: Disable sync button while syncing is in progress

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT trigger sync while already syncing (check isSyncing prop)
- ❌ DO NOT bypass the relative time formatting for lastSynced
- ❌ DO NOT use CloudSyncSetting without handling onPress callback
- ❌ DO NOT mix sync logic directly with UI components

### NEVER
- ❌ NEVER allow sync trigger when isSyncing is true
- ❌ NEVER show sync status without proper error handling
- ❌ NEVER use custom time formatting when relative time is provided
- ❌ NEVER create custom sync components when CloudSyncSetting exists

### AVOID
- ❌ AVOID hardcoding sync status messages - use description prop or relative time
- ❌ AVOID creating custom sync UI when CloudSyncSetting can be configured
- ❌ AVOID mixing sync logic with business logic
- ❌ AVOID triggering sync without proper state management

## Rules

### ALWAYS
- ✅ ALWAYS provide onPress handler for manual sync triggering
- ✅ ALWAYS check isSyncing before allowing sync operations
- ✅ ALWAYS handle sync errors gracefully with user feedback
- ✅ ALWAYS provide lastSynced timestamp for relative time display
- ✅ ALWAYS disable interaction when sync is in progress

### MUST
- ✅ MUST use isSyncing prop to prevent duplicate sync operations
- ✅ MUST provide lastSynced Date object for automatic relative time formatting
- ✅ MUST handle sync errors and display them to users
- ✅ MUST update lastSynced timestamp after successful sync
- ✅ MUST disable CloudSyncSetting while syncing (disabled or isSyncing prop)

### SHOULD
- ✅ SHOULD show clear sync status to users
- ✅ SHOULD implement automatic sync intervals
- ✅ SHOULD handle sync conflicts gracefully
- ✅ SHOULD use background sync for better UX
- ✅ SHOULD show progress indicators for large syncs

## AI Agent Guidelines

1. **Component Usage**: Always use CloudSyncSetting for sync status display - never create custom sync components
2. **State Management**: Always use isSyncing prop to prevent duplicate sync operations
3. **Time Display**: Always use lastSynced Date object for automatic relative time formatting
4. **Error Handling**: Always handle sync errors gracefully with user-friendly error messages
5. **Prevention**: Always disable sync button while syncing is in progress

## Related

- **Settings**: Main settings management
- **Storage**: Data persistence layer
- **Dev**: Development utilities including storage clearing

## License

MIT
