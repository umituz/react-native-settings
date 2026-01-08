# Appearance Domain

## Purpose

Provides comprehensive theme management and customization capabilities including light/dark mode switching and custom color schemes.

## File Paths

**Screens:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/presentation/screens/AppearanceScreen.tsx`

**Components:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/presentation/components/ThemeModeSection.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/presentation/components/CustomColorsSection.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/presentation/components/AppearancePreview.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/presentation/components/AppearanceHeader.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/presentation/components/ColorPicker.tsx`

**Hooks:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/presentation/hooks/useAppearance.ts`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/presentation/hooks/useAppearanceActions.ts`

**Application Layer:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/application/ports/IAppearanceRepository.ts`

**Infrastructure:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/infrastructure/repositories/AppearanceRepository.ts`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/infrastructure/services/AppearanceValidationService.ts`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/infrastructure/services/SystemThemeService.ts`

**Data:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/data/colorPalettes.ts`

**Types:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/types/index.ts`

**Index:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/index.ts`

## Strategy

1. **System Theme Detection**: Automatically detect and respect device theme preferences with SystemThemeService
2. **Repository Pattern**: Use IAppearanceRepository for abstracted theme data access and persistence
3. **Design System Integration**: Integrate with `@umituz/react-native-design-system` for consistent theming
4. **Color Validation**: Validate custom colors through AppearanceValidationService before applying
5. **Hook-Based State Management**: Use useAppearance and useAppearanceActions for theme state and actions

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT bypass the repository pattern when accessing or updating theme data
- ❌ DO NOT apply custom colors without validation through AppearanceValidationService
- ❌ DO NOT use Appearance components without providing design tokens
- ❌ DO NOT hardcode theme values - always use the repository and hooks

### NEVER
- ❌ NEVER use theme values directly from storage without going through the repository
- ❌ NEVER apply colors that don't meet accessibility standards (contrast ratios)
- ❌ NEVER mutate theme state directly without using the provided hooks
- ❌ NEVER use AppearanceScreen without a ThemeProvider from the design system

### AVOID
- ❌ AVOID creating custom theme management solutions when the domain provides everything needed
- ❌ AVOID applying theme changes without smooth transitions
- ❌ AVOID storing invalid color values in the repository
- ❌ AVOID mixing theme logic with business logic in components

## Rules

### ALWAYS
- ✅ ALWAYS use useAppearance hook for theme state management
- ✅ ALWAYS validate custom colors before applying them
- ✅ ALWAYS provide design tokens to Appearance components
- ✅ ALWAYS wrap Appearance components in ThemeProvider from design system
- ✅ ALWAYS handle loading states when theme is being initialized

### MUST
- ✅ MUST use IAppearanceRepository interface for theme data access
- ✅ MUST persist theme changes immediately for next app launch
- ✅ MUST respect system theme when user hasn't set a preference
- ✅ MUST provide fallback colors when custom colors fail validation
- ✅ MUST test UI in both light and dark themes

### SHOULD
- ✅ SHOULD provide smooth transitions when theme changes
- ✅ SHOULD show preview of theme changes before applying
- ✅ SHOULD allow users to easily reset to default theme
- ✅ SHOULD implement theme changes with minimal re-renders
- ✅ SHOULD ensure good contrast ratios in both themes

## AI Agent Guidelines

1. **Design System Integration**: Always integrate Appearance components with ThemeProvider from `@umituz/react-native-design-system`
2. **Hook Usage**: Always use useAppearance for theme state and useAppearanceActions for theme operations
3. **Repository Access**: Always use IAppearanceRepository interface - never access storage directly
4. **Validation**: Always validate custom colors through AppearanceValidationService before applying
5. **Testing**: Always test appearance changes in both light and dark modes to ensure proper rendering

## Related

- **Settings**: Main settings management
- **Design System**: Theme and styling foundation
- **Storage**: Persistent theme storage

## License

MIT
