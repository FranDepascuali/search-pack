# **search-pack**

Fast code search with [ripgrep](https://github.com/microsoft/vscode-ripgrep) + optional packaging for AI analysis with [repomix](https://github.com/yamadashy/repomix)

## **What it does**

- **Find code fast** - Literal string search powered by [vscode-ripgrep](https://github.com/microsoft/vscode-ripgrep)
- **Package for AI** - Uses [repomix](https://github.com/yamadashy/repomix) to pack matching files to clipboard for use with any AI provider (ChatGPT, Claude, Gemini, etc.)

## **Use without installing (recommended)**

```bash
npx search-pack <pattern> [options]

# Examples:
npx search-pack "your pattern"
npx search-pack "your pattern" --copy
npx search-pack "your pattern" -f ./packages/api --copy
```

## **Example**

**Basic search:**

```bash
$ npx search-pack "performSearch"
# Finds and list all literal matches of "performSearch" in your codebase
./src/commands/search.ts:32:40:      const searchResults = await this.performSearch(pattern, folder, rgPath)
./src/commands/search.ts:53:17:  private async performSearch(
```

**Search + pack for AI:**

```bash
$ npx search-pack "performSearch" --copy
# Finds all matches of "performSearch" and copies to clipboard the containing files for AI analysis
./src/commands/search.ts:32:40:      const searchResults = await this.performSearch(pattern, folder, rgPath)
./src/commands/search.ts:53:17:  private async performSearch(

⠸ Running repomix...
✔ Packing completed successfully!

📈 Top 5 Files by Token Count:
──────────────────────────────
1.  src/commands/search.ts (1,056 tokens, 4,401 chars, 73.9%)

🔎 Security Check:
──────────────────
✔ No suspicious files detected.

📊 Pack Summary:
────────────────
  Total Files: 1 files
 Total Tokens: 1,429 tokens
  Total Chars: 6,171 chars

🎉 All Done!
Your repository has been successfully packed.
✔ Files packed and copied to clipboard!
```

## **Options**

- `-c, --copy` - Pack matching files with repomix and copy to clipboard
- `-f, --folder <dir>` - Directory to search (default: current)

## **Global installation (optional)**

```bash
npm install -g search-pack

# Now use directly
search-pack "your pattern"
sp "your pattern"  # Short alias
```

## **How it works**

1. **Search** - Uses [vscode-ripgrep](https://github.com/microsoft/vscode-ripgrep) for fast literal string matching
2. **Display** - Shows colored results with file:line:column format
3. **Pack** (with --copy) - Uses [repomix](https://github.com/yamadashy/repomix) to package matching files and copy to clipboard

## **Features**

- **Literal string search** - What you type is what you search
- **Fast** - Powered by ripgrep, one of the fastest search tools available
- **AI-independent** - Use with any AI provider or tool, not locked to specific IDEs or services
- **Cross-platform** - Works on macOS, Linux, and Windows

## **Why search-pack?**

Modern AI tools are powerful but fragmented across different providers and IDEs. Whether you use ChatGPT, Claude, Gemini, Cursor, or any other AI service, you need a consistent way to find and share code context.

`search-pack` gives you that independence - find relevant code fast, package it properly with repomix, and use it with whatever AI tool you prefer. No vendor lock-in, no IDE constraints, just your code ready for any AI conversation.

## **License**

MIT © Francisco Depascuali

## **Dependencies**

- [vscode-ripgrep](https://github.com/microsoft/vscode-ripgrep) - Ripgrep bundled for Node.js
- [repomix](https://github.com/yamadashy/repomix) - File packaging for AI context
