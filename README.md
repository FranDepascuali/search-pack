# search-pack

Fast code search with [ripgrep](https://github.com/microsoft/vscode-ripgrep) + optional packaging for AI analysis with [repomix](https://github.com/yamadashy/repomix)

## What it does

- **Find code fast** - Literal string search powered by [vscode-ripgrep](https://github.com/microsoft/vscode-ripgrep)
- **Package for AI** - Uses [repomix](https://github.com/yamadashy/repomix) to pack matching files to clipboard for use with any AI provider (ChatGPT, Claude, Gemini, etc.)

```bash
# Search for code
npx search-pack "useState"

# Search + pack with repomix for AI
npx search-pack "error handling" --copy
```

## Quick Start

```bash
# Basic search
npx search-pack "console.log"

# Search in specific folder
npx search-pack "API_KEY" -f src

# Search + pack for AI context
npx search-pack "useState" --copy
npx search-pack "import React" --copy

# Complex literal strings
npx search-pack "const [data, setData] = useState" --copy
npx search-pack 'onClick={() => {' --copy
```

## Installation

### Use without installing (recommended)

```bash
npx search-pack "your pattern"
```

### Global installation (optional)

```bash
npm install -g search-pack

# Now use directly
search-pack "your pattern"
sp "your pattern"  # Short alias
```

## Usage

```bash
npx search-pack <pattern> [options]
```

### Options

- `-c, --copy` - Pack matching files with repomix and copy to clipboard
- `-f, --folder <dir>` - Directory to search (default: current)

### Examples

```bash
# Find all TODOs
npx search-pack "TODO"

# Find error handling
npx search-pack "catch (error)" -f src

# Get all test files for AI review
npx search-pack "describe(" -f tests --copy

# Find API endpoints
npx search-pack "app.get(" --copy

# Find imports from specific path
npx search-pack "from '@/components" --copy

# Find React hooks usage
npx search-pack "useEffect(() =>" --copy
```

## How it works

1. **Search** - Uses [vscode-ripgrep](https://github.com/microsoft/vscode-ripgrep) for fast literal string matching
2. **Display** - Shows colored results with file:line:column
3. **Pack** (with --copy) - Uses [repomix](https://github.com/yamadashy/repomix) to package matching files and copy to clipboard

## Common Use Cases

### For AI/LLM Context

```bash
# Find all error handling code
npx search-pack "try {" --copy

# Get all component definitions
npx search-pack "export const" -f components --copy

# Find all database queries
npx search-pack "SELECT" --copy
```

### For Development

```bash
# Find hardcoded values
npx search-pack "localhost:3000"

# Find specific function usage
npx search-pack "handleSubmit("

# Find console.logs to clean up
npx search-pack "console.log"
```

## Features

- **Literal string search** - What you type is what you search
- **No dependencies** - Ripgrep bundled via [vscode-ripgrep](https://github.com/microsoft/vscode-ripgrep), repomix auto-installed when needed
- **Fast** - Powered by ripgrep, one of the fastest search tools
- **AI-independent** - Use with any AI provider or tool, not locked to specific IDEs or services
- **Cross-platform** - Works on macOS, Linux, and Windows

## Troubleshooting

### No results found

- Pattern is searched literally (exact match)
- Check if you're in the right directory
- Try with `-f .` to explicitly search current directory

### Files not copied to clipboard

- Repomix needs npm/npx (install Node.js if missing)
- On Linux, clipboard access may need additional setup
- Large files timeout after 30 seconds

## Why?

Modern AI tools are powerful but fragmented across different providers and IDEs. Whether you use ChatGPT, Claude, Gemini, Cursor, or any other AI service, you need a consistent way to find and share code context.

`search-pack` gives you that independence - find code fast, package it with repomix, and use it with whatever AI tool you prefer. No vendor lock-in, no IDE constraints, just your code ready for any AI.

## License

MIT © Francisco Depascuali

## Dependencies

- [vscode-ripgrep](https://github.com/microsoft/vscode-ripgrep) - Ripgrep bundled for Node.js
- [repomix](https://github.com/yamadashy/repomix) - File packaging for AI context
