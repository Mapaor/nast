import { notion2typst } from '../src/index';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get environment variables
// Note: Make sure to set NOTION_TOKEN and PAGE_ID in your .env.local file
// and load them before running this script, or set them directly in your environment
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PAGE_ID = process.env.PAGE_ID;

if (!NOTION_TOKEN) {
  console.error('Error: NOTION_TOKEN environment variable is required');
  console.error('Please set it in .env.local file');
  process.exit(1);
}

if (!PAGE_ID) {
  console.error('Error: PAGE_ID environment variable is required');
  console.error('Please set it in .env.local file');
  process.exit(1);
}

async function main() {
  try {
    console.log('=== Notion to Typst Conversion ===\n');
    console.log(`Page ID: ${PAGE_ID}`);
    console.log(`Token: ${NOTION_TOKEN!.substring(0, 10)}...\n`);

    // Call the main wrapper function
    const result = await notion2typst({
      notionToken: NOTION_TOKEN!,
      pageId: PAGE_ID!,
      fetchImages: true,
      preserveBlockId: false,
      enableCache: false,
    });

    // Create output directory
    const outputDir = join(__dirname, '../output');
    mkdirSync(outputDir, { recursive: true });

    // Save Typst code
    const typstPath = join(outputDir, `page-${PAGE_ID}.typ`);
    writeFileSync(typstPath, result.typstCode, 'utf-8');
    console.log(`\n📄 Typst code saved to: ${typstPath}`);
    console.log(`   Lines: ${result.typstCode.split('\n').length}`);

    // Save images
    if (result.images.length > 0) {
      console.log(`\n🖼️  Saving ${result.images.length} images...`);
      
      for (let i = 0; i < result.images.length; i++) {
        const image = result.images[i];
        
        // Determine file extension from content type
        const extension = getExtensionFromContentType(image.contentType);
        const filename = `image-${i + 1}${extension}`;
        const imagePath = join(outputDir, filename);
        
        // Write the image data to file
        writeFileSync(imagePath, Buffer.from(image.data));
        console.log(`   ✓ ${filename} (${image.contentType})`);
      }
    }

    // Print statistics
    console.log('\n=== Summary ===');
    console.log(`Page title: ${result.nast.data.title || 'Untitled'}`);
    console.log(`Root nodes: ${result.nast.children.length}`);
    console.log(`\nImage Statistics:`);
    console.log(`  Total images found: ${result.imageStats.totalImages}`);
    console.log(`  Successfully downloaded: ${result.imageStats.downloaded}`);
    console.log(`  Expired: ${result.imageStats.expired}`);
    console.log(`  External images: ${result.imageStats.external}`);
    console.log(`  File images: ${result.imageStats.file}`);
    
    console.log('\nConversion completed successfully!');
    
  } catch (error) {
    console.error('\nError during conversion:', error);
    process.exit(1);
  }
}

function getExtensionFromContentType(contentType: string): string {
  const map: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/svg+xml': '.svg',
    'image/bmp': '.bmp',
  };

  return map[contentType] || '.bin';
}

// Run the example
main();
