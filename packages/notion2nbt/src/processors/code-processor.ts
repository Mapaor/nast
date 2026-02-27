import type {
  CodeNode,
  NotionColor,
} from '../types/nbt-types'

import {
  extractMetadata,
  processRichText,
} from '../utils/nbt-utils'

type Block = any
type RichText = any


export function processCodeToNBT(block: Block, includeMetadata: boolean = false): CodeNode {
  const blockData = block[block.type] as {
    rich_text?: RichText[]
    language?: string
    caption?: RichText[]
    color?: string
  }
  
  return {
    id: block.id,
    type: 'code',
    properties: {
      rich_text: processRichText(blockData?.rich_text || []),
      language: blockData?.language || 'plain text',
      caption: processRichText(blockData?.caption || []),
      color: blockData?.color as NotionColor | undefined,
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}