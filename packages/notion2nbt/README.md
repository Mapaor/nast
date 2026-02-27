# Notion to Notion Block Tree (notion2nbt)

This package is a wrapper over the Notion oficial API and it produces a Notion Block Tree (NBT) in JSON format. This removes the tedious need for recursively fetching the corresponding children blocks.

Given a pageId (or blockId) and a Notion token (sometimes also called integration secret) one can get a tree of ALL the children blocks of that block (or page) and their respective children.

Note: Your Notion integration (internal or public) must be connected to the Notion page you want to fetch for the package to work.

## Install

```bash
npm install notion2nbt
```

## Usage

```typescript
import { Notion2NBT, type PageNode, traverseNBT } from 'notion2nbt'

const client = new Notion2NBT({ auth: process.env.NOTION_TOKEN! })

// Get page or block as a structure
const page = await client.getPageV2('your-page-id')
// const rootBlock = await client.getBlock('your-block-id')

// Ensure everything works ok
console.log(page.type)            
console.log(page.properties.title)   
console.log(page.properties.icon)  
console.log(page.children)           

// Access children directly
for (const block of page.children || []) {
  console.log(block.type, block.properties)
}
```

## Transform Example
See `scripts/fetch-page.ts` for an example.

You can also use the wrappers `notion2md` and `notion2typst` to transform your Notion content to Markdown or to Typst.

## Features
All 27+ Notion block types supported :)


## Typical Notion API Response

For comparison with the official Notion API you can use:

```typescript
const rawBlocks = await client.APIgetChildrenBlocks('block-id')
// Returns raw Notion API response (array of children blocks)
```

## License

[MIT](../LICENSE)