/**
 * Shared utility types used across NAST packages
 */

// ============================================================================
// File & Media Types
// ============================================================================

/**
 * Information about a file (uploaded to Notion or external)
 */
export interface FileInfo {
  type: 'file' | 'external';
  url: string;
  expiry_time?: string;
}

/**
 * Icon information (emoji, file, or external URL)
 */
export interface IconInfo {
  type: 'emoji' | 'external' | 'file';
  emoji?: string;
  url?: string;
}

/**
 * Downloaded image data
 */
export interface DownloadedImage {
  url: string;
  contentType: string;
  data: ArrayBuffer;
}

/**
 * Result of fetching images from blocks
 */
export interface FetchImagesResult {
  images: DownloadedImage[];
  imageCount: number;
  imageFileCount: number;
  imageExternalCount: number;
  expiredCount: number;
}

// ============================================================================
// Rich Text Types
// ============================================================================

/**
 * Text annotations (formatting)
 */
export interface TextAnnotations {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  color?: NotionColor;
}

/**
 * Notion color values
 */
export type NotionColor =
  | 'default'
  | 'gray'
  | 'brown'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red'
  | 'gray_background'
  | 'brown_background'
  | 'orange_background'
  | 'yellow_background'
  | 'green_background'
  | 'blue_background'
  | 'purple_background'
  | 'pink_background'
  | 'red_background';

/**
 * Rich text node (used in NBT)
 */
export interface RichText {
  type: 'text' | 'equation' | 'mention';
  content: string;
  annotations?: TextAnnotations;
  href?: string;
  mention?: MentionData;
  equation?: EquationData;
}

/**
 * Equation data in rich text
 */
export interface EquationData {
  expression: string;
}

/**
 * Union type for all mention types
 */
export type MentionData =
  | PageMention
  | LinkMention
  | DateMention
  | UserMention
  | DatabaseMention;

/**
 * Page mention
 */
export interface PageMention {
  type: 'page';
  page: {
    id: string;
    title?: string;
    icon?: string;
  };
}

/**
 * Link mention (link preview)
 */
export interface LinkMention {
  type: 'link_mention';
  link_mention: {
    href: string;
    title: string;
    icon_url?: string;
    description?: string;
    link_author?: string;
    link_provider?: string;
    thumbnail_url?: string;
  };
}

/**
 * Date mention
 */
export interface DateMention {
  type: 'date';
  date: {
    start: string;
    end?: string;
    time_zone?: string | null;
  };
}

/**
 * User mention
 */
export interface UserMention {
  type: 'user';
  user: {
    id: string;
    name?: string;
    avatar_url?: string;
  };
}

/**
 * Database mention
 */
export interface DatabaseMention {
  type: 'database';
  database: {
    id: string;
    title?: string;
  };
}
