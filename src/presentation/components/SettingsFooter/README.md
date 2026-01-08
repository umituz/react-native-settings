# Settings Footer

## Purpose

Footer component for displaying app version, build information, and additional metadata at the bottom of the settings screen.

## File Paths

- **Component**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/components/SettingsFooter/SettingsFooter.tsx`

## Strategy

1. **Version Information**: Displays app version and build number for user support and debugging
2. **Environment Indication**: Shows environment label (Development/Staging/Production) in non-production builds
3. **Custom Text**: Supports custom footer text for copyright, credits, or additional information
4. **Consistent Styling**: Uses design system tokens for uniform appearance across the app
5. **Optional Display**: Can be shown/hidden based on configuration

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT display build numbers in production (show version only)
- ❌ DO NOT use footer for critical information or actions
- ❌ DO NOT hardcode version strings (retrieve from app config)

### NEVER
- ❌ NEVER expose sensitive information in footer text
- ❌ NEVER use footer for error messages or warnings
- ❌ NEVER make footer interactive or tappable (unless intentional)

### AVOID
- ❌ AVOID displaying environment badges in production builds
- ❌ AVOID overly long custom text that breaks layout
- ❌ AVOID changing footer content dynamically (keep it stable)

## Rules (Mandatory)

### ALWAYS
- ✅ ALWAYS display app version in production builds
- ✅ ALWAYS use design system tokens for styling
- ✅ ALWAYS retrieve version from app config or constants
- ✅ SHOULD show build info in development builds only

### MUST
- ✅ MUST keep footer text brief and readable
- ✅ MUST ensure footer is properly positioned at bottom of scrollable content
- ✅ MUST use proper text accessibility labels

### SHOULD
- ✅ SHOULD include copyright or company information in custom text
- ✅ SHOULD display environment badge in non-production builds
- ✅ SHOULD keep custom text under 100 characters

## AI Agent Guidelines

1. **File Reference**: When modifying footer, refer to `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/components/SettingsFooter/SettingsFooter.tsx`
2. **Version Source**: Always retrieve version info from Constants.expoConfig or app.json
3. **Environment Detection**: Use `__DEV__` or environment variables to show/hide development information
4. **Layout Integration**: Place footer at the bottom of ScrollView or as ListFooterComponent in FlatList
5. **Accessibility**: Ensure footer text is readable and has proper contrast

## Component Reference

Related components:
- **SettingsContent**: Main content component that includes footer
- **SettingsScreen**: Screen component that manages footer display
- **SettingsSection**: Section component (footer appears after all sections)
