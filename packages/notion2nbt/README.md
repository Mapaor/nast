# Notion to Notion Block Tree (notion2nbt)

This package is a wrapper over the Notion oficial API and it produces a Notion Block Tree (NBT) in JSON format. This removes the tedious need for recursively fetching the corresponding children blocks.

Given a pageId (or blockId) and a Notion token (sometimes also called integration secret) one can get a tree of ALL the children blocks of that block (or page) and their respective children.

Note: Your Notion integration (internal or public) must be connected to the Notion page you want to fetch for the package to work.

## Installation

```
npm install @nast/notion2nbt
```

## Features
All 27+ Notion block types supported :)


## Usage

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

    console.log(page);
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


## Typescript example
For a more complete example see  `scripts/fetch-page.ts`.

## More direct options

You can also use the wrappers `notion2md` and `notion2typst` to transform your Notion content to Markdown or to Typst.

## Typical Notion API Response

For comparison with the official Notion API you can use:

```typescript
const rawBlocks = await client.APIgetChildrenBlocks('block-id')
// Returns raw Notion API response (array of children blocks)
```

## License

[MIT](../LICENSE)