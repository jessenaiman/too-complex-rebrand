# AGENTS.md

## Project Overview
Single-page web app for dynamic component rebranding using AI-generated content and themes. Built with React 19, Next.js 15, and shadcn/ui components.

## Starting Steps

1) Run [engine-check] command which should inform you about the complete project
2) Before you complete a task always run the the complete command of `/validation-sequence`
3) Rephrase the user request


## Rules
- [tailwindcss 4.1](./docs/tailwindcss.md)
    - is installed [correctly](./docs/tailwindcss3to4.md). CORRRECT: `@import 'tailwindcss';` 
- Themes are all in the global [stylesheet](app/global.css) 
- [react 19+](./docs/react.md) - everything that's changed since 18
- [nextjs 14+](./docs/nextjs.md) - everythign that's changed since 13: routing, cookies, page transition, filesystem, Image, Link, etc.
- [shadcn](./docs/shadcn.md) - instructions for how tailwindcss and shadcn themes work, component installation, [filepath](./components/ui/) which is read-only 
- `package.json` is readonly, only install through the proper terminal commands

## Non-Obvious Architecture Patterns
- **Orchestrator Decision Flow** requires specific sequence: theme → content → assets (deviates from typical component patterns)
- **Sequential AI Processing** with `processPollinationsPromptsSequentially` respects rate limits (hidden performance constraint)
- **Theme-Content-Asset Coupling** where business profiles must match theme metadata for proper AI generation

# Memory Tool

- All memory docs require a TOC
- All docs require a timestampt

Create memories with the tool using context7 official documentation only

Memories should be listed as:
- [tech-stack](docs/memory-bank/tech-stack.md)
- [react](docs/react.md) - must be 19+ specific 
- [nextjs](docs/nextjs.md) - must be 14+ 
- [shadcn](docs/shadcn.md)
- [magicui](docs/magicui.md) - motion and shadcn combined next gen components
- [tailwindcss](docs/tailwindcss.md) 

## Codacy and Project Health

Fix and [implement codacy standards](./docs/)

[Command list](./docs/tools/codacy-tool-list.md)

## WARNINGS

Your work will always be rejected if you fail to do the following

1. Did you run the Validation Sequence?
2. Did you fulfill the users request?
3. Does the chat log clearly show that you have used the context7 tool to validate your systax, or the codacy tool