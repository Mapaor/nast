import type {
  ImageNode,
  VideoNode,
  AudioNode,
  FileNode,
  PDFNode,
} from '../types/nbt-types'

import {
  extractMetadata,
  processRichText,
  processFileInfo,
} from '../utils/nbt-utils'

type Block = any

/**
 * Process image block
 */
export function processImageToNBT(block: Block, includeMetadata: boolean = false): ImageNode {
  const blockData = block[block.type] as any
  
  return {
    id: block.id,
    type: 'image',
    properties: {
      file: processFileInfo(blockData),
      caption: processRichText(blockData?.caption || []),
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}

/**
 * Process video block
 */
export function processVideoToNBT(block: Block, includeMetadata: boolean = false): VideoNode {
  const blockData = block[block.type] as any
  
  return {
    id: block.id,
    type: 'video',
    properties: {
      file: processFileInfo(blockData),
      caption: processRichText(blockData?.caption || []),
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}

/**
 * Process audio block
 */
export function processAudioToNBT(block: Block, includeMetadata: boolean = false): AudioNode {
  const blockData = block[block.type] as any
  
  return {
    id: block.id,
    type: 'audio',
    properties: {
      file: processFileInfo(blockData),
      caption: processRichText(blockData?.caption || []),
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}

/**
 * Process file block
 */
export function processFileToNBT(block: Block, includeMetadata: boolean = false): FileNode {
  const blockData = block[block.type] as any
  
  return {
    id: block.id,
    type: 'file',
    properties: {
      file: processFileInfo(blockData),
      caption: processRichText(blockData?.caption || []),
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}

/**
 * Process PDF block
 */
export function processPDFToNBT(block: Block, includeMetadata: boolean = false): PDFNode {
  const blockData = block[block.type] as any
  
  return {
    id: block.id,
    type: 'pdf',
    properties: {
      file: processFileInfo(blockData),
      caption: processRichText(blockData?.caption || []),
    },
    metadata: extractMetadata(block, includeMetadata),
  }
}
