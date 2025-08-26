import { rgPath } from '@vscode/ripgrep'
import chalk from 'chalk'
import { execa } from 'execa'
import fs from 'fs/promises'
import ora from 'ora'

export interface SearchOptions {
  copy?: boolean
  folder?: string
}

export class SearchCommand {
  async execute(pattern: string, options: SearchOptions): Promise<void> {
    const folder = options.folder || '.'

    // Verify folder exists
    try {
      const stat = await fs.stat(folder)
      if (!stat.isDirectory()) {
        console.error(chalk.red(`Error: '${folder}' is not a directory`))
        process.exit(1)
      }
    } catch (error) {
      console.error(chalk.red(`Error: Directory '${folder}' does not exist`))
      process.exit(1)
    }

    try {
      // Perform the search
      const searchResults = await this.performSearch(pattern, folder, rgPath)

      if (searchResults.trim()) {
        console.log(searchResults)

        if (options.copy) {
          await this.packAndCopy(pattern, folder, rgPath)
        }
      } else {
        console.log(
          chalk.yellow(
            `No matches found for pattern '${pattern}' in '${folder}'`,
          ),
        )
      }
    } catch (error) {
      console.error(chalk.red('Search failed:'), error)
      process.exit(1)
    }
  }

  private async performSearch(
    pattern: string,
    folder: string,
    rgPath: string,
  ): Promise<string> {
    try {
      // Use --fixed-strings to treat pattern as literal string, not regex
      // Add --color=always to force colored output even when piped
      // Add --sort=path to ensure consistent ordering
      const result = await execa(rgPath, [
        pattern,
        '--fixed-strings',
        '--vimgrep',
        '--color=always',
        '--sort=path',
        folder,
      ])
      return result.stdout
    } catch (error: any) {
      // rg returns exit code 1 when no matches found, which is normal
      if (error.exitCode === 1) {
        return ''
      }
      throw error
    }
  }

  private async packAndCopy(
    pattern: string,
    folder: string,
    rgPath: string,
  ): Promise<void> {
    const spinner = ora('Packing files...').start()

    try {
      // Get list of files that match the pattern (also use fixed-strings)
      // No need for colors in the file list output
      const filesResult = await execa(rgPath, [
        '-l',
        '--fixed-strings',
        pattern,
        folder,
      ])
      const files = filesResult.stdout.trim()

      if (!files) {
        spinner.fail(
          chalk.yellow(`No files found matching pattern '${pattern}'`),
        )
        return
      }

      console.log(chalk.blue('Files found:'))
      console.log(files)

      spinner.text = 'Running repomix...'

      // Check if repomix is available
      try {
        await execa('npx', ['repomix', '--version'])
      } catch (error) {
        spinner.fail(
          chalk.red(
            'Error: repomix is not available. Make sure Node.js and npm are installed.',
          ),
        )
        return
      }

      try {
        // Run repomix with the file list
        const repomixResult = await execa(
          'npx',
          ['repomix', '--stdin', '--copy', '-o', '/tmp/repomix-temp.txt'],
          {
            input: files,
          },
        )

        console.log(chalk.blue('Repomix stdout:'), repomixResult.stdout)
        console.log(chalk.blue('Repomix stderr:'), repomixResult.stderr)

        // Clean up temp files
        try {
          await fs.unlink('/tmp/repomix-temp.txt')
        } catch {
          // Ignore cleanup errors
        }

        spinner.succeed(chalk.green('Files packed and copied to clipboard!'))
      } catch (repomixError: any) {
        spinner.fail(chalk.red('Repomix failed'))
        console.error(chalk.red('Repomix error:'), repomixError.message)
        console.error(chalk.red('Repomix stdout:'), repomixError.stdout)
        console.error(chalk.red('Repomix stderr:'), repomixError.stderr)
      }
    } catch (error: any) {
      if (error.exitCode === 1) {
        spinner.fail(
          chalk.yellow(`No files found matching pattern '${pattern}'`),
        )
      } else {
        spinner.fail(chalk.red('Failed to pack files'))
        console.error(error.message)
      }
    }
  }
}
