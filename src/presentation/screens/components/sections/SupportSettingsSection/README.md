# Support Settings Section

Section component that displays user support features including feedback, rating, and FAQs.

## Purpose

Provides a dedicated section for user support options, enabling users to provide feedback, rate the app, and access frequently asked questions. Centralizes all support-related interactions in one cohesive interface.

## File Paths

- **Component**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/components/sections/SupportSettingsSection/SupportSettingsSection.tsx`
- **Support Section**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/components/sections/SupportSettingsSection/SupportSection.tsx`
- **Feedback Domain**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domain/feedback/`
- **Rating Domain**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domain/rating/`
- **FAQs Domain**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domain/faqs/`

## Strategy

1. **Section Grouping**: Group Feedback and Rating items under a single "Support" section while keeping FAQ as a separate item
2. **Conditional Rendering**: Render each support feature (feedback, rating, FAQs) only when enabled via feature flags
3. **Modal Integration**: Use feedback modal components for collecting user feedback with rating and description
4. **Domain Delegation**: Delegate feature-specific logic to respective domain components (Feedback, Rating, FAQs)
5. **Navigation Handling**: Provide navigation handlers for FAQ access and external store URLs for app rating

## Restrictions

- ❌ DO NOT hardcode store URLs; always use configuration
- ❌ DO NOT render feedback or rating items if their feature flags are disabled
- ❌ NEVER bypass the SupportSection wrapper for feedback and rating items
- ❌ AVOID adding non-support related features to this section
- ❌ DO NOT duplicate feedback modal logic within this component
- ❌ NEVER assume all support features are enabled
- ❌ AVOID mixing support features with other feature categories

## Rules

- ✅ MUST receive both normalizedConfig and features as required props
- ✅ ALWAYS wrap Feedback and Rating items within SupportSection component
- ✅ MUST render FAQ item separately from the Support section
- ✅ MUST support internationalization for all text content
- ✅ SHOULD handle missing or undefined configuration gracefully
- ✅ MUST provide proper navigation handlers for FAQ access
- ✅ ALWAYS use translation keys for consistent localization
- ✅ MUST support custom feedback types when configured

## AI Agent Guidelines

When working with SupportSettingsSection:

1. **Adding Support Features**: Only add features that relate to user support (Feedback, Rating, Help, FAQs, Contact). Do not add non-support features.

2. **Section Organization**: Keep Feedback and Rating grouped within SupportSection. Place FAQ as a separate item for better visual hierarchy.

3. **Modal Configuration**: When modifying feedback behavior, ensure the modal configuration is properly passed to feedback domain components.

4. **Feature Flag Logic**: When adding new support features, implement corresponding feature flags to control visibility.

5. **Domain Delegation**: Always delegate rendering to domain-specific components. Do not reimplement feedback, rating, or FAQ logic.

6. **Translation Keys**: When adding new text elements or feedback types, always define translation keys in the i18n configuration files.

7. **Store URLs**: Store URLs should be configurable and not hardcoded. Support both App Store and Play Store URLs.

8. **Testing**: Test all combinations of enabled/disabled support features to ensure proper conditional rendering.

9. **User Experience**: Ensure feedback submission flow is smooth and provides user feedback (success/error states).

10. **FAQ Navigation**: Provide flexible navigation handlers for FAQ access to support different navigation patterns.

## Related Components

- **Feedback Domain**: Feedback system components
- **Rating Domain**: Rating components
- **FAQs Domain**: FAQ system
- **Support Section**: Support components wrapper
