import type { NotionBlock } from './core-types'
import type { RichTextNode } from './rich-text-types'

export interface TableNode extends NotionBlock {
  type: 'table'
  properties: {
    table_width: number
    has_column_header: boolean
    has_row_header: boolean
  }
  children?: TableRowNode[]
}

export interface TableRowNode extends NotionBlock {
  type: 'table_row'
  properties: {
    cells: RichTextNode[][]
  }
}
