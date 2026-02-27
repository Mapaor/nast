
import type {
  QuoteNode,
  NotionColor,
} from '../types/nbt-types'

import {
  extractMetadata,
  processRichText,
} from '../utils/nbt-utils'

type Block = any
type RichText = any

export function processQuoteToNBT(block: Block, includeMetadata: boolean = false): QuoteNode {
  const blockData = block[block.type] as { rich_text?: RichText[]; color?: string }
  
  return {
    id: block.id,
    type: 'quote',
    properties: {
      rich_text: processRichText(blockData?.rich_text || []),
      color: blockData?.color as NotionColor | undefined,
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}
