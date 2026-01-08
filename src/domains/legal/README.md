# Legal Domain

## Purpose

Provides screens and components for displaying legal documents such as privacy policies, terms of service, and other legal information.

## File Paths

**Screens:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/legal/presentation/screens/LegalScreen.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/legal/presentation/screens/PrivacyPolicyScreen.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/legal/presentation/screens/TermsOfServiceScreen.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/legal/presentation/screens/LegalContentScreen.tsx`

**Components:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/legal/presentation/components/LegalScreenHeader.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/legal/presentation/components/LegalDocumentsList.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/legal/presentation/components/LegalLinks.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/legal/presentation/components/LegalSection.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/legal/presentation/components/LegalItem.tsx`

**Services:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/legal/domain/services/UrlHandlerService.ts`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/legal/domain/services/ContentValidationService.ts`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/legal/domain/services/StyleCacheService.ts`

**Domain:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/legal/domain/entities/LegalConfig.ts`

**Index:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/legal/index.ts`

## Strategy

1. **Content Validation**: Use ContentValidationService to ensure legal screens have proper content before rendering
2. **URL Handling**: Use UrlHandlerService for consistent external URL opening with error handling
3. **Style Caching**: Optimize performance with StyleCacheService to avoid recreating styles on every render
4. **Modular Components**: Compose legal screens from smaller components (LegalItem, LegalSection, etc.) for reusability
5. **Accessibility First**: Ensure all legal content is properly accessible with semantic markup and labels

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT display legal screens without validating required content (title, content, or URL)
- ❌ DO NOT open external URLs without using UrlHandlerService
- ❌ DO NOT bypass ContentValidationService when rendering legal content
- ❌ DO NOT hardcode legal content directly in components - always pass as props

### NEVER
- ❌ NEVER use LegalContentScreen without providing both styleCacheKey and createStyles
- ❌ NEVER open URLs without proper error handling (try-catch)
- ❌ NEVER skip accessibility considerations for legal content
- ❌ NEVER use legal components without providing proper testIDs for testing

### AVOID
- ❌ AVOID inline style creation in render methods - use StyleCacheService
- ❌ AVOID mixing legal content with business logic
- ❌ AVOID creating custom legal screens when LegalContentScreen can be configured
- ❌ AVOID storing large legal documents in component state

## Rules

### ALWAYS
- ✅ ALWAYS validate screen content using ContentValidationService before rendering
- ✅ ALWAYS use UrlHandlerService for opening external URLs
- ✅ ALWAYS provide proper error handling for URL operations
- ✅ ALWAYS include testID props for E2E testing
- ✅ ALWAYS use StyleCacheService for style optimization in LegalContentScreen

### MUST
- ✅ MUST provide title prop to all legal screen components
- ✅ MUST provide styleCacheKey and createStyles to LegalContentScreen
- ✅ MUST handle URL opening errors gracefully with user feedback
- ✅ MUST ensure legal content is readable and accessible
- ✅ MUST provide localized legal content for all supported languages

### SHOULD
- ✅ SHOULD provide inline content with URL fallback for offline access
- ✅ SHOULD keep legal documents updated with version tracking
- ✅ SHOULD use proper typography and spacing for readability
- ✅ SHOULD implement proper navigation between legal documents
- ✅ SHOULD cache legal content for better performance

## AI Agent Guidelines

1. **Screen Selection**: Use LegalScreen for hub, PrivacyPolicyScreen/TermsOfServiceScreen for specific documents, LegalContentScreen for custom legal documents
2. **Validation**: Always use ContentValidationService to validate screen props before rendering
3. **URL Handling**: Always use UrlHandlerService for external URLs - never use Linking directly
4. **Performance**: Always use StyleCacheService in LegalContentScreen to optimize style creation
5. **Accessibility**: Always ensure legal content meets accessibility standards with proper semantic structure

## Related

- **Settings**: Main settings management
- **Disclaimer**: Disclaimer notices and modals
- **Storage**: Persistent legal content storage

## License

MIT
