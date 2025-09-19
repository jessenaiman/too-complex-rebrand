# QWEN.md - Project Context for Too Complex Rebrand

## Project Overview

This repository is a Next.js portfolio/blog template that has been extended with a dynamic AI-powered rebranding feature. The project allows users to instantly redesign the entire page or individual components with a single click by dynamically swapping themes, textual content, and AI-generated visual assets using the Pollinations.AI API.

### Core Technologies
- **Framework**: Next.js (v15.5.3) with React (v19.1.0)
- **Styling**: Tailwind CSS (v4.1.13) with Shadcn UI components
- **Animation**: Motion (from Framer Motion) and MagicUI
- **AI Service**: Pollinations.AI API for image and text generation
- **State Management**: React hooks and context
- **Build Tool**: pnpm

### Key Features
1. **Component-Level Rebrand**: Individual elements wrapped in a special component can be independently regenerated
2. **Page-Level Rebrand**: A global button triggers a full-site redesign
3. **Dynamic Theme Switching**: Randomly selects from predefined Shadcn themes
4. **AI-Generated Content**: Uses Pollinations API to generate logos, images, and marketing text
5. **Visual Feedback**: Animated borders and loading states for interactive elements

## Project Structure

```
app/
├── components/
│   ├── rebrand/           # Rebrand-specific documentation
│   ├── ui/                # Shadcn UI components
│   └── rebrand-page.tsx   # Main rebrand component
├── hooks/
│   ├── use-rebrandable.ts # Core rebrand logic hook
│   └── ...                # Additional rebrand hooks
├── themes/
│   ├── rebrand-theme.ts   # Theme management
│   └── theme-*.ts         # Individual theme definitions
├── data/
│   ├── marketing-text.yml # Business profiles
│   └── rebrand-content.ts # Content management
├── utils/
│   ├── rebrand-ai.ts      # Pollinations API integration
│   └── ...                # Additional utilities
├── layout.tsx             # Main layout
└── ...                    # Other page components

public/                    # Static assets and AI-generated images
```

## Development Guidelines

### Code Structure
- All rebrand logic must be isolated to the `app/` directory
- File naming follows kebab-case convention (e.g., `use-rebrandable.ts`)
- Components use Shadcn UI and MagicUI primitives exclusively
- Never modify files outside `app/` directory for rebrand functionality

### Theme System
- 5 predefined Shadcn themes with random selection
- Theme randomization selects from these 5 distinct palettes
- Color adjustments with hue shifts and intensity variations

### Content System
- Business profiles stored in `app/content/marketing-text.yml`
- 5 distinct mock business profiles for randomization
- Additional marketing texts in `app/content/rebrand-content.ts`

### AI Integration
- Uses Pollinations.AI API for image and text generation
- All generated assets stored in `public/` directory
- Sequential asset generation: theme → content → assets
- Error handling for API failures with UI feedback

## Key Commands

### Development
```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Run linter
pnpm lint
```

### Validation Sequence (Mandatory After Changes)
1. `pnpm lint`
2. `pnpm run dev`
3. `curl -Is http://localhost:3000 | head -n 1`
4. `next build`

## Component Architecture

### Main Components
- `app/components/rebrand-page.tsx` - Primary rebrand interface
- `app/hooks/use-rebrandable.ts` - Core rebrand state and logic
- `app/themes/rebrand-theme.ts` - Theme management
- `app/data/rebrand-content.ts` - Content management
- `app/utils/rebrand-ai.ts` - AI service integration

### Rebrand Flow
1. User triggers rebrand (page-level or component-level)
2. New theme is selected and applied
3. New business profile is selected
4. AI assets are generated sequentially via Pollinations API
5. UI updates with new content and assets
6. Loading states shown during generation

## Important Rules

### Forbidden Actions
- Do not touch or edit `package.json` directly
- Do not install dependencies without validation
- Do not write or modify test files unless requested
- Do not use code outside the `app/` directory for rebrand logic
- Do not use file/folder names that are not kebab-case for logic files

### Required Validation
After every change, run the complete validation sequence:
1. `pnpm lint`
2. `pnpm run dev`
3. `curl -Is http://localhost:3000 | head -n 1`
4. `next build`

If any step fails, resolve the issue before proceeding.

## AI Asset Management

All AI-generated images (logos, cards, hero images) are saved in the `public/` directory. The Pollinations API is used for generation with the following pattern:

```
https://pollinations.ai/p/{prompt}?width={width}&height={height}&nologo=true&seed={seed}
```

Assets are generated in sequence:
1. Fetch new theme
2. Fetch new content
3. Generate AI assets one at a time

## Theme and Content Randomization

### Themes
- 5 predefined themes in `app/themes/`
- Random selection with optional exclusion of current theme
- Color adjustment with hue shifts and intensity variations

### Content
- 5 business profiles in `app/data/marketing-text.yml`
- Additional profiles in `app/data/rebrand-content.ts`
- Random selection from all available profiles

## Error Handling

- Robust error handling for all API calls
- Clear UI states for failures
- Retry mechanisms for failed asset generation
- Graceful degradation when AI services are unavailable

## Performance Considerations

- Sequential asset loading to prevent overwhelming the API
- Loading states for all rebrandable components
- Caching of generated assets in `public/` directory
- Efficient theme switching without full page reloads