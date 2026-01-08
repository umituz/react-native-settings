# ProfileSectionLoader

Dynamic loader component that fetches and displays user profile information in the settings screen header.

## Purpose

Provides a reusable component for displaying user profile information at the top of the settings screen. Handles loading states, error states, and supports both authenticated and anonymous user profiles with customizable display options.

## File Paths

- **Component**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/components/sections/ProfileSectionLoader/ProfileSectionLoader.tsx`
- **Use Profile Info Hook**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domain/profile/hooks/useAboutInfo.ts`

## Strategy

1. **Data Fetching**: Use useAboutInfo hook to dynamically fetch user profile information when userId is provided
2. **State Management**: Handle loading, error, and success states with appropriate UI feedback
3. **Profile Injection**: Support pre-loaded profile data via userProfile prop to bypass fetching
4. **Avatar Handling**: Display user avatars with fallback options for missing or failed loads
5. **Anonymous Support**: Clearly distinguish between authenticated and anonymous user profiles

## Restrictions

- ❌ DO NOT make API calls directly; always use useAboutInfo hook for data fetching
- ❌ DO NOT hardcode profile data; always use provided props or fetched data
- ❌ NEVER ignore error states; always provide error feedback
- ❌ AVOID bypassing loading states when data is being fetched
- ❌ DO NOT mix profile display logic with authentication logic
- ❌ NEVER assume profile data exists; always handle undefined/null cases
- ❌ AVOID adding authentication actions (sign in/out) within this component

## Rules

- ✅ MUST accept either userProfile or userId prop (not both)
- ✅ MUST display loading state when fetching profile data
- ✅ MUST display error state when fetch fails
- ✅ MUST support anonymous user profiles with distinct visual treatment
- ✅ MUST provide onPress handler for profile interaction
- ✅ SHOULD show avatar when available and showAvatar is true
- ✅ MUST handle missing avatarUrl gracefully
- ✅ SHOULD use custom loading/error components when provided

## AI Agent Guidelines

When working with ProfileSectionLoader:

1. **Data Source Priority**: Use userProfile prop when data is already available. Use userId prop only when fetching is needed. Never provide both props simultaneously.

2. **Loading States**: Always provide visual feedback during data fetching. Use skeleton loaders or spinner components for better UX.

3. **Error Handling**: Implement retry mechanisms for failed profile fetches. Provide clear error messages to users.

4. **Avatar Management**: Handle avatar loading failures. Implement fallback to initials or default avatar when image fails to load.

5. **Anonymous Users**: Clearly distinguish anonymous users from authenticated users. Use different visual treatments (badges, labels, etc.).

6. **Privacy Considerations**: For anonymous users, display minimal information. Do not expose sensitive profile details.

7. **Customization**: Use custom loading and error components to match app design system. Maintain consistent styling.

8. **Action Handling**: The onPress handler should navigate to account settings or profile edit screen. Do not handle authentication (sign in/out) within this component.

9. **Performance**: Profile data fetching should be efficient. Implement caching strategies to avoid unnecessary refetches.

10. **Accessibility**: Add proper accessibility labels for profile elements. Ensure screen readers can announce profile information correctly.

11. **Responsive Design**: Ensure profile section displays correctly on different screen sizes and orientations.

12. **Integration**: This component should be placed at the top of SettingsContent, before all other sections.

## Related Components

- **Settings Content**: Content component that uses ProfileSectionLoader
- **Settings Screen**: Main screen component
- **User Profile**: Profile type definition
- **Use About Info**: Hook for fetching profile information
