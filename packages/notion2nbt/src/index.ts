// We re-export types for backward compatibility
// Users can do both `import { NotionBlock } from '@nast/notion2nbt'`
// or `import { NBTBlock } from '@nast/types'`.
// The latter is the recommended approach, as eventually we'll remove this re-export block.
export type {
  // Core types
  NBTBlock as NotionBlock,
  NBTNodeMetadata as NodeMetadata,
  NBTPageNode as PageNode,
  NBTPageProperties as PageProperties,
  
  // Rich text types
  RichText as RichTextNode,
  TextAnnotations,
  NotionColor,
  EquationData,
  MentionData,
  PageMention,
  LinkMention,
  DateMention,
  UserMention,
  DatabaseMention,
  
  // File and media types
  FileInfo,
  IconInfo,
  
  // Text block node types
  NBTParagraphNode as ParagraphNode,
  NBTHeadingNode as HeadingNode,
  NBTQuoteNode as QuoteNode,
  NBTCalloutNode as CalloutNode,
  
  // List block node types
  NBTBulletedListItemNode as BulletedListItemNode,
  NBTNumberedListItemNode as NumberedListItemNode,
  NBTToDoNode as ToDoNode,
  NBTListItemNode as ListItemNode,
  NBTToggleNode as ToggleNode,
  
  // Code and equation node types
  NBTCodeNode as CodeNode,
  NBTEquationNode as EquationNode,
  
  // Media block node types
  NBTImageNode as ImageNode,
  NBTVideoNode as VideoNode,
  NBTAudioNode as AudioNode,
  NBTFileNode as FileNode,
  NBTPDFNode as PDFNode,
  
  // Link and embed node types
  NBTBookmarkNode as BookmarkNode,
  NBTEmbedNode as EmbedNode,
  NBTLinkPreviewNode as LinkPreviewNode,
  
  // Table node types
  NBTTableNode as TableNode,
  NBTTableRowNode as TableRowNode,
  
  // Layout node types
  NBTColumnListNode as ColumnListNode,
  NBTColumnNode as ColumnNode,
  
  // Database and page node types
  NBTChildDatabaseNode as ChildDatabaseNode,
  NBTChildPageNode as ChildPageNode,
  
  // Special node types
  NBTSyncedBlockNode as SyncedBlockNode,
  NBTBreadcrumbNode as BreadcrumbNode,
  NBTDividerNode as DividerNode,
  NBTTableOfContentsNode as TableOfContentsNode,
  
  // Block node union type
  NBTBlockNode as BlockNode,
  
  // Processing and configuration types
  NBTProcessResult as ProcessResult,
  NBTProcessMetadata as ProcessMetadata,
  NBTProcessError as ProcessError,
  NBTProcessOptions as ProcessOptions,
  NBTGetPageOptions as GetPageOptions,
} from '@nast/types'

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
  processPageToNBT,
} from './processors'

export {
  processBlocks,
} from './process-blocks-nbt'


export {
  buildPageNode,
  getPageTree,
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
