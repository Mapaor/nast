import type { NotionBlock } from './core-types'
import type { RichTextNode } from './rich-text-types'
import type { FileInfo } from './file-types'

export interface ImageNode extends NotionBlock {
  type: 'image'
  properties: {
    file: FileInfo
    caption?: RichTextNode[]
  }
}

export interface VideoNode extends NotionBlock {
  type: 'video'
  properties: {
    file: FileInfo
    caption?: RichTextNode[]
  }
}

export interface AudioNode extends NotionBlock {
  type: 'audio'
  properties: {
    file: FileInfo
    caption?: RichTextNode[]
  }
}

export interface FileNode extends NotionBlock {
  type: 'file'
  properties: {
    file: FileInfo
    caption?: RichTextNode[]
  }
}

export interface PDFNode extends NotionBlock {
  type: 'pdf'
  properties: {
    file: FileInfo
    caption?: RichTextNode[]
  }
}
