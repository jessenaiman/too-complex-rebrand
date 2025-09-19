# AGENTS.md

This is a single-page web app that allows users to trigger page-wide or individual component rebranding that affects all rebrandable components simultaneously. The system rebrands on-screen content using text from a predefined set of modern professional companies described in the content files.

## Success Criteria
1. A fully responsive modern website with shadcn supported theme switching using the animated-theme-toggle
2. The rebrand button on the page properly calling each rebranded componenent: no broken images, no terminal errors, no linting errors. A beatiful and professional page redesign with the click of a button
3. The rebrand components have a way to click on them, or an element to rebrand them indivdually. They always are professionally designed to fit the theme and layout. They are always accessible, and responsive.
4. Zero custom logic overwritting tailwindcss or shadcn theme. No inline brittle and breaking css elements in pages or components.
5. Zero suggestions, warnings, fixes, and an A+ from codacy

## Check Engine
1. Review the codebase with the correct tool
2. Review react 19+, nextjs, tailwindcss 4.1, shadcn storing the essential knoweldge using your memory mcp tool
3. Use the memory tool to retrieve react, nextjs, tailwindcss 4.1, and shadcn and explain how this project is setup.
4. Repeat the project plan core 

Before you start complete always run the validation sequence

**Validation Sequence**:  
1. `pnpm lint --fix` → Fix all ESLint + TypeScript errors  
2. check the problems tool
3. `pnpm run dev` → Verify no terminal or console errors  
4. `curl -Is http://localhost:3000 | head -n 1` → Must return `HTTP/1.1 200 OK`  
5. `next build` → Must complete without warnings or failures

Before you submit your code as complete run the Validation Sequence  

## WARNINGS

Your work will always be rejected if you fail to do the following

1. Did you run the Validation Sequence?
2. Did you fulfill the users request?
3. Does the chat log clearly show that you have used the context7 tool to validate your systax, or the codacy tool
4. did a proper file scan for duplicates

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

# Tools List

I have listed all the tools available in Desktop Commander and Codacy with explanations of their purposes:

## Desktop Commander Tools

1. **get_config**: Retrieves server configuration settings including blocked commands, allowed directories, and system information.
2. **read_file**: Reads contents of a file from the file system or a URL, with options for partial reading.
3. **read_multiple_files**: Reads contents of multiple files simultaneously.
4. **write_file**: Writes or appends content to files, with chunking capabilities for large files.
5. **create_directory**: Creates new directories or ensures directories exist.
6. **list_directory**: Lists all files and directories in a specified path with detailed information.
7. **move_file**: Moves or renames files and directories.
8. **start_search**: Starts a streaming search for files or content within files.
9. **get_more_search_results**: Retrieves more results from an active search session.
10. **stop_search**: Stops an active search process.
11. **list_searches**: Lists all active search sessions.
12. **get_file_info**: Retrieves detailed metadata about a file or directory.
13. **edit_block**: Applies surgical text replacements to files.
14. **start_process**: Starts a new terminal process with intelligent state detection.
15. **read_process_output**: Reads output from a running process with smart completion detection.
16. **interact_with_process**: Sends input to a running process and receives the response.
17. **force_terminate**: Force terminates a running terminal session.
18. **list_sessions**: Lists all active terminal sessions.
19. **list_processes**: Lists all running processes with resource usage information.
20. **kill_process**: Terminates a running process by PID.
21. **get_usage_stats**: Gets usage statistics for debugging and analysis.
22. **give_feedback_to_desktop_commander**: Opens a feedback form in the browser.
23. **get_prompts**: Browses and retrieves curated Desktop Commander prompts.

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
