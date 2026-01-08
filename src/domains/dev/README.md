# Dev Domain

## Purpose

Provides development-only utilities and settings for debugging and testing with storage clearing, custom dev tools, and safe production builds.

## File Paths

**Components:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/dev/presentation/components/DevSettingsSection.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/dev/presentation/components/StorageClearSetting.tsx`

**Index:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/dev/index.ts`

## Strategy

1. **Development Mode Only**: Components only render in `__DEV__` mode - never in production
2. **Storage Management**: Provide safe storage clearing with confirmation dialogs
3. **Custom Tools**: Support adding custom dev tools through customDevComponents prop
4. **Confirmation Dialogs**: Prevent accidental data loss with proper confirmation flows
5. **Safe Production**: Ensure no dev code leaks into production builds

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT use DevSettingsSection in production builds (only renders in __DEV__)
- ❌ DO NOT bypass confirmation dialogs for storage clearing
- ❌ DO NOT use dev components without proper error handling
- ❌ DO NOT include sensitive data in custom dev tools

### NEVER
- ❌ NEVER use dev components in production - they only render in __DEV__ mode
- ❌ NEVER clear storage without user confirmation
- ❌ NEVER add production features to dev settings section
- ❌ NEVER store sensitive data (API keys, secrets) in dev tools

### AVOID
- ❌ AVOID creating custom dev sections when DevSettingsSection can be configured
- ❌ AVOID mixing dev tools with production settings
- ❌ AVOID using dev components without understanding they're __DEV__ only
- ❌ AVOID adding dev tools that could affect production data

## Rules

### ALWAYS
- ✅ ALWAYS verify components only render in __DEV__ mode
- ✅ ALWAYS show confirmation dialogs before clearing storage
- ✅ ALWAYS reload the app after clearing storage
- ✅ ALWAYS provide clear warnings before destructive actions
- ✅ ALWAYS use enabled prop to control dev section visibility

### MUST
- ✅ MUST provide onAfterClear callback for post-clear operations
- ✅ MUST confirm before clearing all data
- ✅ MUST reset all app state after clearing storage
- ✅ MUST ensure no dev code leaks to production
- ✅ MUST use safe defaults for dangerous features

### SHOULD
- ✅ SHOULD add relevant debugging tools for the app
- ✅ SHOULD provide clear warnings before destructive actions
- ✅ SHOULD reset app state and reload after clearing storage
- ✅ SHOULD use customDevComponents for app-specific dev tools
- ✅ SHOULD test that dev section doesn't appear in production

## AI Agent Guidelines

1. **Development Only**: Always remember these components only render in __DEV__ mode - never in production
2. **Confirmation**: Always require confirmation before storage clearing - never skip confirmation dialogs
3. **Custom Tools**: Use customDevComponents prop to add app-specific dev tools
4. **Post-Clear**: Always reload the app after clearing storage using onAfterClear callback
5. **Testing**: Always verify dev section doesn't appear in production builds

## Related

- **Settings**: Main settings management
- **Storage**: Data persistence and clearing
- **Cloud Sync**: Cloud synchronization utilities

## Important Notes

⚠️ **Development Only**: These components are designed for development use only and should never appear in production builds.

⚠️ **Data Loss**: The "Clear All Data" button will permanently delete all app data. Always use with confirmation dialogs.

⚠️ **No Localization**: Dev components use hardcoded English text since they don't need localization support.

## License

MIT
