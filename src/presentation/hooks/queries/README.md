# Settings Queries

Custom TanStack Query hooks for fetching user settings in the settings system.

## Purpose

Provides React hooks for querying (fetching) user settings with automatic caching, background updates, and loading states. These hooks wrap TanStack Query's useQuery hook with settings-specific functionality.

## File Paths

```
src/presentation/hooks/queries/
├── useSettingsQuery.ts           # Fetch user settings
└── useSettingsSuspenseQuery.ts   # Suspense version
```

## Strategy

1. **Automatic Caching**: Cache query results to reduce network requests
2. **Background Refetch**: Refresh data in background when it becomes stale
3. **Loading States**: Provide built-in loading and error indicators
4. **Conditional Queries**: Enable/disable queries based on conditions
5. **Type Safety**: Strongly typed query results and parameters

## Restrictions

### DO NOT

- ❌ DO NOT use queries for mutations/updates; use mutations instead
- ❌ DO NOT call queries outside React components or custom hooks
- ❌ DO NOT ignore loading and error states
- ❌ DO NOT use queries for one-time operations; use direct function calls
- ❌ DO NOT fire queries without proper error boundaries

### NEVER

- ❌ NEVER assume query data is always available; check for undefined
- ❌ NEVER use the same query key for different data
- ❌ EVER fire queries in render without proper dependencies
- ❌ EVER use queries for non-idempotent operations

### AVOID

- ❌ AVOID over-fetching data; request only what's needed
- ❌ AVOID very short stale times that cause excessive refetching
- ❌ AVOID firing queries that won't be used (use enabled option)
- ❌ AVOID ignoring query performance metrics

## Rules

### ALWAYS

- ✅ ALWAYS handle loading and error states
- ✅ ALWAYS provide meaningful query keys for cache management
- ✅ ALWAYS use appropriate staleTime and cacheTime values
- ✅ ALWAYS check if data exists before accessing it
- ✅ ALWAYS use enabled option for conditional queries

### MUST

- ✅ MUST wrap queries in React components or custom hooks
- ✅ MUST provide error boundaries for queries
- ✅ MUST handle undefined data states
- ✅ MUST use consistent query key patterns

### SHOULD

- ✅ SHOULD use suspense queries for cleaner code when possible
- ✅ SHOULD prefetch data for expected navigation
- ✅ SHOULD configure refetch behavior appropriately
- ✅ SHOULD use query selectors for derived data

## AI Agent Guidelines

1. **When creating queries**: Always define clear query key patterns and result types
2. **When setting cache times**: Balance freshness with performance
3. **When using conditional queries**: Use the enabled option with proper conditions
4. **When handling errors**: Provide user-friendly error messages and retry options
5. **When adding new queries**: Follow existing query patterns for consistency

## Queries Reference

### useSettingsQuery

Hook for fetching user settings with caching and automatic refetching.

**Location**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/hooks/queries/useSettingsQuery.ts`

**Parameters**: `userId: string, options?: UseQueryOptions`
**Returns**: `UseSettingsQueryResult` with data, isLoading, isError, error, isFetching, refetch

**Use Cases**:
- Loading user settings on component mount
- Displaying current settings
- Refreshing settings after updates

### useSettingsSuspenseQuery

Suspense version of settings query for React Suspense boundaries.

**Location**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/hooks/queries/useSettingsSuspenseQuery.ts`

**Parameters**: `userId: string, options?: UseQueryOptions`
**Returns**: `UseSettingsSuspenseQueryResult` with guaranteed data availability

**Use Cases**:
- Clean code with Suspense boundaries
- Simplified loading states
- Route-level data fetching

## Query Options

### staleTime

Time in milliseconds after which data is considered stale. Higher values reduce refetching but may show outdated data.

**Recommended**: 5-15 minutes for user settings

### cacheTime

Time in milliseconds that unused data remains in cache. Higher values use more memory but improve performance.

**Recommended**: 10-30 minutes for settings

### refetchOnWindowFocus

Refetch query when window regains focus. Useful for keeping data fresh but may cause unnecessary refetches.

**Recommended**: `false` for settings (rarely changes from external sources)

### refetchOnMount

Refetch query on component mount. Ensures fresh data but may delay initial render.

**Recommended**: `false` if data is cached and fresh

### refetchOnReconnect

Refetch query when network reconnects. Useful for offline scenarios.

**Recommended**: `true` for better offline support

### enabled

Conditionally enable/disable query execution.

**Use Cases**:
- Wait for userId to be available
- Check authentication status
- Implement feature flags

### onSuccess

Callback executed on successful query completion.

**Use Cases**:
- Analytics tracking
- Logging data fetches
- Triggering side effects

### onError

Callback executed on query error.

**Use Cases**:
- Error logging
- User notifications
- Fallback logic

### onSettled

Callback executed after query succeeds or fails.

**Use Cases**:
- Hide loading indicators
- Clean up resources
- Update UI state

## Query Keys

Consistent query key patterns for cache management:

**Single user settings**: `['settings', userId]`
**All settings (admin)**: `['settings']`
**Settings with filters**: `['settings', userId, { type: 'appearance' }]`

## Best Practices

1. **Error Handling**: Always handle loading and error states
2. **Cache Strategy**: Configure staleTime and cacheTime appropriately
3. **Refetch Control**: Disable automatic refetch when not needed
4. **Query Keys**: Use consistent query keys for cache management
5. **Prefetching**: Prefetch data for smooth navigation
6. **Optimistic Updates**: Combine with mutations for instant feedback
7. **Suspense**: Use suspense queries for cleaner code when possible

## License

MIT
