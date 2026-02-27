/**
 * NAST to mdast Type Definitions
 *
 * Re-exports canonical types from @nast/types with aliases for backward compatibility.
 */

import type {
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
  NASTEmbed
} from '@nast/types';

/**
 * NAST Node type
 * @deprecated Use NASTNode from @nast/types instead
 */
export type NastNode = NASTNode;

/**
 * NAST Root type
 * @deprecated Use NASTRoot from @nast/types instead
 */
export type NastRoot = NASTRoot;

// Re-export all types from @nast/types
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
  NASTEmbed
};
