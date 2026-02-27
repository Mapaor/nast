import type { NotionBlock } from './core-types'
import type { RichTextNode, NotionColor } from './rich-text-types'

export interface CodeNode extends NotionBlock {
  type: 'code'
  properties: {
    rich_text: RichTextNode[]
    language: string
    caption?: RichTextNode[]
    color?: NotionColor
  }
}

export interface EquationNode extends NotionBlock {
  type: 'equation'
  properties: {
    expression: string
  }
}
