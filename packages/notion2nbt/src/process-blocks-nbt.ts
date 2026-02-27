import type {
  NotionBlock,
  ProcessResult,
  ProcessOptions,
  ProcessError,
} from './types/nbt-types'

import {
  processParagraphToNBT,
  processHeadingToNBT,
  processCalloutToNBT,
  processBulletedListItemToNBT,
  processNumberedListItemToNBT,
  processToDoToNBT,
  processCodeToNBT,
  processEquationToNBT,
  processImageToNBT,
  processVideoToNBT,
  processAudioToNBT,
  processFileToNBT,
  processPDFToNBT,
  processBookmarkToNBT,
  processEmbedToNBT,
  processLinkPreviewToNBT,
  processChildDatabaseToNBT,
  processChildPageToNBT,
  processBreadcrumbToNBT,
} from './processors'

import {
  processTableWithChildren,
  processColumnListWithChildren,
  processSyncedBlockWithChildren,
  processToggleWithChildren,
  processQuoteWithChildren,
} from './block-children-handlers'

import {
  PROCESSABLE_TYPES,
  SELF_HANDLING_CHILDREN,
  CHILDREN_BLOCKS,
  CHILD_ONLY_TYPES,
} from './constants/block-types'

// Type for Notion blocks (to be properly imported)
type Block = any

/**
 * Main function: Process Notion blocks to NBT
 */
export async function processBlocks(
  blocks: Block[],
  fetchChildrenFn: (blockId: string) => Promise<Block[]>,
  options: ProcessOptions = {}
): Promise<ProcessResult> {
  const {
    maxDepth = Infinity,
    includeMetadata = false,
    onProgress,
    onError,
  } = options

  const startTime = Date.now()
  const nodes: NotionBlock[] = []
  const errors: ProcessError[] = []
  const warnings: string[] = []
  let processedBlocks = 0

  /**
   * Recursive block processor
   */
  async function processBlockRecursive(
    block: Block,
    depth: number = 0,
    isTopLevel: boolean = false
  ): Promise<NotionBlock | null> {
    // Check depth limit
    if (depth >= maxDepth) {
      warnings.push(
        `Maximum depth ${maxDepth} reached for block ${block.id} (type: ${block.type})`
      )
      return null
    }

    // Skip blocks that can only be children when processing at top level
    if (isTopLevel && CHILD_ONLY_TYPES.includes(block.type)) {
      return null
    }

    // Skip non-processable blocks
    if (
      !block ||
      !block.id ||
      !block.type ||
      block.archived ||
      block.in_trash ||
      !PROCESSABLE_TYPES.includes(block.type)
    ) {
      return null
    }

    try {
      let node: NotionBlock | null = null

      // Process block based on type
      switch (block.type) {
        case 'paragraph':
          node = processParagraphToNBT(block, includeMetadata)
          break
        case 'heading_1':
        case 'heading_2':
        case 'heading_3':
          node = processHeadingToNBT(block, includeMetadata)
          break
        case 'quote':
          node = await processQuoteWithChildren(block, fetchChildrenFn, depth, includeMetadata)
          break
        case 'callout':
          node = processCalloutToNBT(block, includeMetadata)
          break
        case 'bulleted_list_item':
          node = processBulletedListItemToNBT(block, includeMetadata)
          break
        case 'numbered_list_item':
          node = processNumberedListItemToNBT(block, includeMetadata)
          break
        case 'to_do':
          node = processToDoToNBT(block, includeMetadata)
          break
        case 'toggle':
          node = await processToggleWithChildren(block, fetchChildrenFn, depth, includeMetadata)
          break
        case 'code':
          node = processCodeToNBT(block, includeMetadata)
          break
        case 'equation':
          node = processEquationToNBT(block, includeMetadata)
          break
        case 'image':
          node = processImageToNBT(block, includeMetadata)
          break
        case 'video':
          node = processVideoToNBT(block, includeMetadata)
          break
        case 'audio':
          node = processAudioToNBT(block, includeMetadata)
          break
        case 'file':
          node = processFileToNBT(block, includeMetadata)
          break
        case 'pdf':
          node = processPDFToNBT(block, includeMetadata)
          break
        case 'bookmark':
          node = processBookmarkToNBT(block, includeMetadata)
          break
        case 'embed':
          node = processEmbedToNBT(block, includeMetadata)
          break
        case 'link_preview':
          node = processLinkPreviewToNBT(block, includeMetadata)
          break
        case 'table':
          node = await processTableWithChildren(block, fetchChildrenFn, depth, includeMetadata)
          break
        case 'column_list':
          node = await processColumnListWithChildren(block, fetchChildrenFn, depth, includeMetadata)
          break
        case 'synced_block':
          node = await processSyncedBlockWithChildren(block, fetchChildrenFn, depth, includeMetadata)
          break
        case 'child_database':
          node = processChildDatabaseToNBT(block, includeMetadata)
          break
        case 'child_page':
          node = processChildPageToNBT(block, includeMetadata)
          break
        case 'breadcrumb':
          node = processBreadcrumbToNBT(block, includeMetadata)
          break
        case 'divider':
          node = {
            id: block.id,
            type: 'divider',
            properties: {},
            metadata: includeMetadata ? {
              created_time: block.created_time,
              last_edited_time: block.last_edited_time,
            } : undefined,
          }
          break
        case 'table_of_contents':
          node = {
            id: block.id,
            type: 'table_of_contents',
            properties: {},
            metadata: includeMetadata ? {
              created_time: block.created_time,
              last_edited_time: block.last_edited_time,
            } : undefined,
          }
          break
      }

      if (!node) return null

      processedBlocks++

      // Process children for blocks that support them
      if (
        block.has_children &&
        CHILDREN_BLOCKS.includes(block.type) &&
        !SELF_HANDLING_CHILDREN.includes(block.type)
      ) {
        try {
          const children = await fetchChildrenFn(block.id)
          if (children && children.length > 0) {
            const childNodes: NotionBlock[] = []

            for (const childBlock of children) {
              const childNode = await processBlockRecursive(childBlock, depth + 1, false)
              if (childNode) {
                childNodes.push(childNode)
              }
            }

            if (childNodes.length > 0) {
              node.children = childNodes
            }
          }
        } catch (error) {
          const err: ProcessError = {
            block_id: block.id,
            block_type: block.type,
            message: 'Error fetching or processing children',
            error,
          }
          errors.push(err)
          if (onError) onError(err)
        }
      }

      return node
    } catch (error) {
      const err: ProcessError = {
        block_id: block.id,
        block_type: block.type,
        message: `Error processing block: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error,
      }
      errors.push(err)
      if (onError) onError(err)
      return null
    }
  }

  // Process all top-level blocks
  const totalBlocks = blocks.length
  for (let i = 0; i < blocks.length; i++) {
    if (onProgress) {
      onProgress(i + 1, totalBlocks)
    }

    const node = await processBlockRecursive(blocks[i], 0, true)
    if (node) {
      nodes.push(node)
    }
  }

  const processingTime = Date.now() - startTime

  return {
    nodes,
    metadata: {
      processed_blocks: processedBlocks,
      total_blocks: totalBlocks,
      errors,
      warnings,
      processing_time_ms: processingTime,
    },
  }
}
