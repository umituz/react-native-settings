# FAQs Domain

## Purpose

Provides comprehensive FAQ (Frequently Asked Questions) management with search functionality, categorization, and expandable items.

## File Paths

**Screens:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/faqs/presentation/screens/FAQScreen.tsx`

**Components:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/faqs/presentation/components/FAQCategory.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/faqs/presentation/components/FAQItem.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/faqs/presentation/components/FAQSearchBar.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/faqs/presentation/components/FAQEmptyState.tsx`

**Hooks:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/faqs/presentation/hooks/useFAQSearch.ts`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/faqs/presentation/hooks/useFAQExpansion.ts`

**Services:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/faqs/domain/services/FAQSearchService.ts`

**Entities:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/faqs/domain/entities/FAQEntity.ts`

**Index:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/faqs/index.ts`

## Strategy

1. **Search Optimization**: Use useFAQSearch hook with FAQSearchService for efficient search across all FAQs
2. **State Management**: Use useFAQExpansion hook to manage expansion state without prop drilling
3. **Categorization**: Organize FAQs by category for better navigation and user experience
4. **Performance**: Implement efficient search and rendering to handle large FAQ lists
5. **Empty States**: Always provide empty state UI when search returns no results

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT implement custom search logic when useFAQSearch provides everything needed
- ❌ DO NOT manage expansion state locally when useFAQExpansion hook is available
- ❌ DO NOT use FAQScreen without providing all required props (categories, searchPlaceholder, emptySearchTitle, emptySearchMessage, headerTitle)
- ❌ DO NOT bypass FAQSearchService for search functionality

### NEVER
- ❌ NEVER use FAQCategory without managing expansion state properly
- ❌ NEVER implement FAQ search without handling empty states
- ❌ NEVER mix FAQ data directly with components - always use proper data structures
- ❌ NEVER create custom FAQ items when FAQItem component can be used

### AVOID
- ❌ AVOID creating complex nested search logic - use the provided search service
- ❌ AVOID hardcoding FAQ data in components - always pass as props
- ❌ AVOID using FAQScreen without proper categorization
- ❌ AVOID creating custom search implementations

## Rules

### ALWAYS
- ✅ ALWAYS provide complete categories array with id, title, and questions
- ✅ ALWAYS use useFAQSearch hook for search functionality
- ✅ ALWAYS use useFAQExpansion hook for managing expansion state
- ✅ ALWAYS provide empty state configuration (emptySearchTitle, emptySearchMessage)
- ✅ ALWAYS organize FAQs into logical categories

### MUST
- ✅ MUST provide searchPlaceholder, emptySearchTitle, emptySearchMessage, and headerTitle to FAQScreen
- ✅ MUST include unique id for each FAQ category and item
- ✅ MUST handle empty search results gracefully with FAQEmptyState
- ✅ MUST provide clear and concise answers in FAQ items
- ✅ MUST use FAQCategory and FAQItem components for consistency

### SHOULD
- ✅ SHOULD keep answers concise and easy to understand
- ✅ SHOULD use clear keywords in questions and answers for better search
- ✅ SHOULD regularly update FAQs based on user feedback
- ✅ SHOULD provide FAQs in all supported languages
- ✅ SHOULD use proper visual hierarchy with good spacing and typography

## AI Agent Guidelines

1. **Hook Usage**: Always use useFAQSearch for search functionality and useFAQExpansion for expansion state
2. **Data Structure**: Always structure FAQ data with categories containing id, title, and questions array
3. **Component Selection**: Use FAQScreen for full screens, FAQCategory for sections, FAQItem for individual items
4. **Search Implementation**: Always use the provided search service - never implement custom search
5. **Empty States**: Always provide proper empty state UI when no search results are found

## Related

- **Settings**: Main settings management
- **Support**: Customer support components
- **Help**: Help documentation

## License

MIT
