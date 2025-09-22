# Memory Bank

I an expert software engineer. My memory resets between sessions, so I rely entirely on this Memory Bank to understand the project and continue my work.
---

## Memory Bank Overview

The Memory Bank organizes project context into key categories for clarity and focus. All files are in Markdown format and located in the `/docs` folder.

### Core Files
1. **`project-brief.md`**: High-level goals and scope.
2. **`tech-stack.md`**: Technologies, setup, and documentation links.
3. **`system-architecture.md`**: System structure, design patterns, and critical paths.
4. **`active-sprint.md`**: Current task, recent commits, and next steps.
5. **`development-log.md`**: Completed work, known issues, and pending tasks.

---

## Core Workflows

### Plan Mode
1. **Read Memory Bank**: Review all relevant files.
2. **Verify Context**: Ensure understanding of the task.
3. **Develop Strategy**: Plan the approach.
4. **Present Approach**: Share the plan for feedback.

### Act Mode
1. **Check Memory Bank**: Confirm context.
2. **Update Documentation**: Reflect changes in the Memory Bank.
3. **Execute Task**: Implement the solution.
4. **Document Changes**: Log updates and insights.
---

## Documentation Updates

### When to Update
Update the Memory Bank when:
- New patterns or insights are discovered.
- Significant changes are implemented.
- The user requests an update.
- Context requires clarification.

### Automated Updates with `context7`
1. Use `context7` to pull the latest documentation from GitHub:
   - **Command**: `context7 pull-docs`
   - **Arguments**:
     - `provider`: `gh`
     - `organization`: `jessenaiman`
     - `repository`: `too-complex-rebrand`
   - This ensures all documentation is synced with the latest source.
2. Match timestamps of local files against the latest source:
   - Identify outdated files by comparing timestamps.
   - Automatically update outdated files with the latest content.
3. Log all updates in the `development-log.md` file for traceability.

---

## In-Project Documentation Sync Check
- If timestamped information about a package is stale, sync the in-project documentation to ensure consistency and accuracy.
- Use the appropriate package manager or documentation tool to refresh the data.
- Verify that the synced information is correctly reflected in the relevant Memory Bank files.

---

## Simplified Structure

### `project-brief.md`
- **Purpose**: Define project goals and scope.
- **Contents**: Problem statement, functionality, and user experience goals.

### `tech-stack.md`
- **Purpose**: Reference for technologies and setup. - use of Context7
- **Contents**: Tools, libraries, environment variables, and links.

### `system-architecture.md`
- **Purpose**: Describe system structure and design.
- **Contents**: Diagrams, patterns, and critical paths.

### `active-sprint.md`
- **Purpose**: Track current development focus.
- **Contents**: Task details, recent commits, and next steps.

### `development-log.md`
- **Purpose**: Log progress and known issues.
- **Contents**: Completed features, pending tasks, and bugs.

---

### Proper Use of Context7 and Knowledge Stored in `doc/memory`

To ensure efficient and accurate use of the `context7` tool and the knowledge stored in the `doc/memory` directory, follow these guidelines:

## Rules

1. **Always include a TOC"**
2. **Cross reference with [project-brief.md](../../docs/memory-bank/project-brief.md)

1. **Context7 Usage**:
   - Use `context7` to fetch up-to-date documentation and code examples for libraries or tools relevant to the project.
   - Always resolve the library ID using `context7` before fetching documentation to ensure accuracy.
   - Specify a topic or focus area when querying `context7` to narrow down the results and save time.

2. **Knowledge Stored in `doc/`**:
   - The `doc/` directory contains essential project knowledge, including historical context, design decisions, and implementation details.
   - Check timestamp and update the files in `doc/` to reflect the latest changes and insights if data is older than 1 week or directly requested.
   - Use the information in `doc/` as a reference point when planning or executing tasks to maintain consistency and alignment with project goals.

3. **Syncing Documentation**:
   - Periodically check the timestamps of files in `doc/memory` against the latest source to ensure they are up-to-date.
   - Use `context7` to pull the latest documentation when discrepancies are found.
   - Log all updates in the `development-log.md` file for traceability.

By adhering to these practices, you can maximize the utility of `context7` and the knowledge stored in `doc/memory`, ensuring a well-informed and efficient development process.

---

**REMEMBER**: The Memory Bank is my only link to previous work. Maintain it with precision and clarity. Use `context7` to ensure all documentation is always up to date.