# Video Tutorials Domain

## Purpose

Provides components for displaying and managing video tutorials with featured sections, categorized lists, thumbnails, and external video linking.

## File Paths

**Screens:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/video-tutorials/presentation/screens/VideoTutorialsScreen.tsx`

**Components:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/video-tutorials/presentation/components/VideoTutorialCard.tsx`
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/video-tutorials/presentation/components/VideoTutorialSection.tsx`

**Types:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/video-tutorials/types/index.ts`

**Index:**
- `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/video-tutorials/index.ts`

## Strategy

1. **Featured Content**: Display featured tutorials in horizontal scrolling section for prominence
2. **Categorization**: Organize tutorials by category for better navigation
3. **Rich Metadata**: Include thumbnails, duration, views, and descriptions for better UX
4. **External Linking**: Support linking to YouTube, Vimeo, and other platforms
5. **Loading States**: Show proper loading and empty states for better UX

## Restrictions (Forbidden)

### DO NOT
- ❌ DO NOT use VideoTutorialsScreen without providing tutorials array
- ❌ DO NOT display tutorials without proper thumbnails
- ❌ DO NOT bypass loading states when tutorials are being fetched
- ❌ DO NOT mix video tutorial logic with other business logic

### NEVER
- ❌ NEVER use VideoTutorialCard without required tutorial data (id, title, videoUrl)
- ❌ NEVER embed video players directly - link to external platforms
- ❌ NEVER show tutorials without proper error handling
- ❌ NEVER create custom tutorial card components when VideoTutorialCard exists

### AVOID
- ❌ AVOID hardcoding tutorial data in components - always pass as props
- ❌ AVOID using inconsistent thumbnail sizes
- ❌ AVOID creating custom tutorial lists when VideoTutorialsScreen can be configured
- ❌ AVOID mixing video playback logic with tutorial display logic

## Rules

### ALWAYS
- ✅ ALWAYS provide tutorials array with at least id, title, and videoUrl
- ✅ ALWAYS provide onTutorialPress handler for tutorial cards
- ✅ ALWAYS handle loading states with isLoading prop
- ✅ ALWAYS provide empty state message when no tutorials available
- ✅ ALWAYS use consistent thumbnail sizes across all tutorials

### MUST
- ✅ MUST provide unique id for each tutorial
- ✅ MUST include videoUrl for all tutorials
- ✅ MUST provide proper metadata (thumbnailUrl, duration, views, category)
- ✅ MUST handle video playback errors gracefully
- ✅ MUST use VideoTutorial types for type safety

### SHOULD
- ✅ SHOULD use high-quality, consistent thumbnail sizes
- ✅ SHOULD keep metadata accurate and up to date
- ✅ SHOULD organize tutorials logically by category
- ✅ SHOULD highlight important or new tutorials in featured section
- ✅ SHOULD support offline viewing by caching tutorial information

## AI Agent Guidelines

1. **Component Selection**: Use VideoTutorialsScreen for full screens, VideoTutorialCard for individual cards, VideoTutorialSection for categorized sections
2. **Data Structure**: Always structure tutorial data with id, title, videoUrl, and optional metadata
3. **External Playback**: Always link to external platforms (YouTube, Vimeo) - never embed players directly
4. **Loading States**: Always show proper loading indicators when fetching tutorials
5. **Metadata**: Always include rich metadata (thumbnails, duration, views) for better UX

## Related

- **Settings**: Main settings management
- **Help**: Help and support content
- **FAQs**: Frequently asked questions

## License

MIT
