Here are all the available Codacy MCP tools and their commands:

These tools provide comprehensive code analysis, security scanning, coverage reporting, and quality metrics for your repository.
## Reference
See `.github/instructions/codacy.instructions.md` for complete rules.

## 🔍 **Repository Analysis Tools**

2. **`codacy_search_repository_srm_items`** - Lists security issues, vulnerabilities, and compliance findings in a repository
3. **`codacy_list_repository_issues`** - Lists and filters code quality issues in a repository
4. **`codacy_list_repository_tools`** - Gets analysis tools settings for a repository
5. **`codacy_list_repository_tool_patterns`** - Lists patterns available for a repository

## 📁 **File Analysis Tools**
6. **`codacy_list_files`** - Lists files in a repository with sorting and filtering capabilities
7. **`codacy_get_file_issues`** - Gets the list of issues for a specific file
8. **`codacy_get_file_coverage`** - Gets coverage information for a specific file
9. **`codacy_get_file_with_analysis`** - Gets analysis information and coverage metrics for a specific file
10. **`codacy_get_file_clones`** - Gets the list of duplication clones for a file

## 🔀 **Pull Request Tools**
11. **`codacy_list_repository_pull_requests`** - Lists pull requests from a repository with filtering options
12. **`codacy_get_repository_pull_request`** - Gets pull request information with analysis
13. **`codacy_list_pull_request_issues`** - Lists issues found in a pull request
14. **`codacy_get_pull_request_files_coverage`** - Gets coverage information for all files in a pull request
15. **`codacy_get_pull_request_git_diff`** - Returns the human-readable Git diff of a pull request

## 🛠️ **Tool & Pattern Tools**
16. **`codacy_list_tools`** - Lists all code analysis tools available
17. **`codacy_get_pattern`** - Gets the definition of a specific code pattern
18. **`codacy_get_issue`** - Returns information about a specific open issue

## **Usage Examples:**
- Use **`codacy_get_repository_with_analysis`** to get overall repository health metrics
- Use **`codacy_list_repository_issues`** to identify code quality issues that need fixing
- Use **`codacy_get_file_issues`** to get specific issues for individual files
- Use **`codacy_get_file_coverage`** to check test coverage for specific files
- Use **`codacy_list_pull_request_issues`** to review issues in PRs before merging

**`codacy_get_repository_with_analysis`** - Gets repository analysis information including grade, issues, duplication, complexity, and coverage metrics