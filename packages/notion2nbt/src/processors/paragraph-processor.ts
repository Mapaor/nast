import type {
  ParagraphNode,
  NotionColor,
} from '../types/nbt-types'

import {
  extractMetadata,
  processRichText,
} from '../utils/nbt-utils'

type Block = any
type RichText = any

export function processParagraphToNBT(block: Block, includeMetadata: boolean = false): ParagraphNode {
  const blockData = block[block.type] as { rich_text?: RichText[]; color?: string }
  
  return {
    id: block.id,
    type: 'paragraph',
    properties: {
      rich_text: processRichText(blockData?.rich_text || []),
      color: blockData?.color as NotionColor | undefined,
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}

