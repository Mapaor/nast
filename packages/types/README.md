# @nast/types

Shared type definitions for NAST packages.

## Installation

```bash
pnpm add @nast/types
```

## Usage

```typescript
// Import all types from the main entry
import { NASTRoot, NASTNode, NBTBlock, RichText } from '@nast/types';

// Or import from specific modules for better tree-shaking
import { NASTRoot, NASTNode } from '@nast/types/nast';
import { NBTBlock, NBTPageNode } from '@nast/types/nbt';
import { RichText, FileInfo, IconInfo } from '@nast/types/common';
```

## Type Categories

### NAST Types (`@nast/types/nast`)

NAST (Notion Abstract Syntax Tree) is a unified-like AST format for representing Notion content:

- `NASTRoot` - Root document node
- `NASTNode` - Union of all node types
- Block types: `NASTParagraph`, `NASTHeading`, `NASTCode`, `NASTBlockquote`, etc.
- Inline types: `NASTText`, `NASTStrong`, `NASTEmphasis`, `NASTLink`, etc.
- Media types: `NASTImage`, `NASTVideo`, `NASTFile`, `NASTPDF`
- Layout types: `NASTColumnList`, `NASTColumn`, `NASTTable`, etc.

### NBT Types (`@nast/types/nbt`)

NBT (Notion Block Tree) is the intermediate format closer to the Notion API:

- `NBTBlock` - Base block interface
- `NBTPageNode` - Page document node
- `NBTDocument` - Alias for NBTPageNode
- `NBTNodeMetadata` - Block metadata

### Common Types (`@nast/types/common`)

Shared utility types:

- `RichText` - Rich text with annotations
- `TextAnnotations` - Text formatting (bold, italic, etc.)
- `NotionColor` - Notion color values
- `FileInfo` - File/external URL info
- `IconInfo` - Emoji/file/external icon
- `MentionData` - Mention types (user, page, date, database)
- `DownloadedImage` - Downloaded image data
- `FetchImagesResult` - Image fetch statistics

## License

MIT
