import { Notion2NBT, type NotionBlock } from '../src/index';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Helper function to count all blocks recursively
function countBlocks(block: NotionBlock): number {
  let count = 1; // Count this block
  if (block.children && block.children.length > 0) {
    for (const child of block.children) {
      count += countBlocks(child);
    }
  }
  return count;
}

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PAGE_ID = process.env.PAGE_ID || '';

if (!NOTION_TOKEN) {
  console.error('Error: NOTION_TOKEN environment variable is required');
  process.exit(1);
}
if (PAGE_ID === '') {
  console.error('Error: PAGE_ID environment variable is required');
  process.exit(1);
}

async function fetchAndSavePageNBT() {
  try {
    console.log('Initializing Notion2NBT client...');
    
    const client = new Notion2NBT({
      auth: NOTION_TOKEN!,
      enableCache: false
    });

    console.log(`Fetching page: ${PAGE_ID}`);

    // Save to JSON file (in the output folder, which is at same level as the script folder))
    const outputPath = join(__dirname, '../output/', `nbt-page-${PAGE_ID}.json`);
    const outputDir = join(__dirname, '../output/');

    // __dirname = "wd/scripts/"
    // outputDir = "wd/output/"
    // (it's the `join` from `path`, not a string concatenation, it already resolves the path correctly) 

    const page = await client.getPageV2(PAGE_ID);
    // const page = await client.getPageV2(PAGE_ID, { includeMetadata: true });

    console.log('Page fetched successfully!');
    console.log(`Total blocks (including page): ${countBlocks(page)}`);
    console.log(`Direct children: ${page.children?.length ?? 0}`);


    // Create output directory if it doesn't exist
    try {
      const { mkdirSync } = require('fs');
      mkdirSync(outputDir, { recursive: true });
    } catch (err) {
      // Directory might already exist, ignore
    }

    writeFileSync(outputPath, JSON.stringify(page, null, 2), 'utf-8');
    
    console.log(`NBT saved to: ${outputPath}`);
    console.log('Done!');

  } catch (error) {
    console.error('Error fetching page:', error);
    process.exit(1);
  }
}

// Run the script
fetchAndSavePageNBT();
