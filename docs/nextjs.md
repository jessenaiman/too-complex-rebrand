# Next.js Memory Bank

## Style Guide and Best Practices

### Project Structure
- Use `app` directory for App Router (Next.js 13+)
- Organize by features/routing in `app` directory
- Use `pages` directory for Page Router (legacy)
- Use `components` directory for shared components
- Use `lib` directory for utilities and helpers
- Use `public` directory for static assets
- Use `styles` directory for global CSS

### Routing
- Use file-based routing in `app` directory
- Use `page.tsx` for page components
- Use `layout.tsx` for layout components
- Use `loading.tsx` for loading states
- Use `error.tsx` for error boundaries
- Use `not-found.tsx` for 404 pages
- Use `template.tsx` for re-rendered layouts
- Use route groups with `(folder)` syntax
- Use dynamic routes with `[slug]` syntax
- Use catch-all routes with `[...slug]` syntax

### Data Fetching
- Use `async/await` in Server Components
- Use `fetch` for data fetching (built-in caching)
- Use `useEffect` and `useState` in Client Components
- Use `useSWR` or `react-query` for client-side data fetching
- Handle loading states with Suspense
- Handle error states with Error Boundaries
- Use `revalidate` for ISR (Incremental Static Regeneration)
- Use `cache` for manual caching control

### Server Components
- Use `async` functions for Server Components
- Fetch data directly in component body
- Use Server Actions for mutations
- Import Server-only modules
- Cannot use hooks (useState, useEffect, etc.)
- Cannot use browser APIs (window, document, etc.)

### Client Components
- Use `"use client"` directive at top of file
- Use hooks for state and effects
- Handle user interactions
- Use browser APIs
- Cannot use async/await at top level
- Cannot fetch data directly (use effects or data hooks)

### Styling
- Use CSS modules with `.module.css` extension
- Use global CSS with `app/global.css`
- Use Tailwind CSS with `className` prop
- Use CSS-in-JS libraries (styled-jsx, styled-components, emotion)
- Use `style` prop for inline styles
- Import CSS files in root layout or page

### Fonts
- Use `next/font` for optimized font loading
- Use Google Fonts with `next/font/google`
- Use local fonts with `next/font/local`
- Apply fonts to `className` or `style` prop
- Use CSS variables for font families

### Images
- Use `next/image` for optimized images
- Use `Image` component with `src`, `alt`, `width`, `height`
- Use `fill` prop for responsive images
- Use `priority` prop for LCP images
- Use `placeholder` for image placeholders
- Use `blurDataURL` for blur placeholders

### Metadata
- Use `metadata` object for static metadata
- Use `generateMetadata` for dynamic metadata
- Use `viewport` for viewport settings
- Use `robots` for robots.txt settings
- Use `openGraph` for social media metadata
- Use `twitter` for Twitter metadata

### API Routes
- Use `app/api` directory for API routes
- Use `route.ts` files for route handlers
- Use HTTP methods (GET, POST, PUT, DELETE)
- Use `NextRequest` and `NextResponse`
- Use middleware for request processing
- Use `cookies` and `headers` for request data

### Environment Variables
- Use `.env.local` for local environment variables
- Use `.env.production` for production variables
- Prefix with `NEXT_PUBLIC_` for client-side access
- Access with `process.env.VARIABLE_NAME`
- Use `zod` for environment variable validation

### Performance Optimization
- Use Image Optimization with `next/image`
- Use Font Optimization with `next/font`
- Use Automatic Static Optimization
- Use Incremental Static Regeneration (ISR)
- Use Server-Side Rendering (SSR) when needed
- Use Static Site Generation (SSG) when possible
- Use Code Splitting with dynamic imports
- Use Prefetching with `Link` component

### SEO
- Use proper meta tags
- Use semantic HTML elements
- Use heading hierarchy (h1, h2, h3, etc.)
- Use alt text for images
- Use structured data (JSON-LD)
- Use canonical URLs
- Use sitemap.xml and robots.txt

### Testing
- Use Jest for unit testing
- Use React Testing Library for component testing
- Use Cypress or Playwright for E2E testing
- Use `next/jest` for Jest configuration
- Mock Next.js specific APIs when needed
- Test Server and Client Components separately

### Deployment
- Use Vercel for seamless deployment
- Use `next build` for production builds
- Use `next start` for production server
- Use `next export` for static exports (deprecated in App Router)
- Use environment variables for configuration
- Use CI/CD for automated deployments

### Best Practices
1. Use Server Components by default
2. Only use Client Components when needed
3. Fetch data in Server Components when possible
4. Use TypeScript for type safety
5. Handle loading and error states
6. Optimize images and fonts
7. Use proper metadata for SEO
8. Follow accessibility guidelines
9. Write tests for critical functionality
10. Use environment variables for configuration
11. Keep bundle sizes small
12. Monitor performance metrics