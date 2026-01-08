# AI Agent Development Guidelines

Comprehensive guidelines for AI agents when developing with `@umituz/react-native-settings`.

## Core Principles

### 1. No Code Examples in Documentation
- ❌ **FORBIDDEN**: Including code examples in README files
- ✅ **REQUIRED**: Reference file paths only
- ✅ **REQUIRED**: Describe patterns and strategies
- **REASON**: Code changes frequently, documentation stays valid

### 2. File Path References
When describing functionality:
- Always provide exact file path
- Use relative paths from package root
- Include `.tsx` or `.ts` extensions
- Format: `src/path/to/File.tsx`

### 3. Strategy-Based Documentation
Each component/module MUST include:
- **Strategy**: How to use it effectively
- **Restrictions**: What NOT to do
- **Rules**: What MUST be followed
- **AI Guidelines**: Specific AI agent instructions

## Component Development Rules

### When Creating Settings UI

#### ✅ ALWAYS
1. **Use Existing Components**
   - Check if component exists in `src/presentation/components/`
   - Import from `@umituz/react-native-settings`
   - Reference implementation file

2. **Follow Domain Structure**
   - Place feature in appropriate domain
   - Use domain's existing patterns
   - Reference similar features

3. **Type Safety**
   - Use TypeScript for all files
   - Define proper interfaces
   - Export types

#### ❌ NEVER
1. **Create Duplicate Components**
   - Don't recreate existing components
   - Check component library first
   - Extend if needed, don't duplicate

2. **Bypass Layers**
   - Don't skip repository layer
   - Don't access storage directly
   - Follow DDD layering

3. **Hardcode Values**
   - Use design system tokens
   - Use constants file
   - Don't hardcode colors, sizes

## File Organization

### Domain Structure

Each domain follows this pattern:
```
src/domains/{domain-name}/
├── domain/              # Business entities
├── application/         # Domain-specific application logic
├── infrastructure/      # Data persistence
├── presentation/        # UI components
│   ├── screens/
│   ├── components/
│   └── hooks/
├── types/              # Domain types
└── utils/              # Domain utilities
```

### Rules
- Place files in correct layer
- Follow existing patterns
- Use proper imports between layers
- Don't create circular dependencies

## Component Creation Checklist

Before creating a new component:

1. ✅ **Check Existing Components**
   - Search `src/presentation/components/`
   - Search domain's `presentation/components/`
   - Check if similar component exists

2. ✅ **Follow Structure**
   - Create in appropriate location
   - Use proper naming conventions
   - Add TypeScript types

3. ✅ **Documentation**
   - Create README.md in component directory
   - Follow documentation template
   - Include Strategy/Restrictions/Rules
   - NO CODE EXAMPLES

4. ✅ **Testing**
   - Add test file alongside component
   - Test file: `ComponentName.test.tsx`
   - Follow testing patterns

## Import Rules

### From Package
```typescript
import { ComponentName } from '@umituz/react-native-settings';
```

### Relative Imports
```typescript
// Within same domain
import { ComponentName } from '../components/ComponentName';

// Across domains
import { ComponentName } from '../../domains/{domain}/presentation/components/ComponentName';
```

### Restrictions
- ❌ Don't use deep relative imports (`../../../`)
- ❌ Don't import from implementation files directly
- ✅ Use barrel exports (`index.ts`)

## Naming Conventions

### Components
- PascalCase: `SettingsItemCard.tsx`
- Descriptive names
- Prefix with feature name if domain-specific

### Hooks
- camelCase with `use` prefix: `useSettings.ts`
- Domain hooks: `use{Feature}{Action}.ts`

### Utilities
- camelCase: `formatDate.ts`
- Descriptive action names: `normalizeConfig.ts`

### Types
- PascalCase for interfaces: `UserSettings.ts`
- Type suffix: `SettingsConfig.types.ts`

## Design System Usage

### ✅ ALWAYS Use Design System
```typescript
// Instead of:
color: '#2196F3'
fontSize: 16

// Use:
color: tokens.colors.primary
fontSize: tokens.typography.fontSize.base
```

### Tokens Reference
See: `src/presentation/design-system/tokens.ts`
- Colors: `tokens.colors.*`
- Spacing: `tokens.spacing.*`
- Typography: `tokens.typography.*`
- Border Radius: `tokens.borderRadius.*`

## TypeScript Rules

### ✅ MUST
- Type all props
- Type all function parameters
- Type all return values
- Export reusable types
- Use strict mode

### Type Definition Location
- Component types: Same file as component
- Shared types: `types/` directory
- Domain types: `src/domains/{domain}/types/`

## Error Handling

### ✅ ALWAYS
1. Use try-catch for async operations
2. Provide meaningful error messages
3. Log errors appropriately
4. Handle user-friendly errors

### Pattern
```typescript
// Check implementation files for patterns
// Repository: src/infrastructure/repositories/SettingsRepository.ts
// Service: src/infrastructure/services/SettingsService.ts
```

## Performance Rules

### ✅ ALWAYS
1. Use React.memo for expensive components
2. Use useCallback for handlers
3. Use useMemo for computed values
4. Avoid unnecessary re-renders

### ❌ NEVER
1. Define functions in render
2. Create objects in render
3. Skip optimization without reason
4. Ignore performance warnings

## Accessibility

### ✅ MUST
1. Add accessibilityLabel to interactive elements
2. Provide accessibilityHint for complex interactions
3. Support screen readers
4. Maintain proper touch target sizes (44x44 min)

## Testing Guidelines

### Test File Location
- Next to component: `ComponentName.test.tsx`
- In `__tests__` directory: `__tests__/ComponentName.test.tsx`

### What to Test
- Component rendering
- User interactions
- Props changes
- Error states
- Accessibility

### Pattern Reference
Check existing test files:
- `src/presentation/components/__tests__/SettingsItemCard.test.tsx`
- `src/domains/about/presentation/components/__tests__/AboutContent.test.tsx`

## Common Patterns

### Adding a New Settings Item

1. **Check Existing**: Look at `SettingsItemCard` usage
2. **Follow Pattern**: Use `SettingsItemCard` component
3. **Reference File**: `src/presentation/components/SettingsItemCard/SettingsItemCard.tsx`
4. **No Custom Code**: Don't create custom item cards

### Adding a New Domain

1. **Follow Structure**: Copy existing domain structure
2. **Reference**: Similar domain for patterns
3. **Layers**: domain/, application/, infrastructure/, presentation/
4. **Documentation**: Create domain README with strategy/restrictions/rules

### Adding Navigation

1. **Reference**: `src/presentation/navigation/`
2. **Use Wrappers**: Existing screen wrappers
3. **Follow Patterns**: See navigation utilities
4. **No Inline**: Don't inline navigation logic

## File Reference Patterns

When agent needs to implement something:

1. **Find Similar Implementation**
   ```
   Search: Use Task tool with Explore agent
   Pattern: Look for similar feature in existing code
   Reference: Check READMEs for file paths
   ```

2. **Follow Existing Patterns**
   ```
   Don't: Create from scratch
   Do: Reference and adapt existing code
   Verify: Check implementation file directly
   ```

3. **Check Documentation First**
   ```
   1. Read component README
   2. Check Strategy section
   3. Follow Rules section
   4. Reference file path
   ```

## Verification Steps

### Before Completing Task

1. ✅ **Checked Documentation**
   - Read relevant README files
   - Understood strategy and restrictions
   - Know the file paths

2. ✅ **Referenced Implementation**
   - Looked at similar components
   - Followed existing patterns
   - Used same imports

3. ✅ **Followed Rules**
   - No code examples in docs
   - All files properly typed
   - Design system tokens used
   - Error handling included

4. ✅ **Testing**
   - Added tests if new component
   - Verified existing tests pass
   - Tested on both platforms if needed

## Quick Reference

### Common File Paths

```
Components:
  src/presentation/components/SettingsItemCard/
  src/presentation/screens/components/SettingsContent/

Domains:
  src/domains/about/
  src/domains/appearance/
  src/domains/legal/
  (etc.)

Configuration:
  src/presentation/screens/types/SettingsConfig.ts
  src/presentation/screens/utils/normalizeConfig.ts

Navigation:
  src/presentation/navigation/components/
  src/presentation/navigation/hooks/
  src/presentation/navigation/utils/
```

### Key Import Patterns

```typescript
// From package
import { X } from '@umituz/react-native-settings';

// Domain components
import { X } from '../../domains/{domain}/presentation/components/X';

// Utilities
import { util } from '../../path/to/util';
```

## Summary

### Agent Approach
1. **Read Documentation First** - Check READMEs
2. **Reference Implementation** - Look at file paths
3. **Follow Patterns** - Don't create from scratch
4. **No Code Examples** - Keep docs code-free
5. **Strategy Over Syntax** - Focus on approach

### Success Criteria
- ✅ Uses existing components
- ✅ Follows domain structure
- ✅ Includes proper documentation
- ✅ No code examples in docs
- ✅ File paths referenced correctly
