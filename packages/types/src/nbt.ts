/**
 * NBT (Notion Block Tree) Types
 *
 * NBT is the intermediate representation between raw Notion API responses
 * and the NAST format. It preserves more Notion-specific details.
 */

import type { RichText, IconInfo } from './common.js';

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
  icon?: {
    type: 'emoji' | 'file' | 'external';
    emoji?: string;
    url?: string;
  };
  cover?: {
    type: 'file' | 'external';
    url: string;
    expiry_time?: string;
  };
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
// Rich Text Types (NBT-specific format)
// ============================================================================

/**
 * NBT Rich Text node
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

// Re-export RichText as the canonical type
export type { RichText, IconInfo };
