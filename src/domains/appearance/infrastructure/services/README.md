# Appearance Services

Service layer for appearance domain including system theme detection, validation, and appearance management.

## Purpose

Provides business logic services for managing appearance settings including theme mode, custom colors, and system theme detection. Services encapsulate complex operations and provide a clean API for the domain.

## File Paths

```
src/domains/appearance/infrastructure/services/
├── AppearanceService.ts               # Main appearance management
├── SystemThemeDetectionService.ts     # System theme detection
└── ValidationService.ts               # Color/theme validation
```

## Strategy

1. **Service Encapsulation**: Encapsulate complex appearance logic in service classes
2. **System Integration**: Detect and respond to system theme changes
3. **Validation First**: Validate all appearance changes before applying
4. **Event-Driven**: Use event listeners for system theme changes
5. **Type Safety**: Provide strongly typed service interfaces

## Restrictions

### DO NOT

- ❌ DO NOT include UI components or React hooks in services
- ❌ DO NOT directly access storage; use repositories
- ❌ DO NOT mix validation logic with business logic
- ❌ DO NOT create circular dependencies between services
- ❌ DO NOT swallow validation errors

### NEVER

- ❌ NEVER apply invalid color values
- ❌ NEVER assume system theme is available
- ❌ EVER bypass validation for any reason
- ❌ EVER store raw hex values without validation

### AVOID

- ❌ AVOID creating god services that do too much
- ❌ AVOID tight coupling between services
- ❌ AVOID synchronous operations for appearance changes
- ❌ AVOID ignoring system theme change events

## Rules

### ALWAYS

- ✅ ALWAYS validate theme modes before applying
- ✅ ALWAYS validate hex color format before applying
- ✅ ALWAYS handle system theme unsubscription
- ✅ ALWAYS return typed results from service methods
- ✅ ALWAYS handle service errors gracefully

### MUST

- ✅ MUST validate all inputs before processing
- ✅ MUST provide clear error messages for validation failures
- ✅ MUST clean up event listeners on cleanup
- ✅ MUST respect user preferences over system defaults

### SHOULD

- ✅ SHOULD provide reactive interfaces for theme changes
- ✅ SHOULD cache theme detection results
- ✅ SHOULD offer batch operations for multiple changes
- ✅ SHOULD log important service operations

## AI Agent Guidelines

1. **When creating services**: Keep them focused and single-purpose
2. **When adding validation**: Provide clear, actionable error messages
3. **When detecting system theme**: Use native APIs with fallbacks
4. **When managing colors**: Validate hex format (#RRGGBB) before applying
5. **When handling errors**: Transform technical errors into user-friendly messages

## Services Reference

### AppearanceService

Main service for managing appearance settings including theme mode, custom colors, and system theme detection.

**Location**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/infrastructure/services/AppearanceService.ts`

**Methods**:
- `getThemeMode(): Promise<'light' | 'dark' | 'auto'>` - Get current theme mode
- `setThemeMode(mode: 'light' | 'dark' | 'auto'): Promise<void>` - Set theme mode
- `getCustomColors(): Promise<ColorPalette | undefined>` - Get custom colors
- `setCustomColors(colors: ColorPalette): Promise<void>` - Set custom colors
- `resetColors(): Promise<void>` - Reset to default colors

### SystemThemeDetectionService

Service for detecting and monitoring system theme changes.

**Location**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/infrastructure/services/SystemThemeDetectionService.ts`

**Methods**:
- `getSystemTheme(): 'light' | 'dark' | null` - Get current system theme
- `listen(callback: (theme: 'light' | 'dark') => void): () => void` - Listen for changes

### ValidationService

Service for validating appearance settings.

**Location**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/infrastructure/services/ValidationService.ts`

**Methods**:
- `validateThemeMode(mode: string): boolean` - Validate theme mode
- `validateColor(color: string): boolean` - Validate hex color
- `validateColorPalette(palette: ColorPalette): boolean` - Validate complete palette

## Color Palette Structure

**Primary**: Main brand color (#FF5722)
**Secondary**: Secondary brand color (#2196F3)
**Accent**: Highlight color (#FFC107)
**Background**: Background color (#FFFFFF)
**Surface**: Surface/card color (#F5F5F5)
**Error**: Error state color (#F44336)
**Success**: Success state color (#4CAF50)
**Warning**: Warning state color (#FF9800)

## Best Practices

1. **Validation**: Always validate colors before saving
2. **System Theme**: Respect system theme when mode is 'auto'
3. **Cleanup**: Unsubscribe from theme listeners on unmount
4. **Error Handling**: Handle invalid colors gracefully
5. **Hex Format**: Use proper hex color format (#RRGGBB)
6. **Persistence**: Save theme changes immediately
7. **Performance**: Cache theme detection results

## License

MIT
