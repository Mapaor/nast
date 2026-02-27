// Import from the underlying packages
import { Notion2NBT } from '@nast/notion2nbt';
import { nbt2nast } from '@nast/nbt2nast';
import { nast2typst } from '@nast/nast2typst';
import { fetchImagesFromBlocks, getExtensionFromContentType } from '@nast/nast-fetch-images';

// Import types from centralized @nast/types
import type { DownloadedImage, NASTRoot } from '@nast/types';

// Re-export for convenience
export { Notion2NBT, nbt2nast, nast2typst, fetchImagesFromBlocks, getExtensionFromContentType };

// Re-export commonly used types 
export type { NotionBlock } from '@nast/notion2nbt';
export type { NASTRoot, NASTNode, NBTBlock, DownloadedImage } from '@nast/types';

/**
 * Image data from the fetchImagesFromBlocks function
 * @deprecated Use DownloadedImage from @nast/types instead
 */
export type ImageData = DownloadedImage;

/**
 * Options for the notion2typst function
 */
export interface Notion2TypstOptions {
  /** Notion API token */
  notionToken: string;
  /** Notion page ID to convert */
  pageId: string;
  /** Whether to fetch images from the page (default: true) */
  fetchImages?: boolean;
  /** Whether to preserve block IDs in NAST (default: false) */
  preserveBlockId?: boolean;
  /** Whether to enable caching in Notion2NBT (default: false) */
  enableCache?: boolean;
}

/**
 * Result of the notion2typst conversion
 */
export interface Notion2TypstResult {
  /** The generated Typst code */
  typstCode: string;
  /** Downloaded images (if fetchImages was true) */
  images: DownloadedImage[];
  /** Image fetch statistics (if fetchImages was true) */
  imageStats: {
    /** Total number of image blocks found */
    totalImages: number;
    /** Number of successfully downloaded images */
    downloaded: number;
    /** Number of expired images */
    expired: number;
    /** Number of external images */
    external: number;
    /** Number of file images */
    file: number;
  };
  /** The intermediate NAST representation */
  nast: NASTRoot;
}

/**
 * Main notion2typst function - converts a Notion page to Typst code
 * 
 * This is a wrapper that combines:
 * 1. notion2nbt - fetch page from Notion API
 * 2. nbt2nast - convert Notion blocks to NAST
 * 3. nast2typst - convert NAST to Typst code
 * 4. fetchImagesFromBlocks - download images (optional)
 * 
 * @param options - Configuration options
 * @returns Typst code and downloaded images
 * 
 * @example
 * ```typescript
 * const result = await notion2typst({
 *   notionToken: 'your-token',
 *   pageId: 'your-page-id',
 *   fetchImages: true
 * });
 * 
 * console.log(result.typstCode);
 * console.log(`Downloaded ${result.images.length} images`);
 * ```
 */
export async function notion2typst(
  options: Notion2TypstOptions
): Promise<Notion2TypstResult> {
  const {
    notionToken,
    pageId,
    fetchImages = true,
    preserveBlockId = false,
    enableCache = false,
  } = options;

  // Step 1: Fetch page from Notion
  console.log('Fetching page from Notion...');
  const notion2nbt = new Notion2NBT({
    auth: notionToken,
    enableCache,
  });

  const nbtPage = await notion2nbt.getPageV2(pageId);
  console.log('✓ Page fetched successfully');

  // Step 2: Convert NBT to NAST
  console.log('Converting NBT to NAST...');
  const nast = nbt2nast(nbtPage, { preserveBlockId });
  console.log('✓ NBT converted to NAST');

  // Step 3: Convert NAST to Typst
  console.log('Converting NAST to Typst...');
  const typstCode = nast2typst(nast);
  console.log('✓ NAST converted to Typst');

  // Step 4: Fetch images (if enabled)
  let images: DownloadedImage[] = [];
  let imageStats = {
    totalImages: 0,
    downloaded: 0,
    expired: 0,
    external: 0,
    file: 0,
  };

  if (fetchImages) {
    console.log('Fetching images...');
    const imageResult = await fetchImagesFromBlocks(nast.children);
    images = imageResult.images;
    imageStats = {
      totalImages: imageResult.imageCount,
      downloaded: images.length,
      expired: imageResult.expiredCount,
      external: imageResult.imageExternalCount,
      file: imageResult.imageFileCount,
    };
    console.log(
      `✓ Downloaded ${images.length}/${imageResult.imageCount} images (${imageResult.expiredCount} expired)`
    );
  }

  console.log('Done!');

  return {
    typstCode,
    images,
    imageStats,
    nast,
  };
}