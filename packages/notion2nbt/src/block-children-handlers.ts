/**
 * Block Children Handlers
 * 
 * Special handlers for blocks that need to process their own children
 * with specific logic (like color inheritance, special child types, etc.)
 */

import type {
  NotionBlock,
  TableRowNode,
  ColumnNode,
} from './types/nbt-types'

import {
  processTableToNBT,
  processTableRowToNBT,
  processColumnListToNBT,
  processColumnToNBT,
  processSyncedBlockToNBT,
  processToggleToNBT,
  processQuoteToNBT,
} from './processors'

import { applyColorInheritanceToChildren } from './utils/color-inheritance'

// Type imports
type Block = any

/**
 * Process table block with its table_row children
 */
export async function processTableWithChildren(
  block: Block,
  fetchChildrenFn: (blockId: string) => Promise<Block[]>,
  depth: number,
  includeMetadata: boolean = false
): Promise<NotionBlock> {
  const tableNode = processTableToNBT(block, includeMetadata)

  try {
    const children = await fetchChildrenFn(block.id)
    if (children && children.length > 0) {
      const rows: NotionBlock[] = []

      for (const childBlock of children) {
        if (childBlock.type === 'table_row') {
          const rowNode = processTableRowToNBT(childBlock, includeMetadata)
          rows.push(rowNode)
        }
      }

      if (rows.length > 0) {
        tableNode.children = rows as TableRowNode[]
      }
    }
  } catch (error) {
    console.error(`Error fetching table rows for ${block.id}:`, error)
  }

  return tableNode
}

/**
 * Process column_list block with its column children
 */
export async function processColumnListWithChildren(
  block: Block,
  fetchChildrenFn: (blockId: string) => Promise<Block[]>,
  depth: number,
  includeMetadata: boolean = false
): Promise<NotionBlock> {
  const columnListNode = processColumnListToNBT(block, includeMetadata)

  try {
    const children = await fetchChildrenFn(block.id)
    if (children && children.length > 0) {
      const columns: NotionBlock[] = []

      for (const childBlock of children) {
        if (childBlock.type === 'column') {
          const columnNode = processColumnToNBT(childBlock, includeMetadata)

          // Process blocks inside the column
          if (childBlock.has_children) {
            try {
              const columnBlocks = await fetchChildrenFn(childBlock.id)
              if (columnBlocks && columnBlocks.length > 0) {
                const columnChildren: NotionBlock[] = []

                for (const colBlock of columnBlocks) {
                  // Recursive call with depth + 2 (column_list -> column -> content)
                  // Import processBlocks dynamically to avoid circular dependency issues
                  const { processBlocks } = await import('./process-blocks-nbt')
                  const result = await processBlocks(
                    [colBlock],
                    fetchChildrenFn,
                    { maxDepth: Infinity, includeMetadata }
                  )
                  columnChildren.push(...result.nodes)
                }

                if (columnChildren.length > 0) {
                  columnNode.children = columnChildren
                }
              }
            } catch (error) {
              console.error(`Error fetching column content for ${childBlock.id}:`, error)
            }
          }

          columns.push(columnNode)
        }
      }

      if (columns.length > 0) {
        columnListNode.children = columns as ColumnNode[]
      }
    }
  } catch (error) {
    console.error(`Error fetching columns for ${block.id}:`, error)
  }

  return columnListNode
}

/**
 * Process synced_block with its children or reference
 */
export async function processSyncedBlockWithChildren(
  block: Block,
  fetchChildrenFn: (blockId: string) => Promise<Block[]>,
  depth: number,
  includeMetadata: boolean = false
): Promise<NotionBlock> {
  const syncedBlockNode = processSyncedBlockToNBT(block, includeMetadata)

  // If this is the original synced block (synced_from is null), fetch children
  const syncedFrom = block.synced_block?.synced_from
  if (!syncedFrom || syncedFrom === null) {
    try {
      const children = await fetchChildrenFn(block.id)
      if (children && children.length > 0) {
        // Import processBlocks dynamically to avoid circular dependency issues
        const { processBlocks } = await import('./process-blocks-nbt')
        const result = await processBlocks(children, fetchChildrenFn, { maxDepth: Infinity, includeMetadata })
        if (result.nodes.length > 0) {
          syncedBlockNode.children = result.nodes
        }
      }
    } catch (error) {
      console.error(`Error fetching synced block children for ${block.id}:`, error)
    }
  }
  // If synced_from has a block_id, the content is referenced from another block
  // The consumer can resolve this by looking up the referenced block

  return syncedBlockNode
}

/**
 * Process quote block with its children and apply color inheritance
 * 
 * When a quote block has a color set, all its children will inherit this color,
 * EXCEPT for the children that already have an explicit non-default color.
 */
export async function processQuoteWithChildren(
  block: Block,
  fetchChildrenFn: (blockId: string) => Promise<Block[]>,
  depth: number,
  includeMetadata: boolean = false
): Promise<NotionBlock> {
  const quoteNode = processQuoteToNBT(block, includeMetadata)
  const quoteColor = quoteNode.properties.color

  try {
    const children = await fetchChildrenFn(block.id)
    if (children && children.length > 0) {
      // Import processBlocks dynamically to avoid circular dependency issues
      const { processBlocks } = await import('./process-blocks-nbt')
      const result = await processBlocks(children, fetchChildrenFn, { maxDepth: Infinity, includeMetadata })
      
      // Apply color inheritance from quote to children
      if (result.nodes.length > 0) {
        quoteNode.children = applyColorInheritanceToChildren(result.nodes, quoteColor)
      }
    }
  } catch (error) {
    console.error(`Error fetching quote children for ${block.id}:`, error)
  }

  return quoteNode
}

/**
 * Process toggle block with its children and apply color inheritance
 */
export async function processToggleWithChildren(
  block: Block,
  fetchChildrenFn: (blockId: string) => Promise<Block[]>,
  depth: number,
  includeMetadata: boolean = false
): Promise<NotionBlock> {
  const toggleNode = processToggleToNBT(block, includeMetadata)
  const toggleColor = toggleNode.properties.color

  try {
    const children = await fetchChildrenFn(block.id)
    if (children && children.length > 0) {
      // Import processBlocks dynamically to avoid circular dependency issues
      const { processBlocks } = await import('./process-blocks-nbt')
      const result = await processBlocks(children, fetchChildrenFn, { maxDepth: Infinity, includeMetadata })
      
      // Apply color inheritance
      if (result.nodes.length > 0) {
        toggleNode.children = applyColorInheritanceToChildren(result.nodes, toggleColor)
      }
    }
  } catch (error) {
    console.error(`Error fetching toggle children for ${block.id}:`, error)
  }

  return toggleNode
}
