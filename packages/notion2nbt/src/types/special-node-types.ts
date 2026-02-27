import type { NotionBlock } from './core-types'
import type { NotionColor } from './rich-text-types'

export interface SyncedBlockNode extends NotionBlock {
  type: 'synced_block'
  properties: {
    synced_from?: {
      type: 'block_id'
      block_id: string
    } | null
  }
  children?: NotionBlock[]
}

export interface BreadcrumbNode extends NotionBlock {
  type: 'breadcrumb'
  properties: Record<string, never>
}

export interface DividerNode extends NotionBlock {
  type: 'divider'
  properties: Record<string, never>
}

export interface TableOfContentsNode extends NotionBlock {
  type: 'table_of_contents'
  properties: {
    color?: NotionColor
  }
}
