/**
 * Notion Page Tree Builder
 */

import type {
  NotionBlock,
  GetPageOptions,
} from './types/nbt-types'

import type { PageNode } from './types/page-node-types'

import { processBlocks } from './process-blocks-nbt'
import { processPageToNBT } from './processors/page-processors'

// Type imports
type Block = any
type PageResponse = any

/**
 * Build a PageNode (page as a block) from Notion API data
 * 
 * @param pageResponse - Raw Notion API page response
 * @param childNodes - Array of child blocks (already processed as NotionBlocks)
 * @param includeMetadata - Whether to include metadata fields
 * @returns PageNode with children array
 */
export function buildBlockTree(
  pageResponse: PageResponse,
  childNodes: NotionBlock[] = [],
  includeMetadata: boolean = false
): PageNode {
  const pageNode = processPageToNBT(pageResponse, childNodes, includeMetadata)
  
  // Add processed_at timestamp
  pageNode.processed_at = new Date().toISOString()
  
  return pageNode
}

/**
 * Get a complete page as a NotionBlock (PageNode)
 * 
 * This is the main entry point for fetching and processing a Notion page
 * 
 * @returns PageNode with type: 'page' and children array
 */
export async function getPageAsBlock(
  pageId: string,
  fetchBlocksFn: (pageId: string) => Promise<Block[]>,
  fetchChildrenFn: (blockId: string) => Promise<Block[]>,
  fetchPageInfoFn: (pageId: string) => Promise<PageResponse>,
  options: GetPageOptions = {}
): Promise<PageNode> {
  const {
    maxDepth = Infinity,
  } = options

  // 1. Fetch page metadata
  const pageResponse = await fetchPageInfoFn(pageId)

  // 2. Fetch top-level blocks
  let blocks = await fetchBlocksFn(pageId)

  // 3. Process blocks to NBT
  const result = await processBlocks(blocks, fetchChildrenFn, {
    maxDepth,
    includeMetadata: options.includeMetadata,
    onProgress: options.onProgress,
    onError: options.onError,
  })

  // 4. Build PageNode (page as block with children array)
  const pageNode = buildBlockTree(pageResponse, result.nodes, options.includeMetadata)

  return pageNode
}
