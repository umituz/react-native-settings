# Core Settings Components

## Purpose

Reusable core components for building settings screens in React Native apps. These components provide a consistent, modern UI for settings interfaces with support for various interaction patterns including navigation, toggles, and display-only items.

## File Paths

- **SettingsItemCard**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/components/SettingsItemCard.tsx`
- **SettingsSection**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/components/SettingsSection.tsx`
- **SettingsFooter**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/components/SettingsFooter.tsx`
- **SettingsErrorBoundary**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/components/SettingsErrorBoundary.tsx`

## Strategy

1. **Design System Integration**: All components use design system tokens for consistent styling, automatic theme adaptation (light/dark), and cohesive visual language across the application.

2. **Flexible Component Architecture**: Components are designed to be composable and flexible, supporting various use cases from simple navigation items to complex toggle switches with custom styling.

3. **Accessibility First**: All components include proper accessibility labels, hints, and touch targets to ensure the settings interface is usable by all users, including those using assistive technologies.

4. **Error Resilience**: The SettingsErrorBoundary component wraps settings screens to gracefully handle errors, preventing crashes and providing users with clear error messages and recovery options.

5. **Type Safety**: Comprehensive TypeScript types and interfaces ensure type safety throughout the component hierarchy, reducing runtime errors and improving developer experience.

## Restrictions

### ❌ DO NOT

- Mix presentation logic with business logic in components
- Hardcode color values or spacing - always use design system tokens
- Bypass the SettingsErrorBoundary for any settings screen
- Override component styles without proper theme consideration
- Use inline styles that break theme consistency

### ❌ NEVER

- Import components directly from subdirectories - use the main package export
- Modify the internal state of SettingsItemCard from parent components
- Disable accessibility features or skip accessibility labels
- Use these components outside of a settings context without proper adaptation
- Create circular dependencies between settings components

### ❌ AVOID

- Excessive nesting of SettingsSection components
- Using SettingsItemCard for non-settings UI elements
- Overriding default behaviors without understanding implications
- Creating multiple instances of SettingsErrorBoundary for the same screen
- Mixing different icon systems or design patterns

## Rules

### ✅ ALWAYS

- Wrap all settings screens in SettingsErrorBoundary
- Use SettingsSection to group related settings items
- Provide clear, descriptive titles and descriptions for all settings
- Use the showSwitch prop for binary (on/off) settings
- Include proper accessibility labels for all interactive elements
- Respect the user's theme preference (light/dark/auto)

### ✅ MUST

- Import components from `@umituz/react-native-settings` package
- Provide required props (title, icon) for SettingsItemCard
- Handle onPress events for navigation items
- Display version information using SettingsFooter
- Ensure all interactive elements have proper hit areas (minimum 44x44)
- Test components in both light and dark themes

### ✅ SHOULD

- Group related settings using SettingsSection
- Use chevron icons for navigation actions
- Provide descriptions when settings need clarification
- Implement proper loading and error states
- Use custom icon colors sparingly and consistently
- Consider internationalization for all user-facing text
- Test components with various content lengths and edge cases

## AI Agent Guidelines

1. **Component Selection**: Use SettingsItemCard for all individual settings items. Choose between navigation mode (onPress), toggle mode (showSwitch), or display-only based on the setting's purpose.

2. **Grouping Strategy**: Organize related settings into logical sections using SettingsSection. Common section categories include: General, Appearance, Notifications, Privacy, and Support.

3. **Error Handling**: Always wrap settings screens in SettingsErrorBoundary with appropriate fallback UI. Provide translation keys for error messages to support internationalization.

4. **Styling Consistency**: Never override default styling unless absolutely necessary. When custom styling is required, use design system tokens to maintain theme consistency and automatic theme switching.

5. **Footer Implementation**: Include SettingsFooter at the bottom of all main settings screens. Use version information from Constants.expoConfig or app config to display accurate version numbers.

## Reference

- **Components Directory**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/components/`
- **Design System**: Refer to design system tokens for styling
- **Main Settings Screen**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/SettingsScreen.tsx`
- **Domain Components**: See individual domain directories for feature-specific components
