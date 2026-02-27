/**
 * Special Block Processors
 * 
 * Functions that transform special-purpose Notion blocks into NBT nodes
 */

import type {
  SyncedBlockNode,
  BreadcrumbNode,
} from '../types/nbt-types'

import {
  extractMetadata,
} from '../utils/nbt-utils'

// This will be imported from the old types - placeholder for now
type Block = any

/**
 * Process synced block
 */
export function processSyncedBlockToNBT(block: Block, includeMetadata: boolean = false): SyncedBlockNode {
  const blockData = block[block.type] as {
    synced_from?: { type: 'block_id'; block_id: string } | null
  }
  
  return {
    id: block.id,
    type: 'synced_block',
    properties: {
      synced_from: blockData?.synced_from,
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}

/**
 * Process breadcrumb block
 */
export function processBreadcrumbToNBT(block: Block, includeMetadata: boolean = false): BreadcrumbNode {
  return {
    id: block.id,
    type: 'breadcrumb',
    properties: {},
    metadata: extractMetadata(block, includeMetadata),
  }
}
