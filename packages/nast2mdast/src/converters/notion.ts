/**
 * Notion-specific block converters
 */

import type { Content as MdastContent, BlockContent, DefinitionContent } from 'mdast';
import type { NastNode } from '../types/nast';

/**
 * Convert Notion callout to blockquote with original data
 */
export function convertCallout(node: NastNode): MdastContent {
  // Import convertNode to handle children
  const { convertNode } = require('./node');
  
  const children: (BlockContent | DefinitionContent)[] = [];
  
  // Add icon as first paragraph if present
  if (node.data?.icon) {
    const iconText = node.data.icon.type === 'emoji' ? node.data.icon.value : `[${node.data.icon.type}]`;
    children.push({
      type: 'paragraph',
      children: [{ type: 'text', value: iconText }]
    });
  }
  
  // Add children
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
    data: {
      originalType: 'callout',
      ...node.data
    }
  };
}

/**
 * Convert Notion toggle to blockquote with original data
 */
export function convertToggle(node: NastNode): MdastContent {
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
    type: 'blockquote',
    children,
    data: {
      originalType: 'toggle',
      ...node.data
    }
  };
}

/**
 * Convert childPage to paragraph with link
 */
export function convertChildPage(node: NastNode): MdastContent {
  return {
    type: 'paragraph',
    children: [
      {
        type: 'text',
        value: `📄 ${node.title || 'Untitled Page'}`
      }
    ],
    data: {
      originalType: 'childPage',
      pageId: node.pageId,
      title: node.title,
      ...node.data
    }
  };
}
