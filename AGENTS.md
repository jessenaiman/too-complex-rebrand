# AGENTS.md

This file provides guidance to agents when working with code in this repository.

- The canonical, up-to-date project requirements and agent rules are maintained in [`rebrand-project-specs.md`](rebrand-project-specs.md:1). Do not rely on this file for feature specs—always reference the project specs file for the latest requirements, allowed/forbidden actions, and validation steps.
- All rebrand logic, including theming, content, and AI asset generation, must be isolated to the landing-page app (`app/`), never affecting `apps/www` or external packages.
- Use only shadcn/ui and MagicUI components for UI—never copy MagicUI code, always install via CLI as per project rules.
- Theme and content randomization must use 5 predefined variants, with YAML for business profiles and Tailwind/shadcn for themes.
- All AI-generated assets (logo, card, hero images) must be produced via the Pollinations API, with asset orchestration following the sequence: theme → content → assets.
- Do not touch `package.json` or install dependencies unless explicitly instructed and validated via context7 or shadcn/magicui CLI.
- All validation must follow the sequence: `pnpm lint`, `pnpm run dev`, `curl -Is http://localhost:3000 | head -n 1`, `next build`.
- Never write tests or touch test infrastructure unless specifically requested.
- All project-specific naming conventions: use kebab-case for files (e.g., `use-rebrandable.ts`), and keep all logic in `app/` (not `src/`).
- If you find any ambiguity, always defer to the latest `rebrand-project-specs.md` and ask for clarification.
