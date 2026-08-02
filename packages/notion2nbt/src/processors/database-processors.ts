/**
 * Database and Page Block Processors
 * 
 * NOT YET FULLY IMPLEMENTED
 */

import type { NBTChildDatabaseNode as ChildDatabaseNode} from '@nast/types'

import {
  extractMetadata,
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
