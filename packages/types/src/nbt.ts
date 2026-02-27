/**
 * NBT (Notion Block Tree) Types
 *
 * NBT is the intermediate representation between raw Notion API responses
 * and the NAST format. It preserves more Notion-specific details.
 */

import type { RichText, IconInfo, FileInfo, NotionColor } from './common.js';

// ============================================================================
// Core Block Types
// ============================================================================

/**
 * Base NBT block interface
 */
export interface NBTBlock {
  id: string;
  type: string;
  properties: Record<string, unknown>;
  children?: NBTBlock[];
  metadata?: NBTNodeMetadata;
  processed_at?: string;
}

/**
 * Block metadata from Notion API
 */
export interface NBTNodeMetadata {
  created_time?: string;
  last_edited_time?: string;
  created_by?: string;
  last_edited_by?: string;
  archived?: boolean;
  in_trash?: boolean;
}

// ============================================================================
// Page Types
// ============================================================================

/**
 * Properties specific to page blocks
 */
export interface NBTPageProperties {
  title: string;
  icon?: IconInfo;
  cover?: FileInfo;
  notionProperties?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * NBT Page Node (block with type: "page")
 */
export interface NBTPageNode extends NBTBlock {
  type: 'page';
  properties: NBTPageProperties;
  children?: NBTBlock[];
  processed_at?: string;
}

/**
 * NBT Document (alias for page node)
 */
export type NBTDocument = NBTPageNode;

// ============================================================================
// Text Block Node Types
// ============================================================================

/**
 * Paragraph block
 */
export interface NBTParagraphNode extends NBTBlock {
  type: 'paragraph';
  properties: {
    rich_text: RichText[];
    color?: NotionColor;
  };
  children?: NBTBlock[];
}

/**
 * Heading block (h1, h2, h3)
 */
export interface NBTHeadingNode extends NBTBlock {
  type: 'heading_1' | 'heading_2' | 'heading_3';
  properties: {
    rich_text: RichText[];
    is_toggleable?: boolean;
    color?: NotionColor;
  };
  children?: NBTBlock[];
}

/**
 * Quote block
 */
export interface NBTQuoteNode extends NBTBlock {
  type: 'quote';
  properties: {
    rich_text: RichText[];
    color?: NotionColor;
  };
  children?: NBTBlock[];
}

/**
 * Callout block
 */
export interface NBTCalloutNode extends NBTBlock {
  type: 'callout';
  properties: {
    rich_text: RichText[];
    icon?: IconInfo;
    color?: NotionColor;
  };
  children?: NBTBlock[];
}

// ============================================================================
// List Block Node Types
// ============================================================================

/**
 * Bulleted list item block
 */
export interface NBTBulletedListItemNode extends NBTBlock {
  type: 'bulleted_list_item';
  properties: {
    rich_text: RichText[];
    color?: NotionColor;
  };
  children?: NBTBlock[];
}

/**
 * Numbered list item block
 */
export interface NBTNumberedListItemNode extends NBTBlock {
  type: 'numbered_list_item';
  properties: {
    rich_text: RichText[];
    color?: NotionColor;
  };
  children?: NBTBlock[];
}

/**
 * To-do list item block
 */
export interface NBTToDoNode extends NBTBlock {
  type: 'to_do';
  properties: {
    rich_text: RichText[];
    checked: boolean;
    color?: NotionColor;
  };
  children?: NBTBlock[];
}

/**
 * Union type for list item nodes
 */
export type NBTListItemNode = NBTBulletedListItemNode | NBTNumberedListItemNode | NBTToDoNode;

/**
 * Toggle block
 */
export interface NBTToggleNode extends NBTBlock {
  type: 'toggle';
  properties: {
    rich_text: RichText[];
    color?: NotionColor;
  };
  children?: NBTBlock[];
}

// ============================================================================
// Code and Equation Node Types
// ============================================================================

/**
 * Code block
 */
export interface NBTCodeNode extends NBTBlock {
  type: 'code';
  properties: {
    rich_text: RichText[];
    language: string;
    caption?: RichText[];
    color?: NotionColor;
  };
}

/**
 * Equation (math) block
 */
export interface NBTEquationNode extends NBTBlock {
  type: 'equation';
  properties: {
    expression: string;
  };
}

// ============================================================================
// Media Block Node Types
// ============================================================================

/**
 * Image block
 */
export interface NBTImageNode extends NBTBlock {
  type: 'image';
  properties: {
    file: FileInfo;
    caption?: RichText[];
  };
}

/**
 * Video block
 */
export interface NBTVideoNode extends NBTBlock {
  type: 'video';
  properties: {
    file: FileInfo;
    caption?: RichText[];
  };
}

/**
 * Audio block
 */
export interface NBTAudioNode extends NBTBlock {
  type: 'audio';
  properties: {
    file: FileInfo;
    caption?: RichText[];
  };
}

/**
 * File attachment block
 */
export interface NBTFileNode extends NBTBlock {
  type: 'file';
  properties: {
    file: FileInfo;
    caption?: RichText[];
  };
}

/**
 * PDF embed block
 */
export interface NBTPDFNode extends NBTBlock {
  type: 'pdf';
  properties: {
    file: FileInfo;
    caption?: RichText[];
  };
}

// ============================================================================
// Link and Embed Node Types
// ============================================================================

/**
 * Bookmark block
 */
export interface NBTBookmarkNode extends NBTBlock {
  type: 'bookmark';
  properties: {
    url: string;
    caption?: RichText[];
  };
}

/**
 * Embed block
 */
export interface NBTEmbedNode extends NBTBlock {
  type: 'embed';
  properties: {
    url: string;
    caption?: RichText[];
  };
}

/**
 * Link preview block
 */
export interface NBTLinkPreviewNode extends NBTBlock {
  type: 'link_preview';
  properties: {
    url: string;
  };
}

// ============================================================================
// Table Node Types
// ============================================================================

/**
 * Table block
 */
export interface NBTTableNode extends NBTBlock {
  type: 'table';
  properties: {
    table_width: number;
    has_column_header: boolean;
    has_row_header: boolean;
  };
  children?: NBTTableRowNode[];
}

/**
 * Table row block
 */
export interface NBTTableRowNode extends NBTBlock {
  type: 'table_row';
  properties: {
    cells: RichText[][];
  };
}

// ============================================================================
// Layout Node Types
// ============================================================================

/**
 * Column list container block
 */
export interface NBTColumnListNode extends NBTBlock {
  type: 'column_list';
  properties: Record<string, never>;
  children?: NBTColumnNode[];
}

/**
 * Column block within a column list
 */
export interface NBTColumnNode extends NBTBlock {
  type: 'column';
  properties: {
    width_ratio?: number;
  };
  children?: NBTBlock[];
}

// ============================================================================
// Database and Page Reference Node Types
// ============================================================================

/**
 * Child database reference block
 */
export interface NBTChildDatabaseNode extends NBTBlock {
  type: 'child_database';
  properties: {
    title: string;
  };
}

/**
 * Child page reference block
 */
export interface NBTChildPageNode extends NBTBlock {
  type: 'child_page';
  properties: {
    title: string;
    icon?: IconInfo;
  };
}

// ============================================================================
// Special Node Types
// ============================================================================

/**
 * Synced block (reference to another block)
 */
export interface NBTSyncedBlockNode extends NBTBlock {
  type: 'synced_block';
  properties: {
    synced_from?: {
      type: 'block_id';
      block_id: string;
    } | null;
  };
  children?: NBTBlock[];
}

/**
 * Breadcrumb block
 */
export interface NBTBreadcrumbNode extends NBTBlock {
  type: 'breadcrumb';
  properties: Record<string, never>;
}

/**
 * Divider block
 */
export interface NBTDividerNode extends NBTBlock {
  type: 'divider';
  properties: Record<string, never>;
}

/**
 * Table of contents block
 */
export interface NBTTableOfContentsNode extends NBTBlock {
  type: 'table_of_contents';
  properties: {
    color?: NotionColor;
  };
}

// ============================================================================
// Block Node Union Type
// ============================================================================

/**
 * Union of all NBT block node types
 */
export type NBTBlockNode =
  | NBTPageNode
  | NBTParagraphNode
  | NBTHeadingNode
  | NBTQuoteNode
  | NBTCalloutNode
  | NBTBulletedListItemNode
  | NBTNumberedListItemNode
  | NBTToDoNode
  | NBTToggleNode
  | NBTCodeNode
  | NBTEquationNode
  | NBTImageNode
  | NBTVideoNode
  | NBTAudioNode
  | NBTFileNode
  | NBTPDFNode
  | NBTBookmarkNode
  | NBTEmbedNode
  | NBTLinkPreviewNode
  | NBTTableNode
  | NBTTableRowNode
  | NBTColumnListNode
  | NBTColumnNode
  | NBTChildDatabaseNode
  | NBTChildPageNode
  | NBTSyncedBlockNode
  | NBTBreadcrumbNode
  | NBTDividerNode
  | NBTTableOfContentsNode;

// ============================================================================
// Processing Types
// ============================================================================

/**
 * Result of processing Notion blocks
 */
export interface NBTProcessResult {
  nodes: NBTBlock[];
  metadata: NBTProcessMetadata;
}

/**
 * Metadata about the processing operation
 */
export interface NBTProcessMetadata {
  processed_blocks: number;
  total_blocks: number;
  errors: NBTProcessError[];
  warnings: string[];
  processing_time_ms?: number;
}

/**
 * Error during processing
 */
export interface NBTProcessError {
  block_id?: string;
  block_type?: string;
  message: string;
  error?: unknown;
}

/**
 * Options for processing operations
 */
export interface NBTProcessOptions {
  /** Maximum depth for recursive children processing (default: unlimited) */
  maxDepth?: number;
  /** Whether to include metadata (default: false) */
  includeMetadata?: boolean;
  /** Progress callback */
  onProgress?: (current: number, total: number) => void;
  /** Error callback */
  onError?: (error: NBTProcessError) => void;
}

/**
 * Options for fetching a page
 */
export interface NBTGetPageOptions extends NBTProcessOptions {
  /** Whether to fetch missing blocks recursively (default: true) */
  fetchMissingBlocks?: boolean;
  /** Whether to fetch collections/databases (default: false) */
  fetchCollections?: boolean;
  /** Force refresh and bypass cache (default: false) */
  forceRefresh?: boolean;
  /** Whether to sign file URLs (default: false) */
  signFileUrls?: boolean;
  /** Whether to fetch relation pages (default: false) */
  fetchRelationPages?: boolean;
}

// ============================================================================
// Legacy Aliases (for backward compatibility)
// ============================================================================

/**
 * @deprecated Use NBTBlock instead
 */
export type NotionBlock = NBTBlock;

/**
 * @deprecated Use NBTNodeMetadata instead
 */
export type NodeMetadata = NBTNodeMetadata;

/**
 * @deprecated Use RichText from common.ts instead
 */
export interface NBTRichText {
  type: 'text' | 'mention' | 'equation';
  content: string;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
    color?: string;
  };
  href?: string;
  mention?: unknown;
  equation?: unknown;
}
export type { RichText, IconInfo };
