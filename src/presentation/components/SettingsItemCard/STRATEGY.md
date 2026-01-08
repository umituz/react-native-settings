# SettingsItemCard

## Purpose
Premium, consistent card component for displaying settings items with icons, text, and optional controls (switches, chevrons).

## File Path
`src/presentation/components/SettingsItemCard/SettingsItemCard.tsx`

## Imports
```typescript
import { SettingsItemCard } from '@umituz/react-native-settings';
```

## Strategy

### When to Use
- Use for ALL settings list items
- Use when displaying navigation items
- Use for toggle/switch settings
- Use for any setting that requires user interaction

### Integration Pattern
1. Import from `@umituz/react-native-settings`
2. Reference the implementation file for current props
3. Check `SettingsItemCardProps` interface for available options
4. Use design system tokens for custom styling

### Best Practices
- Keep titles short and descriptive
- Use descriptions for additional context
- Provide press handlers for navigation
- Use switches for boolean toggles
- Show right icons for navigation hints

## Restrictions (Forbidden)

### ❌ DO NOT
- Create custom settings item components
- Inline settings item logic in screens
- Use TouchableOpacity directly for settings items
- Mix different settings item styles
- Hardcode colors or sizes

### ❌ NEVER
- Bypass SettingsItemCard for settings items
- Use different icon libraries
- Override internal styles directly
- Nest SettingsItemCard deeply

### ❌ AVOID
- Overloading with too many props
- Using without proper accessibility
- Creating variants outside the component
- Duplicating functionality

## Rules

### ✅ ALWAYS
- Use SettingsItemCard for all settings items
- Import from `@umituz/react-native-settings`
- Provide required props: `icon`, `title`
- Add `onPress` handler for interactive items
- Use proper icon names from Ionicons
- Include accessibility labels

### ✅ MUST
- Follow SettingsItemCardProps interface
- Use design system tokens for styling
- Handle press events appropriately
- Provide meaningful titles
- Support both light and dark themes

### ✅ SHOULD
- Use description/subtitle for context
- Show switches for boolean settings
- Display right icons for navigation
- Group related items in sections
- Test on both iOS and Android

## Props Reference

See implementation file for complete props:
`src/presentation/components/SettingsItemCard/SettingsItemCard.tsx`

Required props:
- `icon`: IconName from Ionicons
- `title`: string

Common optional props:
- `subtitle`/`description`: Additional text
- `onPress`: Press handler
- `showSwitch`: Boolean for toggle
- `switchValue`: Switch state
- `onSwitchChange`: Switch change handler
- `rightIcon`: Right-side icon
- `disabled`: Disable interaction

## Related Components

- **SettingsSection**: `src/presentation/screens/components/sections/SettingsSection/SettingsSection.tsx`
  - Container for grouping SettingsItemCard components

- **SettingsContent**: `src/presentation/screens/components/SettingsContent/SettingsContent.tsx`
  - Main content composer that uses SettingsItemCard

- **SettingsScreen**: `src/presentation/screens/SettingsScreen.tsx`
  - Main screen that displays settings items

## AI Agent Guidelines

### When Generating SettingsItemCard Code

1. **Import Statement**
   ```typescript
   import { SettingsItemCard } from '@umituz/react-native-settings';
   ```

2. **Required Props**
   - Always provide `icon` (Ionicons name)
   - Always provide `title` (string)

3. **Common Patterns**
   - Navigation items: Add `onPress` and `rightIcon`
   - Toggle items: Add `showSwitch`, `switchValue`, `onSwitchChange`
   - Disabled items: Add `disabled={true}`

4. **What to Avoid**
   - Don't create custom card components
   - Don't wrap in unnecessary containers
   - Don't hardcode colors
   - Don't use inline styles

5. **File Reference**
   - Check implementation: `src/presentation/components/SettingsItemCard/SettingsItemCard.tsx`
   - Check props interface: `SettingsItemCardProps`
   - Check styles: Look for design system tokens usage

6. **Consistency Rules**
   - Use same icon style across app
   - Keep titles concise (1-3 words)
   - Use descriptions only when needed
   - Group related items together

### Example Pattern (Conceptual)

Instead of code examples, follow this pattern:

```
Settings Item → SettingsItemCard
  - Required: icon, title
  - Navigation: onPress, rightIcon
  - Toggle: showSwitch, switchValue, onSwitchChange
  - Disabled: disabled={true}
```

## Version Compatibility

- Minimum React Native version: 0.60.0
- Requires: @umituz/react-native-design-system
- Compatible with: React Navigation 6.x

## License

MIT
