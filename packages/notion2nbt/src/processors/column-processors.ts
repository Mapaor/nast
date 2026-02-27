import type {
  ColumnListNode,
  ColumnNode,
} from '../types/nbt-types'

import {
  extractMetadata,
} from '../utils/nbt-utils'

type Block = any

/**
 * Process column list block
 */
export function processColumnListToNBT(block: Block, includeMetadata: boolean = false): ColumnListNode {
  return {
    id: block.id,
    type: 'column_list',
    properties: {},
    metadata: extractMetadata(block, includeMetadata),
  }
}

/**
 * Process column block
 */
export function processColumnToNBT(block: Block, includeMetadata: boolean = false): ColumnNode {
  const blockData = block[block.type] as { width_ratio?: number }
  
  return {
    id: block.id,
    type: 'column',
    properties: {
      width_ratio: blockData?.width_ratio,
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}
