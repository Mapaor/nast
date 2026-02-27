/**
 * Notion2NBT API Client
 */

import { Client } from '@notionhq/client'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import type {
  ProcessResult,
  GetPageOptions,
  ProcessOptions,
  NotionBlock,
} from '../types/nbt-types'

import type { PageNode } from '../types/page-node-types'

import { cachePageInfo } from '../utils/nbt-utils'

// Import utility classes
import { Logger, type LogLevel } from './utils/logger'
import { Cache } from './utils/cache'

// Import operation functions
import * as PageOperations from './operations/page'
import * as BlockOperations from './operations/block'

export interface Notion2NBTOptions {
  auth: string
  notionVersion?: string
  baseUrl?: string
  logLevel?: LogLevel
  enableCache?: boolean // Enable in-memory caching of pages/blocks
}

/**
 * Main API client for notion2nbt
 */
export class Notion2NBT {
  private client: Client
  private logger: Logger
  private cache: Cache

  constructor(options: Notion2NBTOptions) {
    this.client = new Client({
      auth: options.auth,
      notionVersion: options.notionVersion,
      baseUrl: options.baseUrl,
    })
    this.logger = new Logger(options.logLevel || 'warn')
    this.cache = new Cache(options.enableCache ?? false)
  }

  /**
   * Get a complete Notion page as a NotionBlock (PageNode)
   * 
   * @returns PageNode with type: 'page' and children array
   */
  public async getPageV2(
    pageId: string,
    options: GetPageOptions = {}
  ): Promise<PageNode> {
    return PageOperations.getPageV2(pageId, this.client, this.cache, this.logger, options)
  }

  /**
   * Get blocks from a page as a flat NBT array
   * @deprecated
   * Use this if you need a flat structure
   */
  public async getPageBlocks(
    pageId: string,
    options: ProcessOptions = {}
  ): Promise<ProcessResult> {
    return PageOperations.getPageBlocks(pageId, this.client, this.logger, options)
  }

  /**
   * Get all blocks from a page with pagination
   */
  public async getAllBlocks(pageId: string): Promise<BlockObjectResponse[]> {
    return PageOperations.getAllBlocks(pageId, this.client, this.logger)
  }

  /**
   * Prefetch page information (for page mentions)
   */
  public async prefetchPageInfo(pageId: string): Promise<void> {
    return PageOperations.prefetchPageInfo(pageId, this.client, this.logger, cachePageInfo)
  }

  // BLOCK OPERATIONS

  /**
   * Get a single block by ID
   */
  public async getBlock(blockId: string): Promise<NotionBlock | null> {
    return BlockOperations.getBlock(blockId, this.client, this.cache, this.logger)
  }

  /**
   * Get multiple blocks by IDs
   */
  public async getBlocks(blockIds: string[]): Promise<Record<string, NotionBlock>> {
    return BlockOperations.getBlocks(blockIds, this.client, this.cache, this.logger)
  }

  /**
   * Get database entries
   */
  public async getDatabase(databaseId: string): Promise<any[]> {
    return BlockOperations.getDatabase(databaseId, this.client, this.logger)
  }

  /**
   * Search for pages
   */
  public async search(
    query: string,
    options?: {
      filter?: { property: string; value: string }
      sort?: { direction: 'ascending' | 'descending'; timestamp: 'last_edited_time' }
    }
  ): Promise<any[]> {
    return BlockOperations.search(query, this.client, this.logger, options)
  }

  /**
   * Get raw children blocks from Notion API (for comparison purposes)
   * 
   * @param blockId - The ID of the block/page to get children for
   * @returns Array of raw BlockObjectResponse from Notion API
   */
  public async APIgetChildrenBlocks(blockId: string): Promise<BlockObjectResponse[]> {
    return BlockOperations.APIgetChildrenBlocks(blockId, this.client, this.logger)
  }

  // CACHE (disabled by default)

  /**
   * Clear the cache
   */
  public clearCache(): void {
    this.cache.clear()
    this.logger.debug('Cache cleared')
  }

  /**
   * Get cache size
   */
  public getCacheSize(): number {
    return this.cache.size()
  }

  /**
   * Check if caching is enabled
   */
  public isCacheEnabled(): boolean {
    return this.cache.isEnabled()
  }
}

// Export types
export type { LogLevel }
