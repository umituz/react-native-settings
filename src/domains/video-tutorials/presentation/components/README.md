# Video Tutorials Components

## Purpose

Components for displaying video tutorials including cards, sections, and the main tutorials screen. Provides a complete video learning experience within the app with search, categories, and playback capabilities.

## File Paths

- **VideoTutorialCard**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/video-tutorials/presentation/components/VideoTutorialCard.tsx`
- **VideoTutorialSection**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/video-tutorials/presentation/components/VideoTutorialSection.tsx`
- **VideoTutorialsScreen**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/video-tutorials/presentation/screens/VideoTutorialsScreen.tsx`
- **Tutorial Components**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/video-tutorials/presentation/components/`

## Strategy

1. **Visual Discovery**: Uses thumbnail-based card layouts to make tutorials visually appealing and discoverable. Horizontal scrolling sections allow users to quickly browse many tutorials without deep navigation.

2. **Metadata Display**: Shows key metadata (duration, view count, publish date) to help users assess tutorial relevance and time commitment before watching.

3. **Organized Structure**: Groups tutorials into categories and sections, making it easy for users to find relevant content based on their skill level or specific interests.

4. **Search and Filter**: Includes search functionality to help users quickly find specific tutorials, with real-time filtering as they type.

5. **Flexible Playback**: Supports both embedded video players and external video apps (YouTube, Vimeo) to accommodate different content hosting strategies.

## Restrictions

### ❌ DO NOT

- Use low-quality or blurry thumbnails
- Hide important tutorial metadata
- Mix horizontal and vertical layouts inconsistently
- Auto-play videos without user consent
- Show excessive ads or interruptions

### ❌ NEVER

- Display broken or unavailable videos
- Use incorrect thumbnail URLs
- Mix aspect ratios (always use 16:9)
- Allow simultaneous video playback
- Bypass content rating or age restrictions

### ❌ AVOID

- Overly long tutorial titles (truncate if necessary)
- Cluttered layouts with too much information
- Slow thumbnail loading without placeholders
- Difficult category navigation
- Missing or incomplete tutorial descriptions

## Rules

### ✅ ALWAYS

- Use high-quality thumbnails with 16:9 aspect ratio
- Display video duration prominently
- Show view counts for social proof
- Organize tutorials into logical categories
- Provide search functionality

### ✅ MUST

- Handle video loading errors gracefully
- Show placeholder while thumbnails load
- Support both embedded and external videos
- Mark external videos clearly
- Track tutorial views for analytics

### ✅ SHOULD

- Implement skeleton loading states
- Show featured tutorials prominently
- Use horizontal scroll for categories
- Filter by category or search
- Show tutorial progress/completion
- Support offline viewing when possible

## AI Agent Guidelines

1. **Thumbnail Quality**: Always use high-quality thumbnail images (recommended resolution 1280x720px). Implement lazy loading and show skeleton screens while thumbnails load. Use placeholder colors or gradients if thumbnails fail to load.

2. **Metadata Display**: Show duration on all tutorial cards to help users decide if they have time to watch. Display view counts to provide social proof and indicate popularity. Include publish date for time-sensitive content.

3. **Layout Strategy**: Use horizontal scrolling sections for featured tutorials and categories to maximize content density. Use vertical lists for comprehensive tutorial browsing. Maintain consistent card widths (280-320px) for horizontal sections.

4. **External Videos**: Mark videos that open in external apps (YouTube, Vimeo) with clear indicators. Handle deep linking properly to ensure videos open in the user's preferred app. Test on both iOS and Android as video handling differs.

5. **Empty States**: Provide meaningful empty states when no tutorials are available or search returns no results. Use friendly illustrations and helpful text. Include call-to-action buttons to browse all tutorials or contact support.

## Reference

- **Card Component**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/video-tutorials/presentation/components/VideoTutorialCard.tsx`
- **Section Component**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/video-tutorials/presentation/components/VideoTutorialSection.tsx`
- **Main Screen**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/video-tutorials/presentation/screens/VideoTutorialsScreen.tsx`
- **Tutorial Components**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/video-tutorials/presentation/components/`
- **Video Player**: Check for video player implementation for playback functionality
