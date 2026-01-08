# Gamification Domain

Complete gamification integration for React Native Settings package.

## Overview

The gamification domain provides a seamless integration of achievements, levels, streaks, and points into your settings screen. It wraps `@umituz/react-native-gamification` with settings-specific functionality.

## Features

- ✅ **Achievements System** - Track and display user achievements
- ✅ **Level Progression** - Visual level progress with points
- ✅ **Streak Tracking** - Daily streak monitoring
- ✅ **Statistics Display** - Comprehensive stats cards
- ✅ **Localized** - Full i18n support via `@umituz/react-native-localization`
- ✅ **Theme Support** - Automatic dark/light mode integration
- ✅ **Navigation Ready** - Pre-configured navigation integration

## Architecture

```
src/domains/gamification/
├── types/
│   └── index.ts                    # Type definitions
├── components/
│   ├── GamificationScreenWrapper.tsx   # Main screen wrapper
│   └── GamificationSettingsItem.tsx    # Menu item component
└── index.ts                        # Public API
```

## Installation

The gamification domain is included in `@umituz/react-native-settings`. Ensure you have the peer dependency:

```bash
npm install @umituz/react-native-gamification
```

## Usage

### 1. Configure Gamification in Settings

```typescript
// src/domains/settings/config/gamification.config.ts
import type { GamificationSettingsConfig } from "@umituz/react-native-settings";

export const createGamificationConfig = ({ t }): GamificationSettingsConfig => ({
  enabled: true,
  config: {
    storageKey: "app_gamification",
    achievements: [
      { id: "first_task", threshold: 1, type: "count" },
      { id: "ten_tasks", threshold: 10, type: "count" },
      { id: "week_streak", threshold: 7, type: "streak" },
    ],
    levels: [
      { level: 1, minPoints: 0, maxPoints: 50 },
      { level: 2, minPoints: 50, maxPoints: 150 },
      { level: 3, minPoints: 150, maxPoints: 300 },
    ],
    pointsPerAction: 10,
    streakBonusMultiplier: 1.5,
  },
  screenProps: {
    title: t("gamification.title"),
    statsTitle: t("gamification.stats.title"),
    achievementsTitle: t("gamification.achievements.title"),
    streakTitle: t("gamification.streak.title"),
  },
});
```

### 2. Add to Settings Config

```typescript
// src/domains/settings/config/settings.config.ts
import { createGamificationConfig } from "./gamification.config";

export const createSettingsConfig = ({ t, user, isPremium }) => ({
  // ... other configs
  gamification: createGamificationConfig({ t }),
});
```

### 3. Pass to SettingsStackNavigator

```typescript
// src/domains/settings/presentation/SettingsTab.tsx
import { SettingsStackNavigator } from "@umituz/react-native-settings";

export const SettingsTab = () => {
  const { t } = useLocalization();
  const config = useMemo(() => createSettingsConfig({ t }), [t]);

  return (
    <SettingsStackNavigator
      appInfo={APP_INFO}
      legalUrls={LEGAL_URLS}
      gamificationConfig={config.gamification}
    />
  );
};
```

### 4. Add Menu Item (Optional)

```typescript
// In your custom settings sections
import { GamificationSettingsItem } from "@umituz/react-native-settings";

const customSections = [
  {
    title: t("settings.sections.engagement"),
    items: [
      <GamificationSettingsItem
        config={{
          enabled: true,
          title: t("settings.gamification.menuTitle"),
          subtitle: t("settings.gamification.menuSubtitle"),
          icon: "trophy",
          onPress: () => navigation.navigate("Gamification"),
        }}
      />,
    ],
  },
];
```

## Localization

Add these keys to your localization files:

```json
{
  "settings": {
    "gamification": {
      "title": "Achievements",
      "menuTitle": "Achievements & Progress",
      "menuSubtitle": "View your achievements and stats"
    }
  },
  "gamification": {
    "title": "Your Progress",
    "level": {
      "title": "Level {{level}}"
    },
    "stats": {
      "title": "Statistics",
      "totalPoints": "Total Points",
      "tasksCompleted": "Tasks Completed",
      "achievementsUnlocked": "Achievements"
    },
    "achievements": {
      "title": "Achievements",
      "empty": "No achievements yet. Keep going!",
      "first_task": {
        "title": "First Steps",
        "description": "Complete your first task"
      },
      "ten_tasks": {
        "title": "Getting Started",
        "description": "Complete 10 tasks"
      },
      "week_streak": {
        "title": "Week Warrior",
        "description": "Maintain a 7-day streak"
      }
    },
    "streak": {
      "title": "Streak",
      "current": "Current Streak",
      "best": "Best Streak"
    }
  }
}
```

## API Reference

### Types

#### `GamificationSettingsConfig`

```typescript
interface GamificationSettingsConfig {
  enabled: boolean;
  config: GamificationConfig;
  screenProps: Omit<GamificationScreenProps, "levelProps" | "stats" | "achievements">;
  onNavigate?: () => void;
}
```

#### `GamificationMenuConfig`

```typescript
interface GamificationMenuConfig {
  enabled: boolean;
  title: string;
  subtitle?: string;
  icon?: string;
  onPress?: () => void;
}
```

### Components

#### `GamificationScreenWrapper`

Main screen component that displays gamification data.

**Props:**
- `config: GamificationSettingsConfig` - Configuration object

#### `GamificationSettingsItem`

Menu item component for settings list.

**Props:**
- `config: GamificationMenuConfig` - Menu configuration

## Re-exported Components

All components from `@umituz/react-native-gamification` are re-exported for convenience:

```typescript
import {
  LevelProgress,
  PointsBadge,
  AchievementCard,
  AchievementToast,
  StreakDisplay,
  StatsCard,
  AchievementItem,
  useGamification,
  useGamificationStore,
} from "@umituz/react-native-settings";
```

## Example: Complete Integration

```typescript
// 1. Create config
const gamificationConfig: GamificationSettingsConfig = {
  enabled: true,
  config: {
    storageKey: "my_app_gamification",
    achievements: [
      { id: "first_login", threshold: 1, type: "milestone" },
      { id: "power_user", threshold: 100, type: "count" },
    ],
    levels: [
      { level: 1, minPoints: 0, maxPoints: 100 },
      { level: 2, minPoints: 100, maxPoints: 250 },
    ],
    pointsPerAction: 5,
  },
  screenProps: {
    title: "Your Achievements",
    statsTitle: "Your Stats",
    achievementsTitle: "Unlocked Achievements",
    streakTitle: "Daily Streak",
  },
};

// 2. Use in navigator
<SettingsStackNavigator
  appInfo={APP_INFO}
  legalUrls={LEGAL_URLS}
  gamificationConfig={gamificationConfig}
/>

// 3. Track actions in your app
import { useGamification } from "@umituz/react-native-settings";

const MyComponent = () => {
  const { completeTask, addPoints } = useGamification();

  const handleTaskComplete = () => {
    completeTask(); // Adds points, updates streak, checks achievements
  };

  return <Button onPress={handleTaskComplete} title="Complete Task" />;
};
```

## Best Practices

1. **Config Files ≤ 80 lines** - Keep gamification config in separate file
2. **Use i18n** - Never hardcode strings, always use translation keys
3. **Initialize Early** - Initialize gamification in app startup
4. **Track Meaningfully** - Only track actions that matter to users
5. **Test Achievements** - Ensure thresholds are achievable and rewarding

## Testing

```typescript
import { useGamification } from "@umituz/react-native-settings";

describe("Gamification", () => {
  it("should track task completion", () => {
    const { completeTask, totalTasksCompleted } = useGamification();
    completeTask();
    expect(totalTasksCompleted).toBe(1);
  });
});
```

## Troubleshooting

### Gamification screen not showing
- Ensure `gamificationConfig.enabled` is `true`
- Check that config is passed to `SettingsStackNavigator`

### Achievements not unlocking
- Verify achievement IDs match between config and localization
- Check threshold values are correct
- Ensure `completeTask()` or `addPoints()` is being called

### Localization missing
- Add all required translation keys
- Check language files are properly loaded

## Migration Guide

If migrating from standalone gamification package:

```typescript
// Before
import { GamificationScreen } from "@umituz/react-native-gamification";

// After
import { GamificationScreenWrapper } from "@umituz/react-native-settings";
```

## Related Documentation

- [@umituz/react-native-gamification](../../../react-native-gamification/README.md)
- [Settings Architecture](../../ARCHITECTURE.md)
- [Settings Screen Guide](../../SETTINGS_SCREEN_GUIDE.md)

## License

MIT © Ümit UZ
