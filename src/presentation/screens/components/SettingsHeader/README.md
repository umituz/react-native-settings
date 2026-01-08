# Settings Header

## Purpose

Header component for the settings screen with optional close button functionality for modal/presentation styles.

## File Paths

- **Component**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/components/SettingsHeader/SettingsHeader.tsx`

## Strategy

1. **Screen Title**: Displays localized "Settings" title using translation system
2. **Close Button**: Optional close button for modal presentation style
3. **Auto Navigation**: Automatically goes back if no custom handler is provided
4. **Design System**: Uses design system tokens for consistent styling
5. **Internationalization**: Supports i18n for all text content

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT use SettingsHeader in non-modal presentations (let React Navigation handle header)
- ❌ DO NOT override the title text (use translation system)
- ❌ DO NOT add custom actions to the header

### NEVER
- ❌ NEVER use SettingsHeader with card-style stack navigation
- ❌ NEVER remove or hide the close button in modal presentation
- ❌ NEVER hardcode title text (must use translations)

### AVOID
- ❌ AVOID adding additional buttons or actions to the header
- ❌ AVOID custom styling that breaks design system consistency
- ❌ AVOID using SettingsHeader outside of modal presentation context

## Rules (Mandatory)

### ALWAYS
- ✅ ALWAYS use close button in modal presentation (`presentation: 'modal'`)
- ✅ ALWAYS provide custom close handler when needed
- ✅ ALWAYS use translation keys for all text
- ✅ MUST set `headerShown: false` in screen options when using SettingsHeader

### MUST
- ✅ MUST ensure close button is easily tappable (44x44 minimum)
- ✅ MUST provide confirmation if there are unsaved changes
- ✅ MUST use proper navigation.goBack() as default close behavior

### SHOULD
- ✅ SHOULD use custom close handler for special actions (e.g., save before close)
- ✅ SHOULD test close button in both iOS and Android
- ✅ SHOULD ensure proper hit area for close button (hitSlop)

## AI Agent Guidelines

1. **File Reference**: When modifying header behavior, refer to `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/components/SettingsHeader/SettingsHeader.tsx`
2. **Modal Setup**: Always set `presentation: 'modal'` and `headerShown: false` in screen options
3. **Close Handler**: If custom close logic is needed (save, confirm), provide via `onClose` prop
4. **Navigation**: Default behavior calls `navigation.goBack()` when no `onClose` is provided
5. **Accessibility**: Ensure close button has proper accessibility label

## Component Reference

Related components:
- **SettingsScreen**: Main screen component that uses SettingsHeader
- **SettingsContent**: Content component that appears below header
- **Design System**: Styling and theming tokens
