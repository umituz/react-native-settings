# FAQs Domain

The FAQs domain provides comprehensive FAQ (Frequently Asked Questions) management with search functionality, categorization, and expandable items for your React Native app.

## Features

- **FAQ Screen**: Full-screen FAQ viewer with search
- **Search Functionality**: Real-time search across all FAQs
- **Categorized Questions**: Organize FAQs into categories
- **Expandable Items**: Tap to expand/collapse answers
- **Empty States**: Handle no search results gracefully
- **Custom Styling**: Fully customizable appearance
- **Performance Optimized**: Efficient search and rendering

## Installation

This domain is part of `@umituz/react-native-settings`. Install the package to use it:

```bash
npm install @umituz/react-native-settings
```

## Components

### FAQScreen

Main screen for displaying FAQs with search functionality.

```tsx
import { FAQScreen } from '@umituz/react-native-settings';

function MyFAQScreen() {
  const categories = [
    {
      id: 'general',
      title: 'General',
      questions: [
        {
          id: 'q1',
          question: 'What is this app?',
          answer: 'This app helps you manage your tasks efficiently.',
        },
        {
          id: 'q2',
          question: 'Is it free?',
          answer: 'Yes, the basic version is completely free.',
        },
      ],
    },
    {
      id: 'account',
      title: 'Account',
      questions: [
        {
          id: 'q3',
          question: 'How do I reset my password?',
          answer: 'Go to Settings > Account > Reset Password.',
        },
      ],
    },
  ];

  return (
    <FAQScreen
      categories={categories}
      searchPlaceholder="Search FAQs..."
      emptySearchTitle="No results found"
      emptySearchMessage="Try different keywords"
      headerTitle="Frequently Asked Questions"
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `categories` | `FAQCategory[]` | **Required** | FAQ categories |
| `searchPlaceholder` | `string` | **Required** | Search input placeholder |
| `emptySearchTitle` | `string` | **Required** | Empty state title |
| `emptySearchMessage` | `string` | **Required** | Empty state message |
| `headerTitle` | `string` | **Required** | Screen header title |
| `onBack` | `() => void` | `undefined` | Back button handler |
| `renderHeader` | `(props) => ReactElement` | `undefined` | Custom header renderer |
| `styles` | `FAQScreenStyles` | `undefined` | Custom styles |

### FAQCategory

Component for rendering a single FAQ category with questions.

```tsx
import { FAQCategory } from '@umituz/react-native-settings';

function MyFAQCategory() {
  const category = {
    id: 'general',
    title: 'General Questions',
    questions: [
      {
        id: 'q1',
        question: 'What is this?',
        answer: 'Answer here...',
      },
    ],
  };

  const isExpanded = { q1: true };
  const onToggle = (id) => console.log('Toggle:', id);

  return (
    <FAQCategory
      category={category}
      isExpanded={isExpanded}
      onToggleItem={onToggle}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `category` | `FAQCategory` | **Required** | Category data |
| `isExpanded` | `Record<string, boolean>` | **Required** | Expansion state |
| `onToggleItem` | `(id) => void` | **Required** | Toggle handler |
| `styles` | `FAQCategoryStyles` | `undefined` | Custom styles |

### FAQItem

Individual FAQ item with expandable answer.

```tsx
import { FAQItem } from '@umituz/react-native-settings';

function MyFAQItem() {
  return (
    <FAQItem
      question="What is your return policy?"
      answer="You can return items within 30 days of purchase."
      isExpanded={true}
      onToggle={() => console.log('Toggle')}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `question` | `string` | **Required** | Question text |
| `answer` | `string` | **Required** | Answer text |
| `isExpanded` | `boolean` | **Required** | Expansion state |
| `onToggle` | `() => void` | **Required** | Toggle handler |

### FAQSearchBar

Search input component for filtering FAQs.

```tsx
import { FAQSearchBar } from '@umituz/react-native-settings';

function MyFAQSearch() {
  const [query, setQuery] = useState('');

  return (
    <FAQSearchBar
      value={query}
      onChangeText={setQuery}
      placeholder="Search questions..."
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **Required** | Search query |
| `onChangeText` | `(text) => void` | **Required** | Text change handler |
| `placeholder` | `string` | **Required** | Placeholder text |
| `styles` | `FAQSearchBarStyles` | `undefined` | Custom styles |

### FAQEmptyState

Empty state component for no search results.

```tsx
import { FAQEmptyState } from '@umituz/react-native-settings';

function MyEmptyState() {
  return (
    <FAQEmptyState
      title="No FAQs Found"
      message="We couldn't find any FAQs matching your search."
      iconName="search"
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **Required** | Empty state title |
| `message` | `string` | **Required** | Empty state message |
| `iconName` | `string` | `undefined` | Custom icon name |
| `styles` | `FAQEmptyStateStyles` | `undefined` | Custom styles |

## Hooks

### useFAQSearch

Hook for managing FAQ search state and filtering.

```tsx
import { useFAQSearch } from '@umituz/react-native-settings';

function FAQSearchComponent() {
  const categories = [ /* FAQ categories */ ];

  const {
    searchQuery,
    setSearchQuery,
    filteredCategories,
    hasResults,
  } = useFAQSearch(categories);

  return (
    <View>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search..."
      />
      {hasResults ? (
        <FAQList categories={filteredCategories} />
      ) : (
        <Text>No results</Text>
      )}
    </View>
  );
}
```

#### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `searchQuery` | `string` | Current search query |
| `setSearchQuery` | `(query) => void` | Set search query |
| `filteredCategories` | `FAQCategory[]` | Filtered categories |
| `hasResults` | `boolean` | Whether search has results |

### useFAQExpansion

Hook for managing FAQ item expansion state.

```tsx
import { useFAQExpansion } from '@umituz/react-native-settings';

function FAQExpansionComponent() {
  const { isExpanded, toggleExpansion } = useFAQExpansion();

  return (
    <FAQItem
      question="Question"
      answer="Answer"
      isExpanded={isExpanded['q1']}
      onToggle={() => toggleExpansion('q1')}
    />
  );
}
```

#### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `isExpanded` | `Record<string, boolean>` | Expansion state map |
| `toggleExpansion` | `(id) => void` | Toggle item expansion |

## Types

### FAQCategory

```typescript
interface FAQCategory {
  id: string;
  title: string;
  questions: FAQItem[];
}
```

### FAQItem

```typescript
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
```

### FAQScreenStyles

```typescript
interface FAQScreenStyles {
  container?: ViewStyle;
  header?: ViewStyle;
  title?: TextStyle;
  content?: ViewStyle;
  searchBar?: FAQSearchBarStyles;
  emptyState?: FAQEmptyStateStyles;
  category?: FAQCategoryStyles;
}
```

## Examples

### Basic FAQ Screen

```tsx
import React from 'react';
import { FAQScreen } from '@umituz/react-native-settings';

const FAQ_DATA = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    questions: [
      {
        id: 'gs1',
        question: 'How do I create an account?',
        answer: 'Tap the "Sign Up" button and enter your email and password.',
      },
      {
        id: 'gs2',
        question: 'Is the app free to use?',
        answer: 'Yes, the basic features are completely free. Premium features require a subscription.',
      },
    ],
  },
  {
    id: 'features',
    title: 'Features',
    questions: [
      {
        id: 'f1',
        question: 'Can I use the app offline?',
        answer: 'Yes, you can access cached content offline. Some features require internet.',
      },
      {
        id: 'f2',
        question: 'How do I sync my data?',
        answer: 'Data syncs automatically when you\'re connected to the internet.',
      },
    ],
  },
];

export default function FAQScreenExample() {
  return (
    <FAQScreen
      categories={FAQ_DATA}
      searchPlaceholder="Search for answers..."
      emptySearchTitle="No FAQs found"
      emptySearchMessage="Try searching with different keywords"
      headerTitle="Help & FAQs"
    />
  );
}
```

### Custom Styled FAQ Screen

```tsx
import { FAQScreen } from '@umituz/react-native-settings';
import { StyleSheet } from 'react-native';

const customStyles = {
  container: {
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 24,
  },
  category: {
    marginBottom: 16,
  },
};

function CustomStyledFAQ() {
  return (
    <FAQScreen
      categories={FAQ_DATA}
      searchPlaceholder="Type your question..."
      emptySearchTitle="No results"
      emptySearchMessage="We couldn't find an answer"
      headerTitle="FAQ"
      styles={customStyles}
    />
  );
}
```

### Using Individual Components

```tsx
import { FAQCategory, FAQItem } from '@umituz/react-native-settings';

function CustomFAQSection() {
  const [expanded, setExpanded] = useState({});

  const toggleItem = (id) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <ScrollView>
      <FAQCategory
        category={{
          id: 'general',
          title: 'General',
          questions: [
            {
              id: 'q1',
              question: 'Question 1?',
              answer: 'Answer 1',
            },
          ],
        }}
        isExpanded={expanded}
        onToggleItem={toggleItem}
      />
    </ScrollView>
  );
}
```

### Using Search Hook

```tsx
import { useFAQSearch } from '@umituz/react-native-settings';

function CustomFAQSearch() {
  const categories = [/* FAQ data */];
  const {
    searchQuery,
    setSearchQuery,
    filteredCategories,
    hasResults,
  } = useFAQSearch(categories);

  return (
    <View>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search..."
        style={{ padding: 16, backgroundColor: '#FFF' }}
      />

      {!hasResults && searchQuery ? (
        <View style={{ padding: 32, alignItems: 'center' }}>
          <Text>No FAQs found for "{searchQuery}"</Text>
        </View>
      ) : (
        filteredCategories.map(cat => (
          <FAQCategory
            key={cat.id}
            category={cat}
            isExpanded={expanded}
            onToggleItem={toggleItem}
          />
        ))
      )}
    </View>
  );
}
```

## Architecture

```
src/domains/faqs/
├── domain/
│   ├── entities/
│   │   └── FAQEntity.ts          # FAQ types and interfaces
│   └── services/
│       └── FAQSearchService.ts   # Search logic
├── presentation/
│   ├── screens/
│   │   └── FAQScreen.tsx
│   ├── components/
│   │   ├── FAQCategory.tsx
│   │   ├── FAQItem.tsx
│   │   ├── FAQSearchBar.tsx
│   │   └── FAQEmptyState.tsx
│   └── hooks/
│       ├── useFAQSearch.ts
│       └── useFAQExpansion.ts
└── index.ts                      # Public API exports
```

## Best Practices

1. **Organize by Category**: Group related questions together
2. **Clear Answers**: Keep answers concise and easy to understand
3. **Searchable Content**: Use clear keywords in questions and answers
4. **Keep Updated**: Regularly update FAQs based on user feedback
5. **Multiple Languages**: Provide FAQs in all supported languages
6. **Visual Hierarchy**: Use proper spacing and typography
7. **Performance**: Optimize for large FAQ lists with pagination

## Testing

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { FAQScreen } from '@umituz/react-native-settings';

describe('FAQScreen', () => {
  const categories = [
    {
      id: 'test',
      title: 'Test Category',
      questions: [
        {
          id: 'q1',
          question: 'Test Question?',
          answer: 'Test Answer',
        },
      ],
    },
  ];

  it('renders FAQ categories', () => {
    const { getByText } = render(
      <FAQScreen
        categories={categories}
        searchPlaceholder="Search"
        emptySearchTitle="No results"
        emptySearchMessage="Try again"
        headerTitle="FAQ"
      />
    );

    expect(getByText('Test Category')).toBeTruthy();
    expect(getByText('Test Question?')).toBeTruthy();
  });

  it('filters FAQs by search query', () => {
    const { getByPlaceholderText, queryByText } = render(
      <FAQScreen
        categories={categories}
        searchPlaceholder="Search"
        emptySearchTitle="No results"
        emptySearchMessage="Try again"
        headerTitle="FAQ"
      />
    );

    const searchInput = getByPlaceholderText('Search');
    fireEvent.changeText(searchInput, 'nonexistent');

    expect(queryByText('Test Question?')).toBeNull();
  });
});
```

## Related

- **Settings**: Main settings management
- **Support**: Customer support components
- **Help**: Help documentation

## License

MIT
