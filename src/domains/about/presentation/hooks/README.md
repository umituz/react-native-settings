# useAboutInfo Hook

## Purpose

Custom hook for managing app information display in the About screen and components. Retrieves and formats app metadata including version, build number, developer information, and contact details for comprehensive about sections.

## File Paths

- **useAboutInfo**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/about/presentation/hooks/useAboutInfo.ts`
- **About Components**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/about/presentation/components/`
- **About Screen**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/about/presentation/screens/AboutScreen.tsx`

## Strategy

1. **Data Aggregation**: Centralizes app information from multiple sources including app config, custom props, and external repositories to provide a single, consistent interface for accessing app metadata.

2. **Performance Optimization**: Uses memoization (useMemo) to cache formatted strings and computed values, preventing unnecessary recalculations and re-renders.

3. **Flexible Configuration**: Supports both automatic data retrieval from Expo constants and manual injection of custom app info, making it suitable for various app configurations and testing scenarios.

4. **User-Friendly Formatting**: Provides pre-formatted strings for common display patterns (version strings, developer info) reducing boilerplate in components.

5. **Loading State Management**: Handles asynchronous data fetching with proper loading states, ensuring smooth user experience during data retrieval.

## Restrictions

### ❌ DO NOT

- Fetch app info on every render - use memoization
- Assume all app info fields are available - handle optional fields
- Mix data fetching logic with formatting logic
- Create multiple instances of the hook for the same data
- Hardcode app-specific values in the hook

### ❌ NEVER

- Mutate the returned appInfo object
- Use the hook outside of React components or custom hooks
- Store sensitive information (API keys, secrets) in app info
- Bypass loading states when data is being fetched
- Return undefined or null for required fields

### ❌ AVOID

- Making unnecessary network requests for static app info
- Complex formatting logic in components - use the hook's formatted values
- Storing large data objects in app info
- Frequent refetching of app metadata
- Overly complex validation logic in the hook

## Rules

### ✅ ALWAYS

- Use useMemo for expensive calculations and formatting
- Provide loading states when fetching data asynchronously
- Validate app info before displaying to users
- Handle missing or undefined optional fields gracefully
- Return consistent object structure regardless of data source

### ✅ MUST

- Return appInfo with all standard fields (name, version, buildNumber)
- Provide versionString in a user-friendly format
- Include developer information when available
- Handle errors gracefully with appropriate error states
- Cache results to prevent performance issues

### ✅ SHOULD

- Support custom app info injection for testing
- Format version strings to include build numbers in development
- Provide contact information (email, website) when available
- Include "More Apps" URL when applicable
- Use TypeScript interfaces for type safety
- Document all available app info fields

## AI Agent Guidelines

1. **Data Source Priority**: Use app config (expo-constants) as the primary data source. Fall back to custom props or static values only when app config is unavailable or for testing purposes.

2. **Formatting Standards**: Always use the provided formatted values (versionString, developerInfo) instead of manually formatting app info in components. This ensures consistency across the app.

3. **Loading States**: Display appropriate loading indicators while fetching app info. Show skeleton screens or spinners rather than partially loaded information.

4. **Error Handling**: Implement graceful error handling when app info fails to load. Provide fallback values or default information to ensure the about screen remains functional.

5. **Optional Fields**: Always check if optional fields (contactEmail, websiteUrl, moreAppsUrl) exist before displaying them. Use conditional rendering to avoid showing empty or null values.

## Reference

- **Hook Implementation**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/about/presentation/hooks/useAboutInfo.ts`
- **About Screen**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/about/presentation/screens/AboutScreen.tsx`
- **App Config**: Check `app.config.js` or `app.json` for app metadata
- **About Components**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/about/presentation/components/`
