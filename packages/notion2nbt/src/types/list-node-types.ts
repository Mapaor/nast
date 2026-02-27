import type { NotionBlock } from './core-types'
import type { RichTextNode, NotionColor } from './rich-text-types'

export interface BulletedListItemNode extends NotionBlock {
  type: 'bulleted_list_item'
  properties: {
    rich_text: RichTextNode[]
    color?: NotionColor
  }
  children?: NotionBlock[]
}

export interface NumberedListItemNode extends NotionBlock {
  type: 'numbered_list_item'
  properties: {
    rich_text: RichTextNode[]
    color?: NotionColor
  }
  children?: NotionBlock[]
}

export interface ToDoNode extends NotionBlock {
  type: 'to_do'
  properties: {
    rich_text: RichTextNode[]
    checked: boolean
    color?: NotionColor
  }
  children?: NotionBlock[]
}

export type ListItemNode = BulletedListItemNode | NumberedListItemNode | ToDoNode

export interface ToggleNode extends NotionBlock {
  type: 'toggle'
  properties: {
    rich_text: RichTextNode[]
    color?: NotionColor
  }
  children?: NotionBlock[]
}
