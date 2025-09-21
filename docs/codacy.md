# Codacy Integration Guide

<!-- TOC -->
- [Prerequisites](#prerequisites)
- [Running Codacy Analysis](#running-codacy-analysis)
  - [For Individual Files](#for-individual-files)
  - [For Security Scanning](#for-security-scanning)
- [Common Codacy MCP Tools](#common-codacy-mcp-tools)
  - [Repository Analysis](#repository-analysis)
  - [File Analysis](#file-analysis)
  - [Pull Request Analysis](#pull-request-analysis)
- [Code Coverage Setup](#code-coverage-setup)
  - [Environment Configuration](#environment-configuration)
  - [Generating Coverage Reports](#generating-coverage-reports)
  - [Uploading Coverage to Codacy](#uploading-coverage-to-codacy)
  - [Supported Coverage Report Formats](#supported-coverage-report-formats)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
  - [If Codacy MCP Server is Unavailable](#if-codacy-mcp-server-is-unavailable)
 - [Repository Not Found Errors](#repository-not-found-errors)
  - [Coverage Reporter Issues](#coverage-reporter-issues)
- [Recent Analysis Results](#recent-analysis-results)
<!-- /TOC -->

This document provides instructions on how to use Codacy for code quality analysis and coverage reporting in this project.

## Prerequisites

- Codacy MCP server must be connected and available
- Repository must be set up in Codacy (if not already)
- Codacy API tokens configured in `.env.local`

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

## Code Coverage Setup

### Environment Configuration

The project requires the following environment variables in `.env.local`:

```bash
CODACY_API_TOKEN='your_account_api_token'
CODACY_PROJECT_TOKEN='your_project_token'
```

### Generating Coverage Reports

For JavaScript/TypeScript projects, you can generate coverage reports using:

```bash
# Run tests with coverage
npm test -- --coverage
# or
jest --coverage
```

This will generate coverage reports in the `coverage/` directory.

### Uploading Coverage to Codacy

#### Method 1: Using the Coverage Reporter Script

```bash
# Download and run the Codacy Coverage Reporter
bash <(curl -Ls https://coverage.codacy.com/get.sh) report
```

#### Method 2: With Explicit Report File

If the reporter cannot find your coverage file automatically:

```bash
bash <(curl -Ls https://coverage.codacy.com/get.sh) report -r ./coverage/lcov.info
```

#### Method 3: Using Environment Variables

```bash
export CODACY_API_TOKEN=your_account_api_token
export CODACY_PROJECT_TOKEN=your_project_token
bash <(curl -Ls https://coverage.codacy.com/get.sh) report
```

### Supported Coverage Report Formats

Codacy supports the following coverage report formats:
- LCOV (.lcov, lcov.info)
- Cobertura (.xml)
- JaCoCo (.xml)
- SimpleCov (.json)
- Clover (.xml)
- Gcov (.gcov)

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

### Coverage Reporter Issues

1. **Invalid configuration error**: Ensure `CODACY_API_TOKEN` or `CODACY_PROJECT_TOKEN` is set
2. **Cannot find report file**: Use the `-r` flag to specify the report file path
3. **Authentication failed**: Verify your API token is correct and has proper permissions

## Recent Analysis Results

The following files were recently analyzed and fixed:

1. `components/rebrand/rebrand.tsx` - Fixed unused variable warnings
2. `src/memory-agent.ts` - Removed unused interface

Both files now pass Codacy analysis with zero issues.