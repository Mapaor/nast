/**
 * Page operations for Notion2NBT client
 */

import type { Client } from '@notionhq/client'
import type { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type {
  ProcessResult,
  GetPageOptions,
  ProcessOptions,
} from '../../types/nbt-types'

import type { PageNode } from '../../types/page-node-types'

import { processBlocks } from '../../process-blocks-nbt'
import { getPageAsBlock } from '../../page-tree'
import { Logger } from '../utils/logger'
import { Cache } from '../utils/cache'
import { cleanId } from '../utils/helpers'

/**
 * Get a complete Notion page as a NotionBlock (PageNode)
 * 
 * @returns PageNode with type: 'page' and children array
 */
export async function getPageV2(
  pageId: string,
  client: Client,
  cache: Cache,
  logger: Logger,
  options: GetPageOptions = {}
): Promise<PageNode> {
  logger.info(`Fetching page: ${pageId}`)

  const cleanPageId = cleanId(pageId)

  // Check cache first (check for both old and new format)
  if (!options.forceRefresh) {
    const cached = cache.get<PageNode>(`page_v2:${cleanPageId}`)
    if (cached) {
      logger.debug(`Cache hit for page (v2): ${cleanPageId}`)
      return cached
    }
  }

  // Create fetch functions
  const fetchBlocks = async (id: string) => {
    const response = await client.blocks.children.list({
      block_id: id,
      page_size: 100,
    })
    return response.results as BlockObjectResponse[]
  }

  const fetchChildren = async (blockId: string) => {
    return fetchBlocks(blockId)
  }

  const fetchPageInfo = async (id: string) => {
    try {
      const page = await client.pages.retrieve({ page_id: id })
      return page as PageObjectResponse
    } catch (error) {
      logger.error(`Error fetching page info: ${error}`)
      throw error
    }
  }

  // Get the page as PageNode (NotionBlock)
  const pageNode = await getPageAsBlock(
    cleanPageId,
    fetchBlocks,
    fetchChildren,
    fetchPageInfo,
    {
      ...options,
      onProgress: (current, total) => {
        logger.debug(`Processing blocks: ${current}/${total}`)
        if (options.onProgress) {
          options.onProgress(current, total)
        }
      },
      onError: (error) => {
        logger.error(`Error processing block: ${error.message}`)
        if (options.onError) {
          options.onError(error)
        }
      },
    }
  )

  const childCount = pageNode.children?.length || 0
  logger.info(`Page processed: ${childCount} top-level blocks`)

  // Cache the result
  cache.set(`page_v2:${cleanPageId}`, pageNode)

  return pageNode
}

/**
 * Get blocks from a page as a flat NBT array
 */
export async function getPageBlocks(
  pageId: string,
  client: Client,
  logger: Logger,
  options: ProcessOptions = {}
): Promise<ProcessResult> {
  logger.info(`Fetching blocks for page: ${pageId}`)

  const cleanPageId = cleanId(pageId)

  // Fetch top-level blocks
  const response = await client.blocks.children.list({
    block_id: cleanPageId,
    page_size: 100,
  })

  const blocks = response.results as BlockObjectResponse[]

  // Create fetch function for children
  const fetchChildren = async (blockId: string) => {
    const res = await client.blocks.children.list({
      block_id: blockId,
      page_size: 100,
    })
    return res.results as BlockObjectResponse[]
  }

  // Process blocks
  const result = await processBlocks(blocks as any[], fetchChildren, {
    ...options,
    onProgress: (current, total) => {
      logger.debug(`Processing: ${current}/${total}`)
      if (options.onProgress) {
        options.onProgress(current, total)
      }
    },
    onError: (error) => {
      logger.error(`Error: ${error.message}`)
      if (options.onError) {
        options.onError(error)
      }
    },
  })

  logger.info(`Processed ${result.metadata.processed_blocks} blocks`)

  return result
}

/**
 * Get all blocks from a page with pagination
 */
export async function getAllBlocks(
  pageId: string,
  client: Client,
  logger: Logger
): Promise<BlockObjectResponse[]> {
  logger.debug(`Fetching all blocks for page: ${pageId}`)

  const blocks: BlockObjectResponse[] = []
  let cursor: string | undefined = undefined
  let hasMore = true

  while (hasMore) {
    const response = await client.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    })

    blocks.push(...(response.results as BlockObjectResponse[]))

    hasMore = response.has_more
    cursor = response.next_cursor || undefined
  }

  logger.debug(`Fetched ${blocks.length} total blocks`)

  return blocks
}

/**
 * Prefetch page information for mentions
 */
export async function prefetchPageInfo(
  pageId: string,
  client: Client,
  logger: Logger,
  cachePageInfoFn: (pageId: string, title: string, icon: string) => void
): Promise<void> {
  try {
    const page = await client.pages.retrieve({ page_id: pageId }) as PageObjectResponse

    // Extract title and icon
    let title = 'Untitled'
    let icon = ''

    if ('properties' in page && page.properties?.title) {
      const titleProp = page.properties.title as any
      if (titleProp.title && Array.isArray(titleProp.title)) {
        title = titleProp.title.map((t: any) => t.plain_text).join('')
      }
    }

    if (page.icon) {
      if (page.icon.type === 'emoji' && 'emoji' in page.icon) {
        icon = page.icon.emoji
      }
    }

    // Cache the info
    cachePageInfoFn(pageId, title, icon)
  } catch (error) {
    logger.warn(`Error prefetching page info for ${pageId}: ${error}`)
  }
}
