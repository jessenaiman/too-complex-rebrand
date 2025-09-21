# Tailwind CSS Memory Bank

## Style Guide and Best Practices

### Responsive Design
- Use responsive prefixes like `sm:`, `md:`, `lg:`, `xl:`, `2xl:` for breakpoints
- Mobile-first approach - styles apply to all screens unless prefixed
- Example: `text-[22px] md:text-[32px]` for responsive font sizes

### Arbitrary Values
- Use square bracket notation for custom values: `p-[5px]`, `bg-[#bada55]`
- Reference CSS variables with shorthand: `bg-(--my-brand-color)` or `p-(--my-padding)`
- Handle spaces with underscores: `grid-cols-[1fr_500px_2fr]`
- Preserve underscores in URLs: `bg-[url('/what_a_rush.png')]`

### Dark Mode
- Use `dark:` prefix for dark mode styles
- Generated CSS uses `@media (prefers-color-scheme: dark)` media query
- Example: `dark:bg-gray-800` applies background color in dark mode

### State Variants
- Hover: `hover:bg-blue-500`
- Focus: `focus:outline-none`
- Active: `active:scale-95`
- Disabled: `disabled:opacity-50`
- Group variants: `group-hover:text-blue-600`
- Peer variants: `peer-invalid:text-red-500`

### Logical Properties
- Use `ps-` and `pe-` for logical padding (start/end)
- Adapts to text direction (LTR/RTL)
- Example: `ps-4 pe-8` for logical padding

### Flexbox and Grid
- Flex: `flex`, `flex-row`, `flex-col`, `items-center`, `justify-between`
- Grid: `grid`, `grid-cols-3`, `gap-4`
- Grid template areas: `grid-template-areas` for named grid layouts

### Typography
- Text transform: `capitalize`, `uppercase`, `lowercase`
- Font style: `italic`, `not-italic`
- Text decoration: `underline`, `line-through`, `no-underline`
- Text color: `text-blue-500`, `text-[#bada55]`

### Spacing and Sizing
- Padding: `p-4`, `px-2`, `py-3`, `pt-1`, `pr-2`, `pb-3`, `pl-4`
- Margin: `m-4`, `mx-2`, `my-3`, `mt-1`, `mr-2`, `mb-3`, `ml-4`
- Width: `w-full`, `w-1/2`, `w-64`, `w-[32rem]`
- Height: `h-screen`, `h-1/2`, `h-32`, `h-[200px]`

### Backgrounds
- Colors: `bg-red-500`, `bg-[#bada55]`
- Images: `bg-[url('/image.png')]`
- Gradients: `bg-gradient-to-r from-blue-500 to-purple-500`
- Repeat: `bg-repeat`, `bg-no-repeat`
- Position: `bg-center`, `bg-top`, `bg-bottom`

### Borders
- Width: `border`, `border-2`, `border-t-4`
- Color: `border-gray-300`, `border-[#bada55]`
- Radius: `rounded`, `rounded-lg`, `rounded-full`
- Style: `border-solid`, `border-dashed`, `border-dotted`

### Effects
- Shadow: `shadow`, `shadow-lg`, `shadow-xl`
- Opacity: `opacity-50`, `opacity-75`
- Blur: `blur-sm`, `blur-md`

### Transitions and Animations
- Transition: `transition`, `transition-all`, `transition-colors`
- Duration: `duration-300`, `duration-500`
- Ease: `ease-in`, `ease-out`, `ease-in-out`
- Animation: `animate-pulse`, `animate-bounce`

### Accessibility
- Screen readers: `sr-only`, `not-sr-only`
- Focus visible: `focus-visible:ring-2`
- Reduced motion: `motion-safe:animate-pulse`

### Custom Variants
- Arbitrary variants: `[&>p]:mt-4` for complex selectors
- Data attributes: `data-[size=large]:p-8`
- ARIA attributes: `aria-[current=page]:font-bold`

### Best Practices
1. Use utility classes instead of custom CSS when possible
2. Leverage responsive design with breakpoint prefixes
3. Combine multiple utilities for complex designs
4. Use arbitrary values for one-off customizations
5. Apply state variants for interactive elements
6. Consider accessibility with screen reader utilities
7. Use dark mode variants for theme support
8. Leverage logical properties for internationalization