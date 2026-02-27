import type { NASTNode } from '../types';
import type { ProcessingContext } from './handlers/utils';
import { handleText, handleStrong, handleEmphasis, handleUnderline, handleDelete, handleInlineCode } from './handlers/text';
import { handleMath, handleInlineMath } from './handlers/math';
import { handleParagraph, handleBlockquote, handleThematicBreak, handleCallout, handleCode } from './handlers/blocks';
import { handleList } from './handlers/lists';
import { handleHeading } from './handlers/headings';
import { handleToggle } from './handlers/toggle';
import { handleTable } from './handlers/table';
import { handleImage, handleVideo, handleFile, handlePDF, handleBookmark, handleEmbed } from './handlers/media';
import { handleLink, handleMention, handleChildPage, handleColumnList } from './handlers/misc';

export function processNode(node: NASTNode, context: ProcessingContext): string {
  switch (node.type) {
    // Text formatting
    case 'text':
      return handleText(node);
    case 'strong':
      return handleStrong(node, context);
    case 'emphasis':
      return handleEmphasis(node, context);
    case 'underline':
      return handleUnderline(node, context);
    case 'delete':
      return handleDelete(node, context);
    case 'inlineCode':
      return handleInlineCode(node);
    
    // Math
    case 'math':
      return handleMath(node);
    case 'inlineMath':
      return handleInlineMath(node);
    
    // Block elements
    case 'paragraph':
      return handleParagraph(node, context);
    case 'heading':
      return handleHeading(node, context);
    case 'blockquote':
      return handleBlockquote(node, context);
    case 'thematicBreak':
      return handleThematicBreak(node);
    case 'callout':
      return handleCallout(node, context);
    case 'code':
      return handleCode(node);
    case 'toggle':
      return handleToggle(node, context);
    
    // Lists
    case 'list':
      return handleList(node, context);
    
    // Columns
    case 'columnList':
      return handleColumnList(node, context);
    
    // Tables
    case 'table':
      return handleTable(node, context);
    
    // Media
    case 'image':
      return handleImage(node, context);
    case 'video':
      return handleVideo(node, context);
    case 'file':
      return handleFile(node, context);
    case 'pdf':
      return handlePDF(node, context);
    case 'bookmark':
      return handleBookmark(node, context);
    case 'embed':
      return handleEmbed(node, context);
    
    // Miscellaneous
    case 'link':
      return handleLink(node, context);
    case 'mention':
      return handleMention(node);
    case 'childPage':
      return handleChildPage(node);
    
    // Unhandled types
    default:
      console.warn(`Unhandled node type: ${(node as any).type}`);
      return '';
  }
}
