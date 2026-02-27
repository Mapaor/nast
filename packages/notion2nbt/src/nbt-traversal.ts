/**
 * NBT Utility Functions
 */

import type { NotionBlock } from './types/nbt-types'

/**
 * Traverse NBT depth-first, calling callback on each node
 * 
 * @example
 * ```typescript
 * traverseNBT(nodes, (node, depth) => {
 *   console.log(`${'  '.repeat(depth)}${node.type}`)
 * })
 * ```
 */
export function traverseNBT(
  nodes: NotionBlock[],
  callback: (node: NotionBlock, depth: number, parent?: NotionBlock) => void,
  depth: number = 0,
  parent?: NotionBlock
): void {
  for (const node of nodes) {
    callback(node, depth, parent)
    
    if (node.children && node.children.length > 0) {
      traverseNBT(node.children, callback, depth + 1, node)
    }
  }
}

/**
 * Find a node by ID in the NBT tree
 * 
 * @example
 * ```typescript
 * const node = findNodeById(nodes, 'block-123')
 * if (node) {
 *   console.log('Found:', node.type)
 * }
 * ```
 */
export function findNodeById(
  nodes: NotionBlock[],
  id: string
): NotionBlock | undefined {
  for (const node of nodes) {
    if (node.id === id) {
      return node
    }
    
    if (node.children && node.children.length > 0) {
      const found = findNodeById(node.children, id)
      if (found) {
        return found
      }
    }
  }
  
  return undefined
}

/**
 * Filter nodes by type (recursive search)
 * 
 * @example
 * ```typescript
 * const headings = filterNodesByType(nodes, 'heading_1')
 * const allHeadings = filterNodesByType(nodes, (type) => type.startsWith('heading_'))
 * ```
 */
export function filterNodesByType(
  nodes: NotionBlock[],
  filter: string | ((type: string) => boolean)
): NotionBlock[] {
  const results: NotionBlock[] = []
  const predicate = typeof filter === 'string' 
    ? (type: string) => type === filter
    : filter
  
  traverseNBT(nodes, (node) => {
    if (predicate(node.type)) {
      results.push(node)
    }
  })
  
  return results
}

/**
 * Get all nodes at a specific depth level
 * 
 * @example
 * ```typescript
 * const topLevel = getNodesAtDepth(nodes, 0)
 * const secondLevel = getNodesAtDepth(nodes, 1)
 * ```
 */
export function getNodesAtDepth(
  nodes: NotionBlock[],
  targetDepth: number
): NotionBlock[] {
  const results: NotionBlock[] = []
  
  traverseNBT(nodes, (node, depth) => {
    if (depth === targetDepth) {
      results.push(node)
    }
  })
  
  return results
}

/**
 * Get parent node for a given node ID
 * 
 * @example
 * ```typescript
 * const parent = findParentNode(nodes, 'child-block-id')
 * ```
 */
export function findParentNode(
  nodes: NotionBlock[],
  childId: string
): NotionBlock | undefined {
  let parentNode: NotionBlock | undefined

  traverseNBT(nodes, (node, _depth, parent) => {
    if (node.id === childId && parent) {
      parentNode = parent
    }
  })

  return parentNode
}

/**
 * Get all descendants of a node (flat array)
 * 
 * @example
 * ```typescript
 * const allDescendants = getNodeDescendants(node)
 * ```
 */
export function getNodeDescendants(node: NotionBlock): NotionBlock[] {
  const descendants: NotionBlock[] = []
  
  if (node.children && node.children.length > 0) {
    traverseNBT(node.children, (child) => {
      descendants.push(child)
    })
  }
  
  return descendants
}

/**
 * Count total nodes in tree
 * 
 * @example
 * ```typescript
 * const totalBlocks = countNodes(nodes)
 * ```
 */
export function countNodes(nodes: NotionBlock[]): number {
  let count = 0
  traverseNBT(nodes, () => count++)
  return count
}

/**
 * Get maximum depth of the tree
 * 
 * @example
 * ```typescript
 * const maxDepth = getTreeDepth(nodes)
 * ```
 */
export function getTreeDepth(nodes: NotionBlock[]): number {
  let maxDepth = 0
  
  traverseNBT(nodes, (_node, depth) => {
    if (depth > maxDepth) {
      maxDepth = depth
    }
  })
  
  return maxDepth
}

/**
 * Map over all nodes, transforming them
 * 
 * @example
 * ```typescript
 * const transformed = mapNodes(nodes, (node) => ({
 *   ...node,
 *   customProperty: 'value',
 * }))
 * ```
 */
export function mapNodes(
  nodes: NotionBlock[],
  mapper: (node: NotionBlock, depth: number) => NotionBlock
): NotionBlock[] {
  return nodes.map((node) => mapNodeRecursive(node, mapper, 0))
}

function mapNodeRecursive(
  node: NotionBlock,
  mapper: (node: NotionBlock, depth: number) => NotionBlock,
  depth: number
): NotionBlock {
  const mappedNode = mapper(node, depth)
  
  if (mappedNode.children && mappedNode.children.length > 0) {
    return {
      ...mappedNode,
      children: mappedNode.children.map((child) =>
        mapNodeRecursive(child, mapper, depth + 1)
      ),
    }
  }
  
  return mappedNode
}

/**
 * Extract text content from a node (including children)
 * 
 * @example
 * ```typescript
 * const text = extractTextContent(node)
 * ```
 */
export function extractTextContent(node: NotionBlock): string {
  let text = ''
  
  // Extract from rich_text if available
  const props = node.properties as any
  if (props?.rich_text && Array.isArray(props.rich_text)) {
    text = props.rich_text.map((rt: any) => rt.content || '').join('')
  }
  
  // Recursively get text from children
  if (node.children && node.children.length > 0) {
    const childText = node.children.map(extractTextContent).join(' ')
    text = text ? `${text} ${childText}` : childText
  }
  
  return text
}

/**
 * Build a tree of nodes by type distribution
 * 
 * @example
 * ```typescript
 * const stats = getNodeTypeStats(nodes)
 * // { paragraph: 10, heading_1: 3, image: 5, ... }
 * ```
 */
export function getNodeTypeStats(nodes: NotionBlock[]): Record<string, number> {
  const stats: Record<string, number> = {}
  
  traverseNBT(nodes, (node) => {
    stats[node.type] = (stats[node.type] || 0) + 1
  })
  
  return stats
}

/**
 * Check if a node has a specific type
 */
export function isNodeOfType<T extends NotionBlock>(
  node: NotionBlock,
  type: string
): node is T {
  return node.type === type
}

/**
 * Get all siblings of a node
 */
export function getNodeSiblings(
  nodes: NotionBlock[],
  nodeId: string
): NotionBlock[] {
  let siblings: NotionBlock[] = []
  
  traverseNBT(nodes, (node, _depth, parent) => {
    if (node.id === nodeId) {
      if (parent && parent.children) {
        siblings = parent.children.filter((sibling) => sibling.id !== nodeId)
      } else {
        // Top-level node - siblings are other top-level nodes
        siblings = nodes.filter((n) => n.id !== nodeId)
      }
    }
  })
  
  return siblings
}
