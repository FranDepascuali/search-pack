#!/usr/bin/env node
import chalk from 'chalk'
import { Command } from 'commander'

import { SearchCommand } from './commands/search.js'

const program = new Command()

program
  .name('code-search')
  .description(
    'Search code patterns with ripgrep and optionally package matching files with repomix',
  )
  .version('1.0.0')
  .argument('<pattern>', 'Search pattern')
  .option('-f, --folder <folder>', 'Directory to search in', '.')
  .option(
    '-c, --copy',
    'Pack matching files using repomix and copy to clipboard',
  )
  .action(
    async (pattern: string, options: { folder?: string; copy?: boolean }) => {
      const searchCommand = new SearchCommand()
      await searchCommand.execute(pattern, options)
    },
  )

program.parse()
