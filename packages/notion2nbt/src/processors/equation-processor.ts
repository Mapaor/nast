import type {
  EquationNode,
} from '../types/nbt-types'

import {
  extractMetadata,
} from '../utils/nbt-utils'

type Block = any


export function processEquationToNBT(block: Block, includeMetadata: boolean = false): EquationNode {
  const blockData = block[block.type] as { expression?: string }
  
  return {
    id: block.id,
    type: 'equation',
    properties: {
      expression: blockData?.expression || '',
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}
