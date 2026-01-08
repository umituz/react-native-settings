# Disclaimer Components

## Purpose

Components for displaying legal disclaimers, warnings, and important information to users. Provides flexible options for showing disclaimers as cards, modals, or integrated settings with acceptance tracking.

## File Paths

- **DisclaimerCard**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/disclaimer/presentation/components/DisclaimerCard.tsx`
- **DisclaimerModal**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/disclaimer/presentation/components/DisclaimerModal.tsx`
- **DisclaimerSetting**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/disclaimer/presentation/components/DisclaimerSetting.tsx`
- **DisclaimerScreen**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/disclaimer/presentation/screens/DisclaimerScreen.tsx`

## Strategy

1. **Progressive Disclosure**: Uses compact cards for summary information with expand/collapse functionality, showing full details only when users explicitly request them via modals or dedicated screens.

2. **Acceptance Tracking**: Implements storage-based tracking of user acceptance, allowing one-time or versioned disclaimers that don't repeatedly show to users who have already accepted.

3. **Flexible Display Options**: Provides multiple component variants (card, modal, setting, screen) to accommodate different UX requirements and legal compliance needs.

4. **Legal Compliance**: Designed to support various legal scenarios including terms of service, privacy policies, beta warnings, and regional restrictions with proper acceptance handling.

5. **Internationalization Ready**: Supports translation keys and localized content to display disclaimers in user's preferred language, essential for global apps.

## Restrictions

### ❌ DO NOT

- Hide critical legal information behind multiple taps
- Use confusing or ambiguous language
- Bypass acceptance tracking for required disclaimers
- Display disclaimers that are hard to read or dismiss
- Mix different disclaimer types inappropriately

### ❌ NEVER

- Allow users to proceed without accepting required disclaimers
- Store acceptance without reliable persistence mechanism
- Show outdated or superseded disclaimer versions
- Use dark patterns to trick users into acceptance
- Display illegal or unenforceable disclaimer content

### ❌ AVOID

- Overly long disclaimer text (break into sections)
- Technical jargon that average users don't understand
- Aggressive or alarming icon choices
- Blocking app usage for non-critical disclaimers
- Showing disclaimers too frequently

## Rules

### ✅ ALWAYS

- Use clear, concise language in disclaimers
- Require explicit acceptance for legal disclaimers
- Store acceptance reliably using AsyncStorage
- Provide easy access to full disclaimer text
- Allow users to review disclaimers anytime

### ✅ MUST

- Show disclaimers before relevant features are used
- Include accept/decline options for modal disclaimers
- Version disclaimers to track updates
- Provide legal contact information
- Comply with regional legal requirements

### ✅ SHOULD

- Use showOnce for one-time acknowledgments
- Implement version checking for updated disclaimers
- Group related disclaimers together
- Use appropriate warning levels (info, warning, error)
- Provide translations for all user-facing text
- Test disclaimer flows thoroughly

## AI Agent Guidelines

1. **Component Selection**: Use DisclaimerCard for non-critical notices and summaries. Use DisclaimerModal for required legal acceptance (terms, privacy). Use DisclaimerSetting for optional features or beta warnings. Use DisclaimerScreen for comprehensive legal documents.

2. **Acceptance Strategy**: For required legal disclaimers (terms, privacy), block app or feature usage until accepted. Use version checking to show updated disclaimers only when content changes. For non-critical notices, use showOnce to avoid annoying users.

3. **Storage Best Practices**: Use AsyncStorage with unique keys for each disclaimer. Include version numbers in storage keys (e.g., "privacy-2024-01"). Store acceptance timestamp to track when users agreed. Clear storage when app is uninstalled.

4. **Content Organization**: Break long legal documents into sections with clear headings. Use formatting (bold, lists) to improve readability. Consider providing a summary with link to full text. Ensure font sizes are readable (minimum 14px).

5. **User Experience**: Make acceptance actions clear (use "I Agree" / "I Accept" rather than "OK"). Provide a way to decline with clear consequences. Don't block the entire app for minor disclaimers - allow access to other features. Consider showing disclaimers at appropriate times (onboarding, before specific features).

## Reference

- **Card Component**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/disclaimer/presentation/components/DisclaimerCard.tsx`
- **Modal Component**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/disclaimer/presentation/components/DisclaimerModal.tsx`
- **Setting Component**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/disclaimer/presentation/components/DisclaimerSetting.tsx`
- **Screen Component**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/disclaimer/presentation/screens/DisclaimerScreen.tsx`
- **Disclaimer Components**: `/Users/umituz/Desktop/github/umituz/apps/artificial_intelligence/npm-packages/react-native-settings/src/domains/disclaimer/presentation/components/`
