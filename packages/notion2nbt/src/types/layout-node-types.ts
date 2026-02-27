import type { NotionBlock } from './core-types'

export interface ColumnListNode extends NotionBlock {
  type: 'column_list'
  properties: Record<string, never>
  children?: ColumnNode[]
}

export interface ColumnNode extends NotionBlock {
  type: 'column'
  properties: {
    width_ratio?: number
  }
  children?: NotionBlock[]
}
