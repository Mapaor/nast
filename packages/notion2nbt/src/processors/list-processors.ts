import type {
  BulletedListItemNode,
  NumberedListItemNode,
  ToDoNode,
  NotionColor,
} from '../types/nbt-types'

import {
  extractMetadata,
  processRichText,
} from '../utils/nbt-utils'

type Block = any
type RichText = any

/**
 * Process bulleted list item
 */
export function processBulletedListItemToNBT(block: Block, includeMetadata: boolean = false): BulletedListItemNode {
  const blockData = block[block.type] as { rich_text?: RichText[]; color?: string }
  
  return {
    id: block.id,
    type: 'bulleted_list_item',
    properties: {
      rich_text: processRichText(blockData?.rich_text || []),
      color: blockData?.color as NotionColor | undefined,
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}

/**
 * Process numbered list item
 */
export function processNumberedListItemToNBT(block: Block, includeMetadata: boolean = false): NumberedListItemNode {
  const blockData = block[block.type] as { rich_text?: RichText[]; color?: string }
  
  return {
    id: block.id,
    type: 'numbered_list_item',
    properties: {
      rich_text: processRichText(blockData?.rich_text || []),
      color: blockData?.color as NotionColor | undefined,
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}

/**
 * Process to-do item
 */
export function processToDoToNBT(block: Block, includeMetadata: boolean = false): ToDoNode {
  const blockData = block[block.type] as {
    rich_text?: RichText[]
    checked?: boolean
    color?: string
  }
  
  return {
    id: block.id,
    type: 'to_do',
    properties: {
      rich_text: processRichText(blockData?.rich_text || []),
      checked: blockData?.checked || false,
      color: blockData?.color as NotionColor | undefined,
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}

