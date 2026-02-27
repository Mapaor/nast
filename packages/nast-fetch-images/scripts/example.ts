import { fetchImagesFromBlocks, getExtensionFromContentType } from "../src";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

interface NASTRoot {
  type: "root";
  children: Array<any>;
}

const pageId = "30511a9761ab802c808cdbb05b786986";
const inputPath = `input/nast-page-${pageId}.json`;
const outputDir = "output";

const __dirname = process.cwd();

async function main() {
  // Read the input NAST JSON file
  
  const jsonContent = await readFile(inputPath, "utf-8");
  const nastData: NASTRoot = JSON.parse(jsonContent);

  console.log(`Loaded NAST data with ${nastData.children.length} blocks`);

  // Fetch all images from the blocks
  console.log("Fetching images...");
  
  const result = await fetchImagesFromBlocks(nastData.children);
  
  console.log(`Found ${result.imageCount} image blocks (${result.imageExternalCount} of type 'external' and ${result.imageFileCount} of type 'file')`)
  
  const images = result.images;
  console.log(`Successfully downloaded ${images.length} images`);
  console.log(`Couldn't download ${result.expiredCount} images because they were expired`);

  if (result.imageCount - result.expiredCount !== images.length) {
    console.warn("Error: Some images were not downloaded (not because of expiration)");
  }

  // Save each image to the output folder
  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    // Determine file extension from content type
    const extension = getExtensionFromContentType(image.contentType);

    // Create filename
    const filename = `image-${i + 1}${extension}`;
    const outputPath = join(__dirname, outputDir, filename);

    // Write the image data to file
    await writeFile(outputPath, Buffer.from(image.data));

    console.log(`Saved: ${filename} (${image.contentType})`);
    console.log(`  URL: ${image.url.substring(0, 60)}...`);
  }

  console.log("\nDone!");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
