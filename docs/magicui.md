# Magic UI Memory Bank

## Style Guide and Best Practices

### Component Structure
- Use React with TypeScript for type safety
- Use Framer Motion for animations
- Use Tailwind CSS for styling
- Export components as default exports
- Use functional components with hooks
- Implement proper TypeScript interfaces for props

### Animation Patterns
- Use Framer Motion for smooth animations
- Implement entrance animations with `motion` components
- Use spring physics for natural movement
- Implement staggered animations for lists
- Use layout animations for smooth transitions
- Implement hover and tap animations

### Styling with Tailwind CSS
- Use utility-first approach
- Leverage responsive design with breakpoints
- Use consistent spacing scale
- Implement proper color palette
- Use CSS variables for theming
- Apply consistent border radius
- Use proper typography hierarchy

### Component Customization
- Use props for customization
- Implement variant patterns
- Support size variations
- Allow color customization
- Provide disabled states
- Support accessibility features

### Performance Optimization
- Use React.memo for component memoization
- Implement proper key props for lists
- Use useCallback for event handlers
- Optimize animations with Framer Motion
- Lazy load components when appropriate
- Use code splitting for large components

### Accessibility
- Implement proper keyboard navigation
- Use semantic HTML elements
- Provide ARIA attributes when needed
- Support screen readers
- Ensure proper color contrast
- Implement focus management

### Best Practices
1. Use TypeScript for type safety
2. Follow React best practices
3. Implement proper error handling
4. Use consistent naming conventions
5. Export components properly
6. Use conditional class names with cn utility
7. Implement proper TypeScript interfaces
8. Follow accessibility guidelines
9. Optimize performance
10. Test components thoroughly
11. Use proper animation patterns
12. Maintain consistent styling

### Animation Implementation
- Use `motion` components from Framer Motion
- Implement `whileHover` and `whileTap` for interactive animations
- Use `initial`, `animate`, and `exit` for entrance/exit animations
- Implement `transition` for custom animation timing
- Use `variants` for complex animation states
- Apply `layout` for layout animations

### Tailwind CSS Patterns
- Use consistent spacing with `p-`, `m-`, `gap-` utilities
- Implement responsive design with `sm:`, `md:`, `lg:` prefixes
- Use color palette consistently
- Apply proper typography with `text-`, `font-` utilities
- Use flexbox and grid utilities for layout
- Implement proper border and shadow utilities

### Component Composition
- Use compound components pattern when appropriate
- Implement proper prop drilling
- Use React Context for global state
- Support controlled and uncontrolled components
- Implement proper callback handling
- Use React.forwardRef for ref forwarding

### Utility Functions
- Use `cn` function for conditional class names
- Use `twMerge` for Tailwind CSS class merging
- Use `clsx` for conditional class composition
- Implement proper utility function typing
- Export utility functions for reuse