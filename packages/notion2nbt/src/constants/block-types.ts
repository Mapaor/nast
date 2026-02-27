/**
 * All processable block types supported by the processor
 */
export const PROCESSABLE_TYPES = [
  'paragraph',
  'heading_1',
  'heading_2',
  'heading_3',
  'quote',
  'callout',
  'bulleted_list_item',
  'numbered_list_item',
  'to_do',
  'toggle',
  'code',
  'equation',
  'image',
  'video',
  'audio',
  'file',
  'pdf',
  'bookmark',
  'embed',
  'link_preview',
  'table',
  'table_row',
  'column_list',
  'column',
  'child_database',
  'child_page',
  'synced_block',
  'breadcrumb',
  'divider',
  'table_of_contents',
] as const

/**
 * Block types that handle their own children internally
 */
export const SELF_HANDLING_CHILDREN = [
  'table',       // table_row children
  'column_list',    // column children
  'toggle', 'quote'   // Fetches children and applies color inheritance
] as const

/**
 * Block types that support the color property
 * Used for color inheritance logic
 */
export const COLOR_SUPPORTED_TYPES = [
  'paragraph',
  'heading_1',
  'heading_2',
  'heading_3',
  'quote',
  'callout',
  'bulleted_list_item',
  'numbered_list_item',
  'to_do',
  'toggle',
  'code',
] as const

/**
 * Block types that should have children attached to the node
 */
export const CHILDREN_BLOCKS = [
  'paragraph',
  'heading_1',
  'heading_2',
  'heading_3',
  'quote',
  'bulleted_list_item',
  'numbered_list_item',
  'to_do',
  'toggle',
  'callout',
  'synced_block',
  'column',
] as const

/**
 * Block types that can ONLY exist as children of other blocks (top-level blocks)
 */
export const CHILD_ONLY_TYPES = [
  'table_row',  // Child of 'table'
  'column',     // Child of 'column_list'
] as const
