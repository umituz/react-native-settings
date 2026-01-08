# Documentation Template

Standard template for all `@umituz/react-native-settings` documentation.

## Structure

Each documentation file MUST include these sections:

1. **Purpose** - What this component/module does
2. **File Path** - Where to find the implementation
3. **Imports** - What to import and from where
4. **Strategy** - How to use it effectively
5. **Restrictions** - What NOT to do (Forbidden)
6. **Rules** - What MUST be followed
7. **Related Components** - Related files and components

## Example Template

```markdown
# [Component/Module Name]

## Purpose
[Brief description of what this does]

## File Path
`src/path/to/file.tsx`

## Imports
```typescript
import { ComponentName } from '@umituz/react-native-settings';
// OR
import { ComponentName } from '../../path/to/file';
```

## Strategy
- [Strategic point 1]
- [Strategic point 2]
- [Best practices]

## Restrictions (Forbidden)
- ❌ **DO NOT**: [What to avoid]
- ❌ **NEVER**: [Critical restrictions]
- ❌ **AVOID**: [Common mistakes]

## Rules
- ✅ **ALWAYS**: [Mandatory requirements]
- ✅ **MUST**: [Critical rules]
- ✅ **SHOULD**: [Recommended practices]

## Related Components
- **ComponentName**: Path/to/component
- **ModuleName**: Path/to/module

## AI Agent Guidelines
When working with this component:
1. [AI instruction 1]
2. [AI instruction 2]
3. [AI instruction 3]
```

## Philosophy

### Why No Code Examples?

**Problem**: Code examples become outdated when implementation changes
**Solution**: Reference file paths that stay stable

### Why Strategy/Restrictions/Rules?

**Strategy**: High-level approach and best practices
**Restrictions**: Clear anti-patterns to avoid
**Rules**: Mandatory requirements for consistency

### Why AI-Friendly?

AI agents need:
- Clear guidelines on what to do/not do
- File paths to reference
- Rules to follow
- No outdated code examples to confuse them

## Sections Explained

### Purpose
Single sentence describing what the component does.

### File Path
Exact path to the main implementation file.

### Imports
Show import statements (these rarely change).

### Strategy
High-level guidance:
- When to use this component
- How to integrate it
- Best practices
- Common patterns

### Restrictions (Forbidden)
What NOT to do:
- ❌ Clear anti-patterns
- ❌ Common mistakes
- ❌ Performance issues to avoid
- ❌ Security concerns

### Rules
What MUST be done:
- ✅ Mandatory requirements
- ✅ Consistency rules
- ✅ Error handling requirements
- ✅ TypeScript usage rules

### Related Components
Cross-references to related files.

### AI Agent Guidelines
Specific instructions for AI agents:
- How to generate code for this component
- What patterns to follow
- What to avoid

## Usage Pattern

Instead of:

```tsx
// BAD: Code example that becomes outdated
<SettingsItemCard icon="settings" title="Settings" />
```

Use:

```markdown
## File Path
`src/presentation/components/SettingsItemCard/SettingsItemCard.tsx`

## Strategy
Use SettingsItemCard for all settings list items. Reference the implementation file for current props and usage patterns.

## Restrictions
- ❌ DO NOT create custom item cards - use SettingsItemCard
- ❌ NEVER inline settings logic - keep in separate components

## Rules
- ✅ ALWAYS use SettingsItemCard from components
- ✅ MUST pass required props: icon, title
- ✅ SHOULD provide onPress handler for navigation
```

This approach:
- Stays valid when code changes
- Provides clear guidance
- Easy to maintain
- AI-friendly
