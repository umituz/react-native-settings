# Appearance Components

## Purpose

Components for theme management and appearance customization including theme selection, color picking, and live preview. Enables users to personalize their app experience with comprehensive theming options.

## File Paths

- **AppearanceScreen**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/presentation/screens/AppearanceScreen.tsx`
- **ThemeModeSection**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/presentation/components/ThemeModeSection.tsx`
- **CustomColorsSection**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/presentation/components/CustomColorsSection.tsx`
- **AppearancePreview**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/presentation/components/AppearancePreview.tsx`
- **ThemeOption**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/presentation/components/ThemeOption.tsx`
- **ColorPicker**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/presentation/components/ColorPicker.tsx`

## Strategy

1. **Live Preview Implementation**: Shows real-time preview of theme changes as users make selections, providing immediate feedback and building confidence before applying changes globally.

2. **System Theme Respect**: Implements "auto" mode that automatically switches between light and dark themes based on system preferences, providing a seamless native experience.

3. **Progressive Customization**: Offers simple theme mode selection (light/dark/auto) for casual users and advanced color palette customization for power users, accommodating different user needs.

4. **Design System Integration**: Works seamlessly with design system tokens, allowing theme changes to propagate consistently across all components without manual style updates.

5. **Reset Capability**: Provides easy reset to defaults option, allowing users to quickly revert customizations if they're unsatisfied with their changes.

## Restrictions

### ❌ DO NOT

- Hardcode color values anywhere in the app
- Ignore system theme preference in auto mode
- Make theme changes without user action
- Break design system token dependencies
- Allow invalid color hex codes

### ❌ NEVER

- Remove the reset to defaults option
- Force a theme that violates accessibility standards
- Make color changes without proper validation
- Bypass theme persistence
- Use different theme scales across the app

### ❌ AVOID

- Too many preset themes (keep under 10)
- Clashing color combinations
- Overly complex color customization UI
- Delayed theme application
- Inconsistent theme transition animations

## Rules

### ✅ ALWAYS

- Show theme preview before applying changes
- Save theme changes immediately
- Respect system theme in auto mode
- Validate color hex codes before applying
- Ensure sufficient color contrast for accessibility

### ✅ MUST

- Provide light, dark, and auto theme options
- Support design system token integration
- Include reset to defaults button
- Test themes in different lighting conditions
- Maintain consistent theme across app lifecycle

### ✅ SHOULD

- Offer preset color palettes for quick selection
- Use smooth transitions for theme changes
- Show color names or hex codes for clarity
- Provide theme customization in dedicated screen
- Consider accessibility when selecting default colors
- Test with various color blindness types

## AI Agent Guidelines

1. **Theme Mode Implementation**: Always offer three options: Light, Dark, and Auto. In Auto mode, use useColorScheme or Appearance API to detect system preference and switch automatically. Show the active theme in preview so users understand what Auto means.

2. **Color Customization Strategy**: Provide preset color palettes (Ocean, Sunset, Forest, etc.) for users who want quick customization. For advanced users, offer individual color pickers for primary, secondary, and accent colors. Always validate hex codes and show color preview.

3. **Preview UX**: Position preview at the top of the appearance screen so users see changes immediately. Update preview in real-time as users select options. Show various UI elements in preview (cards, buttons, text) to demonstrate theme comprehensively.

4. **Persistence and Reset**: Save theme preferences to AsyncStorage immediately on change. Use keys like "theme-mode" and "custom-colors". The reset button should clear custom colors and revert to default theme mode (usually Auto or Light).

5. **Accessibility Testing**: Always test custom color themes for contrast ratios. Use tools to ensure text meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text). Warn users if their custom colors don't meet accessibility standards, or prevent applying them.

## Reference

- **Main Screen**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/presentation/screens/AppearanceScreen.tsx`
- **Theme Components**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/presentation/components/`
- **Appearance Hooks**: Check for useAppearance and related hooks for state management
- **Appearance Services**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/appearance/services/`
- **Design System Tokens**: Refer to design system for color definitions and theming infrastructure
