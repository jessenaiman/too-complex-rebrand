# Orchestrator Refactoring Plan

## **Current Issues & Status**

### **Critical Issues Identified:**
1. **Duplicate 'background' case** in orchestrator decision flow (lines 183-191)
2. **Component discovery service** only has hardcoded data, no actual file system scanning
3. **Missing component categories** (text, card) in the discovery system
4. **Individual rebrand components** not yet connected to orchestrator events
5. **Dynamic component renderer** needs integration with orchestrator system

### **Current Architecture Status:**
✅ **Orchestrator Event System**: Working with proper event emitters
✅ **Component Discovery Service**: Created but needs enhancement
✅ **Dynamic Component Renderer**: Created but needs integration
❌ **Decision Flow Logic**: Has duplicate cases
❌ **File System Scanning**: Not implemented
❌ **Event Integration**: Components not listening to orchestrator events

## **Implementation Plan**

### **Phase 1: Fix Orchestrator Logic**
**Files to modify:** `utils/rebrand-orchestrator.ts`

1. **Remove duplicate 'background' case** in the switch statement
   - There's a duplicate case for 'background' that conflicts
   - Clean up the decision flow to have single handlers per element type

2. **Consolidate element type handlers**
   - Ensure each element type has exactly one handler
   - Remove conflicting logic between lines 183-191

### **Phase 2: Enhance Component Discovery System**
**Files to modify:** `utils/component-registry/component-discovery.ts`

1. **Implement actual file system scanning**
   - Replace hardcoded components with real directory scanning
   - Use Node.js fs API to discover component files dynamically
   - Parse component metadata from file names and exports

2. **Add more component categories**
   - Add support for 'text' components (from `components/animate-ui/primitives/texts/`)
   - Add support for 'card' components (from `components/ui/` and `components/rebrand/`)
   - Add support for 'background' components (from `components/backgrounds/`)

3. **Expand component registry**
   - Add more button variants: shimmer-button, shiny-button, rainbow-button
   - Add text animation variants: gradient, morphing, typing, shimmer
   - Add card variants: magic-card, card with different themes

### **Phase 3: Integrate Event System**
**Files to modify:** `components/rebrand/individual-rebrandable.tsx`, `components/rebrand/rebrand.tsx`

1. **Connect individual components to orchestrator events**
   - Subscribe to 'elementRebranded' events in individual rebrand components
   - Update component state when orchestrator emits rebrand events
   - Handle loading states based on orchestrator progress

2. **Implement proper component swapping**
   - Use DynamicComponentRenderer for button components
   - Update text components based on orchestrator text content
   - Update background components based on orchestrator background data

3. **Add loading state management**
   - Show loading animations while orchestrator is processing
   - Hide loading when orchestrator emits completion events
   - Handle error states from orchestrator

### **Phase 4: Testing & Validation**

1. **Test dynamic component swapping**
   - Verify components swap when orchestrator emits events
   - Test different component categories (buttons, text, cards)
   - Ensure smooth transitions between component variants

2. **Validate full rebranding workflow**
   - Test complete rebrand sequence: theme → content → assets
   - Verify all components update in sequence
   - Ensure no broken images or console errors

3. **Performance testing**
   - Test with multiple simultaneous rebrand operations
   - Verify event system handles concurrent updates
   - Check memory usage and cleanup

## **Expected Outcomes**

### **After Implementation:**
- ✅ **Fixed circular import bug** - Removed self-referencing generateSingleAsset
- ✅ **Complete orchestrator integration** - Components properly connected to orchestrator events
- ✅ **Dynamic component discovery** - Real file system scanning implemented
- ✅ **Missing element type handlers** - All element types properly handled
- ✅ **Event-driven architecture** - Clean separation between orchestrator and components

### **System Architecture:**
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Orchestrator  │───▶│  Event Emitter   │───▶│   Components    │
│                 │    │                  │    │                 │
│ • Decision Flow │    │ • elementChanged │    │ • Button        │
│ • Asset Gen     │    │ • themeChanged   │    │ • Text          │
│ • Content Gen   │    │ • loadingState   │    │ • Card          │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### **Component Categories Supported:**
- **Buttons**: shimmer-button, shiny-button, rainbow-button, liquid, ripple
- **Text**: gradient, morphing, typing, shimmer, rotating, rolling
- **Cards**: magic-card, card, testimonial-card, feature-card
- **Backgrounds**: bubble, grid patterns, animated backgrounds

## **Implementation Instructions**

### **For Code Mode Implementation:**

1. **Start with Phase 1**: Fix the duplicate 'background' case in orchestrator decision flow
2. **Phase 2**: Implement file system scanning in component discovery service
3. **Phase 3**: Connect individual components to orchestrator events
4. **Phase 4**: Test and validate the complete system

### **Key Files to Focus On:**
- `utils/rebrand-orchestrator.ts` - Main orchestrator logic
- `utils/component-registry/component-discovery.ts` - Component discovery
- `components/rebrand/dynamic-component-renderer.tsx` - Dynamic rendering
- `components/rebrand/individual-rebrandable.tsx` - Individual component logic

### **Testing Commands:**
```bash
# Run validation sequence
pnpm lint --fix
pnpm run dev
curl -Is http://localhost:3000 | head -n 1
next build
```

### **Success Criteria:**
- No TypeScript errors
- No console errors during rebranding
- All components respond to orchestrator events
- Dynamic component swapping works smoothly
- Zero warnings in build output