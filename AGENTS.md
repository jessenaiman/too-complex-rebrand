# AGENTS.md

## Project Overview
Single-page web app for dynamic component rebranding using AI-generated content and themes. Built with React 19, Next.js 15, and shadcn/ui components.

## Critical Issues (Must Fix First)
- **CRITICAL: Circular Import Bug** - tailwindcss or shadcn themes are being overwritten by inline css which should not be in the code.
- **CRITICAL: Circular Import Bug** - `utils/rebrand-orchestrator.ts` imports itself via `generateSingleAsset` function, causing build failures
- **Orchestrator Integration Incomplete** - Components use hardcoded placeholder logic instead of connecting to orchestrator system
- **Missing Element Type Handlers** - Many element types return placeholder data instead of actual rebrand functionality

## Non-Obvious Architecture Patterns
- **Orchestrator Decision Flow** requires specific sequence: theme → content → assets (deviates from typical component patterns)
- **Event Emitter System** coordinates rebrand operations across components (not standard React state management)
- **Sequential AI Processing** with `processPollinationsPromptsSequentially` respects rate limits (hidden performance constraint)
- **Theme-Content-Asset Coupling** where business profiles must match theme metadata for proper AI generation

## Build System Requirements
- **Package Manager**: Must use pnpm (not npm/yarn) for dependency resolution
- **Validation Sequence**: `pnpm lint --fix` → `pnpm build`
- **Directory Convention**: All rebrand logic must stay in `app/` directory (not `src/`), using kebab-case file naming

## Success Criteria
1. A fully responsive modern website with shadcn supported theme switching using the animated-theme-toggle
2. The rebrand button on the page properly calling each rebranded componenent: no broken images, no terminal errors, no linting errors. A beatiful and professional page redesign with the click of a button
3. The rebrand components have a way to click on them, or an element to rebrand them indivdually. They always are professionally designed to fit the theme and layout. They are always accessible, and responsive.
4. Zero custom logic overwritting tailwindcss or shadcn theme. No inline brittle and breaking css elements in pages or components.
5. Zero suggestions, warnings, fixes, and an A+ from codacy

## Check Engine
1. Review the codebase with the correct tool
2. Review react 19+, nextjs, tailwindcss 4.1, shadcn storing the essential knoweldge using your memory mcp tool
3. Check the git status.
  - If we are not checked in start a new branch
  - -> check for open a github issue connected to current branch
  - -> if no issue is connected create a new issue
  - commit the current status attached with the github issue number 
5. Repeat the project plan core

Before you start complete always run the validation sequence

**Validation Sequence**:  
1. `pnpm lint --fix` → Fix all ESLint + TypeScript errors  
2. check the problems tool
3. `pnpm run dev` → Verify no terminal or console errors  
4. `curl -Is http://localhost:[PORT] | head -n 1` → Must return `HTTP/1.1 200 OK` - must use desktop-commmander
5. `pnpm build` → Must complete without warnings or failures
6. If the project is in better shape than when the validation sequence first ran commit the changes
7. If all the above are not problem and warning free repeat the 6 steps

Before you submit your code as complete run the Validation Sequence  

## WARNINGS

Your work will always be rejected if you fail to do the following

1. Did you run the Validation Sequence?
2. Did you fulfill the users request?
3. Does the chat log clearly show that you have used the context7 tool to validate your systax, or the codacy tool
4. did a proper file scan for duplicates

- Use only shadcn/ui and MagicUI components for UI—never copy MagicUI code, always install via CLI as per project rules.
- All AI-generated assets (logo, card, hero images) must be produced via the Pollinations API, with asset orchestration following the sequence: theme → content → assets.
- Do not touch `package.json` or install dependencies unless explicitly instructed and validated via context7 or shadcn/magicui CLI.
- All validation must follow the sequence: `pnpm lint`, `pnpm run dev`, `curl -Is http://localhost:3000 | head -n 1`, `next build`.
- Never write tests or touch test infrastructure unless specifically requested.
- All project-specific naming conventions: use kebab-case for files (e.g., `use-rebrandable.ts`), and keep all logic in `app/` (not `src/`).
- If you find any ambiguity, always defer to the latest `rebrand-project-specs.md` and ask for clarification.

# Tools List

I have listed all the tools available in Desktop Commander and Codacy with explanations of their purposes:

Use Desktop Commander tools to perform comprehensive file operations:

## Available Actions

### Directory Operations
- **create_directory**: Create new directories (supports nested paths)
- **list_directory**: List directory contents with file types
- **get_file_info**: Get detailed file/directory metadata

### File Operations
- **read_file**: Read file contents (with offset/length support)
- **read_multiple_files**: Read multiple files simultaneously
- **write_file**: Create or overwrite files
- **edit_block**: Apply surgical text replacements
- **move_file**: Move or rename files/directories

### Search Operations
- **start_search**: Start streaming search with advanced filtering
- **get_more_search_results**: Get additional search results
- **stop_search**: Stop active search process

### Process Management
- **start_process**: Execute system commands and scripts
- **interact_with_process**: Send input to running processes
- **read_process_output**: Read command output
- **kill_process**: Terminate running processes
- **list_processes**: List all running processes

## Codacy Tools

1. **codacy_search_repository_srm_items**: Lists security issues, vulnerabilities, and compliance findings in a repository.
2. **codacy_list_repository_issues**: Lists and filters code quality issues in a repository.
3. **codacy_list_repository_pull_requests**: Lists pull requests from a repository with filtering options.
4. **codacy_list_files**: Lists files in a repository with sorting and filtering capabilities.
5. **codacy_get_file_issues**: Gets the list of issues for a specific file.
6. **codacy_get_file_coverage**: Gets coverage information for a specific file.
7. **codacy_get_pull_request_files_coverage**: Gets coverage information for all files in a pull request.
8. **codacy_get_pull_request_git_diff**: Returns the human-readable Git diff of a pull request.
9. **codacy_list_pull_request_issues**: Lists issues found in a pull request.
10. **codacy_get_repository_with_analysis**: Gets repository analysis information including grade, issues, duplication, complexity, and coverage metrics.
11. **codacy_get_file_with_analysis**: Gets analysis information and coverage metrics for a specific file.
12. **codacy_get_file_clones**: Gets the list of duplication clones for a file.
13. **codacy_get_repository_pull_request**: Gets pull request information with analysis.
14. **codacy_get_issue**: Returns information about a specific open issue.
15. **codacy_get_pattern**: Gets the definition of a specific code pattern.
16. **codacy_list_repository_tool_patterns**: Lists patterns available for a repository.
17. **codacy_list_tools**: Lists all code analysis tools available.
18. **codacy_list_repository_tools**: Gets analysis tools settings for a repository.
