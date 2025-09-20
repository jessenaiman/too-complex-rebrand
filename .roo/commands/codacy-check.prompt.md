---
description: Run Codacy analysis on edited files and check for security issues
argument-hint: <file-path> [tool]
---

# Codacy Analysis Command

This command enforces the critical Codacy rules for code quality and security analysis.

## Critical Rules Applied

### After File Edits
- **IMMEDIATELY** run `codacy_cli_analyze` on any edited file
- Set `rootPath` to workspace path
- Set `file` to the edited file path
- Leave `tool` empty for comprehensive analysis
- If issues found, propose and apply fixes

### After Dependency Changes
- **IMMEDIATELY** run `codacy_cli_analyze` with `tool: "trivy"` after:
  - npm/yarn/pnpm install
  - Adding dependencies to package.json/requirements.txt/pom.xml/build.gradle
  - Any package manager operations
- If vulnerabilities found: STOP all operations and fix security issues first

### Troubleshooting
If Codacy MCP Server tools unavailable:
1. Try resetting MCP on extension
2. Check VS Code Copilot > MCP settings
3. Contact Codacy support if issues persist

## Usage
- `/codacy-check src/main.py` - Analyze specific file
- `/codacy-check` - Analyze entire workspace
- `/codacy-check --security` - Run security analysis only

## Reference
See `.github/instructions/codacy.instructions.md` for complete rules.