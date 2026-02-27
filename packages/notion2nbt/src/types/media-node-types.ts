/**
 * Media node types re-exported from @nast/types for backward compatibility
 */
export type {
  NBTImageNode as ImageNode,
  NBTVideoNode as VideoNode,
  NBTAudioNode as AudioNode,
  NBTFileNode as FileNode,
  NBTPDFNode as PDFNode,
} from '@nast/types';

// Re-export NotionBlock for backward compatibility
export type { NBTBlock as NotionBlock } from '@nast/types';
