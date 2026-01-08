# Settings Mutations

Custom TanStack Query mutations for updating user settings in the settings system.

## Purpose

Provides React hooks for mutating (updating) user settings with automatic loading states, error handling, and cache invalidation. These hooks wrap TanStack Query's useMutation hook with settings-specific functionality.

## File Paths

```
src/presentation/hooks/mutations/
├── useUpdateSettingsMutation.ts    # Update user settings
└── useResetSettingsMutation.ts     # Reset to defaults
```

## Strategy

1. **Optimistic Updates**: Update UI immediately before server confirmation for better UX
2. **Automatic Invalidation**: Invalidate related queries after mutations complete
3. **Error Rollback**: Rollback optimistic updates on error
4. **Loading States**: Provide built-in loading indicators
5. **Type Safety**: Strongly typed mutation variables and results

## Restrictions

### DO NOT

- ❌ DO NOT use mutations for fetching data; use queries instead
- ❌ DO NOT call mutations outside event handlers or callbacks
- ❌ DO NOT assume mutations will always succeed
- ❌ DO NOT forget to handle error states
- ❌ DO NOT use multiple mutations for the same data without coordination

### NEVER

- ❌ NEVER call mutate functions in render; use event handlers
- ❌ NEVER ignore the isLoading state during mutations
- ❌ NEVER fire mutations without proper user intent (e.g., in useEffect)
- ❌ EVER use mutations for data transformation; use the service layer

### AVOID

- ❌ AVOID firing mutations too frequently (debounce when needed)
- ❌ AVOID complex mutation logic in components; extract to custom hooks
- ❌ AVOID silent failures; always provide user feedback
- ❌ AVOID mutations that take too long without progress indication

## Rules

### ALWAYS

- ✅ ALWAYS handle loading states during mutations
- ✅ ALWAYS provide user feedback for success/error
- ✅ ALWAYS invalidate related queries after mutations
- ✅ ALWAYS implement rollback for optimistic updates
- ✅ ALWAYS use mutation variables to pass data

### MUST

- ✅ MUST wrap mutations in event handlers (onClick, onSubmit, etc.)
- ✅ MUST handle errors gracefully with user-friendly messages
- ✅ MUST confirm destructive operations (reset, delete)
- ✅ MUST check success status before accessing result data

### SHOULD

- ✅ SHOULD use optimistic updates for instant feedback
- ✅ SHOULD debounce rapid successive mutations
- ✅ SHOULD show progress indicators for long-running operations
- ✅ SHOULD provide retry functionality on failure

## AI Agent Guidelines

1. **When creating mutations**: Always define clear variable types and return types
2. **When using optimistic updates**: Always provide rollback logic in onError
3. **When invalidating queries**: Invalidate all affected queries after mutations
4. **When handling errors**: Provide actionable error messages to users
5. **When adding new mutations**: Follow the pattern of existing mutations for consistency

## Mutations Reference

### useUpdateSettingsMutation

Hook for updating user settings with partial updates support.

**Location**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/hooks/mutations/useUpdateSettingsMutation.ts`

**Variables**: `{ userId: string, settings: Partial<UserSettings> }`
**Returns**: `UpdateSettingsMutationResult` with mutate, isLoading, isError, error, data

**Use Cases**:
- Single setting updates (theme, language, etc.)
- Multiple setting updates in one operation
- Batch updates with user confirmation

### useResetSettingsMutation

Hook for resetting user settings to default values.

**Location**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/hooks/mutations/useResetSettingsMutation.ts`

**Variables**: `userId: string`
**Returns**: `ResetSettingsMutationResult` with mutate, isLoading, isError, error, data

**Use Cases**:
- Reset to defaults button
- User-initiated settings reset
- Troubleshooting settings issues

## Mutation Options

### onSuccess

Callback executed when mutation succeeds. Use for:
- User feedback (success messages)
- Navigation after successful mutation
- Triggering side effects

### onError

Callback executed when mutation fails. Use for:
- Error logging
- User error notifications
- Cleanup after failed operations

### onMutate

Callback executed before mutation. Use for:
- Optimistic updates
- Canceling ongoing queries
- Context snapshots for rollback

### onSettled

Callback executed after mutation succeeds or fails. Use for:
- Query invalidation
- Cleanup operations
- Resetting UI states

## Best Practices

1. **Confirm Destructive Actions**: Always confirm reset operations with user
2. **Optimistic Updates**: Use onMutate for immediate UI feedback
3. **Error Handling**: Always handle errors gracefully with user-friendly messages
4. **Loading States**: Show loading indicators during mutations
5. **Query Invalidation**: Invalidate queries after mutations to refresh data
6. **Rollback**: Implement rollback for failed optimistic updates
7. **Type Safety**: Use TypeScript for mutation variables and results

## License

MIT
