# Rating Domain

## Purpose

Provides star rating component and rating management utilities for collecting and displaying user ratings with customizable appearance.

## File Paths

**Components:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/rating/presentation/components/StarRating.tsx`

**Entities:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/rating/domain/entities/Rating.ts`

**Index:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/rating/index.ts`

## Strategy

1. **Interactive Feedback**: Provide immediate visual feedback when users interact with rating stars
2. **Read-Only Support**: Support both interactive and read-only display modes
3. **Customization**: Allow customization of colors, sizes, and star count
4. **Accessibility**: Ensure proper accessibility labels for screen readers
5. **Type Safety**: Use TypeScript types for rating values (0-5)

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT use StarRating without providing rating prop
- ❌ DO NOT bypass the rating prop validation
- ❌ DO NOT use non-standard rating values outside the 0-5 range
- ❌ DO NOT mix rating display logic with business logic

### NEVER
- ❌ NEVER use StarRating for non-rating purposes (e.g., progress indicators)
- ❌ NEVER allow ratings without explaining what users are rating
- ❌ NEVER use inappropriate colors for filled stars (use standard gold/yellow)
- ❌ NEVER implement custom rating components when StarRating can be configured

### AVOID
- ❌ AVOID creating custom rating UI when StarRating provides everything needed
- ❌ AVOID using different star sizes across the app inconsistently
- ❌ AVOID using rating components without proper accessibility labels
- ❌ AVOID mixing interactive and read-only modes without clear distinction

## Rules

### ALWAYS
- ✅ ALWAYS provide rating prop to StarRating (required)
- ✅ ALWAYS provide onRatingChange handler for interactive ratings
- ✅ ALWAYS use standard colors (gold/yellow) for filled stars
- ✅ ALWAYS include proper accessibility labels for screen readers
- ✅ ALWAYS explain what users are rating before displaying the component

### MUST
- ✅ MUST keep rating values within 0-5 range
- ✅ MUST use disabled prop for read-only display
- ✅ MUST ensure proper contrast ratios for accessibility
- ✅ MUST use consistent star sizes across the app
- ✅ MUST handle rating changes properly with validation

### SHOULD
- ✅ SHOULD allow users to change their rating before submitting
- ✅ SHOULD show selected rating immediately
- ✅ SHOULD make ratings prominent but not overwhelming
- ✅ SHOULD use RatingValue type for type safety
- ✅ SHOULD provide visual feedback on rating selection

## AI Agent Guidelines

1. **Component Usage**: Always use StarRating for all rating displays - never create custom rating components
2. **Mode Selection**: Use interactive mode (with onRatingChange) for collecting ratings, disabled mode for display
3. **Customization**: Use activeColor and inactiveColor props for customization - never modify component directly
4. **Accessibility**: Always ensure proper accessibility labels and contrast ratios
5. **Type Safety**: Always use RatingValue type for rating values - never use loose number types

## Related

- **Feedback**: Feedback forms with ratings
- **Reviews**: User review management
- **Settings**: Main settings management

## License

MIT
