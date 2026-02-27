# Scripts



## fetch-page.ts

Fetches a Notion page and saves its NBT as a JSON file.


1. Install dependencies
   ```bash
   npm install
   # or
   pnpm install
   ```

2. Create a `.env.local` (copied from `.env.local.example`)

3. Run it with

    ```bash
    npm run fetch-page
    # or
    pnpm fetch-page
    ```

The script will:
1. Connect to the Notion API using your token
2. Use `notion2nbt` to fetch the specified page or block and recursively fetch all it's children
3. Generate a JSON corresponding to the Notion Block Tree format
4. Save the result to the `output` directory

### Getting Your Notion Token

1. Go to https://www.notion.so/my-integrations
2. Create a new integration (internal)
3. Copy the "Internal Integration Token"
4. Connect your Notion page with the integration

### Getting a Page ID

From any Notion page URL (`https://notion.so/Page-Title-abc123...`):

Copy the ID after the last dash (`abc123...`).
