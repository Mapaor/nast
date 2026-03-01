import type { NASTLink, NASTMention, NASTChildPage, NASTColumnList, NASTColumn } from '../../../src/types.js';
import type { ProcessingContext } from './utils.js';
import { processNode } from '../processor.js';

export function handleLink(node: NASTLink, context: ProcessingContext): string {
  const content = node.children.map(child => processNode(child, context)).join('');
  return `#link("${node.url}")[${content}]`;
}

export function handleMention(node: NASTMention): string {
  switch (node.mentionType) {
    case 'user':
      return `\\${node.value}`;
    case 'date':
      return node.value;
    case 'page':
      // Page mentions: link with italic text
      if (node.data && typeof node.data === 'object' && 'url' in node.data) {
        return `#link("${(node.data as any).url}")[_${node.value}_]`;
      }
      return `_${node.value}_`;
    case 'database':
      return `_${node.value}_`;
    default:
      return node.value;
  }
}

export function handleChildPage(node: NASTChildPage): string {
  const url = `https://notion.so/${node.pageId.replace(/-/g, '')}`;
  return `#child-page("${url}")[${node.title}]`;
}

export function handleColumnList(node: NASTColumnList, context: ProcessingContext): string {
  const numberOfColumns = node.children.length;
  const columnsContent = node.children.map(column => handleColumn(column, context)).join('#colbreak()\n');
  
  return `#columns(${numberOfColumns}, gutter: 2em)[ \n${columnsContent}]\n`;
}

export function handleColumn(node: NASTColumn, context: ProcessingContext): string {
  return node.children.map(child => processNode(child, context)).join('');
}
