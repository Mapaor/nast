import type { Client } from '@notionhq/client'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { NotionBlock } from '../../types/nbt-types'

import { processBlocks } from '../../process-blocks-nbt'
import { Logger } from '../utils/logger'
import { Cache } from '../utils/cache'

/**
 * Get a single block by ID
 */
export async function getBlock(
  blockId: string,
  client: Client,
  cache: Cache,
  logger: Logger
): Promise<NotionBlock | null> {
  // Check cache first
  const cached = cache.get<NotionBlock>(`block:${blockId}`)
  if (cached) {
    logger.debug(`Cache hit for block: ${blockId}`)
    return cached
  }

  try {
    const block = await client.blocks.retrieve({ block_id: blockId })

    // Process single block
    const fetchChildren = async (id: string) => {
      const res = await client.blocks.children.list({ block_id: id })
      return res.results as BlockObjectResponse[]
    }

    const result = await processBlocks([block as any], fetchChildren)
    const notionBlock = result.nodes[0] || null

    // Cache the result
    if (notionBlock) {
      cache.set(`block:${blockId}`, notionBlock)
    }

    return notionBlock
  } catch (error) {
    logger.error(`Error fetching block ${blockId}: ${error}`)
    return null
  }
}

/**
 * Get multiple blocks by IDs (batch fetch)
 */
export async function getBlocks(
  blockIds: string[],
  client: Client,
  cache: Cache,
  logger: Logger
): Promise<Record<string, NotionBlock>> {
  logger.info(`Batch fetching ${blockIds.length} blocks`)

  const results: Record<string, NotionBlock> = {}

  // Fetch in parallel but with concurrency limit
  const BATCH_SIZE = 5
  for (let i = 0; i < blockIds.length; i += BATCH_SIZE) {
    const batch = blockIds.slice(i, i + BATCH_SIZE)

    const batchResults = await Promise.all(
      batch.map(async (id) => {
        const node = await getBlock(id, client, cache, logger)
        return { id, node }
      })
    )

    // Add to results
    for (const { id, node } of batchResults) {
      if (node) {
        results[id] = node
      }
    }
  }

  logger.info(`Fetched ${Object.keys(results).length}/${blockIds.length} blocks`)

  return results
}

/**
 * Get database entries (placeholder - to be implemented)
 */
export async function getDatabase(
  databaseId: string,
  client: Client,
  logger: Logger
): Promise<any[]> {
  // NOT YET IMPLEMENTED!!!!
  logger.warn('getDatabase() is a placeholder - implement with proper Notion API')
  return []

  // TODO: Implement with proper API call:
  // const response = await client.databases.query({ database_id: databaseId })
  // return response.results
}

/**
 * Search for pages
 */
export async function search(
  query: string,
  client: Client,
  logger: Logger,
  options?: {
    filter?: { property: string; value: string }
    sort?: { direction: 'ascending' | 'descending'; timestamp: 'last_edited_time' }
  }
): Promise<any[]> {
  logger.debug(`Searching for: ${query}`)

  const response = await client.search({
    query,
    filter: options?.filter as any,
    sort: options?.sort,
  })

  logger.debug(`Found ${response.results.length} results`)

  return response.results
}

/**
 * Get raw children blocks from Notion API (for comparison purposes)
 * 
 * @param blockId - The ID of the block to get children for
 * @param client - The Notion client
 * @param logger - Logger instance
 * @returns Array of raw BlockObjectResponse from Notion API
 */
export async function APIgetChildrenBlocks(
  blockId: string,
  client: Client,
  logger: Logger
): Promise<BlockObjectResponse[]> {
  logger.debug(`Fetching raw children blocks for: ${blockId}`)

  const response = await client.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  })

  logger.debug(`Retrieved ${response.results.length} raw blocks`)

  return response.results as BlockObjectResponse[]
}
