# StarRating Component

## Purpose

Interactive star rating component with customizable appearance, behavior, and animations. Provides an intuitive, accessible way for users to rate items and display existing ratings with visual polish.

## File Paths

- **StarRating**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/rating/presentation/components/StarRating.tsx`
- **Rating Components**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/rating/presentation/components/`
- **Rating Screen**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/rating/presentation/screens/RatingScreen.tsx`

## Strategy

1. **Dual Mode Operation**: Supports both interactive rating input (writable) and read-only display modes, making it versatile for collecting and displaying ratings throughout the app.

2. **Accessibility Excellence**: Implements comprehensive accessibility features including labels, hints, and semantic values to ensure screen reader users can understand and interact with ratings.

3. **Visual Customization**: Provides extensive customization options for size, colors, spacing, and icons while maintaining consistent visual design through the design system.

4. **Smooth Animations**: Includes default animations for rating changes to provide delightful user feedback, with the option to disable animations for performance or preference.

5. **Flexible Icon System**: Supports custom icon types beyond stars (hearts, thumbs up, etc.) to adapt to different rating contexts and branding requirements.

## Restrictions

### ❌ DO NOT

- Use for non-rating purposes (likes, votes, etc.)
- Display fractional ratings without clear indication
- Mix different icon styles within the same rating context
- Override accessibility properties
- Use excessive star counts (keep under 10)

### ❌ NEVER

- Allow negative ratings or ratings exceeding maxStars
- Display invalid or undefined rating values
- Bypass readonly mode for display-only ratings
- Use without proper accessibility labels
- Create circular dependencies with form components

### ❌ AVOID

- Very small star sizes that are hard to tap (minimum 24px)
- Clashing color schemes that reduce accessibility
- Over-animated ratings that distract users
- Inconsistent rating scales across the app
- Confusing half-star implementations

## Rules

### ✅ ALWAYS

- Use readonly mode for displaying existing ratings
- Provide clear accessibility labels describing the rating
- Ensure sufficient touch target size (minimum 44x44)
- Maintain consistent rating scale throughout the app
- Show rating values numerically alongside stars

### ✅ MUST

- Pass rating prop as a number between 0 and maxStars
- Include onRatingChange handler for interactive ratings
- Use appropriate colors that meet contrast standards
- Display rating text/labels for clarity
- Test both light and dark theme appearances

### ✅ SHOULD

- Use 5 stars as the default rating scale
- Include rating labels (Poor, Fair, Good, etc.) when appropriate
- Animate rating changes for better UX
- Show average ratings when displaying multiple ratings
- Collect ratings after meaningful interactions
- Consider implementing "tap to rate" hints for first-time users

## AI Agent Guidelines

1. **Rating Context**: Use StarRating immediately after meaningful interactions (feature usage, purchase completion, etc.) to capture fresh user feedback. Context-aware ratings are more accurate and valuable.

2. **Read-Only Display**: For displaying average ratings or review summaries, always use readonly mode. Combine the star display with numerical ratings (e.g., "4.5 out of 5") for clarity and accessibility.

3. **Interactive Collection**: When collecting new ratings, provide clear context about what is being rated. Include labels or hints explaining the rating scale. Consider showing rating descriptions (Poor to Excellent) that update dynamically as users select ratings.

4. **Visual Hierarchy**: Make the rating component prominent but not overwhelming. Use appropriate sizes (24-32px for inline, 40-48px for dedicated rating screens). Ensure star colors match the app's primary or accent color for consistency.

5. **Feedback Integration**: After rating collection, immediately acknowledge the submission. For low ratings (1-2 stars), consider following up with a feedback form to understand issues. For high ratings (4-5 stars), encourage reviews or referrals.

## Reference

- **Component Implementation**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/rating/presentation/components/StarRating.tsx`
- **Rating Screen**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/rating/presentation/screens/RatingScreen.tsx`
- **Rating Components**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/rating/presentation/components/`
- **Feedback Domain**: Combine with feedback components for comprehensive user input collection
