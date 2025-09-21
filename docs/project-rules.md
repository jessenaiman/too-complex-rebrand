---
description: 'Next.js + Tailwind + shadcn development standards and instructions'
applyTo: '**'
---

```markdown
# TODO LIST RECOMMENDED
When starting a new task, it is recommended to create a todo list.

1. Include the task_progress parameter in your next tool call
2. Create a comprehensive checklist of all steps needed
3. Use markdown format: - [ ] for incomplete, - [x] for complete


# Rebrand Project Rules

TODO: Add TOC

All information in this document must have in project links to [markdown documents](../docs/)

# Next.js + Tailwind + shadcn Development Instructions

Instructions for high-quality Next.js applications with Tailwind CSS styling, shadcn/ui components, and TypeScript.

## Project Context

- Latest Next.js (App Router)
- TypeScript for type safety
- Tailwind CSS for styling
- shadcn/ui components for UI primitives

## Project Facts

- shadcn components install to `/components/ui`
- Tailwind CSS is already installed correctly

## Project Rules

- **DO NOT MODIFY** `/components/[ui|magicui|animate-ui]`. The project claims to be accurate representations of the open source library, misrepresenting that by altering the code could have legal implications.
- Do not alter the text and content of `@app/page.tsx` or `app/layout.tsx` without being asked. These are critical.
- Check in code before making code changes for a new task so we can roll back and compare
- This project is a design workshop and portfolio website in disguise.

## Next.js

### Routing, Navigation, and Cookies

Next.js uses the App Router with file-based routing where routes are defined by the file structure in the `app` directory. Navigation is handled using the `Link` component from `next/link` for client-side navigation with automatic prefetching on hover or viewport entry. For programmatic navigation, use the `useRouter` hook from `next/navigation` with methods like `router.push()` and `router.replace()`.

Cookies are managed using the `cookies()` function from `next/headers` for server-side access in Server Components, API Routes, and Server Actions. Cookies can be read with `cookies().get(name)` or checked with `cookies().has(name)`. To set cookies, use `cookies().set(name, value, options)` or include `Set-Cookie` headers in responses. Options include `httpOnly`, `secure`, `maxAge`, `path`, and `sameSite` for security and behavior control.


### How shadcn Uses Themes

shadcn/ui uses CSS variables (custom properties) for theming, allowing dynamic theme changes between light and dark modes. Theme variables are defined in `:root` for light mode and `.dark` for dark mode in the global CSS file. Components reference these variables using classes like `bg-background`, `text-foreground`, etc.

Theming is controlled through the `components.json` configuration file, where `tailwind.cssVariables` can be set to `true` (recommended) for variable-based theming or `false` for direct utility class usage. When enabled, components use CSS variables that can be easily overridden for custom themes.

## Development Standards

### Architecture
- App Router with server and client components
- Group routes by feature/domain
- Implement proper error boundaries
- Use React Server Components by default
- Leverage static optimization where possible

### TypeScript
- Strict mode enabled
- Clear type definitions
- Proper error handling with type guards
- Zod for runtime type validation

### Styling
- Shadcn components styled using tailwindCSS - memory-bank
- shadcn/ui components for consistent UI primitives
- Responsive design patterns
- Dark mode support
- Follow container queries best practices
- Maintain semantic HTML structure

### State Management
- React Server Components for server state
- React hooks for client state
- Proper loading and error states
- Optimistic updates where appropriate

### Data Fetching
- Server Components for direct database queries
- React Suspense for loading states
- Proper error handling and retry logic
- Cache invalidation strategies

### Security
- Input validation and sanitization
- Proper authentication checks
- CSRF protection
- Rate limiting implementation
- Secure API route handling

### Performance
- Image optimization with next/image
- Font optimization with next/font
- Route prefetching
- Proper code splitting
- Bundle size optimization
