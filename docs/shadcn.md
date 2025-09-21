# shadcn/ui Memory Bank

## Style Guide and Best Practices

### Installation and Configuration
- Use `npx shadcn@latest init` to initialize project
- Use `npx shadcn@latest add button` to add components
- Configure `components.json` for project settings
- Set `style` to "new-york" or "default"
- Enable CSS variables with `tailwind.cssVariables: true`
- Configure aliases for components, utils, ui, lib, hooks

### Component Structure
- Use TypeScript interfaces for component props
- Export components as default exports
- Use `cn` utility for conditional class names
- Follow consistent naming conventions
- Use Radix UI primitives for accessibility
- Implement proper TypeScript typing

### Styling with CSS Variables
- Use CSS variables for theming: `--background`, `--foreground`, `--primary`, etc.
- Define variables in `:root` for light mode
- Define variables in `.dark` for dark mode
- Use `@theme inline` for simplified variable access
- Apply colors with `bg-background`, `text-foreground`, `bg-primary`, `text-primary-foreground`

### Theming
- Use CSS variables for consistent theming
- Support both light and dark modes
- Define color palette with Oklch values
- Use `bg-*` and `text-*` prefixes for background and text colors
- Implement theme switching with `dark:` class or data attribute

### Component Variants
- Use `variant` prop for different styles
- Use `size` prop for different sizes
- Implement variants with `cva` (Class Variance Authority)
- Define default variants
- Support disabled states

### Accessibility
- Use Radix UI primitives for accessible components
- Implement proper keyboard navigation
- Use ARIA attributes when needed
- Support screen readers
- Follow WCAG guidelines

### Customization
- Use `className` prop for additional styling
- Extend components with wrapper components
- Override default styles with Tailwind classes
- Use CSS variables for theme customization
- Create custom variants with `cva`

### Best Practices
1. Use TypeScript for type safety
2. Follow accessibility guidelines
3. Use CSS variables for theming
4. Implement proper error handling
5. Support both light and dark modes
6. Use consistent naming conventions
7. Export components properly
8. Use conditional class names with `cn`
9. Implement proper TypeScript interfaces
10. Use Radix UI for accessible primitives
11. Follow shadcn/ui design patterns
12. Test components thoroughly

### CSS Variable Naming Convention
- Use `--background` and `--foreground` for base colors
- Use `--primary` and `--primary-foreground` for primary colors
- Use `--secondary` and `--secondary-foreground` for secondary colors
- Use `--muted` and `--muted-foreground` for muted colors
- Use `--accent` and `--accent-foreground` for accent colors
- Use `--destructive` and `--destructive-foreground` for destructive colors
- Use `--border` and `--input` for border colors
- Use `--ring` for focus ring colors
- Use `--radius` for border radius

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