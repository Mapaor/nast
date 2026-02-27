/**
 * NAST (Notion Abstract Syntax Tree) Types
 *
 * NAST is a unified-like AST format for representing Notion content.
 * It's designed to be easily converted to various output formats (Markdown, Typst, etc.)
 */

// ============================================================================
// Root & Document Types
// ============================================================================

/**
 * Root node of a NAST document
 */
export interface NASTRoot {
  type: 'root';
  children: NASTNode[];
  data: {
    pageId: string;
    title: string;
    icon?: {
      type: 'emoji' | 'file' | 'external';
      value: string;
    };
    processedAt: string;
  };
}

// ============================================================================
// Node Union Type
// ============================================================================

/**
 * Union of all NAST node types
 */
export type NASTNode =
  | NASTParagraph
  | NASTHeading
  | NASTText
  | NASTStrong
  | NASTEmphasis
  | NASTUnderline
  | NASTDelete
  | NASTInlineCode
  | NASTLink
  | NASTMention
  | NASTMath
  | NASTInlineMath
  | NASTCode
  | NASTBlockquote
  | NASTCallout
  | NASTToggle
  | NASTList
  | NASTListItem
  | NASTColumnList
  | NASTColumn
  | NASTImage
  | NASTThematicBreak
  | NASTTable
  | NASTTableRow
  | NASTTableCell
  | NASTChildPage
  | NASTVideo
  | NASTFile
  | NASTPDF
  | NASTBookmark
  | NASTEmbed;

// ============================================================================
// Block-level Types
// ============================================================================

/**
 * Paragraph block
 */
export interface NASTParagraph {
  type: 'paragraph';
  children: NASTNode[];
  data?: {
    blockId?: string;
  };
}

/**
 * Heading block (h1, h2, h3)
 */
export interface NASTHeading {
  type: 'heading';
  depth: 1 | 2 | 3;
  children: NASTNode[];
  /** Indicates if this heading is also a toggle (collapsible) */
  isToggleable?: boolean;
  data?: {
    blockId?: string;
  };
}

/**
 * Code block with syntax highlighting
 */
export interface NASTCode {
  type: 'code';
  lang: string;
  value: string;
  data?: {
    caption?: NASTNode[];
    blockId?: string;
  };
}

/**
 * Block math equation
 */
export interface NASTMath {
  type: 'math';
  value: string;
  data?: {
    blockId?: string;
  };
}

/**
 * Blockquote
 */
export interface NASTBlockquote {
  type: 'blockquote';
  children: NASTNode[];
  data?: {
    blockId?: string;
  };
}

/**
 * Callout block (with icon and color)
 */
export interface NASTCallout {
  type: 'callout';
  data: {
    icon: {
      type: 'emoji';
      value: string;
    } | null;
    color: string;
    blockId?: string;
  };
  children: NASTNode[];
}

/**
 * Toggle block (collapsible content)
 */
export interface NASTToggle {
  type: 'toggle';
  children: NASTNode[];
  data?: {
    blockId?: string;
  };
}

/**
 * Thematic break / divider
 */
export interface NASTThematicBreak {
  type: 'thematicBreak';
  data?: {
    blockId?: string;
  };
}

// ============================================================================
// List Types
// ============================================================================

/**
 * List (ordered or unordered)
 */
export interface NASTList {
  type: 'list';
  ordered: boolean;
  children: NASTListItem[];
}

/**
 * List item (can be a checklist item if checked is defined)
 */
export interface NASTListItem {
  type: 'listItem';
  /** undefined = not a checklist, true/false = checked state */
  checked?: boolean;
  children: NASTNode[];
  data?: {
    blockId?: string;
  };
}

// ============================================================================
// Layout Types
// ============================================================================

/**
 * Column list (container for columns)
 */
export interface NASTColumnList {
  type: 'columnList';
  children: NASTColumn[];
  data?: {
    blockId?: string;
  };
}

/**
 * Column within a column list
 */
export interface NASTColumn {
  type: 'column';
  /** Width ratio (0.5 = 50%, matches NBT format) */
  widthRatio: number;
  children: NASTNode[];
  data?: {
    blockId?: string;
  };
}

// ============================================================================
// Table Types
// ============================================================================

/**
 * Table
 */
export interface NASTTable {
  type: 'table';
  hasColumnHeader: boolean;
  hasRowHeader: boolean;
  children: NASTTableRow[];
  data?: {
    blockId?: string;
  };
}

/**
 * Table row
 */
export interface NASTTableRow {
  type: 'tableRow';
  children: NASTTableCell[];
}

/**
 * Table cell
 */
export interface NASTTableCell {
  type: 'tableCell';
  children: NASTNode[];
}

// ============================================================================
// Inline Types
// ============================================================================

/**
 * Plain text
 */
export interface NASTText {
  type: 'text';
  value: string;
  data?: {
    color?: string;
    backgroundColor?: string;
  };
}

/**
 * Bold text
 */
export interface NASTStrong {
  type: 'strong';
  children: NASTNode[];
}

/**
 * Italic text
 */
export interface NASTEmphasis {
  type: 'emphasis';
  children: NASTNode[];
}

/**
 * Underlined text
 */
export interface NASTUnderline {
  type: 'underline';
  children: NASTNode[];
}

/**
 * Strikethrough text
 */
export interface NASTDelete {
  type: 'delete';
  children: NASTNode[];
}

/**
 * Inline code
 */
export interface NASTInlineCode {
  type: 'inlineCode';
  value: string;
}

/**
 * Inline math equation
 */
export interface NASTInlineMath {
  type: 'inlineMath';
  value: string;
}

/**
 * Link
 */
export interface NASTLink {
  type: 'link';
  url: string;
  children: NASTNode[];
  data?: {
    title?: string;
    iconUrl?: string;
    description?: string;
    provider?: string;
    thumbnailUrl?: string;
  };
}

/**
 * Mention (@user, date, page, database)
 */
export interface NASTMention {
  type: 'mention';
  mentionType: 'user' | 'date' | 'page' | 'database';
  value: string;
  data: unknown;
}

// ============================================================================
// Media Types
// ============================================================================

/**
 * Image
 */
export interface NASTImage {
  type: 'image';
  url: string;
  title: string | null | undefined;
  alt: string | null | undefined;
  data: {
    fileType: 'file' | 'external';
    expiryTime?: string;
    caption?: NASTNode[];
    blockId?: string;
  };
}

/**
 * Video
 */
export interface NASTVideo {
  type: 'video';
  url: string;
  data: {
    fileType: 'file' | 'external';
    expiryTime?: string;
    caption?: NASTNode[];
    blockId?: string;
  };
}

/**
 * File attachment
 */
export interface NASTFile {
  type: 'file';
  url: string;
  name: string;
  data: {
    fileType: 'file' | 'external';
    expiryTime?: string;
    caption?: NASTNode[];
    blockId?: string;
  };
}

/**
 * PDF embed
 */
export interface NASTPDF {
  type: 'pdf';
  url: string;
  data: {
    fileType: 'file' | 'external';
    expiryTime?: string;
    caption?: NASTNode[];
    blockId?: string;
  };
}

// ============================================================================
// Embed & Link Types
// ============================================================================

/**
 * Bookmark (link with preview)
 */
export interface NASTBookmark {
  type: 'bookmark';
  url: string;
  data?: {
    caption?: NASTNode[];
    blockId?: string;
  };
}

/**
 * Generic embed
 */
export interface NASTEmbed {
  type: 'embed';
  url: string;
  data?: {
    caption?: NASTNode[];
    blockId?: string;
  };
}

/**
 * Child page reference
 */
export interface NASTChildPage {
  type: 'childPage';
  title: string;
  pageId: string;
  data?: {
    blockId?: string;
  };
}
