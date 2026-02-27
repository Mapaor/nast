import type {
  TableNode,
  TableRowNode,
} from '../types/nbt-types'

import {
  extractMetadata,
  processRichText,
} from '../utils/nbt-utils'

type Block = any
type RichText = any

/**
 * Process table block
 */
export function processTableToNBT(block: Block, includeMetadata: boolean = false): TableNode {
  const blockData = block[block.type] as {
    table_width?: number
    has_column_header?: boolean
    has_row_header?: boolean
  }
  
  return {
    id: block.id,
    type: 'table',
    properties: {
      table_width: blockData?.table_width || 0,
      has_column_header: blockData?.has_column_header || false,
      has_row_header: blockData?.has_row_header || false,
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}

/**
 * Process table row block
 */
export function processTableRowToNBT(block: Block, includeMetadata: boolean = false): TableRowNode {
  const blockData = block[block.type] as { cells?: RichText[][] }
  
  return {
    id: block.id,
    type: 'table_row',
    properties: {
      cells: (blockData?.cells || []).map(cell => processRichText(cell)),
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}
