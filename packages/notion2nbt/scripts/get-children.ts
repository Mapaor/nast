import { Notion2NBT } from '../src/index';
import { writeFileSync } from 'fs';
import { join } from 'path';

// Configuration from environment variables
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const BLOCK_ID = process.env.BLOCK_ID || process.env.PAGE_ID || '';

if (!NOTION_TOKEN) {
  console.error('Error: NOTION_TOKEN environment variable is required');
  process.exit(1);
}
if (BLOCK_ID === '') {
  console.error('Error: BLOCK_ID (or PAGE_ID) environment variable is required');
  process.exit(1);
}

async function fetchRawChildren() {
  try {
    console.log('Initializing Notion2NBT client...');
    
    const client = new Notion2NBT({
      auth: NOTION_TOKEN!,
      enableCache: false
    });

    console.log(`Fetching raw children blocks for: ${BLOCK_ID}`);

    const outputPath = join(__dirname, '../output/', `children-${BLOCK_ID}.json`);
    const outputDir = join(__dirname, '../output/');
    
    const rawBlocks = await client.APIgetChildrenBlocks(BLOCK_ID);

    console.log('Raw blocks fetched successfully!');
    console.log(`Total children blocks: ${rawBlocks.length}`);
    
    if (rawBlocks.length > 0) {
      console.log(`- Block types: ${[...new Set(rawBlocks.map(b => b.type))].join(', ')}`);
    }
    
    // Create output directory if it doesn't exist
    try {
      const { mkdirSync } = require('fs');
      mkdirSync(outputDir, { recursive: true });
    } catch (err) {
      // Directory might already exist, ignore
    }

    writeFileSync(outputPath, JSON.stringify(rawBlocks, null, 2), 'utf-8');
    
    console.log(`Raw blocks saved to: ${outputPath}`);
    console.log('Done!');

  } catch (error) {
    console.error('Error fetching children blocks:', error);
    process.exit(1);
  }
}

// Run the script
fetchRawChildren();
