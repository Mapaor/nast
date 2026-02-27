// Types
export type {
  // Core types
  NotionBlock,  // New unified block type
  NodeMetadata,
  BlockNode,
  
  // Page types
  PageNode,
  PageProperties,
  
  // Rich text
  RichTextNode,
  TextAnnotations,
  NotionColor,
  EquationData,
  MentionData,
  PageMention,
  LinkMention,
  DateMention,
  UserMention,
  DatabaseMention,
  
  // File and media
  FileInfo,
  IconInfo,
  
  // Text blocks
  ParagraphNode,
  HeadingNode,
  QuoteNode,
  CalloutNode,
  
  // Lists
  BulletedListItemNode,
  NumberedListItemNode,
  ToDoNode,
  ListItemNode,
  
  // Toggle
  ToggleNode,
  
  // Code and equations
  CodeNode,
  EquationNode,
  
  // Media blocks
  ImageNode,
  VideoNode,
  AudioNode,
  FileNode,
  PDFNode,
  
  // Embeds
  BookmarkNode,
  EmbedNode,
  LinkPreviewNode,
  
  // Tables
  TableNode,
  TableRowNode,
  
  // Columns
  ColumnListNode,
  ColumnNode,
  
  // Database and pages
  ChildDatabaseNode,
  ChildPageNode,
  
  // Synced blocks
  SyncedBlockNode,
  
  // Utility blocks
  BreadcrumbNode,
  DividerNode,
  TableOfContentsNode,
  
  // Processing types
  ProcessResult,
  ProcessMetadata,
  ProcessError,
  ProcessOptions,
  GetPageOptions,
} from './types/nbt-types'

// Utilities
export {
  extractMetadata,
  processRichText,
  processAnnotations,
  processMention,
  processFileInfo,
  processIconInfo,
  cachePageInfo,
  getCachedPageInfo,
  clearPageInfoCache,
} from './utils/nbt-utils'
export {
  traverseNBT,
  findNodeById,
  filterNodesByType,
  getNodesAtDepth,
  findParentNode,
  getNodeDescendants,
  countNodes,
  getTreeDepth,
  mapNodes,
  extractTextContent,
  getNodeTypeStats,
  isNodeOfType,
  getNodeSiblings,
} from './nbt-traversal'

// Block processors
export {
  processParagraphToNBT,
  processHeadingToNBT,
  processQuoteToNBT,
  processCalloutToNBT,
  processBulletedListItemToNBT,
  processNumberedListItemToNBT,
  processToDoToNBT,
  processCodeToNBT,
  processEquationToNBT,
  processImageToNBT,
  processVideoToNBT,
  processAudioToNBT,
  processFileToNBT,
  processPDFToNBT,
  processBookmarkToNBT,
  processEmbedToNBT,
  processLinkPreviewToNBT,
  processTableToNBT,
  processTableRowToNBT,
  processColumnListToNBT,
  processColumnToNBT,
  processChildDatabaseToNBT,
  processChildPageToNBT,
  processSyncedBlockToNBT,
  processBreadcrumbToNBT,
} from './processors'

export {
  processPageToNBT,
} from './processors/page-processors'

export {
  processBlocks,
} from './process-blocks-nbt'


export {
  buildBlockTree,
  getPageAsBlock,
} from './page-tree'

export {
  Notion2NBT,
  type Notion2NBTOptions,
  type LogLevel,
} from './client'

// Re-export Notion API types (for convenience)
export type {
  BlockObjectResponse,
  PageObjectResponse,
  DatabaseObjectResponse,
  PartialBlockObjectResponse,
  PartialPageObjectResponse,
  PartialDatabaseObjectResponse,
  GetPageResponse,
  GetBlockResponse,
  GetDatabaseResponse,
  SearchResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints'
