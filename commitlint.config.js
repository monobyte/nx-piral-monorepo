/**
 * Commitlint Configuration
 *
 * Enforces conventional commit format across the monorepo.
 *
 * Commit format: <type>(<scope>): <subject>
 *
 * Examples:
 *   feat(shell): add dark mode toggle
 *   fix(mfe1): resolve form validation issue
 *   docs(grid): update API documentation
 *   refactor(utils): simplify date formatting
 *
 * Breaking changes:
 *   feat(shell)!: redesign navigation API
 *   feat!: drop Node 16 support
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Enforce lowercase for type
    'type-case': [2, 'always', 'lower-case'],

    // Allowed commit types
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation only
        'style', // Code style (formatting, semicolons, etc.)
        'refactor', // Code refactoring
        'perf', // Performance improvement
        'test', // Adding or updating tests
        'build', // Build system or dependencies
        'ci', // CI/CD configuration
        'chore', // Maintenance tasks
        'revert', // Revert previous commit
        'wip', // Work in progress (should not be merged)
      ],
    ],

    // Scope rules - allow project names and common scopes
    'scope-case': [2, 'always', 'kebab-case'],
    'scope-empty': [0], // Allow empty scope
    'scope-enum': [
      1, // Warning only (not error)
      'always',
      [
        // Apps
        'shell',
        'mfe1',
        'mfe2',
        // Packages
        'utils',
        'grid',
        // Common scopes
        'deps',
        'release',
        'config',
        'docs',
      ],
    ],

    // Subject rules
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 72],

    // Header max length
    'header-max-length': [2, 'always', 100],

    // Body rules
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 100],

    // Footer rules
    'footer-leading-blank': [2, 'always'],
    'footer-max-line-length': [2, 'always', 100],
  },
};
