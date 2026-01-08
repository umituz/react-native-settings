# About Domain

## Purpose

Provides components and utilities for displaying app information, user details, version info, and contact information in your React Native app.

## File Paths

**Components:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/about/presentation/screens/AboutScreen.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/about/presentation/components/AboutContent.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/about/presentation/components/AboutHeader.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/about/presentation/components/AboutSection.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/about/presentation/components/AboutSettingItem.tsx`

**Hooks:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/about/presentation/hooks/useAboutInfo.ts`

**Domain:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/about/domain/entities/AppInfo.ts`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/about/domain/repositories/IAboutRepository.ts`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/about/infrastructure/repositories/AboutRepository.ts`

**Utils:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/about/utils/aboutFactory.ts`

**Index:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/about/index.ts`

## Strategy

1. **Centralized Information Management**: Use `useAboutInfo` hook to manage app information state consistently across the app
2. **Modular Components**: Compose About screens using individual components (AboutHeader, AboutSection, AboutSettingItem) for flexibility
3. **Repository Pattern**: Abstract data access through IAboutRepository interface for testability and future extensibility
4. **Factory Pattern**: Use `aboutFactory` to create and configure About entities with validation
5. **Localization Support**: Configure texts for internationalization through the `texts` property in AboutConfig

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT hardcode app information directly in components - always use the repository and hooks
- ❌ DO NOT bypass the repository pattern when accessing About data
- ❌ DO NOT modify AppInfo entities directly without using the provided update methods
- ❌ DO NOT use AboutScreen components without providing proper configuration

### NEVER
- ❌ NEVER use About components without providing required configuration (config prop)
- ❌ NEVER expose sensitive information (API keys, secrets) in app information
- ❌ NEVER skip validation when updating app information through the repository
- ❌ NEVER use AboutScreen in production without proper error handling

### AVOID
- ❌ AVOID creating custom About components when existing components can be configured
- ❌ AVOID mixing app information logic with UI components directly
- ❌ AVOID storing large data objects (images, binary data) in AppInfo
- ❌ AVOID using AboutScreen without handling loading and error states

## Rules

### ALWAYS
- ✅ ALWAYS provide a valid AboutConfig when using AboutScreen or AboutContent
- ✅ ALWAYS use the `useAboutInfo` hook for dynamic About information management
- ✅ ALWAYS handle press actions (email, website) with proper URL validation
- ✅ ALWAYS include testID props for E2E testing on interactive components
- ✅ ALWAYS use the repository pattern for data access instead of direct storage access

### MUST
- ✅ MUST provide action handlers for interactive elements (email, website, more apps)
- ✅ MUST handle loading and error states when using useAboutInfo hook
- ✅ MUST validate URLs before opening them in Linking API
- ✅ MUST provide localized texts for multi-language support
- ✅ MUST use TypeScript types from the domain (AppInfo, AboutConfig)

### SHOULD
- ✅ SHOULD provide custom header and footer components for branded experiences
- ✅ SHOULD implement proper error handling for URL opening failures
- ✅ SHOULD use semantic versioning for version display
- ✅ SHOULD include accessibility labels for all interactive elements
- ✅ SHOULD provide meaningful descriptions for contact information

## AI Agent Guidelines

1. **Component Selection**: Always recommend AboutScreen for full About screens, AboutContent for sections within other screens, and AboutSettingItem for individual settings
2. **Data Management**: Always use useAboutInfo hook for state management, never manage state locally
3. **Configuration**: Always use AboutConfig interface for type-safe configuration - never use partial configs
4. **File Location**: When updating About logic, modify files in `/src/domains/about/` directory following the existing architecture
5. **Testing**: Always include testID props and ensure all interactive elements are testable

## Related

- **Settings**: Main settings management
- **Appearance**: Theme customization
- **Legal**: Privacy policy and terms

## License

MIT
