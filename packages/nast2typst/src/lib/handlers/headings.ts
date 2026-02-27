import type {
  NASTHeading,
} from '../../../src/types.js';
import { processNode } from '../processor.js';
import { type ProcessingContext } from './utils.js';

export function handleHeading(node: NASTHeading, context: ProcessingContext): string {
  const isToggle = node.isToggleable || false;
  if (!isToggle) {
    const prefix = '='.repeat(node.depth);
    const content = node.children.map(child => processNode(child, context)).join('');
    return `${prefix} ${content}\n`;
  } else {
    const toggleTitle = node.children[0] ? processNode(node.children[0], context) : 'Toggle';
    const toggleChildren = node.children.slice(1).map(child => processNode(child, context)).join('');
    return `// Toggle block\n#toggle(heading: ${node.depth})[${toggleTitle}][\n${toggleChildren}\n]`;
  }
  
}