/**
 * Color Inheritance Utilities
 */

import type { NotionBlock } from '../types/nbt-types'
import { COLOR_SUPPORTED_TYPES } from '../constants/block-types'

/**
 * Apply color inheritance from parent to children
 * Only applies to children with default or no color (preserves explicit colors)
 * 
 * @param childNodes - Array of child NBT nodes
 * @param parentColor - Color from the parent block
 * @returns Array of child nodes with color inheritance applied
 */
export function applyColorInheritanceToChildren(
  childNodes: NotionBlock[],
  parentColor: string | undefined,
): NotionBlock[] {
  if (!parentColor) {
    return childNodes
  }

  return childNodes.map(childNode => {
    // Only apply color to block types that support it
    if ('properties' in childNode && childNode.properties && COLOR_SUPPORTED_TYPES.includes(childNode.type as any)) {
      const childColor = (childNode.properties as any).color
      
      // Only inherit parent color if child has default color or no color
      // Preserve explicit non-default colors
      if (!childColor || childColor === 'default') {
        return {
          ...childNode,
          properties: {
            ...childNode.properties,
            color: parentColor
          }
        }
      }
    }
    return childNode
  })
}
