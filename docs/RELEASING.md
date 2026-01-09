# Release Guide

This monorepo uses **Nx Release** with an **independent versioning strategy**, meaning each package/app can be versioned and released separately based on its own changes.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Commit Message Format](#commit-message-format)
- [Release Workflow](#release-workflow)
- [Release Commands](#release-commands)
- [First Release](#first-release)
- [Releasing Affected Projects](#releasing-affected-projects)
- [Manual Version Bumps](#manual-version-bumps)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before releasing, ensure:

1. You're on the `main` branch (or your release branch)
2. All changes are committed
3. You've pulled the latest changes
4. All tests pass: `npm run test:affected`

## Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/) which are automatically enforced via commitlint.

### Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### Types

| Type       | Description                         | Version Bump |
| ---------- | ----------------------------------- | ------------ |
| `feat`     | New feature                         | Minor        |
| `fix`      | Bug fix                             | Patch        |
| `perf`     | Performance improvement             | Patch        |
| `refactor` | Code refactoring (no feature/fix)   | Patch        |
| `build`    | Build system or dependency changes  | Patch        |
| `docs`     | Documentation only                  | None         |
| `style`    | Code style (formatting, semicolons) | None         |
| `test`     | Adding or updating tests            | None         |
| `chore`    | Maintenance tasks                   | None         |
| `ci`       | CI/CD configuration                 | None         |

### Scopes

Use project names as scopes:

- `shell` - Main Piral shell
- `mfe1` - MFE1 pilet
- `mfe2` - MFE2 pilet
- `utils` - Shared utilities package
- `grid` - AG-Grid wrapper package

### Examples

```bash
# Feature in shell
feat(shell): add user preferences panel

# Bug fix in mfe1
fix(mfe1): resolve form validation on blur

# Breaking change (note the !)
feat(grid)!: change DataGrid props API

BREAKING CHANGE: The `columns` prop has been renamed to `columnDefs`

# Multiple scopes (use comma)
fix(mfe1,mfe2): update shared dependency handling

# No scope (affects entire repo)
chore: update dependencies
```

## Release Workflow

### Standard Release Flow

1. **Check what will be released** (dry run):

   ```bash
   npm run release:dry-run
   ```

2. **Execute the release**:

   ```bash
   npm run release
   ```

3. **Push tags and commits**:
   ```bash
   git push --follow-tags origin main
   ```

### What happens during release:

1. **Version Detection**: Nx analyzes commits since the last release
2. **Version Bump**: Based on conventional commits, versions are bumped
3. **Changelog Generation**: Per-project CHANGELOG.md files are updated
4. **Git Commit**: Changes are committed with release message
5. **Git Tag**: Each released project gets a tag: `@proj/shell@1.2.0`

## Release Commands

### Full Release Commands

```bash
# Complete release (version + changelog + commit + tag)
npm run release

# Dry run - see what would happen
npm run release:dry-run

# First release (initializes versioning)
npm run release:first
```

### Granular Release Commands

```bash
# Only bump versions (no changelog, no commit)
npm run release:version

# Only generate changelogs
npm run release:changelog

# Publish to npm registry (for packages)
npm run release:publish
```

### Affected-Only Release

Release only projects that have changed:

```bash
# See what's affected
npm run affected:graph

# Release only affected projects
npm run release:affected

# Dry run affected release
npm run release:affected:dry-run
```

## First Release

For the initial release of the repository:

```bash
npm run release:first
```

This will:

- Set all projects to their current version in package.json
- Generate initial CHANGELOG.md files
- Create initial git tags

## Releasing Affected Projects

To release only projects affected by recent changes:

```bash
# 1. Check what's affected
nx show projects --affected

# 2. Dry run
npm run release:affected:dry-run

# 3. Execute
npm run release:affected
```

## Manual Version Bumps

For manual version control:

```bash
# Bump specific project
nx release version --projects=shell patch
nx release version --projects=utils minor
nx release version --projects=grid major

# Bump with specific version
nx release version --projects=shell 2.0.0

# Bump all projects
nx release version patch
```

## Tag Format

Tags follow the pattern: `{projectName}@{version}`

Examples:

- `@proj/shell@1.0.0`
- `@proj/mfe1@1.2.3`
- `@proj/utils@2.0.0`

## Changelog Structure

Each project maintains its own `CHANGELOG.md`:

```
apps/shell/CHANGELOG.md
apps/mfe1/CHANGELOG.md
apps/mfe2/CHANGELOG.md
packages/utils/CHANGELOG.md
packages/grid/CHANGELOG.md
```

A workspace-level `CHANGELOG.md` aggregates all changes.

## Troubleshooting

### "No projects to release"

This means no conventional commits were found since the last release. Check:

```bash
# View commit history
git log --oneline

# Check if commits follow conventional format
git log --format="%s" -10
```

### Version not bumping correctly

Check the commit types and ensure they match the expected bump:

```bash
# See verbose version analysis
npm run version:check
```

### Resetting release state

If you need to reset:

```bash
# Remove all release tags
git tag -l "@proj/*" | xargs git tag -d

# Reset to a specific version
nx release version --projects=shell 1.0.0 --git-commit=false --git-tag=false
```

### Viewing project dependencies

```bash
# View dependency graph
npm run graph

# View affected projects
npm run affected:graph
```

## CI/CD Integration

For automated releases in CI:

```bash
# Non-interactive release
NX_RELEASE_DRY_RUN=false nx release --yes

# Skip CI on release commits (already included in commit message)
# chore(release): @proj/shell 1.2.0 [skip ci]
```

## Best Practices

1. **Always dry-run first**: `npm run release:dry-run`
2. **Keep commits atomic**: One logical change per commit
3. **Use proper scopes**: Helps with changelog organization
4. **Document breaking changes**: Use `BREAKING CHANGE:` footer
5. **Review changelogs**: Before pushing, review generated changelogs
6. **Release frequently**: Smaller, frequent releases are easier to manage
