/**
 * Special node types re-exported from @nast/types for backward compatibility
 */
export type {
  NBTSyncedBlockNode as SyncedBlockNode,
  NBTBreadcrumbNode as BreadcrumbNode,
  NBTDividerNode as DividerNode,
  NBTTableOfContentsNode as TableOfContentsNode,
} from '@nast/types';

// Re-export NotionBlock for backward compatibility
export type { NBTBlock as NotionBlock } from '@nast/types';
