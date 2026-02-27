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
import { notion2typst, getExtensionFromContentType } from notion2typst;

const result = await notion2typst({notionToken: NOTION_TOKEN!, pageId: PAGE_ID!, fetchImages: true});

const typstCode = result.typstCode;
const images = result.images[i];
```

See the [example](/packages/notion2typst/scripts/example.ts) script for an example featuring saving the Typst code and images to the file system.

For detailed documentation, visit the [npm nast org page](https://www.npmjs.com/org/nast) where you'll find a npm link for each of the packages.
