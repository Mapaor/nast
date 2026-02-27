
import type {
  CalloutNode,
  NotionColor,
} from '../types/nbt-types'

import {
  extractMetadata,
  processRichText,
  processIconInfo,
} from '../utils/nbt-utils'

type Block = any
type RichText = any

export function processCalloutToNBT(block: Block, includeMetadata: boolean = false): CalloutNode {
  const blockData = block[block.type] as {
    rich_text?: RichText[]
    icon?: any
    color?: string
  }
  
  return {
    id: block.id,
    type: 'callout',
    properties: {
      rich_text: processRichText(blockData?.rich_text || []),
      icon: processIconInfo(blockData?.icon),
      color: blockData?.color as NotionColor | undefined,
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}