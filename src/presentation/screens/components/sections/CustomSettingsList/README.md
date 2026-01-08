# Custom Settings List

Component for rendering custom, user-defined settings sections with automatic ordering and sorting.

## Purpose

Enables developers to add app-specific settings sections that integrate seamlessly with the standard settings. Provides flexible rendering options for both standard items and custom content, with automatic sorting based on order property.

## File Paths

- **Component**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/components/sections/CustomSettingsList/CustomSettingsList.tsx`
- **Settings Section**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/components/sections/SettingsSection.tsx`
- **Settings Item Card**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/components/sections/SettingsItemCard.tsx`

## Strategy

1. **Automatic Sorting**: Sort sections by order property (lower numbers appear first, default is 999)
2. **Flexible Content**: Support both standard items array and custom React nodes for maximum flexibility
3. **Type Safety**: Provide TypeScript interfaces for custom sections and items to ensure type safety
4. **Conditional Rendering**: Return null when no sections are provided to avoid unnecessary rendering
5. **Integration**: Use standard SettingsSection and SettingsItemCard components for consistency

## Restrictions

- ❌ DO NOT use this component for standard built-in features (About, Legal, Feedback, etc.)
- ❌ DO NOT add business logic within custom sections; keep logic in parent components
- ❌ NEVER assume order property exists; always provide default sorting behavior
- ❌ AVOID mixing custom sections with standard sections in the same configuration
- ❌ DO NOT duplicate standard feature functionality in custom sections
- ❌ NEVER bypass the SettingsSection wrapper for standard items
- ❌ AVOID creating deeply nested custom content structures

## Rules

- ✅ MUST accept an array of custom sections as prop
- ✅ MUST sort sections by order property ascending
- ✅ MUST render each section using SettingsSection component
- ✅ MUST render items using SettingsItemCard component
- ✅ MUST support custom React nodes for content property
- ✅ MUST return null when customSections array is empty
- ✅ SHOULD provide unique IDs for sections and items when possible
- ✅ MUST preserve rendering order for sections with equal order values

## AI Agent Guidelines

When working with CustomSettingsList:

1. **Feature Categorization**: Use this component ONLY for app-specific features that don't fit into standard categories. DO NOT use it for About, Legal, Account, Notifications, etc.

2. **Section Design**: Create logical groupings of related items. Each section should represent a coherent feature category (e.g., "Integrations", "Preferences", "Advanced").

3. **Order Management**: Always set the order property for predictable rendering. Use gaps in order numbers (10, 20, 30) to allow for future insertions.

4. **Item Configuration**: Use appropriate icons from the icon library. Provide clear titles and helpful subtitles for better user experience.

5. **Custom Content**: Use the content property only when items array is insufficient. Custom content should be well-contained and not break the settings visual pattern.

6. **Dynamic Sections**: When generating sections dynamically, ensure stable IDs to prevent unnecessary re-renders.

7. **Conditional Rendering**: Handle conditional rendering at the data level (filter sections array) rather than within individual sections.

8. **Navigation Handlers**: Always provide onPress handlers for interactive items. Use proper navigation patterns for your app.

9. **Consistency**: Maintain visual consistency with standard settings sections. Use standard icons and spacing.

10. **Performance**: Avoid expensive operations in render functions. Pre-process data before passing to CustomSettingsList.

11. **Type Safety**: Define proper TypeScript types for custom section data specific to your app.

12. **Testing**: Test with empty sections, single sections, multiple sections, and sections with custom content.

## Related Components

- **Settings Section**: Section wrapper component
- **Settings Item Card**: Individual item component
- **Settings Content**: Main content composer
