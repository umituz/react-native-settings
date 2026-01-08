# Video Tutorials Domain

The Video Tutorials domain provides components for displaying and managing video tutorials in your React Native app. It supports featured tutorials, categorized lists, and external video linking.

## Features

- **Video Tutorials Screen**: Full-screen viewer for tutorial collections
- **Featured Tutorials**: Horizontal scrolling list for featured content
- **Tutorial Cards**: Rich cards with thumbnails, titles, and metadata
- **Categorized Sections**: Organize tutorials by topic or category
- **Loading States**: Built-in loading and empty states
- **External Video Support**: Link to YouTube, Vimeo, and other platforms

## Installation

This domain is part of `@umituz/react-native-settings`. Install the package to use it:

```bash
npm install @umituz/react-native-settings
```

## Components

### VideoTutorialsScreen

Main screen for displaying video tutorials with featured and all tutorials sections.

```tsx
import { VideoTutorialsScreen } from '@umituz/react-native-settings';

function MyVideoTutorials() {
  const tutorials = [
    {
      id: '1',
      title: 'Getting Started',
      description: 'Learn the basics',
      thumbnailUrl: 'https://example.com/thumb1.jpg',
      videoUrl: 'https://youtube.com/watch?v=xxx',
      duration: '5:30',
      category: 'Basics',
    },
    // ... more tutorials
  ];

  return (
    <VideoTutorialsScreen
      tutorials={tutorials}
      featuredTutorials={tutorials.slice(0, 3)}
      title="Video Tutorials"
      onTutorialPress={(tutorial) => {
        // Open video player or navigate
        openVideo(tutorial.videoUrl);
      }}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tutorials` | `VideoTutorial[]` | **Required** | All tutorials to display |
| `featuredTutorials` | `VideoTutorial[]` | `undefined` | Featured tutorials |
| `title` | `string` | `'Video Tutorials'` | Screen title |
| `featuredTitle` | `string` | `'Featured'` | Featured section title |
| `allTutorialsTitle` | `string` | `'All Tutorials'` | All tutorials section title |
| `emptyMessage` | `string` | `'No tutorials available'` | Empty state message |
| `isLoading` | `boolean` | `false` | Loading state |
| `onTutorialPress` | `(tutorial) => void` | `undefined` | Tutorial press handler |

### VideoTutorialCard

Individual tutorial card with thumbnail, title, and metadata.

```tsx
import { VideoTutorialCard } from '@umituz/react-native-settings';

function MyTutorialCard() {
  const tutorial = {
    id: '1',
    title: 'Tutorial Title',
    description: 'Tutorial description',
    thumbnailUrl: 'https://example.com/thumb.jpg',
    videoUrl: 'https://youtube.com/watch?v=xxx',
    duration: '10:25',
    views: 1500,
  };

  return (
    <VideoTutorialCard
      tutorial={tutorial}
      onPress={() => console.log('Play video')}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tutorial` | `VideoTutorial` | **Required** | Tutorial data |
| `onPress` | `() => void` | **Required** | Press handler |
| `horizontal` | `boolean` | `false` | Horizontal card variant |

### VideoTutorialSection

Section component for grouping tutorials by category.

```tsx
import { VideoTutorialSection } from '@umituz/react-native-settings';

function MyTutorialSection() {
  const tutorials = [ /* tutorial data */ ];

  return (
    <VideoTutorialSection
      title="Getting Started"
      tutorials={tutorials}
      onTutorialPress={(tutorial) => playVideo(tutorial)}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **Required** | Section title |
| `tutorials` | `VideoTutorial[]` | **Required** | Tutorials in section |
| `onTutorialPress` | `(tutorial) => void` | **Required** | Tutorial press handler |

## Types

### VideoTutorial

```typescript
interface VideoTutorial {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  videoUrl: string;
  duration?: string;
  views?: number;
  category?: string;
  publishedAt?: string;
  author?: string;
}
```

## Examples

### Basic Video Tutorials Screen

```tsx
import React from 'react';
import { VideoTutorialsScreen } from '@umituz/react-native-settings';

const TUTORIALS = [
  {
    id: '1',
    title: 'Introduction to the App',
    description: 'Learn the basic features',
    thumbnailUrl: 'https://picsum.photos/300/200?random=1',
    videoUrl: 'https://youtube.com/watch?v=abc123',
    duration: '5:30',
    category: 'Getting Started',
    views: 12500,
  },
  {
    id: '2',
    title: 'Advanced Features',
    description: 'Master advanced functionality',
    thumbnailUrl: 'https://picsum.photos/300/200?random=2',
    videoUrl: 'https://youtube.com/watch?v=def456',
    duration: '12:45',
    category: 'Advanced',
    views: 8300,
  },
  {
    id: '3',
    title: 'Tips and Tricks',
    description: 'Helpful tips for power users',
    thumbnailUrl: 'https://picsum.photos/300/200?random=3',
    videoUrl: 'https://youtube.com/watch?v=ghi789',
    duration: '8:15',
    category: 'Tips',
    views: 15600,
  },
];

export default function TutorialsScreen() {
  return (
    <VideoTutorialsScreen
      tutorials={TUTORIALS}
      featuredTutorials={TUTORIALS.slice(0, 2)}
      title="Help & Tutorials"
      featuredTitle="Featured Videos"
      allTutorialsTitle="All Tutorials"
      onTutorialPress={(tutorial) => {
        // Open in WebView or navigate to video player
        navigation.navigate('VideoPlayer', { tutorial });
      }}
    />
  );
}
```

### With Loading State

```tsx
function TutorialsScreenWithLoading() {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTutorials();
  }, []);

  const loadTutorials = async () => {
    try {
      const data = await api.fetchTutorials();
      setTutorials(data);
    } catch (error) {
      console.error('Failed to load tutorials:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VideoTutorialsScreen
      tutorials={tutorials}
      isLoading={loading}
      onTutorialPress={handleTutorialPress}
    />
  );
}
```

### Custom Empty State

```tsx
function EmptyTutorialsScreen() {
  return (
    <VideoTutorialsScreen
      tutorials={[]}
      emptyMessage="No tutorials available right now. Check back later!"
      onTutorialPress={() => {}}
    />
  );
}
```

### With Video Player Integration

```tsx
import { VideoTutorialsScreen } from '@umituz/react-native-settings';
import { WebView } from 'react-native-webview';

function TutorialsWithPlayer() {
  const [selectedTutorial, setSelectedTutorial] = useState(null);

  if (selectedTutorial) {
    return (
      <WebView
        source={{ uri: selectedTutorial.videoUrl }}
        style={{ flex: 1 }}
      />
    );
  }

  return (
    <VideoTutorialsScreen
      tutorials={TUTORIALS}
      onTutorialPress={setSelectedTutorial}
    />
  );
}
```

### Using Tutorial Cards Directly

```tsx
import { VideoTutorialCard } from '@umituz/react-native-settings';
import { ScrollView } from 'react-native';

function CustomTutorialsList() {
  return (
    <ScrollView>
      {TUTORIALS.map((tutorial) => (
        <VideoTutorialCard
          key={tutorial.id}
          tutorial={tutorial}
          onPress={() => playVideo(tutorial)}
        />
      ))}
    </ScrollView>
  );
}
```

### Horizontal Featured Section

```tsx
function FeaturedSection() {
  const featuredTutorials = TUTORIALS.filter(t => t.featured);

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>
        Featured Tutorials
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {featuredTutorials.map((tutorial) => (
          <View key={tutorial.id} style={{ marginRight: 12 }}>
            <VideoTutorialCard
              tutorial={tutorial}
              horizontal={true}
              onPress={() => playVideo(tutorial)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
```

### Categorized Tutorials

```tsx
function CategorizedTutorialsScreen() {
  const categories = {
    'Getting Started': TUTORIALS.filter(t => t.category === 'Getting Started'),
    'Advanced': TUTORIALS.filter(t => t.category === 'Advanced'),
    'Tips': TUTORIALS.filter(t => t.category === 'Tips'),
  };

  return (
    <ScrollView>
      {Object.entries(categories).map(([category, tutorials]) => (
        <VideoTutorialSection
          key={category}
          title={category}
          tutorials={tutorials}
          onTutorialPress={playVideo}
        />
      ))}
    </ScrollView>
  );
}
```

### With Search

```tsx
function SearchableTutorials() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTutorials, setFilteredTutorials] = useState(TUTORIALS);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTutorials(TUTORIALS);
    } else {
      const filtered = TUTORIALS.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTutorials(filtered);
    }
  }, [searchQuery]);

  return (
    <View>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search tutorials..."
        style={{ padding: 12, backgroundColor: '#FFF' }}
      />

      <VideoTutorialsScreen
        tutorials={filteredTutorials}
        onTutorialPress={playVideo}
      />
    </View>
  );
}
```

## Architecture

```
src/domains/video-tutorials/
├── types/
│   └── index.ts                    # VideoTutorial types
├── presentation/
│   ├── screens/
│   │   └── VideoTutorialsScreen.tsx
│   └── components/
│       ├── VideoTutorialCard.tsx
│       └── VideoTutorialSection.tsx
└── index.ts                        # Public API exports
```

## Best Practices

1. **Quality Thumbnails**: Use high-quality, consistent thumbnail sizes
2. **Accurate Metadata**: Keep duration and view counts up to date
3. **Categorization**: Organize tutorials logically for easy browsing
4. **Featured Content**: Highlight important or new tutorials
5. **Loading States**: Show proper loading indicators for better UX
6. **Error Handling**: Handle video playback errors gracefully
7. **Offline Support**: Consider caching video information for offline viewing
8. **Progress Tracking**: Track which tutorials users have watched

## Testing

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { VideoTutorialsScreen } from '@umituz/react-native-settings';

describe('VideoTutorialsScreen', () => {
  const tutorials = [
    {
      id: '1',
      title: 'Test Tutorial',
      videoUrl: 'https://youtube.com/watch?v=test',
    },
  ];

  it('renders tutorials list', () => {
    const { getByText } = render(
      <VideoTutorialsScreen
        tutorials={tutorials}
        onTutorialPress={() => {}}
      />
    );

    expect(getByText('Test Tutorial')).toBeTruthy();
  });

  it('calls onTutorialPress when tutorial is pressed', () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <VideoTutorialsScreen
        tutorials={tutorials}
        onTutorialPress={mockPress}
      />
    );

    fireEvent.press(getByText('Test Tutorial'));
    expect(mockPress).toHaveBeenCalledWith(tutorials[0]);
  });

  it('shows empty state when no tutorials', () => {
    const { getByText } = render(
      <VideoTutorialsScreen
        tutorials={[]}
        emptyMessage="No tutorials found"
        onTutorialPress={() => {}}
      />
    );

    expect(getByText('No tutorials found')).toBeTruthy();
  });
});
```

## Related

- **Settings**: Main settings management
- **Help**: Help and support content
- **FAQs**: Frequently asked questions

## License

MIT
