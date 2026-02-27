import type { NotionBlock } from './core-types'
import type { IconInfo, FileInfo } from './file-types'

// Properties specific to page blocks
export interface PageProperties {
  title: string
  icon?: IconInfo
  cover?: FileInfo
  [key: string]: any  // Allow additional page properties from Notion API
}

// Page node represents a Notion page as a block
export interface PageNode extends NotionBlock {
  type: 'page'
  properties: PageProperties
  children?: NotionBlock[]
}
