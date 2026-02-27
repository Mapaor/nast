# NAST

Notion Abstract Syntax Tree tools - a monorepo of npm packages for transforming Notion content.

## Packages

| Package | Description |
|---------|-------------|
| [@nast/notion2nbt](packages/notion2nbt) | Transform Notion pages into Notion Block Trees (NBT) |
| [@nast/nbt2nast](packages/nbt2nast) | Convert NBT to NAST (unified-like AST) |
| [@nast/nast2typst](packages/nast2typst) | Convert NAST to Typst markup |
| [@nast/nast2mdast](packages/nast2mdast) | Convert NAST to mdast (Markdown AST) |
| [@nast/mdast2md](packages/mdast2md) | Convert mdast to Markdown |
| [@nast/nast-fetch-images](packages/nast-fetch-images) | Fetch images from NAST |

## Architecture

- **TypeScript** - Full type safety
- **TSDown** - Fast bundling with ESM output
- **PNPM Workspace** - Monorepo management
- **Vitest** - Testing framework

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- PNPM >= 9.0.0

### Installation

```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install all dependencies
pnpm install
```

### Development

```bash
# Build all packages
pnpm build

# Build a specific package
pnpm --filter @nast/notion2nbt build

# Run dev mode (watch) for all packages
pnpm dev

# Type check all packages
pnpm typecheck

# Run tests
pnpm test
```

### Package Structure

Each package follows this structure:

```
packages/<package-name>/
├── src/
│   └── index.ts      # Main entry point
├── scripts/          # Development scripts
├── input/            # Test input files
├── output/           # Test output files
├── package.json
├── tsconfig.json
└── tsdown.config.ts
```