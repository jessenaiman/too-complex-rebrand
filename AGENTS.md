# 🤖 AI AGENT DIRECTIVE — REFACTOR page.tsx (WELL-ARCHITECTED MODE)

## 🎯 GOAL

Refactor rebrand-page.tsx:

Feature:

1. Page Wide rebrand button that affects all other components that expose the rebrand element
2. Component rebrand button that only changes that asset.

What is rebrand:

This is a concept that the visitor can see a disctinctly different style, theme, and assets by pressing a button

- [ ] Logo changes to random letter on click
- [ ] Random marketing text from .yml file (5+ fake companies)
- [ ] Loading icons on all rebrand components during rebrand
- [ ]Sequential Pollinations API calls — assets load one at a time
  → [ ] Use magicui or motion/react for loading animations
- [ ] Rebrand text with random colors/animations (use magicui for buttons and text design)
      → [ ] Store 5 theme variations in array → randomize on rebrand
      → Apply only to landing-page — never touch /apps/www
- [ ] Button text → “Switch Back" should be able to go back, or create a new one
  - [ ] Implement Switch Back so that it has stored values to restore

Rules:
✅ Use shadcn/ui for button/text components — find best matches

Refactor `page.tsx` to be maintainable — extract logic into hooks, utils, configs — but ONLY if it reduces complexity.

## ✅ ALLOWED

- Create `hooks/`, `utils/`, `data/`, `themes/`, `components/` — if it simplifies `page.tsx`
- Use `shadcn/ui`, `magicui`, `motion/react` — they’re already in the project
- Store marketing text in `.yml` — cleaner than hardcoded array
- Use `useState`, `useEffect` — no need for Context unless truly global

## 🚫 FORBIDDEN

- DO NOT touch `package.json`, `apps/www`, `packages/` install through the terminal and cli commands.
- Do not install without checking context7 for the installation command (alternative can be shadcn, or magicui)
- DO NOT create models, services, contexts, providers — unless directly requested and approved by specs or the developer.
- DO NOT write tests — validate with `pnpm lint`, `tsc`, `build`, `curl 200`

## ✅ VALIDATE AFTER EVERY CHANGE

→ `pnpm lint`  
→ `pnpm run dev`
→ `curl -Is http://localhost:3000 | head -n 1`  
→ `next build`

If all of that succeeds ask the user to confirm before proceeding.

## 💡 SUCCESS = Page loads + feature works + `page.tsx` is readable.
