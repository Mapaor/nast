import type { NotionBlock } from './core-types'
import type { RichTextNode, NotionColor } from './rich-text-types'
import type { IconInfo } from './file-types'

export interface ParagraphNode extends NotionBlock {
  type: 'paragraph'
  properties: {
    rich_text: RichTextNode[]
    color?: NotionColor
  }
  children?: NotionBlock[]
}

export interface HeadingNode extends NotionBlock {
  type: 'heading_1' | 'heading_2' | 'heading_3'
  properties: {
    rich_text: RichTextNode[]
    is_toggleable?: boolean
    color?: NotionColor
  }
  children?: NotionBlock[]
}

export interface QuoteNode extends NotionBlock {
  type: 'quote'
  properties: {
    rich_text: RichTextNode[]
    color?: NotionColor
  }
  children?: NotionBlock[]
}

export interface CalloutNode extends NotionBlock {
  type: 'callout'
  properties: {
    rich_text: RichTextNode[]
    icon?: IconInfo
    color?: NotionColor
  }
  children?: NotionBlock[]
}
