---
description: Comprehensive file management using Desktop Commander tools
argument-hint: <action> <path> [options]
---

# Desktop Commander - Advanced File Management

**Table of Contents**
- [Available Actions](#available-actions)
- [Usage Examples](#usage-examples)
- [Advanced Features](#advanced-features)
- [Best Practices](#best-practices)
- [Integration Notes](#integration-notes)

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
- **get_process_status**: Check status of running processes
    - Start a new terminal process with intelligent state detection. PRIMARY TOOL FOR FILE ANALYSIS AND DATA PROCESSING This is the ONLY correct tool for analyzing local files (CSV, JSON, logs, etc.). The analysis tool CANNOT access local files and WILL FAIL - always use processes for file-based work. CRITICAL RULE: For ANY local file work, ALWAYS use this tool + interact_with_process, NEVER use analysis/REPL tool. Running on Linux.
- **interact_with_process**: Send input to running processes
- **read_process_output**: Read command output
- **kill_process**: Terminate running processes
- **list_processes**: List all running processes

### System Operations
- **get_config**: View current Desktop Commander configuration
- **set_config_value**: Modify configuration settings
- **get_usage_stats**: View usage statistics
- **give_feedback_to_desktop_commander**: Open feedback form

## Usage Examples

Read the description of each the tool for full parameter details.

## Best Practices

1. **Use Absolute Paths**: Always specify full paths for reliability
2. **Batch Operations**: Group related file operations together
3. **Process Management**: Monitor long-running processes
4. **Search Efficiency**: Use specific patterns to limit search scope
5. **Configuration**: Adjust limits based on your needs
