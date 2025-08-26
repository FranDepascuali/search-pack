# code-search

```bash
# Search for code
npx code-search "useState"
npx code-search "handleSubmit" -f src

# Search + copy to clipboard for AI
npx code-search "error handling" --copy
npx code-search "import React" -c

# Install globally (optional)
npm install -g code-search
code-search "pattern" -c
```

## What it does

Fast code search with ripgrep + optional packaging for AI analysis.

- `code-search "pattern"` - Find code
- Add `--copy` - Package matching files to clipboard
- Add `--folder src` - Search specific directory

## Install requirements

```bash
# macOS
brew install ripgrep

# Ubuntu
apt install ripgrep
```

## Commands

```bash
code-search <pattern> [--folder dir] [--copy]
```

**Options:**

- `--copy, -c` - Pack files and copy to clipboard
- `--folder, -f` - Directory to search (default: current)

## Examples

```bash
# Basic search
code-search "console.log"

# Search specific folder
code-search "API_KEY" -f src

# Search + pack for AI
code-search "useState" -c
code-search "import { useState }" -f components -c

# Complex literal strings work
code-search "const [data, setData] = useState" -c
```

That's it. Literal string search, no regex headaches.
