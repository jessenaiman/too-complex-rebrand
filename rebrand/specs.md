### **Table of Contents**

- [**Table of Contents**](#table-of-contents)
- [**1. Project Goal \& Core Features**](#1-project-goal--core-features)
- [**2. Functional Requirements**](#2-functional-requirements)
- [**Test Tasks for Functional Requirements**](#test-tasks-for-functional-requirements)
- [**3. Technical Architecture \& Specifications**](#3-technical-architecture--specifications)
- [**4. Development Rules \& Validation**](#4-development-rules--validation)
- [**5. Implementation Plan**](#5-implementation-plan)
- [**6. Project Q\&A**](#6-project-qa)
- [**8. Code Standards**](#8-code-standards)
- [**9. Success Criteria**](#9-success-criteria)

### **1\. Project Goal & Core Features**

This project will implement a dynamic, AI-powered rebranding feature for a single-page application. The primary goal is to refactor rebrand-page.tsx to allow users to instantly redesign the entire page or individual components with a single click by dynamically swapping themes, textual content, and AI-generated visual assets.

* [ ] **Component-Level Rebrand:** Individual elements (e.g., logos, cards) wrapped in a specific component can be independently regenerated. This action will trigger an AI call to create a new visual asset that aligns with the current site theme.  
* [ ] **Page-Level Rebrand:** A global button will trigger a full-site redesign. This process involves sequentially fetching and applying a new CSS theme, new business identity content, and triggering AI calls to regenerate all designated visual assets.  
* [ ] **Visual Feedback:** All rebrandable elements should have clear visual indicators, such as animated borders (using MagicUI), to show their interactivity. During regeneration, loading overlays must be displayed over each asset being updated. The global "Rebrand Page" button must display "Switch Back" text after a rebrand is triggered (even though switching back is not functional).

**Implementation**
- Nextjs
- 

### **2\. Functional Requirements**

* [ ] **FR-001**: System **MUST** allow users to trigger a page-wide rebrand that affects all rebrandable components simultaneously.  
* [ ] **FR-002**: System **MUST** allow users to trigger a rebrand for individual components by clicking on them.  
* [ ] **FR-003**: System **MUST** change the logo image when clicked, selecting a random letter from a predefined set.  
* [ ] **FR-004**: System **MUST** display random marketing text from a predefined set of at least 5 impressive but fake company descriptions.  
* [ ] **FR-005**: System **MUST** show loading animations on all rebrandable components during the rebranding process.  
* [ ] **FR-006**: System **MUST** sequentially call the Pollinations API for image and text generation, showing assets loading one at a time.  
* [ ] **FR-007**: System **MUST** apply random colors and animations to rebranded text from a set of predefined variations.  
* [ ] **FR-008**: System **MUST** apply rebranding themes only to the landing-page app and not affect the www app.  
* [ ] **FR-009**: System **MUST** display "Switch Back" text on the rebrand button after rebranding, even though switching back is not functional.  
* [ ] **FR-010**: System **MUST** use shadcn/ui components for button and text designs in the rebranded components.

### **Test Tasks for Functional Requirements**

* [ ] **FR-001-TEST**: Create a Playwright test to verify that clicking the page-wide rebrand button affects all rebrandable components simultaneously.
* [ ] **FR-002-TEST**: Create a Playwright test to verify that clicking on individual components triggers a rebrand for that specific component only.
* [ ] **FR-003-TEST**: Create a Playwright test to verify that clicking the logo changes the image to a random letter from the predefined set.
* [ ] **FR-004-TEST**: Create a Playwright test to verify that marketing text is randomly displayed from the predefined set of business descriptions.
* [ ] **FR-005-TEST**: Create a Playwright test to verify that loading animations are displayed on all rebrandable components during the rebranding process.
* [ ] **FR-006-TEST**: Create a Playwright test to verify that API calls for image and text generation happen sequentially and assets load one at a time.
* [ ] **FR-007-TEST**: Create a Playwright test to verify that rebranded text has random colors and animations applied from the predefined variations.
* [ ] **FR-008-TEST**: Create a Playwright test to verify that rebranding themes are only applied to the landing-page app and not the www app.
* [ ] **FR-009-TEST**: Create a Playwright test to verify that the rebrand button displays "Switch Back" text after rebranding is triggered.
* [ ] **FR-010-TEST**: Create a Playwright test to verify that shadcn/ui components are used for button and text designs in the rebranded components.

### **3\. Technical Architecture & Specifications**

The implementation will be modular, separating concerns for theming, content management, AI interaction, and frontend components.

**Technology Stack:**

* **Framework:** Next.js / React  
* **Styling:** Tailwind CSS (v4.1), Shadcn UI  
* **Animation:** MagicUI  
* **AI Service:** "Pollinations" API

**File Structure & Module Responsibilities:**

* [x] **AI Asset Storage:** All AI-generated images (logos, cards, hero images) **MUST** be saved in a named folder within the `public/` directory. This is required for all generated assets until a future migration to a more robust storage solution is specified.

* [x] **src/lib/rebrand-theme.ts**: **Theme Engine**
  * Manages a set of 5 predefined Shadcn themes. Theme randomization **MUST** select from these 5 distinct palettes.
  * Contains a function to randomly select and apply one of the 4 alternative themes.
  * Includes logic to randomize hues and intensity within the selected theme's color palette.
* [x] **src/lib/rebrand-content.ts**: **Content Engine**
  * Reads from a content.yaml file containing 5 distinct mock business profiles. Content randomization **MUST** select from these 5 predefined business identities.
  * Contains a function to fetch a random business profile.
**Implementation Summary:**

- `app/themes/rebrand-theme.ts`: Imports all 5 Shadcn themes, exports functions to randomly select and randomize hues/intensity within the palette.
- `app/data/rebrand-content.ts`: Loads the 5 business profiles from YAML and exports a function to fetch a random profile.

**Reviewer Checklist:**

* [x] **Styleguide Requirements:** The project **MUST** adhere to a styleguide that covers the Shadcn theme and Tailwind CSS possibilities. This styleguide must ensure that all rebranded elements maintain layout integrity and responsive design principles. All UI components must be built using shadcn/ui and MagicUI primitives.

* [x] **src/components/rebrandable.tsx**: **Rebrandable Component Wrapper**
  * A client-side React component that wraps any rebrandable element.
  * Triggers the appropriate AI generation function on click and manages loading states.  
  * Uses MagicUI to apply an animated border, signaling its interactivity.

### **4\. Development Rules & Validation**

Your goal is a page that loads, a feature that works, and a page.tsx that is readable.

**✅ ALLOWED**

* Create directories like hooks/, utils/, data/, themes/, components/ **if** it simplifies page.tsx.
* Use shadcn/ui, magicui, and motion/react. Install them via the CLI or terminal using the correct tool (context7, shadcn, or magicui).
* Store marketing text in a .yml file.
* Use useState and useEffect for local state. If rebrand state must be shared across multiple components (e.g., for page-wide and component-level rebranding), implement React Context and a provider to manage and distribute rebrand state globally. This enables coordinated updates and consistent UI feedback for all rebrandable elements. The React Context provider **MUST** be implemented in `app/` and **MUST** wrap all rebrandable components to ensure state consistency.
* **All rebrand logic, theming, content management, and AI interaction MUST be isolated to the `app/` directory.** Any new files or logic must reside within `app/`.
* **All new files and directories within `app/` MUST use kebab-case naming convention.** For example, `use-rebrandable.ts`, `rebrand-themes.ts`.

**🚫 FORBIDDEN (STRICTLY ENFORCED)**

* **DO NOT** touch or edit package.json directly for any reason.
* **DO NOT** install dependencies without first checking context7 or the official CLI for the correct installation command.
* **DO NOT** install any dependency except via terminal/CLI and only after validation.
* **DO NOT** write or modify any test files or test infrastructure unless explicitly requested.
* **DO NOT** use or reference any code outside the app/ directory for rebrand logic.
* **DO NOT** use file/folder names that are not kebab-case for logic files (e.g., use-rebrandable.ts).
* **DO NOT** store any rebrand logic or assets in src/ or external packages.
* **DO NOT** skip any validation steps after making changes.

*You MAY create React Contexts and providers for rebrand state if global coordination is required by the feature set.*

**✅ VALIDATE AFTER EVERY CHANGE (MANDATORY SEQUENCE)**

* [ ] pnpm lint  
* [ ] pnpm run dev  
* [ ] curl -Is http://localhost:3000 | head -n 1  
* [ ] next build

If all validation steps succeed, ask for user confirmation before proceeding. If any step fails, resolve the issue before continuing.

### **5\. Implementation Plan**

* [x] **1\. Setup & Initial Review:**  
  * Critically review the existing application to understand its current state management.  
  * Install and configure MagicUI by implementing a basic animated background to confirm setup.
  * Upgrade Tailwind CSS from v3 to v4.1, refactoring configuration as needed.
* [x] **2\. Theme & Content Scaffolding:**
  * Create the 5 mock business profiles in content.yaml.
  * Define the 5 base themes using Shadcn/CSS variables.
  * Implement the rebrand-theme.ts and rebrand-content.ts modules.
* [x] **3\. Component Development:**  
  Move the layout elements (navbar, animated background, footer) from page.jsx to layout.tsx. Move the component and page content  page.tsx. The first stage is just to refactor into those two pages and verify it loads and looks like page.jsx. 
* [x] **4\. AI Integration & Page-Level Control:**  
  * Implement the rebrand-ai.ts service to handle API calls.  
  * Create a global "Rebrand Page" button and wire its onClick event to orchestrate the full rebranding sequence.  
  * Ensure all regenerated images are saved as a cohesive "set" for future use.

### **6\. Project Q\&A**

* **?: What are the specifics for the "Pollinations" API?**  
  * **A:** Pollinations is an AI API that can be called to generate images, text, and more.  
* **?: What is "context7"?**  
  * **A:** context7 is a tool that can read from GitHub source control and provides exact code documentation.  
* **?: What is the storage strategy for AI-generated images?**  
  * **A:** For now, store them in a named folder in the public directory. A task will be created later to migrate to a more robust solution like MinIO.  
* **?: How should theme randomization work?**  
  * **A:** Create 5 distinct theme palettes. These will be the basis for randomizing styles.  
* **?: What are the minimum requirements for a styleguide?**  
  * **A:** The styleguide should cover the Shadcn theme and Tailwind CSS possibilities without breaking the layout and responsive design.  
* **+: Is this a new project?**  
  * **A:** No, the project is already built. We are finalizing the architecture.  
* **+: What is "MagicUI"?**  
  * **A:** It is an open-source library of animated components based on Shadcn. It must be installed via the command line.  
* **+: What about Tailwind CSS v4.1?**
  * **A:** Tailwind 4.1 defines styles differently. The context provided should be used for a better understanding.

### **8\. Code Standards**

* **File Naming Convention**: All files within the `app/` directory **MUST** use kebab-case naming convention (e.g., `use-rebrandable.ts`, `rebrand-button.tsx`).
* **Component Structure**: Components **SHOULD** be functional and use React hooks where appropriate.
* **Type Safety**: All TypeScript files **MUST** use strict typing with explicit interfaces and types.
* **Code Organization**: Related functionality **SHOULD** be grouped into logical modules and directories.
* **Documentation**: All public APIs and complex functions **MUST** include JSDoc/TSDoc comments.
* **Styling**: Use Tailwind CSS classes exclusively for styling. Avoid inline styles and CSS-in-JS solutions.
* **Accessibility**: All components **MUST** follow WCAG 2.1 AA guidelines and include proper ARIA attributes.
* **Performance**: Implement React.memo for components that render lists or frequently re-render. Use useCallback and useMemo for expensive computations.
* **Error Handling**: All asynchronous operations **MUST** include proper error handling and user feedback mechanisms.
* **Testing**: All new functionality **SHOULD** include corresponding Playwright tests before merging.

### **9\. Success Criteria**

* [x] **Feature Completeness**: All functional requirements (FR-001 to FR-010) are fully implemented and working as specified.
* [x] **Technical Compliance**: The implementation fully adheres to all technical architecture specifications, including file structure, module responsibilities, and technology stack usage.
* [x] **Rule Adherence**: All development rules and validation steps are strictly followed. No forbidden actions are performed.
* [x] **UI/UX Quality**: All rebrandable components display clear visual feedback (animated borders, loading overlays) and the "Switch Back" text appears on the rebrand button after a page-wide rebrand.
* [x] **Error Handling**: Robust error handling is implemented for all Pollinations API calls, with clear UI states for failures.
* [ ] **Validation Passed**: The project passes all mandatory validation steps (`pnpm lint`, `pnpm run dev`, `curl -Is ...`, `next build`) without errors.
* [x] **Code Quality**: The codebase is clean, readable, and maintainable, with logic properly isolated to the `app/` directory and using kebab-case naming.
* [x] **Agent Readiness**: The updated spec is clear, unambiguous, and ready for implementation by specialized agents (code, debug, etc.).
NEXT TASK: 3. Component Development - Build a new page containing only a Shadcn navigation bar. Develop the rebrandable.tsx component. Wrap the logo in the navbar with <Rebrandable assetType='logo'> to test component-level rebranding.