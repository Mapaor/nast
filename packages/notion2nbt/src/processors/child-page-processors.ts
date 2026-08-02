import type { NBTChildPageNode as ChildPageNode } from "@nast/types"

import {
  extractMetadata,
  processIconInfo,
} from '../utils/nbt-utils'

type Block = any


/**
 * Process child page block
 */
export function processChildPageToNBT(block: Block, includeMetadata: boolean = false): ChildPageNode {
  const blockData = block[block.type] as { title?: string }
  
  return {
    id: block.id,
    type: 'child_page',
    properties: {
      title: blockData?.title || 'Untitled',
      icon: processIconInfo(block.icon),
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}
