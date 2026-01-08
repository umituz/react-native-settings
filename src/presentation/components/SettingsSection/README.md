# SettingsSection

## Purpose

Container component for grouping related settings items with section headers and consistent styling.

## File Paths

- **Component**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/components/SettingsSection/SettingsSection.tsx`

## Strategy

1. **Logical Grouping**: Groups related settings together under section headers for better organization and user experience
2. **Flexible Layout**: Supports any content as children, allowing for dynamic settings items
3. **Consistent Spacing**: Uses design system tokens to maintain uniform spacing between sections
4. **Optional Headers**: Section titles are optional, allowing for unlabeled groups when needed
5. **Customizable Styling**: Supports custom styles for both container and title to match design requirements

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT nest SettingsSection components deeply (maximum 2 levels recommended)
- ❌ DO NOT mix different types of content unpredictably within sections
- ❌ DO NOT use hardcoded spacing values instead of design system tokens

### NEVER
- ❌ NEVER use SettingsSection for non-settings content (e.g., forms, data displays)
- ❌ NEVER override critical accessibility properties
- ❌ NEVER use section titles that are misleading or unclear

### AVOID
- ❌ AVOID creating sections with only one item (consider placing in another section)
- ❌ AVOID using overly long section titles (keep under 25 characters)
- ❌ AVOID inconsistent section ordering across different screens

## Rules (Mandatory)

### ALWAYS
- ✅ ALWAYS use design system tokens for spacing and styling
- ✅ ALWAYS provide clear, concise section titles in uppercase
- ✅ ALWAYS maintain consistent spacing between sections using tokens
- ✅ ALWAYS test section appearance in both light and dark themes

### MUST
- ✅ MUST group related settings logically (e.g., all notification settings together)
- ✅ MUST ensure section titles are descriptive and accurate
- ✅ MUST keep sections focused (3-6 items maximum recommended)

### SHOULD
- ✅ SHOULD order sections by importance or frequency of use
- ✅ SHOULD use section titles that follow the pattern: [CATEGORY] or [FEATURE GROUP]
- ✅ SHOULD consider internationalization for section titles

## AI Agent Guidelines

1. **File Reference**: When modifying section layout, refer to `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/components/SettingsSection/SettingsSection.tsx`
2. **Design Tokens**: All spacing and styling must use tokens from the design system (e.g., `tokens.spacing.lg`, `tokens.colors.textSecondary`)
3. **Component Integration**: SettingsSection is designed to work with SettingsItemCard components as children
4. **Accessibility**: Ensure sections are properly labeled for screen readers
5. **Performance**: Avoid unnecessary re-renders by keeping section configuration stable

## Component Reference

Related components:
- **SettingsItemCard**: Individual item component to be used inside sections
- **SettingsContent**: Content composer that manages multiple sections
- **SettingsScreen**: Main screen component
