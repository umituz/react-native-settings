# Presentation Hooks

## Purpose

Custom React hooks for managing settings state, queries, and mutations in the presentation layer with TanStack Query integration.

## File Paths

- **Main Hook**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/hooks/useSettings.ts`
- **Queries**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/hooks/queries/useSettingsQuery.ts`
- **Mutations**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/hooks/mutations/useSettingsMutations.ts`

## Strategy

1. **TanStack Query Integration**: Leverages TanStack Query for caching, background updates, and error handling
2. **Simplified API**: Provides simple, high-level API for common settings operations
3. **Automatic Refetching**: Automatically refetches settings when data changes
4. **Optimistic Updates**: Supports optimistic updates for better UX
5. **Error Handling**: Built-in error management and loading states

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT use these hooks without proper TanStack Query provider setup
- ❌ DO NOT call updateSettings with partial objects (must merge properly)
- ❌ DO NOT use mutations outside of component context

### NEVER
- ❌ NEVER use hooks outside React components or custom hooks
- ❌ NEVER mutate settings state directly (use updateSettings)
- ❌ NEVER ignore error states from hooks

### AVOID
- ❌ AVOID calling updateSettings in rapid succession (debounce if needed)
- ❌ AVOID resetting settings without user confirmation
- ❌ AVOID using raw query hooks (use useSettings instead)

## Rules (Mandatory)

### ALWAYS
- ✅ ALWAYS handle loading and error states
- ✅ ALWAYS wrap settings provider at app root
- ✅ MUST use updateSettings for changes (not direct mutation)
- ✅ MUST confirm before resetting settings

### MUST
- ✅ MUST provide user ID to useSettings hook
- ✅ MUST handle network errors gracefully
- ✅ MUST show loading states during initial fetch

### SHOULD
- ✅ SHOULD use optimistic updates for immediate UI feedback
- ✅ SHOULD show success/error messages after updates
- ✅ SHOULD debounce rapid settings changes

## AI Agent Guidelines

1. **File Reference**: When modifying hooks, refer to `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/hooks/`
2. **Provider Setup**: Always wrap app with SettingsProvider at root level
3. **Query Client**: Ensure TanStack QueryClient is properly configured
4. **Error Handling**: Always handle error states in UI
5. **Performance**: Hooks are already optimized with useMemo and useCallback

## Hook Reference

### useSettings

**Purpose**: Main hook for accessing and managing user settings

**Parameters**:
- `userId`: User identifier string

**Returns**:
- `settings`: Current user settings object
- `loading`: Boolean loading state
- `error`: Error message or null
- `updateSettings`: Function to update settings
- `resetSettings`: Function to reset to defaults

**Usage**: Primary hook for most settings operations

### useSettingsQuery

**Purpose**: TanStack Query integration for fetching settings

**Parameters**:
- `userId`: User identifier string

**Returns**: TanStack Query result object

**Usage**: Use when you need direct query access

### useUpdateSettingsMutation

**Purpose**: Mutation hook for updating settings

**Parameters**:
- `userId`: User identifier string

**Returns**: TanStack Query mutation object

**Usage**: Use for update operations with mutation callbacks

### useResetSettingsMutation

**Purpose**: Mutation hook for resetting settings

**Parameters**:
- `userId`: User identifier string

**Returns**: TanStack Query mutation object

**Usage**: Use for reset operations with confirmation

## Related Components

- **Application Layer**: Repository interfaces and types
- **Infrastructure**: Storage implementation
- **Presentation Components**: UI components that use these hooks
