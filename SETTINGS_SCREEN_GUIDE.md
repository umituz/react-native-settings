# Settings Screen

## Purpose
Main settings screen with modular architecture for displaying app settings in an organized, user-friendly interface.

## File Path
`src/presentation/screens/SettingsScreen.tsx`

## Imports
```typescript
import { SettingsScreen } from '@umituz/react-native-settings';
```

## Strategy

### Architecture Approach
- Use SettingsScreen as main entry point
- Configure features via config object
- Let screen auto-detect available features
- Keep screen logic minimal and declarative

### Configuration Strategy
1. Define settings config at app root
2. Pass config to SettingsScreen via params or props
3. Use feature flags for conditional display
4. Customize sections as needed

### Integration Pattern
1. Import SettingsScreen from package
2. Create settings configuration object
3. Define navigation structure
4. Handle user profile if needed
5. Add custom sections for app-specific settings

## Restrictions (Forbidden)

### ❌ DO NOT
- Create custom settings screens from scratch
- Duplicate SettingsScreen functionality
- Mix settings logic with business logic
- Hardcode feature availability
- Bypass feature detection system

### ❌ NEVER
- Modify SettingsScreen internals
- Override screen navigation logic
- Skip config normalization
- Ignore feature flags
- Mix UI and data layers in screen

### ❌ AVOID
- Over-complicating config object
- Creating one-off settings screens
- Inconsistent styling with design system
- Skipping error boundaries
- Not handling loading states

## Rules

### ✅ ALWAYS
- Use SettingsScreen for main settings
- Normalize config before passing
- Provide proper navigation structure
- Handle user profile authentication
- Include error boundaries
- Support feature detection

### ✅ MUST
- Follow SettingsConfig interface
- Use proper TypeScript types
- Handle all required params
- Support custom sections
- Maintain navigation consistency
- Test on both iOS and Android

### ✅ SHOULD
- Use auto-detection for features
- Group related settings together
- Provide meaningful section titles
- Support both modal and push navigation
- Include user profile for authenticated users
- Add custom sections for app-specific features

## Configuration Reference

See types file for complete config:
`src/presentation/screens/types/SettingsConfig.ts`

Config sections:
- `appearance`: Theme and color settings
- `language`: Language selection
- `notifications`: Notification preferences
- `about`: App information
- `legal`: Legal documents
- `disclaimer`: Legal notices
- `userProfile`: User profile display
- `feedback`: User feedback
- `rating`: App rating
- `faqs`: FAQ access
- `subscription`: Subscription/upgrade
- `wallet`: Wallet/payment

## Related Components

- **SettingsContent**: `src/presentation/screens/components/SettingsContent/SettingsContent.tsx`
  - Main content composer used by SettingsScreen

- **SettingsHeader**: `src/presentation/screens/components/SettingsHeader/SettingsHeader.tsx`
  - Header component for settings screen

- **SettingsConfig**: `src/presentation/screens/types/SettingsConfig.ts`
  - Configuration type definitions

- **normalizeSettingsConfig**: `src/presentation/screens/utils/normalizeConfig.ts`
  - Config normalization utility

- **useFeatureDetection**: `src/presentation/screens/hooks/useFeatureDetection.ts`
  - Feature detection hook

## AI Agent Guidelines

### When Creating Settings Screens

1. **Use Existing Component**
   - Import: `SettingsScreen` from `@umituz/react-native-settings`
   - Don't create custom settings screens

2. **Configuration Setup**
   - Reference: `src/presentation/screens/types/SettingsConfig.ts`
   - Create config object following SettingsConfig interface
   - Use normalizeSettingsConfig utility
   - Enable features: `true`, `false`, or `'auto'`

3. **Feature Flags**
   - `true`: Always show
   - `false`: Never show
   - `'auto'`: Auto-detect based on navigation

4. **Custom Sections**
   - Add via `customSections` prop
   - Follow CustomSettingsSection type
   - Provide items array

5. **What to Avoid**
   - Don't inline settings UI
   - Don't bypass SettingsScreen
   - Don't hardcode features
   - Don't ignore feature detection

6. **Navigation Setup**
   - Add to navigation stack
   - Provide proper route name
   - Handle params for config

### Configuration Pattern (Conceptual)

```
App Config → normalizeSettingsConfig → SettingsScreen
  ↓
Features → useFeatureDetection → Show/Hide sections
  ↓
Sections → FeatureSettingsSection, IdentitySettingsSection, etc.
  ↓
Items → SettingsItemCard for each setting
```

## File References

For implementation details, reference:
- Main screen: `src/presentation/screens/SettingsScreen.tsx`
- Content composer: `src/presentation/screens/components/SettingsContent/SettingsContent.tsx`
- Config types: `src/presentation/screens/types/SettingsConfig.ts`
- Normalization: `src/presentation/screens/utils/normalizeConfig.ts`
- Feature detection: `src/presentation/screens/hooks/useFeatureDetection.ts`

## Version Compatibility

- Requires React Navigation 6.x
- Requires TanStack Query 4.x+
- Requires Zustand 4.x+
- Compatible with React Native 0.60+

## License

MIT
