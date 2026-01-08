# ProfileSectionLoader

Dynamic loader component that fetches and displays user profile information in the settings screen header.

## Features

- **Dynamic Loading**: Fetches user profile data on mount
- **Loading States**: Shows skeleton while loading
- **Error Handling**: Graceful error display with retry
- **Customizable**: Custom profile data injection
- **Action Handler**: Configurable press handler
- **Avatar Support**: Display user avatar with fallback

## Installation

This component is part of `@umituz/react-native-settings`.

## Usage

### Basic Usage

```tsx
import { ProfileSectionLoader } from '@umituz/react-native-settings';

function SettingsScreen() {
  return (
    <ProfileSectionLoader
      userId="user123"
      onPress={() => navigation.navigate('Account')}
    />
  );
}
```

### With Custom Profile Data

```tsx
function SettingsScreen() {
  const userProfile = {
    displayName: 'John Doe',
    userId: 'user123',
    avatarUrl: 'https://example.com/avatar.jpg',
    isAnonymous: false,
    onPress: () => navigation.navigate('Account'),
  };

  return (
    <ProfileSectionLoader userProfile={userProfile} />
  );
}
```

### With Anonymous User

```tsx
function SettingsScreen() {
  const userProfile = {
    displayName: 'Guest',
    userId: 'guest-123',
    isAnonymous: true,
    anonymousDisplayName: 'Guest User',
    onPress: () => navigation.navigate('Auth'),
  };

  return (
    <ProfileSectionLoader userProfile={userProfile} />
  );
}
```

## Props

### ProfileSectionLoaderProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `userProfile` | `UserProfile` | `undefined` | Pre-loaded profile data |
| `userId` | `string` | `undefined` | User ID for fetching profile |
| `showAvatar` | `boolean` | `true` | Show user avatar |
| `showEmail` | `boolean` | `true` | Show email address |
| `onPress` | `() => void` | `undefined` | Press handler |
| `loadingComponent` | `ReactNode` | `undefined` | Custom loading component |
| `errorComponent` | `ReactNode` | `undefined` | Custom error component |
| `style` | `ViewStyle` | `undefined` | Custom container style |

## Component Structure

```
ProfileSectionLoader
├── Loading State (if loading)
│   └── Skeleton / LoadingSpinner
├── Error State (if error)
│   └── Error message with retry
└── Profile Content (when loaded)
    ├── Avatar
    ├── User Info
    │   ├── Display Name
    │   ├── Email (optional)
    │   └── Anonymous badge (if applicable)
    └── Chevron/Arrow
```

## Examples

### With Loading State

```tsx
function ProfileWithLoading() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile('user123').then(data => {
      setProfile(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <ProfileSectionLoader loadingComponent={<ProfileSkeleton />} />;
  }

  return <ProfileSectionLoader userProfile={profile} />;
}
```

### With Error Handling

```tsx
function ProfileWithError() {
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile('user123')
      .then(setProfile)
      .catch(setError);
  }, []);

  if (error) {
    return (
      <ProfileSectionLoader
        errorComponent={
          <ProfileError
            message="Failed to load profile"
            onRetry={() => window.location.reload()}
          />
        }
      />
    );
  }

  return <ProfileSectionLoader userProfile={profile} />;
}
```

### Custom Avatar Service

```tsx
function CustomAvatarProfile() {
  const profile = {
    displayName: 'John Doe',
    userId: 'user123',
    avatarUrl: 'https://ui-avatars.com/api/?name=John+Doe&background=2196F3&color=fff',
    onPress: () => navigation.navigate('Account'),
  };

  return <ProfileSectionLoader userProfile={profile} />;
}
```

### With Sign Out Action

```tsx
function ProfileWithSignOut() {
  const [profile, setProfile] = useState(null);
  const navigation = useNavigation();

  const handleSignOut = async () => {
    await signOut();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <View>
      <ProfileSectionLoader userProfile={profile} />

      <TouchableOpacity onPress={handleSignOut} style={styles.signOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Anonymous vs Authenticated

```tsx
function AdaptiveProfile() {
  const user = useAuth();

  if (user?.isAnonymous) {
    return (
      <ProfileSectionLoader
        userProfile={{
          displayName: 'Guest',
          isAnonymous: true,
          anonymousDisplayName: 'Guest User',
          onPress: () => navigation.navigate('SignIn'),
        }}
      />
    );
  }

  return (
    <ProfileSectionLoader
      userProfile={{
        displayName: user.displayName,
        userId: user.uid,
        avatarUrl: user.photoURL,
        isAnonymous: false,
        onPress: () => navigation.navigate('Account'),
      }}
    />
  );
}
```

## Data Types

### UserProfile

```typescript
interface UserProfile {
  displayName: string;              // Display name
  userId: string;                   // User ID
  avatarUrl?: string;               // Avatar URL
  isAnonymous?: boolean;            // Anonymous user flag
  anonymousDisplayName?: string;    // Anonymous display name
  avatarServiceUrl?: string;        // Avatar service URL
  accountSettingsRoute?: string;    // Account settings route
  onPress?: () => void;             // Press handler
}
```

## Styling

### Default Styles

```typescript
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: tokens.spacing.lg,
    backgroundColor: tokens.colors.surface,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: tokens.spacing.md,
  },
  content: {
    flex: 1,
  },
  displayName: {
    fontSize: tokens.typography.fontSize.lg,
    fontWeight: '600',
    color: tokens.colors.textPrimary,
  },
  email: {
    fontSize: tokens.typography.fontSize.sm,
    color: tokens.colors.textSecondary,
    marginTop: 2,
  },
  anonymousBadge: {
    backgroundColor: tokens.colors.warning,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  anonymousText: {
    fontSize: tokens.typography.fontSize.xs,
    color: tokens.colors.surface,
    fontWeight: '600',
  },
  chevron: {
    marginLeft: tokens.spacing.sm,
  },
});
```

### Custom Styling

```tsx
<ProfileSectionLoader
  userProfile={profile}
  style={{
    backgroundColor: '#f5f5f5',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  }}
/>
```

### Avatar Styling

```tsx
function CustomAvatarProfile() {
  return (
    <ProfileSectionLoader
      userProfile={profile}
      avatarStyle={{
        borderWidth: 2,
        borderColor: '#2196F3',
      }}
    />
  );
}
```

## Loading States

### Skeleton Loader

```tsx
function ProfileSkeleton() {
  return (
    <View style={styles.container}>
      <View style={[styles.avatar, styles.skeleton]} />
      <View style={styles.content}>
        <View style={[styles.text, styles.skeleton]} />
        <View style={[styles.textSm, styles.skeleton]} />
      </View>
    </View>
  );
}

const skeletonStyles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#e0e0e0',
  },
  text: {
    height: 20,
    width: 150,
    borderRadius: 4,
  },
  textSm: {
    height: 16,
    width: 200,
    borderRadius: 4,
    marginTop: 8,
  },
});
```

### Spinner Loader

```tsx
function SpinnerLoader() {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#2196F3" />
      <Text style={styles.loadingText}>Loading profile...</Text>
    </View>
  );
}
```

## Error States

### Error Message with Retry

```tsx
function ProfileError({ message, onRetry }) {
  return (
    <View style={styles.errorContainer}>
      <Ionicons name="person-outline" size={48} color="#ccc" />
      <Text style={styles.errorTitle}>Profile Error</Text>
      <Text style={styles.errorMessage}>{message}</Text>
      <Button onPress={onRetry} title="Retry" />
    </View>
  );
}
```

### Fallback Display

```tsx
function ProfileFallback({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.avatarPlaceholder}>
        <Ionicons name="person-outline" size={32} color="#999" />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>Sign In</Text>
        <Text style={styles.description}>Access your profile</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#999" />
    </TouchableOpacity>
  );
}
```

## Avatar Sources

### From URL

```tsx
const profile = {
  displayName: 'John Doe',
  avatarUrl: 'https://example.com/avatar.jpg',
};
```

### From Avatar Service

```tsx
const profile = {
  displayName: 'John Doe',
  avatarServiceUrl: 'https://ui-avatars.com/api/?name=John+Doe',
};
```

### From Local Storage

```tsx
const profile = {
  displayName: 'John Doe',
  avatarUrl: require('../../assets/images/default-avatar.png'),
};
```

### Initials Fallback

```tsx
function AvatarWithInitials({ displayName }) {
  const initials = displayName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View style={styles.avatar}>
      {avatarUrl ? (
        <Image source={{ uri: avatarUrl }} style={styles.image} />
      ) : (
        <Text style={styles.initials}>{initials}</Text>
      )}
    </View>
  );
}
```

## Best Practices

1. **Loading States**: Always show loading indicator
2. **Error Handling**: Provide retry options on error
3. **Avatar Fallbacks**: Use initials or default avatar
4. **Anonymous Users**: Clearly indicate anonymous status
5. **Press Handler**: Always provide press handler
6. **Privacy**: Show minimal info for anonymous users
7. **Accessibility**: Add proper accessibility labels

## Related

- **SettingsContent**: Content component
- **SettingsScreen**: Main screen component
- **UserProfile**: Profile type definition

## License

MIT
