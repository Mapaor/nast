import type { NotionBlock } from './core-types'
import type { RichTextNode } from './rich-text-types'

export interface BookmarkNode extends NotionBlock {
  type: 'bookmark'
  properties: {
    url: string
    caption?: RichTextNode[]
  }
}

export interface EmbedNode extends NotionBlock {
  type: 'embed'
  properties: {
    url: string
    caption?: RichTextNode[]
  }
}

export interface LinkPreviewNode extends NotionBlock {
  type: 'link_preview'
  properties: {
    url: string
  }
}
