# Rebranding Features Implementation

## Overview
This issue tracks the implementation of dynamic, AI-powered rebranding features for the landing page application. The system should allow users to trigger both page-wide and individual component rebranding with AI-generated content and visuals.

## Functional Requirements

### FR-001: Page-wide Rebranding
**System MUST allow users to trigger a page-wide rebrand that affects all rebrandable components simultaneously. Page must reload and show new styles and images.**

**Status:** ✅ PARTIALLY IMPLEMENTED
- Global rebrand button exists in `components/rebrand/rebrand-page.tsx`
- Uses `useRebrand()` hook with `triggerGlobalRebrand()` function
- Orchestrates theme → content → assets sequence via `orchestrateRebrand()`
- Applies new CSS themes, business identity content, and regenerates visual assets
- Missing: Page reload functionality (currently re-renders components)

### FR-002: Individual Component Rebranding
**System MUST allow users to trigger a rebrand for individual components by clicking on them. Must display new design that matches the current theme.**

**Status:** ✅ PARTIALLY IMPLEMENTED
- Individual rebrandable components exist (`components/rebrand/individual-rebrandable.tsx`)
- Components can be clicked to trigger rebranding
- Uses `useDemoRebrand()` hook for theme colors
- Missing: Proper integration with global theme state

### FR-003: Logo Rebranding with Accessibility
**System MUST change the individual rebranded components with images, such as the logo when clicked. Must follow accessibility standards and include a tooltip explaining what happens when clicking the element.**

**Status:** ⚠️ PARTIALLY IMPLEMENTED
- Logo rebranding partially implemented in `useDemoRebrand.ts`
- Uses `generatePollinationsImage()` for logo generation
- Missing: Accessibility standards (ARIA attributes, keyboard navigation)
- Missing: Tooltip explaining functionality
- Missing: Individual logo clicking (currently part of global rebrand)

### FR-004: Professional Company Content
**System MUST rebrand on screen content using text from a predefined set of at least 5 modern professional companies described in the content/.**

**Status:** ✅ IMPLEMENTED
- 14 business profiles defined in `app/content/marketing-text.yml`
- `getRandomBusinessProfile()` in `utils/rebrand-content.ts` selects randomly
- Content includes name, tagline, and description

### FR-005: Loading States
**System MUST show starting content, as well as loading animations on all rebrandable components during the rebranding process.**

**Status:** ✅ PARTIALLY IMPLEMENTED
- Loading states exist in `components/rebrand/rebrand-page.tsx`
- Loading spinner shown during rebranding
- Loading overlay on AI-generated background image
- Missing: Loading states on all individual rebrandable components

### FR-006: Random Colors and Animations
**System MUST apply random colors and animations to rebranded text from a set of predefined based on the theme.**

**Status:** ✅ PARTIALLY IMPLEMENTED
- 5 predefined themes in `utils/rebrand-theme.ts`
- Theme colors applied to components via `useDemoRebrand()` hook
- Missing: Random animations for text elements
- Missing: More dynamic color application

## Technical Implementation

### Current Architecture
- **Theme Engine**: `utils/rebrand-theme.ts` manages 5 predefined themes
- **Content Engine**: `utils/rebrand-content.ts` handles business profiles
- **AI Service**: `utils/rebrand-ai.ts` interfaces with Pollinations API
- **Orchestrator**: `utils/rebrand-orchestrator.ts` manages rebranding sequence
- **Components**: 
  - `components/rebrand/rebrandable.tsx` - Wrapper for theme-aware components
  - `components/rebrand/individual-rebrandable.tsx` - Clickable individual components
  - `components/rebrand/rebrand-page.tsx` - Main rebranding page
  - `components/rebrand/rebrand-context.tsx` - Global state management

### Missing Functionality
1. Proper page reload on global rebrand (FR-001)
2. Better integration between individual and global rebranding (FR-002)
3. Accessibility features and tooltips (FR-003)
4. Loading states on all rebrandable components (FR-005)
5. Text animations and more dynamic color application (FR-006)

## Implementation Plan

### Phase 1: Accessibility & UX Improvements
- [ ] Add ARIA attributes to rebrandable components
- [ ] Implement keyboard navigation support
- [ ] Add tooltips to explain rebranding functionality
- [ ] Improve loading state consistency

### Phase 2: Individual Component Enhancements
- [ ] Implement individual logo clicking functionality
- [ ] Better integration with global theme state
- [ ] Add loading states to all individual components

### Phase 3: Animation & Visual Enhancements
- [ ] Implement text animations for rebranded content
- [ ] Add more dynamic color application based on themes
- [ ] Improve visual feedback for rebranding actions

### Phase 4: Page Reload Implementation
- [ ] Implement proper page reload on global rebrand
- [ ] Ensure state persistence across reloads
- [ ] Add smooth transitions between rebrands

## Testing Requirements
- [ ] Verify page-wide rebranding triggers all components
- [ ] Test individual component rebranding
- [ ] Validate accessibility compliance (WCAG 2.1 AA)
- [ ] Check loading states during rebranding
- [ ] Verify random content selection
- [ ] Test theme consistency across components

## Acceptance Criteria
- [ ] Users can trigger page-wide rebrand that affects all components
- [ ] Individual components can be rebranded by clicking
- [ ] Logo changes with appropriate accessibility features
- [ ] Content is selected from predefined professional companies
- [ ] Loading animations appear during rebranding
- [ ] Colors and animations are applied based on themes
- [ ] All components follow accessibility standards
