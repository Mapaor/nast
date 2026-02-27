/**
 * Text node types re-exported from @nast/types for backward compatibility
 */
export type {
  NBTParagraphNode as ParagraphNode,
  NBTHeadingNode as HeadingNode,
  NBTQuoteNode as QuoteNode,
  NBTCalloutNode as CalloutNode,
} from '@nast/types';

// Re-export NotionBlock for backward compatibility
export type { NBTBlock as NotionBlock } from '@nast/types';
