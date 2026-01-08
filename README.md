# @umituz/react-native-settings

Comprehensive settings management for React Native apps with modular domain-based architecture.

## Purpose

Complete settings solution with pre-built screens, components, and state management for React Native applications.

## File Path

Main package entry: `src/index.ts`

## Installation

```bash
npm install @umituz/react-native-settings
```

## Peer Dependencies

Required packages (check package.json for versions):
- zustand
- @umituz/react-native-storage
- @umituz/react-native-design-system
- @umituz/react-native-localization
- @react-navigation/native
- @react-navigation/stack
- react-native-safe-area-context

## Strategy

### Package Architecture

The package follows Domain-Driven Design (DDD) with four layers:

1. **Domain Layer**: Business logic and entities
2. **Application Layer**: Interfaces and orchestration
3. **Infrastructure Layer**: Data persistence
4. **Presentation Layer**: UI components and screens

### Integration Approach

1. Import components from `@umituz/react-native-settings`
2. Use pre-built screens for standard settings
3. Customize via configuration objects
4. Extend with custom sections when needed
5. Follow design system for consistency

### Domain Structure

Each feature domain is self-contained:
- `about/`: App information and version
- `appearance/`: Theme and color management
- `legal/`: Legal documents and policies
- `disclaimer/`: Legal notices and warnings
- `feedback/`: User feedback collection
- `faqs/`: FAQ management
- `rating/`: Rating system
- `video-tutorials/`: Video tutorials
- `cloud-sync/`: Cloud synchronization
- `dev/`: Development utilities

## Restrictions (Forbidden)

### ❌ DO NOT

- Create custom settings screens from scratch
- Duplicate existing component functionality
- Mix settings logic with business logic
- Hardcode feature availability
- Bypass feature detection system
- Access storage repositories directly from UI
- Create custom settings item components
- Ignore design system tokens
- Mix UI and data layers inappropriately

### ❌ NEVER

- Modify internal package files
- Override core component behavior
- Skip type checking
- Use deprecated APIs
- Ignore accessibility requirements
- Bypass error boundaries
- Hardcode colors or spacing
- Create circular dependencies between layers

### ❌ AVOID

- Over-complicating configuration
- Creating one-off solutions
- Inconsistent styling
- Skipping proper error handling
- Not testing on both platforms
- Ignoring performance optimization
- Bypassing TypeScript strict mode

## Rules

### ✅ ALWAYS

- Use TypeScript strict mode
- Import from package exports
- Follow component documentation strategies
- Reference implementation files for current patterns
- Use design system tokens for styling
- Handle errors gracefully
- Support both iOS and Android
- Include proper accessibility labels
- Test with feature flags
- Follow DDD layer separation

### ✅ MUST

- Use SettingsScreen for main settings UI
- Use SettingsItemCard for all settings items
- Normalize configuration before use
- Handle loading and error states
- Provide proper TypeScript types
- Export types for reuse
- Follow naming conventions
- Document custom components
- Test all new features
- Maintain backward compatibility

### ✅ SHOULD

- Use auto-detection for features
- Group related settings together
- Provide meaningful section titles
- Support both modal and push navigation
- Include user profile for authenticated users
- Add custom sections via config
- Use feature flags appropriately
- Optimize performance with memoization
- Follow AI agent guidelines
- Keep documentation up to date

## Component Reference

### Main Components

File: `src/index.ts`

**Screens:**
- `SettingsScreen`: Main settings screen
  - Implementation: `src/presentation/screens/SettingsScreen.tsx`
  - Documentation: `SETTINGS_SCREEN_GUIDE.md`

**Components:**
- `SettingsItemCard`: Reusable settings item
  - Implementation: `src/presentation/components/SettingsItemCard/SettingsItemCard.tsx`
  - Strategy: `src/presentation/components/SettingsItemCard/STRATEGY.md`

- `SettingsSection`: Section container
  - Implementation: `src/presentation/components/SettingsSection/SettingsSection.tsx`

- `SettingsContent`: Content composer
  - Implementation: `src/presentation/screens/components/SettingsContent/SettingsContent.tsx`

**Hooks:**
- `useSettings`: Main settings hook
  - Implementation: `src/presentation/hooks/useSettings.ts`

- `useFeatureDetection`: Feature detection
  - Implementation: `src/presentation/screens/hooks/useFeatureDetection.ts`

### Domain Components

Each domain has its own components:

**Appearance:**
- Screen: `src/domains/appearance/presentation/screens/AppearanceScreen.tsx`
- Components: `src/domains/appearance/presentation/components/`
- Hooks: `src/domains/appearance/hooks/`

**About:**
- Screen: `src/domains/about/presentation/screens/AboutScreen.tsx`
- Components: `src/domains/about/presentation/components/`
- Hooks: `src/domains/about/presentation/hooks/`

**Other Domains:**
- Legal: `src/domains/legal/`
- Disclaimer: `src/domains/disclaimer/`
- Feedback: `src/domains/feedback/`
- FAQs: `src/domains/faqs/`
- Rating: `src/domains/rating/`
- Video Tutorials: `src/domains/video-tutorials/`
- Cloud Sync: `src/domains/cloud-sync/`
- Dev: `src/domains/dev/`

## Configuration

### Settings Configuration

Type definition: `src/presentation/screens/types/SettingsConfig.ts`

Configuration structure:
- `appearance`: Theme settings
- `language`: Language selection
- `notifications`: Notification preferences
- `about`: App information
- `legal`: Legal documents
- `disclaimer`: Legal notices
- `userProfile`: User profile display
- `feedback`: Feedback system
- `rating`: Rating feature
- `faqs`: FAQ access
- `subscription`: Subscription/upgrade
- `wallet`: Wallet/payment
- `customSections`: App-specific sections

### Feature Flags

Use feature flags to control visibility:
- `true`: Always show feature
- `false`: Never show feature
- `'auto'`: Auto-detect based on navigation

## AI Agent Guidelines

### When Implementing Settings

1. **Read Strategy Documentation First**
   - Check `STRATEGY.md` files in component directories
   - Review `AI_AGENT_GUIDELINES.md`
   - Understand restrictions and rules

2. **Reference Implementation Files**
   - Check file paths in documentation
   - Look at similar existing implementations
   - Follow established patterns

3. **No Code Examples**
   - Documentation contains strategy, not syntax
   - Reference implementation files directly
   - File paths stay valid when code changes

4. **Follow Component Structure**
   - Use existing components from package
   - Don't recreate what already exists
   - Extend via configuration, not modification

5. **Check Restrictions Before Coding**
   - Review what's forbidden
   - Verify rules to follow
   - Ask if unclear

### Common Patterns

**Adding Settings Screen:**
Reference: `SETTINGS_SCREEN_GUIDE.md`
- Use SettingsScreen component
- Configure via SettingsConfig
- Don't build from scratch

**Adding Settings Item:**
Reference: `src/presentation/components/SettingsItemCard/STRATEGY.md`
- Use SettingsItemCard component
- Follow props interface
- Don't create custom items

**Adding Domain Feature:**
Reference: Similar domain README
- Follow domain structure
- Implement required layers
- Document with strategy format

## Documentation Structure

### Key Documentation Files

- `README.md`: This file - package overview
- `DOCUMENTATION_TEMPLATE.md`: Template for new docs
- `AI_AGENT_GUIDELINES.md`: AI coding guidelines
- `SETTINGS_SCREEN_GUIDE.md`: Screen strategy
- `ARCHITECTURE.md`: Architecture overview
- `TESTING.md`: Testing guide

### Domain Documentation

Each domain has README.md with:
- Purpose and file paths
- Strategy for usage
- Restrictions (what not to do)
- Rules (what must be done)
- Component references
- AI agent guidelines

### Component Documentation

Each component directory may contain:
- `README.md`: Component reference
- `STRATEGY.md`: Detailed strategy guide
- Implementation file with TypeScript types

## Quick Reference

### Import Patterns

```typescript
// From package
import { ComponentName } from '@umituz/react-native-settings';

// Types
import type { SettingsConfig, UserProfile } from '@umituz/react-native-settings';
```

### File Locations

```
src/
├── domains/              # Feature domains
│   ├── about/
│   ├── appearance/
│   ├── legal/
│   └── ...
├── presentation/         # UI layer
│   ├── components/       # Shared components
│   ├── screens/          # Screens
│   ├── hooks/            # Hooks
│   └── navigation/       # Navigation
├── application/          # Interfaces
├── infrastructure/       # Data layer
└── index.ts             # Package exports
```

## Related Documentation

### Core Documentation
- **Architecture**: `ARCHITECTURE.md`
- **Testing**: `TESTING.md`
- **AI Guidelines**: `AI_AGENT_GUIDELINES.md`
- **Settings Screen**: `SETTINGS_SCREEN_GUIDE.md`
- **Documentation Template**: `DOCUMENTATION_TEMPLATE.md`
- **Migration**: `DOCUMENTATION_MIGRATION.md`

### Community
- **Contributing**: `CONTRIBUTING.md`
- **Code of Conduct**: `CODE_OF_CONDUCT.md`
- **Security**: `SECURITY.md`
- **Changelog**: `CHANGELOG.md`

### Component Documentation
- **Domain READMEs**: Check individual domain directories
- **Component Strategies**: Check component STRATEGY.md files
- **Component READMEs**: Check component directories

## License

MIT

## Version History

See package.json for version information.
