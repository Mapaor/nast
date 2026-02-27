import type { NASTList, NASTListItem } from '../../../src/types.js';
import type { ProcessingContext } from './utils.js';
import { processNode } from '../processor.js';

let currentListDepth = 0;

export function handleList(node: NASTList, context: ProcessingContext): string {
  const marker = node.ordered ? '+' : '-';
  const indent = '  '.repeat(currentListDepth);
  
  currentListDepth++;
  const items = node.children.map(child => handleListItem(child, marker, indent, context));
  currentListDepth--;
  
  return items.join('') + (currentListDepth === 0 ? '\n' : '');
}

function handleListItem(node: NASTListItem, marker: string, indent: string, context: ProcessingContext): string {
  let result = '';
  let firstBlock = true;
  
  // Handle checklist items
  const checkboxPrefix = node.checked !== undefined 
    ? (node.checked ? '[X] ' : '[ ] ') 
    : '';
  
  for (const child of node.children) {
    if (child.type === 'paragraph') {
      // First paragraph becomes the list item content
      const content = child.children.map(c => processNode(c, context)).join('');
      if (firstBlock) {
        result += `${indent}${marker} ${checkboxPrefix}${content}\n`;
        firstBlock = false;
      } else {
        // Subsequent paragraphs are indented
        result += `${indent}  ${content}\n`;
      }
    } else if (child.type === 'list') {
      // Nested list - the handleList function will add proper indentation
      result += processNode(child, context);
    } else {
      // Other block types
      const processed = processNode(child, context);
      if (firstBlock) {
        result += `${indent}${marker} ${checkboxPrefix}${processed}`;
        firstBlock = false;
      } else {
        result += `${indent}  ${processed}`;
      }
    }
  }
  
  return result;
}
