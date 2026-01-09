# Contributing Guide

Thank you for contributing to this project! This guide will help you get started.

## Table of Contents

- [Development Setup](#development-setup)
- [Commit Guidelines](#commit-guidelines)
- [Branch Naming](#branch-naming)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)

## Development Setup

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd nx-piral-monorepo
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Build all projects**:

   ```bash
   npm run build
   ```

4. **Start development servers**:
   ```bash
   npm run dev
   ```

## Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) to automate versioning and changelog generation.

### Commit Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### Quick Reference

| Type       | When to Use                         |
| ---------- | ----------------------------------- |
| `feat`     | Adding a new feature                |
| `fix`      | Fixing a bug                        |
| `docs`     | Documentation changes only          |
| `style`    | Code formatting (no logic change)   |
| `refactor` | Restructuring code (no feature/fix) |
| `perf`     | Performance improvements            |
| `test`     | Adding or updating tests            |
| `build`    | Build system or dependencies        |
| `ci`       | CI/CD configuration                 |
| `chore`    | Maintenance tasks                   |

### Scope

Use the project name as the scope:

- `shell` - Main Piral app shell
- `mfe1` - MFE1 pilet
- `mfe2` - MFE2 pilet
- `utils` - Shared utilities
- `grid` - AG-Grid wrapper

### Examples

```bash
# Good commits
feat(shell): add navigation breadcrumbs
fix(mfe1): prevent form double submission
docs(grid): add usage examples to README
refactor(utils): simplify date formatting logic

# Breaking change
feat(grid)!: rename columns prop to columnDefs

BREAKING CHANGE: The `columns` prop has been renamed to `columnDefs`
for consistency with AG-Grid API.

# Bad commits (will be rejected)
Fixed bug                    # Missing type
feat: added feature          # Past tense, missing scope
FEAT(shell): Add feature     # Wrong case
feat(shell): Add feature.    # Trailing period, wrong case
```

### Commit Validation

Commits are automatically validated using commitlint. Invalid commits will be rejected with an error message explaining the issue.

## Branch Naming

Use descriptive branch names:

```
feat/shell-dark-mode
fix/mfe1-form-validation
docs/update-readme
refactor/utils-cleanup
```

## Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** with proper commits
3. **Run tests**: `npm run test:affected`
4. **Run linting**: `npm run lint:affected`
5. **Push your branch** and create a PR
6. **Address review feedback**
7. **Squash and merge** (if multiple commits)

### PR Checklist

- [ ] Code follows the project style guide
- [ ] Tests added/updated for changes
- [ ] Documentation updated if needed
- [ ] Commit messages follow conventional format
- [ ] All CI checks pass

## Code Style

### TypeScript

- Use TypeScript strict mode
- Prefer `interface` over `type` for object shapes
- Use explicit return types for exported functions
- Avoid `any` - use `unknown` if type is truly unknown

### React

- Use functional components with hooks
- Keep components small and focused
- Use CSS Modules for styling
- Memoize expensive computations

### Formatting

Code is automatically formatted with Prettier on commit. You can also run:

```bash
npx prettier --write .
```

## Useful Commands

```bash
# Development
npm run dev                  # Start all apps
npm run serve:shell          # Start shell only

# Building
npm run build               # Build all
npm run build:affected      # Build affected only

# Testing
npm run test                # Test all
npm run test:affected       # Test affected only

# Linting
npm run lint                # Lint all
npm run lint:affected       # Lint affected only

# Dependency Graph
npm run graph               # View full graph
npm run affected:graph      # View affected graph
```

## Questions?

If you have questions, please open an issue or reach out to the maintainers.
