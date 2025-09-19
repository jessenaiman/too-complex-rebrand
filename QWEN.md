## Project Facts:

This is a professional portfolio website with a unique feature to redesign the website, or individual components using a combination of static arrays and ai content generation through the use of the Pollinations API

- You are operating in a react 19+, nextjs, tailwindcss 4.1 application
# Rebrand Orchestrator System

> A single-page application for dynamically rebranding UI components using AI-generated content and predefined themes.

This system allows users to trigger visual refreshes of individual components or the entire page, swapping styles, images, and text while maintaining a professional aesthetic and responsive layout.

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- pnpm v8+

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm run dev
```

Visit `http://localhost:3000` to view the application.

### Build

```bash
pnpm run build
```

---

## 🧩 Core Architecture

The system is built around a central **Orchestrator** that manages sequential processing of rebranding tasks, ensuring stability and a professional user experience.

### Key Utilities

- **`app/utils/pollinations-image.ts`**: Handles all interactions with the Pollinations.AI API.
    - `generatePollinationsImage`: Synchronously generates an image URL.
    - `generatePollinationsImageAsync`: Asynchronously generates an image URL and verifies its availability.
    - `processPollinationsPromptsSequentially`: **NEW** Processes an array of prompts one-by-one, waiting for each image to be ready before proceeding to the next. This is the core function for reliable, sequential AI image generation.

- **`app/utils/rebrand-orchestrator.ts`**: The central brain. It receives rebrand requests, determines the type of rebrand needed (image, theme, content, etc.), and delegates the task to the appropriate module.

- **`app/utils/rebrand-theme.ts`**: Manages theme switching between 5 predefined Shadcn UI themes.

- **`app/utils/rebrand-content.ts`**: Fetches and processes company data from `app/content/companies.ts` for dynamic text replacement.

- **`app/utils/rebrand-background.ts`**: Swaps the page background with a component from `components/backgrounds/`.

---

## 🛠️ For New Developers

### 1. Understanding Sequential Processing

The most critical new feature is `processPollinationsPromptsSequentially`. This function ensures that AI-generated images load reliably without overwhelming the API or the UI.

```typescript
// Example usage in a component
import { processPollinationsPromptsSequentially } from '@/app/utils/pollinations-image';

const handleRebrand = async () => {
  const prompts = [
    "Minimalist logo for a fintech startup",
    "Futuristic background for a tech conference",
    "Portrait of a friendly customer service AI"
  ];

  await processPollinationsPromptsSequentially(
    prompts,
    { isLogo: false },
    (prompt, imageUrl, index) => {
      // Success: Update your component state with the new image URL
      console.log(`Image ${index + 1} ready:`, imageUrl);
    },
    (prompt, error, index) => {
      // Error: Handle gracefully, show a fallback
      console.error(`Failed to generate image for: ${prompt}`, error);
    }
  );
};
```

### 2. Adding a New Rebrandable Component

1.  Wrap your component with the `<Rebrand>` wrapper.
2.  Define its `elementType` (e.g., `'logo'`, `'hero-image'`, `'testimonial'`).
3.  The Orchestrator will automatically handle the rest when the component is clicked.

### 3. Modifying Themes

Themes are defined in `app/global.css`. To add a new theme:

1.  Add a new CSS class following the Shadcn theming convention.
2.  Update the theme selection logic in `rebrand-theme.ts`.
3.  Add corresponding mood/feeling metadata to `app/content/themes.yml`.

### 4. Adding New Company Data

Add new entries to `app/content/companies.ts`. This data is used by `rebrand-content.ts` to generate context-aware prompts for the Pollinations API.

---

## 📁 Project Structure

```
app/
├── content/                   # Static data (companies, themes)
├── utils/                     # Core logic (orchestrator, API clients)
│   ├── pollinations-image.ts  # AI image generation (DO NOT MODIFY)
│   ├── rebrand-orchestrator.ts
│   ├── rebrand-theme.ts
│   ├── rebrand-content.ts
│   └── rebrand-background.ts
├── components/                # UI components
│   ├── backgrounds/           # Background components
│   ├── buttons/               # Button variants
│   └── ui/                    # Loaders, animations
└── global.css                 # 5 Shadcn themes
```

---

## ⚠️ Important Notes

- **Do not modify `pollinations-image.ts`** unless explicitly instructed. It is a stable, tested module.
- All new code must use **kebab-case** file naming.
- Prioritize **professional design** over experimental features. Layout must never break.
- Use the provided loading states (`components/ui/progress.tsx`, `components/loading.tsx`) to ensure a smooth user experience during rebrands.

This system is designed for stability and scalability. New features should integrate with the existing Orchestrator pattern.


## ✅ Validation Checklist

Before committing or merging, ensure the following commands pass:

```bash
# 1. Fix all linting errors
pnpm lint --fix

# 2. Verify the dev server runs without errors
pnpm run dev

# 3. Check the server responds
curl -Is http://localhost:3000 | head -n 1
# Should return: HTTP/1.1 200 OK

# 4. Ensure the production build succeeds
pnpm run build
```

---