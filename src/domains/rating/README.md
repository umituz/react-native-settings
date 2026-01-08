# Rating Domain

The Rating domain provides a star rating component and rating management utilities for collecting and displaying user ratings in your React Native app.

## Features

- **Interactive Star Rating**: Tap-to-rate functionality with visual feedback
- **Read-Only Display**: Show existing ratings without interaction
- **Customizable Appearance**: Configurable colors, sizes, and star count
- **Rating Statistics**: Track average ratings and distribution
- **Type-Safe**: Full TypeScript support with rating value types

## Installation

This domain is part of `@umituz/react-native-settings`. Install the package to use it:

```bash
npm install @umituz/react-native-settings
```

## Components

### StarRating

Interactive star rating component with customizable appearance.

```tsx
import { StarRating } from '@umituz/react-native-settings';

function MyRatingComponent() {
  const [rating, setRating] = useState(0);

  return (
    <StarRating
      rating={rating}
      onRatingChange={setRating}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rating` | `number` | **Required** | Current rating value |
| `maxRating` | `number` | `5` | Maximum rating (number of stars) |
| `onRatingChange` | `(rating) => void` | `undefined` | Rating change handler |
| `size` | `number` | `24` | Star icon size |
| `activeColor` | `string` | `tokens.colors.warning` | Filled star color |
| `inactiveColor` | `string` | `tokens.colors.border` | Empty star color |
| `disabled` | `boolean` | `false` | Disable interaction |
| `style` | `ViewStyle` | `undefined` | Container style |

#### Examples

**Basic Usage:**

```tsx
import { StarRating } from '@umituz/react-native-settings';

function BasicRating() {
  const [rating, setRating] = useState(3);

  return (
    <View>
      <Text>Rate this item:</Text>
      <StarRating
        rating={rating}
        onRatingChange={setRating}
      />
      <Text>Current rating: {rating}/5</Text>
    </View>
  );
}
```

**Custom Colors:**

```tsx
function CustomColoredRating() {
  return (
    <StarRating
      rating={4}
      activeColor="#FF6B6B"
      inactiveColor="#E0E0E0"
      size={32}
    />
  );
}
```

**Read-Only Display:**

```tsx
function ReadOnlyRating() {
  return (
    <StarRating
      rating={4.5}
      disabled={true}
      activeColor="#FFD700"
    />
  );
}
```

**10-Star Rating:**

```tsx
function TenStarRating() {
  const [rating, setRating] = useState(7);

  return (
    <StarRating
      rating={rating}
      maxRating={10}
      onRatingChange={setRating}
      size={20}
    />
  );
}
```

**Large Stars:**

```tsx
function LargeStarRating() {
  return (
    <StarRating
      rating={5}
      size={48}
      activeColor="#FFA500"
    />
  );
}
```

**With Custom Style:**

```tsx
function StyledRating() {
  return (
    <StarRating
      rating={4}
      style={{
        backgroundColor: '#F5F5F5',
        padding: 16,
        borderRadius: 8,
      }}
    />
  );
}
```

## Types

### RatingValue

```typescript
type RatingValue = 0 | 1 | 2 | 3 | 4 | 5;
```

### Rating

```typescript
interface Rating {
  id: string;
  userId: string;
  entityId: string;
  entityType: string;
  value: RatingValue;
  createdAt: string;
  updatedAt: string;
}
```

### RatingStats

```typescript
interface RatingStats {
  average: number;
  count: number;
  distribution: Record<RatingValue, number>;
}
```

## Examples

### Product Rating

```tsx
import { StarRating } from '@umituz/react-native-settings';

function ProductRating({ product }) {
  const [userRating, setUserRating] = useState(0);

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          {product.averageRating.toFixed(1)}
        </Text>
        <StarRating
          rating={product.averageRating}
          disabled={true}
          size={20}
          style={{ marginLeft: 8 }}
        />
        <Text style={{ marginLeft: 8, color: '#666' }}>
          ({product.ratingCount} reviews)
        </Text>
      </View>

      <View style={{ marginTop: 16 }}>
        <Text>Rate this product:</Text>
        <StarRating
          rating={userRating}
          onRatingChange={setUserRating}
        />
      </View>
    </View>
  );
}
```

### Rating Distribution

```tsx
function RatingDistribution({ stats }) {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
        Rating Distribution
      </Text>

      {[5, 4, 3, 2, 1].map((star) => {
        const count = stats.distribution[star] || 0;
        const percentage = (count / stats.count) * 100;

        return (
          <View key={star} style={{ flexDirection: 'row', marginBottom: 8 }}>
            <Text style={{ width: 40 }}>{star} star</Text>
            <View style={{ flex: 1, height: 8, backgroundColor: '#E0E0E0' }}>
              <View
                style={{
                  width: `${percentage}%`,
                  height: '100%',
                  backgroundColor: '#FFD700',
                }}
              />
            </View>
            <Text style={{ marginLeft: 8, width: 40 }}>{count}</Text>
          </View>
        );
      })}
    </View>
  );
}
```

### Review with Rating

```tsx
function ReviewCard({ review }) {
  return (
    <View style={{ padding: 16, backgroundColor: '#FFF', marginBottom: 8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <StarRating
          rating={review.rating}
          disabled={true}
          size={16}
        />
        <Text style={{ marginLeft: 8, fontWeight: 'bold' }}>
          {review.userName}
        </Text>
      </View>

      <Text style={{ color: '#666', marginBottom: 8 }}>
        {review.date}
      </Text>

      <Text>{review.comment}</Text>
    </View>
  );
}
```

### Feedback Rating

```tsx
function FeedbackRating() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    await api.submitFeedbackRating(rating);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Text>Thanks for your feedback!</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 16 }}>
        How would you rate your experience?
      </Text>

      <StarRating
        rating={rating}
        onRatingChange={setRating}
        size={40}
      />

      {rating > 0 && (
        <Button
          title="Submit Rating"
          onPress={handleSubmit}
          style={{ marginTop: 16 }}
        />
      )}
    </View>
  );
}
```

### Animated Rating

```tsx
import { Animated } from 'react-native';

function AnimatedStarRating() {
  const [rating, setRating] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleRatingChange = (newRating) => {
    // Animate scale
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setRating(newRating);
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <StarRating
        rating={rating}
        onRatingChange={handleRatingChange}
        size={32}
      />
    </Animated.View>
  );
}
```

## Architecture

```
src/domains/rating/
├── domain/
│   └── entities/
│       └── Rating.ts            # Rating types and interfaces
└── presentation/
    └── components/
        └── StarRating.tsx       # Star rating component
```

## Best Practices

1. **Clear Purpose**: Always explain what users are rating
2. **Immediate Feedback**: Show selected rating immediately
3. **Allow Changes**: Let users change their rating before submitting
4. **Visual Hierarchy**: Make ratings prominent but not overwhelming
5. **Accessible**: Use proper accessibility labels for screen readers
6. **Consistent Sizing**: Use consistent star sizes across your app
7. **Color Coding**: Use standard colors (gold/yellow for filled stars)

## Testing

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { StarRating } from '@umituz/react-native-settings';

describe('StarRating', () => {
  it('renders correct number of stars', () => {
    const { getAllByTestId } = render(
      <StarRating rating={3} maxRating={5} />
    );

    expect(getAllByTestId(/star/)).toHaveLength(5);
  });

  it('displays filled and empty stars correctly', () => {
    const { getAllByTestId } = render(
      <StarRating rating={3} maxRating={5} />
    );

    const stars = getAllByTestId(/star/);
    // First 3 should be filled, last 2 empty
    // (implementation-specific assertions)
  });

  it('calls onRatingChange when star is pressed', () => {
    const mockOnChange = jest.fn();
    const { getAllByTestId } = render(
      <StarRating rating={0} onRatingChange={mockOnChange} maxRating={5} />
    );

    const stars = getAllByTestId(/star/);
    fireEvent.press(stars[3]);

    expect(mockOnChange).toHaveBeenCalledWith(4);
  });

  it('does not respond to presses when disabled', () => {
    const mockOnChange = jest.fn();
    const { getAllByTestId } = render(
      <StarRating rating={3} onRatingChange={mockOnChange} disabled={true} />
    );

    const stars = getAllByTestId(/star/);
    fireEvent.press(stars[0]);

    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
```

## Related

- **Feedback**: Feedback forms with ratings
- **Reviews**: User review management
- **Settings**: Main settings management

## License

MIT
