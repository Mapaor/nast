/**
 * @nast/types - Shared type definitions for NAST packages
 *
 * This package provides canonical type definitions used across the NAST monorepo.
 *
 * @example
 * ```ts
 * // Import all types
 * import { NASTRoot, NASTNode, NBTBlock } from '@nast/types';
 *
 * // Or import from specific modules
 * import { NASTRoot } from '@nast/types/nast';
 * import { NBTBlock } from '@nast/types/nbt';
 * import { RichText, FileInfo } from '@nast/types/common';
 * ```
 */

// NAST types
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
} from './nast.js';

// NBT types
export type {
  NBTBlock,
  NBTNodeMetadata,
  NBTPageProperties,
  NBTPageNode,
  NBTDocument,
  NBTRichText,
} from './nbt.js';

// Common types
export type {
  // File & Media
  FileInfo,
  IconInfo,
  DownloadedImage,
  FetchImagesResult,
  // Rich Text
  TextAnnotations,
  NotionColor,
  RichText,
  EquationData,
  MentionData,
  PageMention,
  LinkMention,
  DateMention,
  UserMention,
  DatabaseMention,
} from './common.js';
