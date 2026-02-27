/**
 * Central re-export of all NBT type definitions
 * 
 * All types are now centralized in @nast/types package.
 * This file re-exports them for backward compatibility.
 */

// Re-export all NBT types from the centralized @nast/types package
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
} from '@nast/types';
