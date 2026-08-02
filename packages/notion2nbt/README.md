# Notion to Notion Block Tree (@nast/notion2nbt)

[![npm version](https://img.shields.io/npm/v/@nast/notion2nbt.svg)](https://www.npmjs.com/package/@nast/notion2nbt)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This package is a wrapper over the official Notion API, it can fetch any Notion page or block and produce a Notion Block Tree (NBT), a JSON structure that contains the block/page and also all it's children. This remove the need of having to recursively fetch any block that has children and handle pagination manually. 

With this package you obtain the actual content of your Notion page. A source of truth JSON that is in essence the proper export of your Notion content, and one that can be re-imported anytime (using this same package).

This content that is now yours can be used as a back-up, as a way to transfer content from different Notion accounts or workspaces, and it can also be converted into other document formats like markdown, typst, latex, etc. The typst one is specially useful as it is very modular and scalable and allows you to print your Notion pages into fully customizable PDFs.

## Requisites

For this package to work you'll need to create a Notion integration (internal or public) and then you'll need to connect it to the corresponding pages or workspaces you want to use this package on.

Note: if you have a page that contains sub-pages you only need to connect it to the top-page, the sub-pages get automatically connected.

Read more about Notion integrations [here](https://www.notion.com/help/create-integrations-with-the-notion-api).

## Installation

```
npm install @nast/notion2nbt
```

Alternatively you can also use `pnpm add @nast/notion2nbt` or `yarn add @nast/notion2nbt`.

## Features
All 27+ Notion block types supported :)


## Simple Node.js example

To test the package in a simple manner create an empty folder and inside it the following files: `get-nbt-example.js`, `.env.local` and `package.json`.

1. In your env file put your environment variables:
    ```
    NOTION_TOKEN=your-notion-token
    NOTION_PAGE_ID=your-page-id
    ```

2. In your `package.json` declare it as an ESM module:

    ```json
    {
      "type": "module"
    }
    ```

    Note: package name and version are not needed as we are just testing, not gonna publish this.

3. In the script put the following simple example usage:

    ```javascript
    import { Notion2NBT } from '@nast/notion2nbt';

    const token = process.env.NOTION_TOKEN;
    const pageId = process.env.NOTION_PAGE_ID;

    const client = new Notion2NBT({ auth: token });
    const page = await client.getPage(pageId);

    const pageJSON = JSON.stringify(page, null, 2);
    console.log(pageJSON);
    ```

4. Now install the package

    ```bash
    npm install @nast/notion2nbt
    ```

5. Test it out
    ```bash
    node --env-file=.env.local get-nbt-example.js
    ```

    Note: If you are in a NextJS or TSDown project (instead of a simple node one) the --env-file flag is not necessary.

You could also try the `getBlock` endpoint with a toggle heading for example, which may contain all sorts of children blocks. 

<details> 
<summary>getBlock example</summary>
You would copy the URL of a block inside the Notion app ("Copy link to block") and the last part of the URL (after the `#`) would be the block ID. You would add it to the env file and then use this as an example:

```javascript
import { Notion2NBT } from '@nast/notion2nbt';

const token = process.env.NOTION_TOKEN;
const blockId = process.env.NOTION_BLOCK_ID;

const client = new Notion2NBT({ auth: token });
const block = await client.getBlock(blockId);

const blockJSON = JSON.stringify(block, null, 2);
console.log(blockJSON);
```

</details>

## Typescript example
For a more complete example see  [`scripts/fetch-page.ts`](./scripts/fetch-page.ts).

## More direct options

You can also use the wrappers `notion2md` and `notion2typst` to transform your Notion content to Markdown or to Typst.

## Typical Notion API Response

For comparison with the official Notion API you can use:

```typescript
const rawBlocks = await client.APIgetChildrenBlocks('block-id')
```
This returns raw Notion API response (array of children blocks, without containing their own children).

## Other endpoints of this package and state of the documentation
This package also exposes several general utilities and tree-traversal utilities, most of them are not yet finished. Once I have fully implemented them, added examples of their use cases and also created the reverse process (nbt2notion), I will create a proper documentation.

## License

[MIT](../../LICENSE)