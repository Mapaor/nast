/**
 * Database and Page Block Processors
 * 
 * NOT YET FULLY IMPLEMENTED
 */

import type {
  ChildDatabaseNode,
  ChildPageNode,
} from '../types/nbt-types'

import {
  extractMetadata,
  processIconInfo,
} from '../utils/nbt-utils'

type Block = any

/**
 * Process child database block
 */
export function processChildDatabaseToNBT(block: Block, includeMetadata: boolean = false): ChildDatabaseNode {
  const blockData = block[block.type] as { title?: string }
  
  return {
    id: block.id,
    type: 'child_database',
    properties: {
      title: blockData?.title || 'Untitled Database',
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}

/**
 * Process child page block
 */
export function processChildPageToNBT(block: Block, includeMetadata: boolean = false): ChildPageNode {
  const blockData = block[block.type] as { title?: string }
  
  return {
    id: block.id,
    type: 'child_page',
    properties: {
      title: blockData?.title || 'Untitled',
      icon: processIconInfo(block.icon),
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}
