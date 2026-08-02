/**
 * Page operations for Notion2NBT client
 */

import type { Client } from '@notionhq/client'
import type { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { NBTGetPageOptions as GetPageOptions } from '@nast/types'
import type { NBTPageNode as PageNode } from '@nast/types'

import { getPageTree } from '../../page-tree'
import { Logger } from '../utils/logger'
import { Cache } from '../utils/cache'
import { cleanId } from '../utils/helpers'

/**
 * Get a complete Notion page as a NotionBlock (PageNode)
 * 
 * @returns PageNode with type: 'page' and children array
 */
export async function getPageOperation(
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
    const cached = cache.get<PageNode>(`page:${cleanPageId}`)
    if (cached) {
      logger.debug(`Cache hit for page: ${cleanPageId}`)
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
  const pageNode = await getPageTree(
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
  cache.set(`page:${cleanPageId}`, pageNode)

  return pageNode
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
