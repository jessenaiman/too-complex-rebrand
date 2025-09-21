# Project Summary

## Overall Goal
This is a single-page web app that will swap (rebrand) components and the page by applying new styles, context, and images to create a new professional design

## Rebrand Component (Individual)

Applying <Rebranded> around an html element </Rebranded> can be restyled by wrapping it in a component.

### Key Features

## Orchestror Component (design)

1. Shows an animated loading image:
   1. [Default](../../components/ui/progress.tsx)
   2. [Buttons](../../components/loading.tsx)
   3. [Images](../../components/ui/blur-fade.tsx)
   4. [Card](../../components/loading.tsx) - place in the header, modify to integrate so it match the design
2. required: [the orchestrator](../../utils/rebrand-orchestrator.ts) decides what needs to be rebranded: image, content, or style

4. optional: can contain text which [uses](../../utils/rebrand-content.ts)
5. optional: can request a [background image](../../utils/rebrand-background.ts)
6. optional: can request a new [image from](../../utils/pollinations-image.ts)


TODO: refactor and a diagram to demonstrate the flow:
- rebrand is initiated on an element
- orchestrator is called with any <Rebrand> specific options
- orchestrator creates a function to send to the correct rebrand file:


- NOTE: on an element we are not redesigning overall style, we are demonstrating a quick replacement of an on screen professional element with a different design
- IMPORTANT: every design must be professional first, and then demonstrate creativity as itegrating with functionality

## Rebrand Background

- randomly swaps the background component for [another one](../../components/backgrounds/)

## Rebrand Theme

3. required: uses 5 [shadcn themes](../../app/global.css) as a basis to assign a rebrand base theme.
   1. uses the default shadcn theme with light and dark modes [from](../../app/global.css) on page load
   2. the layout should have a single page nav bar that uses theme switching [theme controller](../../components/ui/animated-theme-toggler.tsx)
   
- randomly selects one of unused [themes](../../app/global.css)
- use a company content to connect the theme (use theme name as identifier) to designer and marketing: text, mood, feeling, and other ai generation content
- when [switching themes](../../utils/rebrand-theme.ts) applies some professional variations to the design 
  - **IMPORTANT**: responsive design and layout must not be broken

## Rebrand Content

- takes the [company information](../../app/content/companies.ts) and calls the pollinations api through our [defined methods](../../utils/rebrand-content.ts)

## Rebrand Image

1. Creates an image prompt from the combination of:
- current [company info](../../app/content/companies.ts)
- current [theme prompt info](../../app/content/themes.ts)
- current [stylesheet](../../app/rebrand.css)
- current element or component
1. Sends a pollination text api call to rephrase the prompt
2. Combines the rephrased prompt 

## Rebrand Text Design

Swaps the [text component](../../components/animate-ui/primitives/texts/) 

## Rebrand Button

Swaps the [button component](../../components/buttons/)

## Rebrand Page

Applying a <RebrandPage /> component will make the page by default able to change themes with a rebrand button connected.

1. Identifies every <Rebrand> element on the page and creates an array to send to the [orchestrator](../../utils/rebrand-orchestrator.ts)
2. Calls [rebrand theme](../../utils/rebrand-theme.ts)
3. Listens to the orchestrator so the page can:
    - turn off the appropriate loading animations as orchestrator tasks are completed
    - visually pops in the new element:
      - could use blur, motion, but it must call attention while being minimal and timed so the animation stops to give attention to the next element
      - uses a component (install and suggest before implementing) 


## Current Task

* [ ] **FR-001**: System **MUST** allow users to trigger a page-wide rebrand that affects all rebrandable components simultaneously.  Page must reload and show new styles and images.
* [ ] **FR-002**: System **MUST** allow users to trigger a rebrand for individual components by clicking on them.  Must display new design that matches the current theme.
* [ ] **FR-003**: System **MUST** change the individual rebranded compnents with images, such as the logo when clicked. Must follow accessibility standards and include a toolip explaining what happens when clicking the element
* [ ] **FR-004**: System **MUST** rebrand on screen content using   text from a predefined set of at least 5 modern professional companies descriped in the content/.  
* [ ] **FR-005**: System **MUST** show starting content, as well as loading animations on all rebrandable components during the rebranding process.  
* [ ] **FR-006**: System **MUST** apply random colors and animations to rebranded text from a set of predefined based on the theme.

## Key Knowledge
- **Technology Stack**: Next.js v15.5.3, React v19.1.0, Tailwind CSS v4.1.13, Shadcn UI, Motion, MagicUI
- **AI Service**: Pollinations.AI API for image and text generation
- **Architecture**: All rebrand logic isolated to the `app/` directory with kebab-case naming convention
- **Component Structure**: Uses React Context for state management and React hooks for functionality
- **Theme System**: 5 predefined Shadcn themes with random selection and color adjustments
- **Content System**: 5+ business profiles stored in `global.css` for randomization
- **Asset Storage**: AI-generated images stored in `public/` directory
- **Validation Sequence**: `pnpm lint` FIX ALL WARNINGS AND ERRORS →   `pnpm run dev` CHECK TERMINAL → `curl -Is http://localhost:3000 | head -n 1` CHECK TERMINAL→ `next build` CHECK TERMINAL

