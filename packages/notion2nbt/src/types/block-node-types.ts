import type { PageNode } from './page-node-types'

import type {
  ParagraphNode,
  HeadingNode,
  QuoteNode,
  CalloutNode,
} from './text-node-types'

import type {
  BulletedListItemNode,
  NumberedListItemNode,
  ToDoNode,
  ToggleNode,
} from './list-node-types'

import type {
  CodeNode,
  EquationNode,
} from './code-node-types'

import type {
  ImageNode,
  VideoNode,
  AudioNode,
  FileNode,
  PDFNode,
} from './media-node-types'

import type {
  BookmarkNode,
  EmbedNode,
  LinkPreviewNode,
} from './link-node-types'

import type {
  TableNode,
  TableRowNode,
} from './table-node-types'

import type {
  ColumnListNode,
  ColumnNode,
} from './layout-node-types'

import type {
  ChildDatabaseNode,
  ChildPageNode,
} from './database-node-types'

import type {
  SyncedBlockNode,
  BreadcrumbNode,
  DividerNode,
  TableOfContentsNode,
} from './special-node-types'

export type BlockNode =
  | PageNode
  | ParagraphNode
  | HeadingNode
  | QuoteNode
  | CalloutNode
  | BulletedListItemNode
  | NumberedListItemNode
  | ToDoNode
  | ToggleNode
  | CodeNode
  | EquationNode
  | ImageNode
  | VideoNode
  | AudioNode
  | FileNode
  | PDFNode
  | BookmarkNode
  | EmbedNode
  | LinkPreviewNode
  | TableNode
  | TableRowNode
  | ColumnListNode
  | ColumnNode
  | ChildDatabaseNode
  | ChildPageNode
  | SyncedBlockNode
  | BreadcrumbNode
  | DividerNode
  | TableOfContentsNode
