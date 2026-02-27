import type { NotionBlock } from './core-types'
import type { IconInfo } from './file-types'

export interface ChildDatabaseNode extends NotionBlock {
  type: 'child_database'
  properties: {
    title: string
  }
}

export interface ChildPageNode extends NotionBlock {
  type: 'child_page'
  properties: {
    title: string
    icon?: IconInfo
  }
}
