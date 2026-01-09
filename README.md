# Nx Piral Monorepo

A production-ready, Nx-managed, Package-Based Monorepo using npm, TypeScript, and the Piral micro-frontend framework with Rspack bundling.

## Folder Structure

```
nx-piral-monorepo/
├── apps/
│   ├── shell/                    # Piral App Shell (Host)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── ErrorPage.tsx
│   │   │   │   ├── Layout.tsx
│   │   │   │   └── Loader.tsx
│   │   │   ├── styles/
│   │   │   │   ├── Dashboard.module.css
│   │   │   │   ├── ErrorPage.module.css
│   │   │   │   ├── Layout.module.css
│   │   │   │   ├── Loader.module.css
│   │   │   │   └── global.module.css
│   │   │   ├── index.html
│   │   │   ├── index.tsx
│   │   │   └── types.d.ts
│   │   ├── package.json
│   │   ├── piral.json
│   │   └── tsconfig.json
│   │
│   ├── mfe1/                     # Pilet: Mantine Forms Demo
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   └── MantineFormsPage.tsx
│   │   │   ├── styles/
│   │   │   │   └── MantineFormsPage.module.css
│   │   │   ├── index.tsx
│   │   │   └── types.d.ts
│   │   ├── package.json
│   │   ├── pilet.json
│   │   └── tsconfig.json
│   │
│   └── mfe2/                     # Pilet: AG-Grid Demo
│       ├── src/
│       │   ├── components/
│       │   │   └── DataGridPage.tsx
│       │   ├── styles/
│       │   │   └── DataGridPage.module.css
│       │   ├── index.tsx
│       │   └── types.d.ts
│       ├── package.json
│       ├── pilet.json
│       └── tsconfig.json
│
├── packages/
│   ├── utils/                    # Shared utility library
│   │   ├── src/
│   │   │   ├── array.ts
│   │   │   ├── date.ts
│   │   │   ├── index.ts
│   │   │   ├── number.ts
│   │   │   ├── object.ts
│   │   │   ├── string.ts
│   │   │   └── validation.ts
│   │   ├── package.json
│   │   ├── tsconfig.build.json
│   │   └── tsconfig.json
│   │
│   └── grid/                     # AG-Grid wrapper package
│       ├── src/
│       │   ├── components/
│       │   │   └── DataGrid.tsx
│       │   ├── styles/
│       │   │   ├── DataGrid.module.css
│       │   │   └── grid.css
│       │   ├── index.ts
│       │   └── types.ts
│       ├── package.json
│       ├── tsconfig.build.json
│       └── tsconfig.json
│
├── .gitignore
├── .npmrc
├── nx.json
├── package.json
├── tsconfig.base.json
└── README.md
```

## Features

- **Nx Package-Based Monorepo**: Each project has its own `package.json` for independent versioning and dependency management
- **Piral Micro-Frontends**: Shell application with independently deployable pilets
- **Rspack Bundling**: Fast, Rust-based bundling via `piral-cli-rspack`
- **Mantine UI v7**: Modern React component library with CSS-in-JS
- **AG-Grid**: Enterprise-grade data grid via shared `@proj/grid` package
- **CSS Modules**: Scoped styling across all apps and packages
- **TypeScript**: Full type safety throughout the monorepo
- **Import Maps**: Shared dependencies across pilets
- **Independent Releases**: Per-project versioning with Nx Release
- **Conventional Commits**: Enforced commit format with commitlint + husky
- **Automated Changelogs**: Per-project changelog generation

## Shared Dependencies (Import Maps)

The shell shares the following dependencies with pilets:

- `react`, `react-dom`, `react-router-dom`
- `@mantine/core`, `@mantine/hooks`
- `@proj/grid` (local shared grid package)

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Install all dependencies
npm install

# Build all packages (required before serving)
npm run build
```

### Development

```bash
# Serve the shell application
npm run serve:shell

# In separate terminals, serve pilets
npm run serve:mfe1
npm run serve:mfe2

# Or run all in parallel
npm run dev
```

### Build

```bash
# Build everything
npm run build

# Build individual projects
npm run build:shell
npm run build:mfe1
npm run build:mfe2

# Build only pilets
npm run build:pilets
```

### Nx Commands

```bash
# Build with dependencies
nx build shell

# Serve with dependencies
nx serve shell

# View dependency graph
nx graph

# Run affected builds
nx affected:build
```

## Project Details

### Shell (apps/shell)

The Piral app shell that hosts micro-frontends:

- **Port**: 3000
- **Framework**: React 18 + Mantine v7
- **Features**: Layout, routing, error handling, loading states

```bash
cd apps/shell
npm run serve    # Start development server
npm run build    # Build for production
```

### MFE1 (apps/mfe1)

Pilet demonstrating Mantine UI form components:

- **Port**: 3001
- **Route**: `/mfe1`
- **Features**: Form controls (TextInput, Select, Button, etc.)

```bash
cd apps/mfe1
npm run serve    # Debug with shell
npm run build    # Build pilet
```

### MFE2 (apps/mfe2)

Pilet demonstrating AG-Grid integration:

- **Port**: 3002
- **Route**: `/mfe2`
- **Features**: Data grid with sorting, filtering, pagination

```bash
cd apps/mfe2
npm run serve    # Debug with shell
npm run build    # Build pilet
```

### Utils Package (packages/utils)

Shared utility functions:

- String manipulation
- Date formatting
- Number formatting
- Object utilities
- Array utilities
- Validation helpers

```typescript
import { capitalize, formatDate, groupBy } from '@proj/utils';
```

### Grid Package (packages/grid)

Pre-configured AG-Grid wrapper:

```typescript
import { DataGrid, type GridColumn } from '@proj/grid';

const columns: GridColumn<MyData>[] = [
  { field: 'name', headerName: 'Name' },
  { field: 'value', headerName: 'Value' },
];

<DataGrid rowData={data} columnDefs={columns} pagination />
```

## Local Development Flow

1. **Start the shell**: `npm run serve:shell`
2. **Start pilets**: `npm run serve:mfe1` and `npm run serve:mfe2`
3. Pilets auto-connect to the shell via Piral's debug API
4. Navigate to `http://localhost:3000` to see the full application

## Production Build

```bash
# Build all projects
npm run build

# Shell emits:
# - dist/release/  (production bundle)
# - dist/*.tgz     (app shell package for pilet development)

# Pilets emit:
# - dist/          (bundled pilet)
# - *.tgz          (packaged pilet for deployment)
```

## Release & Versioning

This monorepo uses **independent versioning** - each project is versioned separately based on its own changes.

### Commit Convention

Commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```bash
# Format: <type>(<scope>): <subject>

feat(shell): add dark mode toggle      # Minor bump
fix(mfe1): resolve form validation     # Patch bump
docs(grid): update API documentation   # No bump
```

### Release Commands

```bash
# Check current versions
npm run versions

# Dry run - see what would be released
npm run release:dry-run

# Release all changed projects
npm run release

# Release only affected projects
npm run release:affected

# First release (initialize versions)
npm run release:first
```

### Git Hooks

- **pre-commit**: Formats staged files with Prettier
- **commit-msg**: Validates commit message format
- **pre-push**: Runs affected tests and lint

For detailed release documentation, see [docs/RELEASING.md](docs/RELEASING.md).

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Piral Shell (Host)                    │
│  ┌─────────────────────────────────────────────────┐   │
│  │                   App Shell                       │   │
│  │  - Mantine Provider                              │   │
│  │  - Router                                        │   │
│  │  - Layout (Sidebar, Header)                      │   │
│  │  - Dashboard                                     │   │
│  └─────────────────────────────────────────────────┘   │
│                         │                               │
│         ┌───────────────┼───────────────┐              │
│         ▼               ▼               ▼              │
│    ┌─────────┐    ┌─────────┐    ┌───────────┐        │
│    │  MFE1   │    │  MFE2   │    │  Future   │        │
│    │ (Forms) │    │ (Grid)  │    │  Pilets   │        │
│    └─────────┘    └─────────┘    └───────────┘        │
└─────────────────────────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │ @proj/  │    │ @proj/  │    │ Shared  │
    │  utils  │    │  grid   │    │  Deps   │
    └─────────┘    └─────────┘    └─────────┘
```

## License

MIT
