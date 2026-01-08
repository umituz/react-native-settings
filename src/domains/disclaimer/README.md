# Disclaimer Domain

## Purpose

Provides components for displaying legal notices, warnings, and important information through cards, modals, and dedicated screens with full i18n support.

## File Paths

**Screens:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/disclaimer/presentation/screens/DisclaimerScreen.tsx`

**Components:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/disclaimer/presentation/components/DisclaimerSetting.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/disclaimer/presentation/components/DisclaimerCard.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/disclaimer/presentation/components/DisclaimerModal.tsx`

**Index:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/disclaimer/index.ts`

## Strategy

1. **Internationalization First**: Use translation keys for all text content with support for i18n
2. **Modular Design**: Compose disclaimers from card and modal components for flexibility
3. **Color Coding**: Use appropriate colors for different warning levels (red for critical, amber for caution, blue for info)
4. **Card + Modal Pattern**: Display summary in card, full content in modal for better UX
5. **Icon Integration**: Use design system icons with customizable colors for visual hierarchy

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT use DisclaimerSetting without proper translation keys in i18n configuration
- ❌ DO NOT hardcode disclaimer text - always use translation keys or modalContent prop
- ❌ DO NOT use DisclaimerCard without providing all required props (title, shortMessage, iconName, iconColor, backgroundColor, onPress)
- ❌ DO NOT bypass the card + modal pattern for displaying disclaimers

### NEVER
- ❌ NEVER use DisclaimerSetting in production without verifying i18n keys exist
- ❌ NEVER show modal without a proper close mechanism
- ❌ NEVER use inappropriate colors for warning levels (e.g., green for critical warnings)
- ❌ NEVER mix disclaimer content with business logic

### AVOID
- ❌ AVOID creating custom disclaimer components when existing ones can be configured
- ❌ AVOID using long text in DisclaimerCard - use modal for full content
- ❌ AVOID using DisclaimerSetting for critical legal notices that require explicit acceptance
- ❌ AVOID hardcoding colors - use design system tokens or semantic color names

## Rules

### ALWAYS
- ✅ ALWAYS provide translation keys for DisclaimerSetting (titleKey, messageKey, shortMessageKey)
- ✅ ALWAYS provide all required props to DisclaimerCard (title, shortMessage, iconName, iconColor, backgroundColor, onPress)
- ✅ ALWAYS use modalTitle and modalContent props for custom content that bypasses i18n
- ✅ ALWAYS ensure modal can be closed with a clear close button
- ✅ ALWAYS use appropriate colors for warning levels

### MUST
- ✅ MUST include translation keys in all language files before using DisclaimerSetting
- ✅ MUST provide custom modalTitle and modalContent when bypassing i18n
- ✅ MUST ensure disclaimer text is clear and non-technical
- ✅ MUST test disclaimer rendering on all platforms (iOS, Android, Web)
- ✅ MUST ensure modal content is scrollable for long disclaimers

### SHOULD
- ✅ SHOULD use red/amber colors for critical warnings, blue for informational
- ✅ SHOULD keep card messages short and concise
- ✅ SHOULD provide specific icons for different warning types (alert-triangle, flask, heart-pulse)
- ✅ SHOULD ensure disclaimer modals are accessible with proper labels
- ✅ SHOULD test disclaimer components with different screen sizes

## AI Agent Guidelines

1. **Component Selection**: Use DisclaimerSetting for settings integration (card + modal), DisclaimerCard for custom cards, DisclaimerModal for standalone modals, DisclaimerScreen for dedicated screens
2. **i18n Usage**: Always use translation keys with DisclaimerSetting - only use modalTitle/modalContent for truly static content
3. **Color Guidelines**: Always match colors to warning severity - red for critical/legal, amber for caution, blue for informational, emerald for confirmations
4. **Content Structure**: Always keep card messages short (1-2 lines) with full content in modal
5. **Platform Testing**: Always test disclaimer rendering on iOS, Android, and Web platforms

## Related

- **Legal**: Privacy policy, terms of service
- **Settings**: Main settings management
- **Design System**: Icons, colors, and typography

## License

MIT
