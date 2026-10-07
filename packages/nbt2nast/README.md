# NBT to NAST Converter

Converts NBT (Notion Block Tree) to NAST (Notion Abstract Syntax Tree).

## Overview

This package provides a converter that transforms the Notion API-based NBT structure into a unified-like NAST structure that's easier to work with and convert to other formats like MDAST, HAST, etc.

## Installation

```bash
npm install @nast/nbt2nast
```

## Usage

### As a Module

```typescript
import { nbt2nast } from "@nast/nbtn2ast";
import type { NBTDocument } from "@nast/types";

// Load your NBT document (or generate it via @nast/notion2nbt as shown before)
const nbt: NBTDocument = /* {...} */;

// Convert to NAST
const nast = nbt2nast(nbt);

console.log(nast);
```

### Simple node example

```js
import { Notion2NBT } from '@nast/notion2nbt';
import { nbt2nast } from '@nast/nbt2nast';

const token = process.env.NOTION_TOKEN;
const pageId = process.env.NOTION_PAGE_ID;

const client = new Notion2NBT({ auth: token });
const nbtPage = await client.getPage(pageId);

const nastPage = nbt2nast(nbtPage);

const nastPageJSON = JSON.stringify(nastPage, null, 2);
console.log(nastPageJSON);
```

### Running the examples in this directory

The example script in `scripts/` reads the NBT input file (you will need to manually set it's name) from `input/` directory and outputs the NAST to `output/` directory with same file name. Run it with:

```bash
npm run example
```

### Using the CLI Tool

Convert any NBT JSON file to NAST:

```bash
npm run convert -- path/to/input.json [path/to/output.json]
```

If you don't put any output path it will create a file with a `.nast.json` extension on the directory as the same input file.



## Mapping (NBT → NAST)

### Blocks

| NBT Type | NAST Type | Notes |
|-----------|------------|-------|
| `heading_1/2/3` | `heading` | With `depth: 1/2/3` |
| `bulleted_list_item` | `list` (ordered: false) | Groups consecutive items |
| `numbered_list_item` | `list` (ordered: true) | Groups consecutive items |
| `quote` | `blockquote` | With children |
| `toggle` | `toggle` | With first children being `paragraph` or `heading` |
| `equation` | `math` | Block equation with meta: "block" |
| `divider` | `thematicBreak` | Horizontal rule |
| Rest of blocks | Same type as NBT| But some properties may be different

### Inline

| NBT Annotation | NAST Type |
|----------------|------------|
| `bold: true` | `strong` |
| `italic: true` | `emphasis` |
| `underline: true` | `underline` |
| `strikethrough: true` | `delete` |
| `code: true` | `inlineCode` |
| `url: "..."` | `link` |
| Equation inline | `inlineMath` |
| Mention | `mention` |

## License

[MIT](../LICENSE)
