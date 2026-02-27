/**
 * Block-level converters for standard markdown blocks
 */

import type { Content as MdastContent, BlockContent, DefinitionContent } from 'mdast';
import type { NastNode } from '../types/nast';
import { convertPhrasingContent } from './phrasing';

export function convertHeading(node: NastNode): MdastContent {
  return {
    type: 'heading',
    depth: node.depth || 1,
    children: node.children ? convertPhrasingContent(node.children) : []
  };
}

export function convertParagraph(node: NastNode): MdastContent {
  return {
    type: 'paragraph',
    children: node.children ? convertPhrasingContent(node.children) : [],
    data: node.data
  };
}

export function convertBlockquote(node: NastNode): MdastContent {
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

export function convertList(node: NastNode): MdastContent {
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
    children,
    data: node.data
  };
}

export function convertListItem(node: NastNode): MdastContent {
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

export function convertCode(node: NastNode): MdastContent {
  return {
    type: 'code',
    lang: node.lang || null,
    meta: node.meta || null,
    value: node.value || '',
    data: node.data
  };
}

export function convertTable(node: NastNode): MdastContent {
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

export function convertTableRow(node: NastNode): any {
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

export function convertTableCell(node: NastNode): any {
  return {
    type: 'tableCell',
    children: node.children ? convertPhrasingContent(node.children) : []
  };
}
