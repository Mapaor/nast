/**
 * Main node conversion router
 */

import type { RootContent } from 'mdast';
import type {
  NASTNode,
  NASTHeading,
  NASTParagraph,
  NASTBlockquote,
  NASTList,
  NASTListItem,
  NASTCode,
  NASTMath,
  NASTTable,
  NASTTableRow,
  NASTTableCell,
  NASTCallout,
  NASTToggle,
  NASTChildPage,
  NASTImage,
  NASTBookmark,
  NASTFile,
  NASTVideo,
  NASTPDF,
  NASTEmbed
} from '../types/nast';
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
export function convertNode(node: NASTNode): RootContent | RootContent[] | null {
  switch (node.type) {
    // Direct mappings
    case 'heading':
      return convertHeading(node as NASTHeading);
    case 'paragraph':
      return convertParagraph(node as NASTParagraph);
    case 'blockquote':
      return convertBlockquote(node as NASTBlockquote);
    case 'list':
      return convertList(node as NASTList);
    case 'listItem':
      return convertListItem(node as NASTListItem);
    case 'thematicBreak':
      return { type: 'thematicBreak' };
    case 'code':
      return convertCode(node as NASTCode);
    case 'math': {
      const mathNode = node as NASTMath;
      return { type: 'math' as any, value: mathNode.value || '', data: mathNode.data };
    }
    case 'table':
      return convertTable(node as NASTTable);
    case 'tableRow':
      return convertTableRow(node as NASTTableRow);
    case 'tableCell':
      return convertTableCell(node as NASTTableCell);

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
      return convertCallout(node as NASTCallout);
    case 'toggle':
      return convertToggle(node as NASTToggle);
    case 'childPage':
      return convertChildPage(node as NASTChildPage);
    case 'image':
      return convertImage(node as NASTImage);
    case 'bookmark':
      return convertBookmark(node as NASTBookmark);
    case 'file':
      return convertFile(node as NASTFile);
    case 'video':
      return convertVideo(node as NASTVideo);
    case 'pdf':
      return convertPdf(node as NASTPDF);
    case 'embed':
      return convertEmbed(node as NASTEmbed);
    case 'mention':
      return null; // Handled in phrasing content

    // Handle columnList and column specially
    case 'columnList':
    case 'column': {
      // Convert children if they exist
      const nodeWithChildren = node as { children?: NASTNode[] };
      if (nodeWithChildren.children) {
        const results: RootContent[] = [];
        for (const child of nodeWithChildren.children) {
          const converted = convertNode(child);
          if (converted) {
            if (Array.isArray(converted)) {
              results.push(...converted);
            } else {
              results.push(converted);
            }
          }
        }
        return results.length > 0 ? results : null;
      }
      return null;
    }

    default: {
      // Unknown type - convert to paragraph with original data
      // Use type assertion since TypeScript thinks this is 'never' after exhaustive checks
      const unknownNode = node as { type: string };
      return {
        type: 'paragraph',
        children: [{ type: 'text', value: `[Unknown: ${unknownNode.type}]` }],
        data: {
          originalType: unknownNode.type
        }
      };
    }
  }
}
