# SettingsItemCard

## Purpose

Premium, consistent card component for settings items with icons, text, optional controls, and smooth interactions. Provides a unified interface for all settings items throughout the application.

## File Paths

```
src/presentation/components/SettingsItemCard/
├── SettingsItemCard.tsx           # Main component
├── STRATEGY.md                    # Detailed strategy guide
└── README.md                      # This file
```

**Component Location**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/components/SettingsItemCard/SettingsItemCard.tsx`

## Strategy

1. **Unified Interface**: All settings items use this component for consistency
2. **Flexibility**: Supports buttons, switches, links, and navigation items
3. **Design System Integration**: Uses tokens for consistent styling across the app
4. **Performance Optimized**: Memoized component with optimized re-rendering
5. **Accessibility First**: Full accessibility support with proper labels and hints

## Restrictions

### DO NOT

- ❌ DO NOT create custom settings item components; use SettingsItemCard
- ❌ DO NOT bypass design system tokens for styling
- ❌ DO NOT use without proper icon and title props
- ❌ DO NOT mix interaction patterns (e.g., switch + press)
- ❌ DO NOT ignore disabled state styling

### NEVER

- ❌ NEVER use icons that don't match the item's purpose
- ❌ NEVER omit accessibility labels for interactive items
- ❌ NEVER use without proper error boundaries
- ❌ EVER hardcode colors or spacing values

### AVOID

- ❌ AVOID creating multiple items with the same title
- ❌ AOVERWHELM users with overly long titles or descriptions
- ❌ AVOID using inconsistent icon styles
- ❌ AVOID unstable handler functions (use useCallback)

## Rules

### ALWAYS

- ✅ ALWAYS provide a valid icon from Ionicons
- ✅ ALWAYS provide a clear, concise title
- ✅ ALWAYS use design system tokens for custom styling
- ✅ ALWAYS provide proper accessibility labels
- ✅ ALWAYS use testID props for E2E testing

### MUST

- ✅ MUST provide onPress handler for interactive items
- ✅ MUST use switch controls for boolean settings
- ✅ MUST provide visual feedback for disabled items
- ✅ MUST respect design system spacing tokens

### SHOULD

- ✅ SHOULD use subtitles for additional context
- ✅ SHOULD show right icon for navigation items
- ✅ SHOULD use custom icon colors for emphasis
- ✅ SHOULD provide meaningful descriptions

## AI Agent Guidelines

1. **When creating settings items**: Always use SettingsItemCard component
2. **When selecting icons**: Choose icons that clearly represent the setting
3. **When adding interactions**: Use onPress for navigation, switch for toggles
4. **When customizing**: Use design system tokens, not hardcoded values
5. **When testing**: Always include testID props for E2E testing

## Props Reference

### Required Props

- `icon: IconName` - Icon name from Ionicons (required)
- `title: string` - Main title text (required)

### Optional Props

**Interaction:**
- `onPress?: () => void` - Press handler for navigation/actions
- `showSwitch?: boolean` - Show switch control (default: false)
- `switchValue?: boolean` - Switch value
- `onSwitchChange?: (value: boolean) => void` - Switch change handler

**Display:**
- `subtitle?: string` - Subtitle text
- `description?: string` - Description text (alias for subtitle)
- `rightIcon?: IconName` - Right arrow/icon
- `iconBgColor?: string` - Custom icon background color
- `iconColor?: string` - Custom icon color

**State:**
- `disabled?: boolean` - Disabled state (default: false)
- `style?: ViewStyle` - Custom container style
- `testID?: string` - Test identifier

## Component Structure

```
SettingsItemCard
├── Icon Container
│   ├── Icon Background
│   └── Icon (from Ionicons)
├── Content
│   ├── Title (required)
│   └── Subtitle/Description (optional)
└── Right Element
    ├── Switch (if showSwitch)
    ├── Right Icon (if rightIcon)
    └── Chevron (default if onPress)
```

## Usage Patterns

### Navigation Item
- Use with `onPress` prop
- Show `rightIcon` for navigation indication
- Include `subtitle` for additional context

### Toggle Setting
- Use with `showSwitch={true}`
- Provide `switchValue` state
- Provide `onSwitchChange` handler
- Use `description` for explanation

### Link Item
- Use with `onPress` that opens URL
- Show external link icon (`open-outline`)
- Handle URL errors gracefully

### Disabled Item
- Set `disabled={true}`
- Provide explanation in `description`
- Use appropriate icon colors

## Styling

### Design System Tokens

All styling uses design system tokens:
- **Colors**: `tokens.colors.surface`, `tokens.colors.textPrimary`
- **Spacing**: `tokens.spacing.md`, `tokens.spacing.lg`
- **Typography**: `tokens.typography.fontSize.base`
- **Shadows**: `tokens.shadows.sm`
- **Border Radius**: `tokens.borderRadius.lg`

### Custom Styling

Use the `style` prop for custom container styling, but prefer design system tokens:
```typescript
// Prefer this:
style={{ backgroundColor: tokens.colors.surfaceVariant }}

// Over this:
style={{ backgroundColor: '#f0f0f0' }}
```

## Accessibility

### Required Accessibility

- All interactive items need `accessibilityLabel`
- Switch items need `accessibilityHint`
- Disabled items need `accessibilityState`

### Test IDs

Provide `testID` props for E2E testing:
- Pattern: `{feature}-setting-item`
- Example: `notifications-setting-item`

## Performance

### Component Memoization

SettingsItemCard is memoized for performance. To ensure proper memoization:
1. Use stable handler functions (useCallback)
2. Avoid inline function definitions
3. Keep props stable across renders

### Optimization Tips

1. Use `useCallback` for `onPress` handlers
2. Memoize subtitle and description values
3. Avoid passing anonymous functions
4. Keep `switchValue` stable

## Best Practices

1. **Icon Selection**: Choose descriptive, recognizable icons
2. **Title Length**: Keep titles short and clear (under 30 chars)
3. **Descriptions**: Use for additional context when needed
4. **Consistency**: Maintain consistent styling across items
5. **Feedback**: All interactive items show press feedback
6. **Accessibility**: Always include proper labels
7. **Performance**: Use stable handlers and memoization

## Related Components

- **SettingsSection**: Container for grouping items
- **SettingsContent**: Content composer that uses items
- **SettingsScreen**: Main screen that displays items

## License

MIT
