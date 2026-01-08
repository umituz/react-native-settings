# Identity Settings Section

Section component that displays user identity-related settings including About and Legal information.

## Purpose

Provides a dedicated section for user identity settings, organizing app information (About) and legal documentation (Privacy Policy, Terms of Service) into a cohesive user interface. Enables conditional rendering of these sections based on feature flags.

## File Paths

- **Component**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/presentation/screens/components/sections/IdentitySettingsSection/IdentitySettingsSection.tsx`
- **About Domain**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domain/about/`
- **Legal Domain**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domain/legal/`

## Strategy

1. **Conditional Rendering**: Render AboutSection and LegalSection only when their respective feature flags are enabled
2. **Domain Separation**: Delegate About section rendering to About domain components and Legal section to Legal domain components
3. **Configuration Normalization**: Accept normalized configuration objects to ensure consistent data structure across features
4. **Internationalization Support**: Use translation keys for all user-facing text to support multiple languages
5. **Flexible Legal Documents**: Support both URL-based and inline content for legal documents

## Restrictions

- ❌ DO NOT hardcode legal document URLs or content within the component
- ❌ DO NOT render sections that are disabled in feature flags
- ❌ NEVER bypass the normalized configuration structure
- ❌ AVOID adding non-identity related features to this section
- ❌ DO NOT duplicate About or Legal domain logic within this component
- ❌ NEVER assume all features are enabled; always check feature flags
- ❌ AVOID mixing identity settings with other feature categories

## Rules

- ✅ MUST receive both normalizedConfig and features as required props
- ✅ ALWAYS delegate to AboutSection component for About feature rendering
- ✅ ALWAYS delegate to LegalSection component for Legal feature rendering
- ✅ MUST support internationalization for all text content
- ✅ SHOULD maintain separation of concerns between About and Legal features
- ✅ MUST handle cases where one or both features are disabled
- ✅ ALWAYS use translation keys for consistent localization
- ✅ MUST preserve the order: About section first, then Legal section

## AI Agent Guidelines

When working with IdentitySettingsSection:

1. **Adding Identity Features**: Only add features that relate to user identity (About, Legal, Account, Profile). Do not add non-identity features.

2. **Configuration Structure**: Always use the normalized configuration format. Do not introduce new configuration shapes without updating the normalization logic.

3. **Feature Flag Logic**: When adding new sub-features, implement corresponding feature flags to control visibility.

4. **Domain Delegation**: Always delegate rendering to domain-specific components (AboutSection, LegalSection). Do not reimplement domain logic.

5. **Translation Keys**: When adding new text elements, always define translation keys in the i18n configuration files.

6. **Ordering**: Maintain consistent ordering of sections. About should precede Legal for better user experience.

7. **Documentation**: Update the domain component README files (About, Legal) when making changes to their interfaces.

8. **Testing**: Test both enabled and disabled states for each feature flag combination.

## Related Components

- **About Domain**: App information features
- **Legal Domain**: Legal document features
- **Feature Settings**: Other setting sections
