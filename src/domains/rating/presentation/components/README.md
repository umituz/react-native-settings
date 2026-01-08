# StarRating

Interactive star rating component with customizable appearance, behavior, and animations.

## Features

- **Interactive**: Tap to rate with visual feedback
- **Read-Only**: Display existing ratings without interaction
- **Customizable**: Size, colors, spacing, and star count
- **Animated**: Smooth animations on rating changes
- **Accessible**: Full accessibility support
- **Flexible**: Supports different icon styles

## Installation

This component is part of `@umituz/react-native-settings`.

## Usage

### Basic Interactive Rating

```tsx
import { StarRating } from '@umituz/react-native-settings';

function RatingScreen() {
  const [rating, setRating] = useState(0);

  return (
    <StarRating
      rating={rating}
      onRatingChange={setRating}
    />
  );
}
```

### Read-Only Display

```tsx
function RatingDisplay({ rating }) {
  return (
    <StarRating
      rating={4}
      readonly={true}
    />
  );
}
```

### Custom Size

```tsx
function LargeRating() {
  return (
    <StarRating
      rating={5}
      size={40}
      onRatingChange={setRating}
    />
  );
}
```

### Custom Colors

```tsx
function CustomColoredRating() {
  return (
    <StarRating
      rating={3}
      color="#FF5722"
      emptyColor="#E0E0E0"
      onRatingChange={setRating}
    />
  );
}
```

## Props

### StarRatingProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rating` | `number` | **Required** | Current rating value (0 to maxStars) |
| `onRatingChange` | `(rating: number) => void` | `undefined` | Rating change handler |
| `maxStars` | `number` | `5` | Maximum number of stars |
| `size` | `number` | `24` | Star size in pixels |
| `color` | `string` | `#FFC107` | Filled star color |
| `emptyColor` | `string` | `#E0E0E0` | Empty star color |
| `spacing` | `number` | `4` | Spacing between stars |
| `readonly` | `boolean` | `false` | Disable interaction |
| `disabled` | `boolean` | `false` | Disabled state |
| `animate` | `boolean` | `true` | Enable animations |
| `icon` | `IconName` | `'star'` | Custom icon name |
| `emptyIcon` | `IconName` | `'star-outline'` | Empty star icon |
| `style` | `ViewStyle` | `undefined` | Custom container style |

## Component Structure

```
StarRating
└── Star Container (flex row)
    ├── Star 1
    ├── Star 2
    ├── Star 3
    ├── Star 4
    └── Star 5
```

## Examples

### Standard Rating

```tsx
function ProductRating() {
  const [rating, setRating] = useState(0);

  return (
    <View>
      <Text>Rate this product:</Text>
      <StarRating
        rating={rating}
        onRatingChange={setRating}
      />
      <Text>Rating: {rating}/5</Text>
    </View>
  );
}
```

### With Half Stars (Simulated)

```tsx
function HalfStarRating() {
  const [rating, setRating] = useState(0);

  return (
    <View>
      <StarRating
        rating={Math.ceil(rating)}
        maxStars={10}
        size={12}
        onRatingChange={(value) => setRating(value / 2)}
      />
      <Text>{rating}/5</Text>
    </View>
  );
}
```

### Large Display Rating

```tsx
function RatingSummary({ averageRating, totalRatings }) {
  return (
    <View style={styles.container}>
      <StarRating
        rating={averageRating}
        size={32}
        readonly={true}
      />
      <Text style={styles.ratingText}>
        {averageRating.toFixed(1)} out of 5
      </Text>
      <Text style={styles.totalText}>
        {totalRatings} ratings
      </Text>
    </View>
  );
}
```

### Custom Star Style

```tsx
function CustomStyleRating() {
  const [rating, setRating] = useState(0);

  return (
    <StarRating
      rating={rating}
      onRatingChange={setRating}
      maxStars={6}
      size={30}
      color="#E91E63"
      emptyColor="#FCE4EC"
      spacing={8}
      icon="heart"
      emptyIcon="heart-outline"
    />
  );
}
```

### With Rating Labels

```tsx
function LabeledRating() {
  const [rating, setRating] = useState(0);

  const labels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  return (
    <View>
      <StarRating
        rating={rating}
        onRatingChange={setRating}
      />
      {rating > 0 && (
        <Text style={styles.label}>
          {labels[rating - 1]}
        </Text>
      )}
    </View>
  );
}
```

### Feedback Form Rating

```tsx
function FeedbackRating() {
  const [rating, setRating] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        How would you rate your experience?
      </Text>

      <StarRating
        rating={rating}
        size={40}
        spacing={12}
        color="#FFD700"
        onRatingChange={setRating}
      />

      {rating === 0 && (
        <Text style={styles.hint}>
          Tap a star to rate
        </Text>
      )}

      {rating > 0 && rating <= 2 && (
        <Text style={styles.message}>
          We're sorry to hear that. How can we improve?
        </Text>
      )}

      {rating >= 4 && (
        <Text style={styles.message}>
          Glad you liked it! Tell us more.
        </Text>
      )}
    </View>
  );
}
```

### With Animation Delay

```tsx
function AnimatedRatingDisplay() {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    // Animate each star
    for (let i = 1; i <= newRating; i++) {
      setTimeout(() => {
        setRating(i);
      }, (i - 1) * 100);
    }
  };

  return (
    <StarRating
      rating={rating}
      onRatingChange={handleRatingChange}
    />
  );
}
```

## Styling

### Default Styles

```typescript
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 4,
  },
});
```

### Custom Styled Container

```tsx
<StarRating
  rating={rating}
  onRatingChange={setRating}
  style={{
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
  }}
/>
```

### With Background

```tsx
function RatingWithBackground() {
  return (
    <View style={styles.backgroundContainer}>
      <StarRating
        rating={rating}
        onRatingChange={setRating}
        size={48}
        color="#FFFFFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: '#2196F3',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
});
```

## Accessibility

### Accessibility Labels

```tsx
<StarRating
  rating={rating}
  onRatingChange={setRating}
  accessible={true}
  accessibilityLabel={`Rating: ${rating} out of 5 stars`}
  accessibilityHint="Swipe up or down to change rating"
/>
```

### Accessibility Value

```tsx
<StarRating
  rating={rating}
  onRatingChange={setRating}
  accessibilityValue={{
    min: 0,
    max: 5,
    now: rating,
  }}
/>
```

## Touch Handling

### Tap to Rate

```tsx
function TapToRate() {
  return (
    <StarRating
      rating={rating}
      onRatingChange={setRating}
      maxStars={5}
    />
  );
}
```

### Swipe to Rate

```tsx
function SwipeToRate() {
  const handleSwipe = (gestureState) => {
    const { dx } = gestureState;
    const swipeDistance = Math.abs(dx);

    if (swipeDistance > 50) {
      const newRating = dx > 0 ? Math.min(5, rating + 1) : Math.max(0, rating - 1);
      setRating(newRating);
    }
  };

  return (
    <PanGestureRecognizer onHandlerStateChange={handleSwipe}>
      <StarRating rating={rating} onRatingChange={setRating} />
    </PanGestureRecognizer>
  );
}
```

## Rating Statistics

### Rating Distribution

```tsx
function RatingDistribution({ ratings }) {
  const distribution = useMemo(() => {
    return [5, 4, 3, 2, 1].map(star => ({
      star,
      count: ratings.filter(r => r === star).length,
      percentage: (ratings.filter(r => r === star).length / ratings.length) * 100,
    }));
  }, [ratings]);

  return (
    <View>
      {distribution.map(({ star, count, percentage }) => (
        <View key={star} style={styles.row}>
          <Text>{star} ★</Text>
          <View style={styles.bar}>
            <View style={[styles.fill, { width: `${percentage}%` }]} />
          </View>
          <Text>{count}</Text>
        </View>
      ))}
    </View>
  );
}
```

### Average Rating

```tsx
function AverageRating({ ratings }) {
  const average = useMemo(() => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return sum / ratings.length;
  }, [ratings]);

  return (
    <View>
      <StarRating rating={Math.round(average)} readonly={true} />
      <Text>{average.toFixed(1)} average</Text>
    </View>
  );
}
```

## Best Practices

1. **Clear Purpose**: Make the rating purpose clear
2. **Feedback**: Provide immediate visual feedback
3. **Labels**: Use labels when appropriate
4. **Read-Only**: Use readonly mode for display
5. **Accessibility**: Add proper accessibility labels
6. **Validation**: Validate rating before submission
7. **Animation**: Use smooth animations

## Related

- **Rating Domain**: Rating domain documentation
- **Feedback Form**: Feedback form component
- **useFeedbackForm**: Feedback form hook

## License

MIT
