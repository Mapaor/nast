import type {
  BookmarkNode,
  EmbedNode,
  LinkPreviewNode,
} from '../types/nbt-types'

import {
  extractMetadata,
  processRichText,
} from '../utils/nbt-utils'

type Block = any
type RichText = any

/**
 * Process bookmark block
 */
export function processBookmarkToNBT(block: Block, includeMetadata: boolean = false): BookmarkNode {
  const blockData = block[block.type] as { url?: string; caption?: RichText[] }
  
  return {
    id: block.id,
    type: 'bookmark',
    properties: {
      url: blockData?.url || '',
      caption: processRichText(blockData?.caption || []),
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}

/**
 * Process embed block
 */
export function processEmbedToNBT(block: Block, includeMetadata: boolean = false): EmbedNode {
  const blockData = block[block.type] as { url?: string; caption?: RichText[] }
  
  return {
    id: block.id,
    type: 'embed',
    properties: {
      url: blockData?.url || '',
      caption: processRichText(blockData?.caption || []),
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}

/**
 * Process link preview block
 */
export function processLinkPreviewToNBT(block: Block, includeMetadata: boolean = false): LinkPreviewNode {
  const blockData = block[block.type] as { url?: string }
  
  return {
    id: block.id,
    type: 'link_preview',
    properties: {
      url: blockData?.url || '',
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}
