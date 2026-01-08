# Video Tutorials Components

Components for displaying video tutorials including cards, sections, and the main tutorials screen.

## Components

### VideoTutorialCard

Card component for displaying individual video tutorials with thumbnails, titles, and metadata.

```tsx
import { VideoTutorialCard } from '@umituz/react-native-settings';

function TutorialsList() {
  const tutorial = {
    id: '1',
    title: 'Getting Started with Settings',
    description: 'Learn how to configure your app settings',
    thumbnail: 'https://example.com/thumb.jpg',
    duration: '5:30',
    views: 1234,
  };

  return (
    <VideoTutorialCard
      tutorial={tutorial}
      onPress={() => playTutorial(tutorial.id)}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tutorial` | `VideoTutorial` | **Required** | Tutorial data object |
| `onPress` | `() => void` | `undefined` | Press handler |
| `showDuration` | `boolean` | `true` | Show video duration |
| `showViews` | `boolean` | `true` | Show view count |
| `style` | `ViewStyle` | `undefined` | Custom container style |

#### Example

```tsx
<VideoTutorialCard
  tutorial={{
    id: '1',
    title: 'Advanced Settings',
    description: 'Deep dive into settings configuration',
    thumbnail: 'https://example.com/thumb.jpg',
    duration: '10:15',
    views: 5678,
    publishedAt: new Date('2024-01-01'),
  }}
  onPress={() => navigation.navigate('VideoPlayer', { tutorialId: '1' })}
  showDuration={true}
  showViews={true}
/>
```

### VideoTutorialSection

Section component for grouping related video tutorials with a header.

```tsx
import { VideoTutorialSection } from '@umituz/react-native-settings';

function FeaturedSection() {
  const tutorials = [
    { id: '1', title: 'Tutorial 1', thumbnail: '...' },
    { id: '2', title: 'Tutorial 2', thumbnail: '...' },
  ];

  return (
    <VideoTutorialSection
      title="Featured Tutorials"
      tutorials={tutorials}
      horizontal={true}
      onTutorialPress={(tutorial) => playTutorial(tutorial)}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **Required** | Section title |
| `tutorials` | `VideoTutorial[]` | **Required** | Array of tutorials |
| `horizontal` | `boolean` | `false` | Horizontal scroll |
| `onTutorialPress` | `(tutorial: VideoTutorial) => void` | `undefined` | Press handler |
| `style` | `ViewStyle` | `undefined` | Custom container style |

#### Example

```tsx
<VideoTutorialSection
  title="Getting Started"
  tutorials={gettingStartedTutorials}
  horizontal={true}
  onTutorialPress={(tutorial) => {
    Analytics.track('tutorial_opened', { id: tutorial.id });
    navigation.navigate('VideoPlayer', { tutorial });
  }}
/>
```

### VideoTutorialsScreen

Main screen component for browsing all video tutorials with search and categories.

```tsx
import { VideoTutorialsScreen } from '@umituz/react-native-settings';

function TutorialsScreen() {
  return (
    <VideoTutorialsScreen
      categories={tutorialCategories}
      tutorials={allTutorials}
      featuredTutorials={featuredTutorials}
      onTutorialPress={handleTutorialPress}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `categories` | `TutorialCategory[]` | `[]` | Tutorial categories |
| `tutorials` | `VideoTutorial[]` | `[]` | All tutorials |
| `featuredTutorials` | `VideoTutorial[]` | `[]` | Featured tutorials |
| `onTutorialPress` | `(tutorial: VideoTutorial) => void` | **Required** | Press handler |
| `showSearch` | `boolean` | `true` | Show search bar |
| `showFeatured` | `boolean` | `true` | Show featured section |

#### Example

```tsx
<VideoTutorialsScreen
  categories={[
    { id: 'getting-started', title: 'Getting Started', count: 5 },
    { id: 'advanced', title: 'Advanced', count: 8 },
  ]}
  tutorials={allTutorials}
  featuredTutorials={[tutorial1, tutorial2, tutorial3]}
  onTutorialPress={(tutorial) => {
    navigation.navigate('VideoPlayer', { tutorialId: tutorial.id });
  }}
  showSearch={true}
  showFeatured={true}
/>
```

## Data Types

### VideoTutorial

```typescript
interface VideoTutorial {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  duration?: string;        // e.g., "5:30"
  views?: number;
  publishedAt?: Date;
  categoryId?: string;
  url?: string;             // Video URL
  isExternal?: boolean;     // Open in external app
}
```

### TutorialCategory

```typescript
interface TutorialCategory {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  count?: number;           // Number of tutorials in category
}
```

## Examples

### Basic Tutorial Card

```tsx
<VideoTutorialCard
  tutorial={{
    id: '1',
    title: 'Introduction to Settings',
    thumbnail: 'https://example.com/thumb1.jpg',
  }}
  onPress={() => console.log('Pressed')}
/>
```

### Detailed Tutorial Card

```tsx
<VideoTutorialCard
  tutorial={{
    id: '2',
    title: 'Advanced Configuration',
    description: 'Learn advanced settings options',
    thumbnail: 'https://example.com/thumb2.jpg',
    duration: '12:45',
    views: 3456,
    publishedAt: new Date('2024-01-15'),
  }}
  onPress={() => playTutorial('2')}
  showDuration={true}
  showViews={true}
/>
```

### Horizontal Section

```tsx
<VideoTutorialSection
  title="Featured"
  tutorials={featuredTutorials}
  horizontal={true}
  onTutorialPress={(tutorial) => {
    navigation.navigate('VideoPlayer', { tutorialId: tutorial.id });
  }}
/>
```

### Vertical Section

```tsx
<VideoTutorialSection
  title="All Tutorials"
  tutorials={allTutorials}
  horizontal={false}
  onTutorialPress={(tutorial) => {
    navigation.navigate('VideoPlayer', { tutorialId: tutorial.id });
  }}
/>
```

### Complete Screen

```tsx
function TutorialsScreenWrapper() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTutorials = useMemo(() => {
    return allTutorials.filter(tutorial => {
      const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || tutorial.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <VideoTutorialsScreen
      categories={categories}
      tutorials={filteredTutorials}
      featuredTutorials={featuredTutorials}
      onTutorialPress={handleTutorialPress}
      showSearch={true}
      showFeatured={true}
    />
  );
}
```

### External Videos

```tsx
<VideoTutorialCard
  tutorial={{
    id: 'yt-1',
    title: 'Video Tutorial on YouTube',
    thumbnail: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg',
    duration: '8:20',
    url: 'https://youtube.com/watch?v=VIDEO_ID',
    isExternal: true,
  }}
  onPress={(tutorial) => {
    if (tutorial.isExternal && tutorial.url) {
      Linking.openURL(tutorial.url);
    }
  }}
/>
```

## Styling

### Card Styles

```tsx
<VideoTutorialCard
  tutorial={tutorial}
  style={{
    width: 280,
    marginHorizontal: 8,
    borderRadius: 12,
    overflow: 'hidden',
  }}
/>
```

### Thumbnail Styles

Thumbnails are displayed with aspect ratio preserved:

```tsx
<Image
  source={{ uri: tutorial.thumbnail }}
  style={{
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#f0f0f0',
  }}
/>
```

### Overlay Information

Duration and views are overlaid on the thumbnail:

```tsx
<View style={styles.overlay}>
  <View style={styles.duration}>
    <Text style={styles.durationText}>{tutorial.duration}</Text>
  </View>
  <View style={styles.views}>
    <Ionicons name="eye-outline" size={14} color="white" />
    <Text style={styles.viewsText}>{formatViews(tutorial.views)}</Text>
  </View>
</View>
```

## Loading States

### Skeleton Loading

```tsx
function TutorialCardSkeleton() {
  return (
    <View style={styles.skeleton}>
      <View style={styles.thumbnailSkeleton} />
      <View style={styles.titleSkeleton} />
      <View style={styles.descriptionSkeleton} />
    </View>
  );
}

function TutorialsList() {
  const { data, isLoading } = useTutorials();

  if (isLoading) {
    return (
      <ScrollView horizontal>
        <TutorialCardSkeleton />
        <TutorialCardSkeleton />
        <TutorialCardSkeleton />
      </ScrollView>
    );
  }

  return (
    <VideoTutorialSection
      title="Tutorials"
      tutorials={data}
      horizontal={true}
    />
  );
}
```

## Empty States

### No Tutorials

```tsx
function EmptyTutorials() {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="videocam-outline" size={64} color="#ccc" />
      <Text style={styles.emptyTitle}>No Tutorials</Text>
      <Text style={styles.emptyMessage}>
        Check back later for new tutorials
      </Text>
    </View>
  );
}
```

### No Search Results

```tsx
function NoSearchResults({ query }) {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="search-outline" size={64} color="#ccc" />
      <Text style={styles.emptyTitle}>No Results</Text>
      <Text style={styles.emptyMessage}>
        No tutorials found for "{query}"
      </Text>
    </View>
  );
}
```

## Best Practices

1. **Thumbnails**: Use high-quality thumbnails (16:9 aspect ratio)
2. **Duration**: Always show video duration
3. **Metadata**: Include views and publish date
4. **External**: Mark external videos clearly
5. **Loading**: Show skeleton loaders while loading
6. **Empty**: Provide meaningful empty states
7. **Accessibility**: Add proper accessibility labels

## Related

- **Video Tutorials Domain**: Video tutorials domain documentation
- **VideoTutorialsScreen**: Main screen component

## License

MIT
