/**
 * NBT to NAST Type Definitions
 *
 * Re-exports canonical types from @nast/types for backward compatibility.
 * This allows existing code importing from './types.js' to continue working.
 */

// Re-export all NAST types
export type {
  NASTRoot,
  NASTNode,
  NASTParagraph,
  NASTHeading,
  NASTText,
  NASTStrong,
  NASTEmphasis,
  NASTUnderline,
  NASTDelete,
  NASTInlineCode,
  NASTLink,
  NASTMention,
  NASTMath,
  NASTInlineMath,
  NASTCode,
  NASTBlockquote,
  NASTCallout,
  NASTToggle,
  NASTList,
  NASTListItem,
  NASTColumnList,
  NASTColumn,
  NASTImage,
  NASTThematicBreak,
  NASTTable,
  NASTTableRow,
  NASTTableCell,
  NASTChildPage,
  NASTVideo,
  NASTFile,
  NASTPDF,
  NASTBookmark,
  NASTEmbed,
} from '@nast/types';

// Re-export NBT types
export type {
  NBTBlock,
  NBTNodeMetadata,
  NBTPageProperties,
  NBTPageNode,
  NBTDocument,
  NBTRichText,
} from '@nast/types';

// Re-export common types
export type { RichText } from '@nast/types';
