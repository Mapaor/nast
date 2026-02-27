/**
 * Block-level converters for standard markdown blocks
 */

import type { RootContent, BlockContent, DefinitionContent } from 'mdast';
import type {
  NASTHeading,
  NASTParagraph,
  NASTBlockquote,
  NASTList,
  NASTListItem,
  NASTCode,
  NASTTable,
  NASTTableRow,
  NASTTableCell
} from '../types/nast';
import { convertPhrasingContent } from './phrasing';

export function convertHeading(node: NASTHeading): RootContent {
  return {
    type: 'heading',
    depth: node.depth || 1,
    children: node.children ? convertPhrasingContent(node.children) : []
  };
}

export function convertParagraph(node: NASTParagraph): RootContent {
  return {
    type: 'paragraph',
    children: node.children ? convertPhrasingContent(node.children) : [],
    data: node.data
  };
}

export function convertBlockquote(node: NASTBlockquote): RootContent {
  // Import convertNode to handle children - will be imported from node.ts
  const { convertNode } = require('./node');
  
  const children: (BlockContent | DefinitionContent)[] = [];
  if (node.children) {
    for (const child of node.children) {
      const converted = convertNode(child);
      if (converted) {
        if (Array.isArray(converted)) {
          children.push(...converted as any);
        } else {
          children.push(converted as any);
        }
      }
    }
  }
  return {
    type: 'blockquote',
    children,
    data: node.data
  };
}

export function convertList(node: NASTList): RootContent {
  // Import convertNode to handle children
  const { convertNode } = require('./node');
  
  const children: any[] = [];
  if (node.children) {
    for (const child of node.children) {
      const converted = convertNode(child);
      if (converted && !Array.isArray(converted) && converted.type === 'listItem') {
        children.push(converted);
      }
    }
  }
  return {
    type: 'list',
    ordered: node.ordered || false,
    children
  };
}

export function convertListItem(node: NASTListItem): RootContent {
  // Import convertNode to handle children
  const { convertNode } = require('./node');
  
  const children: (BlockContent | DefinitionContent)[] = [];
  if (node.children) {
    for (const child of node.children) {
      const converted = convertNode(child);
      if (converted) {
        if (Array.isArray(converted)) {
          children.push(...converted as any);
        } else {
          children.push(converted as any);
        }
      }
    }
  }
  return {
    type: 'listItem',
    children,
    data: node.data
  };
}

export function convertCode(node: NASTCode): RootContent {
  return {
    type: 'code',
    lang: node.lang || null,
    meta: null,
    value: node.value || '',
    data: node.data
  };
}

export function convertTable(node: NASTTable): RootContent {
  // Import convertNode to handle children
  const { convertNode } = require('./node');
  
  const children: any[] = [];
  if (node.children) {
    for (const child of node.children) {
      const converted = convertNode(child);
      if (converted && !Array.isArray(converted) && converted.type === 'tableRow') {
        children.push(converted);
      }
    }
  }
  return {
    type: 'table',
    children,
    data: {
      ...node.data,
      hasColumnHeader: node.hasColumnHeader,
      hasRowHeader: node.hasRowHeader
    }
  };
}

export function convertTableRow(node: NASTTableRow): any {
  // Import convertNode to handle children
  const { convertNode } = require('./node');
  
  const children: any[] = [];
  if (node.children) {
    for (const child of node.children) {
      const converted = convertNode(child);
      if (converted && !Array.isArray(converted) && converted.type === 'tableCell') {
        children.push(converted);
      }
    }
  }
  return {
    type: 'tableRow',
    children
  };
}

export function convertTableCell(node: NASTTableCell): any {
  return {
    type: 'tableCell',
    children: node.children ? convertPhrasingContent(node.children) : []
  };
}
