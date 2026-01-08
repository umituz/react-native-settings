# Appearance Hooks

Custom hooks for managing appearance settings including theme mode and custom colors.

## Purpose

Provides React hooks for accessing and manipulating appearance settings. These hooks bridge the UI layer with the appearance domain's business logic, offering a clean interface for theme management and color customization.

## File Paths

```
src/domains/appearance/hooks/
├── useAppearance.ts             # Access appearance settings
└── useAppearanceActions.ts      # Modify appearance settings
```

## Strategy

1. **Separation of Concerns**: Split read operations (useAppearance) from write operations (useAppearanceActions)
2. **Automatic Persistence**: All changes are automatically persisted without manual save operations
3. **Type Safety**: Strongly typed theme modes and color palettes
4. **System Integration**: Respect system theme preferences when in auto mode
5. **Reactive Updates**: Automatically trigger re-renders when appearance changes

## Restrictions

### DO NOT

- ❌ DO NOT mix appearance hooks with direct settings manipulation
- ❌ DO NOT bypass validation when setting custom colors
- ❌ DO NOT assume theme mode is always the same as effective theme
- ❌ DO NOT manually manage persistence; hooks handle this automatically
- ❌ DO NOT create circular dependencies between appearance hooks

### NEVER

- ❌ NEVER call useAppearanceActions outside React components
- ❌ NEVER ignore loading states during appearance operations
- ❌ EVER hardcode color values; use the hooks instead
- ❌ EVER mutate theme state directly; use action hooks

### AVOID

- ❌ AVOID frequent theme changes without debouncing
- ❌ AVOID creating custom appearance logic outside these hooks
- ❌ AVOID inconsistent theme application across components
- ❌ AVOID ignoring system theme preferences in auto mode

## Rules

### ALWAYS

- ✅ ALWAYS use useAppearance for reading appearance state
- ✅ ALWAYS use useAppearanceActions for modifying appearance
- ✅ ALWAYS validate color values before setting custom colors
- ✅ ALWAYS handle loading states during theme operations
- ✅ ALWAYS respect system theme when mode is 'auto'

### MUST

- ✅ MUST apply theme changes consistently across the app
- ✅ MUST provide visual feedback for theme changes
- ✅ MUST handle errors in color validation gracefully
- ✅ MUST persist changes immediately

### SHOULD

- ✅ SHOULD use useMemo for expensive theme computations
- ✅ SHOULD provide smooth transitions between theme changes
- ✅ SHOULD offer reset functionality for custom colors
- ✅ SHOULD show live preview of appearance changes

## AI Agent Guidelines

1. **When creating custom appearance hooks**: Compose existing hooks rather than creating new ones
2. **When adding new theme modes**: Extend the theme mode type and update all switch statements
3. **When customizing colors**: Always validate hex format before applying
4. **When integrating system theme**: Use useColorScheme for detecting system preferences
5. **When debugging appearance**: Use React DevTools to inspect hook state and dependencies

## Hooks Reference

### useAppearance

Hook for accessing current appearance settings and theme mode.

**Location**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/hooks/useAppearance.ts`

**Returns**:
- `themeMode: 'light' | 'dark' | 'auto'` - Current theme mode setting
- `customColors?: ColorPalette` - Custom color palette if set
- `isLoading: boolean` - Loading state indicator
- `error?: Error` - Error object if operation failed

**Use Cases**:
- Displaying current theme mode
- Checking if custom colors are active
- Rendering theme-aware UI components

### useAppearanceActions

Hook for accessing appearance action functions to update theme and colors.

**Location**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/hooks/useAppearanceActions.ts`

**Returns**:
- `setThemeMode: (mode: 'light' | 'dark' | 'auto') => void` - Set theme mode
- `setCustomColors: (colors: ColorPalette) => void` - Set custom colors
- `resetColors: () => void` - Reset to default colors
- `isUpdating: boolean` - Update in progress indicator

**Use Cases**:
- Theme switcher component
- Custom color picker
- Reset appearance to defaults

## Theme Modes

### Light Mode

Explicit light theme regardless of system preferences.

### Dark Mode

Explicit dark theme regardless of system preferences.

### Auto Mode

Automatically switches between light and dark based on system preferences.

## Color Palette Structure

```typescript
interface ColorPalette {
  primary: string;      // Primary brand color
  secondary: string;    // Secondary brand color
  accent: string;       // Accent/highlight color
  background: string;   // Background color
  surface: string;      // Surface/card color
  error: string;        // Error state color
  success: string;      // Success state color
  warning: string;      // Warning state color
}
```

## Best Practices

1. **Persistence**: Theme changes are automatically persisted
2. **System Preference**: Respect system theme when mode is 'auto'
3. **Transition**: Use smooth transitions when changing themes
4. **Validation**: Validate color values before setting
5. **Reset**: Provide option to reset to defaults
6. **Preview**: Show live preview of changes
7. **Performance**: Use useMemo for expensive calculations

## License

MIT
