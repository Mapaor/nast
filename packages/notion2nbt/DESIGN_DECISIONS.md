# Design Decisions

## Everything is a Block

Everything is a block: pages, databases, callouts, toggles, etc. This aligns with how Notion internally structures data

### Block Structure

All blocks follow the same pattern:

```typescript
interface NotionBlock {
  id: string
  type: string  // 'page' | 'heading_1' | 'callout' | etc.
  properties: Record<string, any>
  children?: NotionBlock[]
  metadata?: NodeMetadata
  processed_at?: string
}
```

### Pages as Blocks

Pages are blocks with `type: 'page'`:

```typescript
{
  id: "page-id",
  type: "page",
  properties: {
    title: "My Page Title",
    icon: { type: "emoji", emoji: "✨" },
    cover: { type: "external", url: "https://..." }
  },
  children: [
    { id: "block-1", type: "heading_1", properties: {...} },
    { id: "block-2", type: "paragraph", properties: {...} }
  ],
  processed_at: "2026-02-24T..."
}
```

### Children as Arrays

Children are arrays, each child block being an object:

```typescript
{
  type: "page",
  children: [
    { id: "uuid-1", type: "heading", ... },
    { id: "uuid-2", type: "paragraph", ... }
  ]
}
```


## Data Structure

notion2nbt uses a  tree structure (we call it Notion Block Tree or NBT for short) where children are nested, instead of being duplicated in a flat O(1) map (like the `react-notion-x` extended record map).

## Block Types

Self-handling: table, column_list, synced_block (they fetch their own children)

Child-only: table_row, column (they never appear at top level in a page)

Rest: Standard nesting (children get fetched recursively)

