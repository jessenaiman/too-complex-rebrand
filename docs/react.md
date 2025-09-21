# React Memory Bank

## Style Guide and Best Practices

### Component Structure
- Use functional components with hooks
- Export components as default exports
- Use TypeScript interfaces for props
- Destructure props in function parameters
- Use React fragments `<>` or `<React.Fragment>` for multiple root elements

### JSX Syntax
- Use camelCase for HTML attributes (`className`, `onClick`, `htmlFor`)
- Use `style` prop with JavaScript objects for inline styles
- Self-close void elements (`<img />`, `<br />`, `<input />`)
- Use parentheses for multi-line JSX
- Use curly braces `{}` for JavaScript expressions

### State Management
- Use `useState` for local component state
- Use `useEffect` for side effects and lifecycle events
- Use `useContext` for global state management
- Use `useReducer` for complex state logic
- Use `useMemo` for expensive calculations
- Use `useCallback` for memoized callback functions

### Props
- Define prop types with TypeScript interfaces
- Use default props for optional values
- Destructure props for cleaner code
- Validate props with PropTypes in development
- Use children prop for component composition

### Event Handling
- Use camelCase for event names (`onClick`, `onChange`, `onSubmit`)
- Pass event handlers as functions, not function calls
- Use arrow functions or bind methods in constructor
- Access event parameters in event handlers
- Prevent default behavior with `event.preventDefault()`

### Conditional Rendering
- Use ternary operators for simple conditions
- Use logical && operator for simple conditions
- Use if/else statements for complex conditions
- Use switch statements for multiple conditions
- Return null for components that should not render

### Lists and Keys
- Use `map()` to render lists of components
- Always provide a unique `key` prop for list items
- Use array index as key only when list is static
- Avoid using non-unique keys like `Math.random()`

### Forms
- Control form inputs with state
- Handle form submission with `onSubmit`
- Use controlled components for form validation
- Prevent default form submission behavior
- Use `useRef` for uncontrolled components

### Styling
- Use `className` for CSS classes
- Use `style` prop for dynamic inline styles
- Use CSS modules for component-scoped styles
- Use styled-components or emotion for CSS-in-JS
- Import CSS files for global styles

### Performance Optimization
- Use `React.memo` for component memoization
- Use `useMemo` for expensive calculations
- Use `useCallback` for memoized callback functions
- Use `lazy` and `Suspense` for code splitting
- Avoid unnecessary re-renders with proper state management

### Hooks
- Use built-in hooks (`useState`, `useEffect`, `useContext`, etc.)
- Create custom hooks for reusable logic
- Follow the rules of hooks (only call at top level, only in React functions)
- Use array destructuring for hook return values
- Handle cleanup in `useEffect` with return function

### Context
- Use `React.createContext` to create context
- Use `Context.Provider` to provide values
- Use `useContext` hook to consume context
- Avoid context for rapidly changing values
- Split context for different concerns

### Error Boundaries
- Use class components with `componentDidCatch` for error boundaries
- Use try/catch for imperative error handling
- Handle errors gracefully with fallback UI
- Log errors for debugging purposes

### Testing
- Use React Testing Library for component testing
- Test user interactions and behavior
- Mock external dependencies
- Test edge cases and error states
- Use snapshot testing for UI structure

### Best Practices
1. Keep components small and focused
2. Use meaningful component and variable names
3. Follow a consistent folder structure
4. Use TypeScript for type safety
5. Handle loading and error states
6. Optimize performance with memoization
7. Write accessible components
8. Use proper error handling
9. Follow React's composition model
10. Keep state as local as possible
11. Use hooks for reusable logic
12. Test components thoroughly