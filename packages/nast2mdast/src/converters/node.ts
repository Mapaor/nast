/**
 * Main node conversion router
 */

import type { Content as MdastContent } from 'mdast';
import type { NastNode } from '../types/nast';
import { convertPhrasingContent } from './phrasing';
import {
  convertHeading,
  convertParagraph,
  convertBlockquote,
  convertList,
  convertListItem,
  convertCode,
  convertTable,
  convertTableRow,
  convertTableCell
} from './block';
import {
  convertCallout,
  convertToggle,
  convertChildPage
} from './notion';
import {
  convertImage,
  convertBookmark,
  convertFile,
  convertVideo,
  convertPdf,
  convertEmbed
} from './media';

/**
 * Convert a single NAST node to MDAST node(s)
 */
export function convertNode(node: NastNode): MdastContent | MdastContent[] | null {
  switch (node.type) {
    // Direct mappings
    case 'heading':
      return convertHeading(node);
    case 'paragraph':
      return convertParagraph(node);
    case 'blockquote':
      return convertBlockquote(node);
    case 'list':
      return convertList(node);
    case 'listItem':
      return convertListItem(node);
    case 'thematicBreak':
      return { type: 'thematicBreak' };
    case 'code':
      return convertCode(node);
    case 'math':
      return { type: 'math' as any, value: node.value || '', data: node.data };
    case 'table':
      return convertTable(node);
    case 'tableRow':
      return convertTableRow(node);
    case 'tableCell':
      return convertTableCell(node);

    // Text/phrasing content
    case 'text':
      return null; // Handled by parent
    case 'strong':
    case 'emphasis':
    case 'delete':
    case 'link':
    case 'inlineCode':
    case 'inlineMath':
    case 'underline':
      return null; // Handled by phrasing content conversion

    // Notion-specific blocks that need conversion
    case 'callout':
      return convertCallout(node);
    case 'toggle':
      return convertToggle(node);
    case 'childPage':
      return convertChildPage(node);
    case 'image':
      return convertImage(node);
    case 'bookmark':
      return convertBookmark(node);
    case 'file':
      return convertFile(node);
    case 'video':
      return convertVideo(node);
    case 'pdf':
      return convertPdf(node);
    case 'embed':
      return convertEmbed(node);
    case 'mention':
      return null; // Handled in phrasing content

    default:
      // Unknown type - convert to paragraph with original data
      return {
        type: 'paragraph',
        children: node.children ? convertPhrasingContent(node.children) : [{ type: 'text', value: node.value || '' }],
        data: {
          originalType: node.type,
          ...node.data
        }
      };
  }
}
