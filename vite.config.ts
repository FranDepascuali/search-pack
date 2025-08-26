import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    open: false,
    logHeapUsage: true,
    watch: false,
    testTransformMode: {
      // https://github.com/vitest-dev/vitest/issues/3967#issuecomment-1680585071
      ssr: ['**/*'],
    },
    exclude: [
      '**/node_modules/**',
      '**/build/**',
      '.git',
      '.github',
      './coverage',
    ],
    include: ['**/*.spec.ts'],

    typecheck: {
      tsconfig: './tsconfig.build.json',
      checker: 'tsc',
    },

    // https://github.com/vitest-dev/vitest/issues/2008
    // pool: 'typescript',
    pool: 'forks',
    poolOptions: {
      vmThreads: {
        singleThread: true,
        // isolate: false,
      },
      forks: {
        singleFork: true,
      },
    },
    // silent: !!process.env.CI,
    // Disabling threads to avoid an "action has timed out" error in github actions.
    singleThread: true,
    environment: 'node',
    retry: 0,
    // inspectBrk: true,
    coverage: {
      provider: 'v8',
      enabled: false,
      reportOnFailure: true,
      clean: true,
    },
  },
})
