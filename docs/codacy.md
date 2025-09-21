# Codacy Integration Guide

This document provides instructions on how to use Codacy for code quality analysis in this project.

## Prerequisites

- Codacy MCP server must be connected and available
- Repository must be set up in Codacy (if not already)

## Running Codacy Analysis

### For Individual Files

To analyze a specific file for code quality issues:

```bash
# Using Codacy MCP tool
codacy_cli_analyze --rootPath /home/dice-wizard/dev/rebrand --file path/to/file.ts
```

### For Security Scanning

To run security vulnerability scanning:

```bash
# Using Codacy MCP tool with trivy
codacy_cli_analyze --rootPath /home/dice-wizard/dev/rebrand --tool trivy
```

##[Investigate and Fill]

- [generating-coverage](https://docs.codacy.com/coverage-reporter/#generating-coverage)
- 

## Common Codacy MCP Tools

### Repository Analysis
- `codacy_get_repository_with_analysis` - Get overall repository health metrics
- `codacy_list_repository_issues` - List code quality issues
- `codacy_search_repository_srm_items` - Search security issues

### File Analysis
- `codacy_get_file_issues` - Get issues for a specific file
- `codacy_get_file_coverage` - Get test coverage for a file
- `codacy_get_file_with_analysis` - Get comprehensive file analysis

### Pull Request Analysis
- `codacy_list_pull_request_issues` - List issues in a PR
- `codacy_get_pull_request_files_coverage` - Get PR coverage information

## Best Practices

1. **Always run analysis after code changes**:
   ```typescript
   // After editing a file, immediately run Codacy analysis
   use_mcp_tool({
     server_name: "codacy",
     tool_name: "codacy_cli_analyze",
     arguments: {
       rootPath: "/home/dice-wizard/dev/rebrand",
       file: "path/to/edited/file.ts"
     }
   });
   ```

2. **Run security scans after dependency changes**:
   ```typescript
   // After installing new dependencies
   use_mcp_tool({
     server_name: "codacy",
     tool_name: "codacy_cli_analyze",
     arguments: {
       rootPath: "/home/dice-wizard/dev/rebrand",
       tool: "trivy"
     }
   });
   ```

3. **Check repository health regularly**:
   ```typescript
   use_mcp_tool({
     server_name: "codacy",
     tool_name: "codacy_get_repository_with_analysis",
     arguments: {
       provider: "gh",
       organization: "jessenaiman",
       repository: "too-complex-rebrand"
     }
   });
   ```

## Troubleshooting

### If Codacy MCP Server is Unavailable

1. Try resetting the MCP extension
2. Check Copilot > MCP settings in VSCode
3. Verify Codacy is enabled in GitHub organization settings
4. Contact Codacy support if issues persist

### Repository Not Found Errors

If you get 404 errors when using repository-based tools:

```typescript
// Run setup repository tool
use_mcp_tool({
  server_name: "codacy",
  tool_name: "codacy_setup_repository",
  arguments: {
    provider: "gh",
    organization: "jessenaiman",
    repository: "too-complex-rebrand"
  }
});
```

## Recent Analysis Results

The following files were recently analyzed and fixed:

1. `components/rebrand/rebrand.tsx` - Fixed unused variable warnings
2. `src/memory-agent.ts` - Removed unused interface

Both files now pass Codacy analysis with zero issues.