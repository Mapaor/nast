
import type {
  HeadingNode,
  NotionColor,
} from '../types/nbt-types'

import {
  extractMetadata,
  processRichText,
} from '../utils/nbt-utils'

type Block = any
type RichText = any

/**
 * Process heading blocks (h1, h2, h3)
 */
export function processHeadingToNBT(block: Block, includeMetadata: boolean = false): HeadingNode {
  const blockData = block[block.type] as {
    rich_text?: RichText[]
    is_toggleable?: boolean
    color?: string
  }
  
  return {
    id: block.id,
    type: block.type as 'heading_1' | 'heading_2' | 'heading_3',
    properties: {
      rich_text: processRichText(blockData?.rich_text || []),
      is_toggleable: blockData?.is_toggleable,
      color: blockData?.color as NotionColor | undefined,
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}