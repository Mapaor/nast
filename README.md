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

## Tech stack

- **TypeScript** - Full type safety
- **TSDown** - Fast bundling with ESM output
- **PNPM Workspace** - Monorepo management
- **Vitest** - Testing framework

## Getting Started

## Usage

Install the packages you need:

```bash
pnpm add @nast/notion2nbt @nast/nbt2nast @nast/nast2typst @nast/nast2mdast @nast/mdast2md @nast/nast-fetch-images
```

Example usage:

```ts
import { fetchPage } from '@nast/notion2nbt';
import { convertToNast } from '@nast/nbt2nast';
import { toTypst } from '@nast/nast2typst';

// Set your Notion token and page ID
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PAGE_ID = 'your-notion-page-id';

if (!NOTION_TOKEN) {
  throw new Error('NOTION_TOKEN environment variable is required');
}

// Fetch a Notion page
const nbt = await fetchPage(PAGE_ID, { auth: NOTION_TOKEN });

// Convert NBT to NAST
const nast = convertToNast(nbt);

// Convert NAST to Typst markup
const typst = toTypst(nast);

console.log(typst);
```

For detailed documentation, visit the [npm nast org page](https://www.npmjs.com/org/nast) where you'll find a npm link to each of the packages.
