import type { NASTImage, FetchImagesResult, Block, DownloadedImage } from "./types.js";

/**
 * Recursively finds all image blocks within a block tree
 * @param blocks - Array of NAST blocks to search
 * @returns Array of all image blocks found at any nesting level
 */
function findAllImageBlocks(blocks: Block[]): NASTImage[] {
  const images: NASTImage[] = [];
  
  for (const block of blocks) {
    // If this block is an image, add it to the results
    if (block.type === "image") {
      images.push(block as NASTImage);
    }
    
    // If this block has children, recursively search them
    if (block.children && Array.isArray(block.children)) {
      images.push(...findAllImageBlocks(block.children));
    }
  }
  
  return images;
}

/**
 * Fetches all images from an array of NAST blocks
 * @param blocks - Array of NAST blocks (which may include image blocks)
 * @returns Promise resolving to object with downloaded images and count of expired images
 */
export async function fetchImagesFromBlocks(
  blocks: Block[]
): Promise<FetchImagesResult> {
  const imageBlocks = findAllImageBlocks(blocks);

  const imageCount = imageBlocks.length;
  let imageFileCount = 0;
  let imageExternalCount = 0;
  let expiredCount = 0;
  const now = new Date();

  // Count image types and check for expired images
  for (const block of imageBlocks) {
    if (block.data?.fileType === "file") {
      imageFileCount++;
      if (block.data?.expiryTime) {
        const expiryTime = new Date(block.data.expiryTime);
        if (expiryTime < now) {
          expiredCount++;
        }
      }
    } else if (block.data?.fileType === "external") {
      imageExternalCount++;
    }
  }

  const results: DownloadedImage[] = [];
  
  // Fetch images one by one to handle errors gracefully
  for (const block of imageBlocks) {
    try {
      const res = await fetch(block.url);

      if (!res.ok) {
        continue;
      }

      const contentType = res.headers.get("content-type") ?? "unknown";
      const data = await res.arrayBuffer();

      results.push({
        url: block.url,
        contentType,
        data,
      });
    } catch (error) {
      console.warn(`Error: Failed to fetch image at ${block.url}: ${error}`);
    }
  }
  return {
    images: results,
    imageCount,
    imageFileCount,
    imageExternalCount,
    expiredCount,
  };
}
