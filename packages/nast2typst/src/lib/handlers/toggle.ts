import type {
  NASTToggle,
} from '../../../src/types.js';
import { processNode } from '../processor.js';
import { type ProcessingContext } from './utils.js';


export function handleToggle(node: NASTToggle, context: ProcessingContext): string {
  if (node.children.length === 0) {
    return '';
  }
  
  const firstChild = node.children[0];
  let toggleTitle = '';
  let headingParam = '';
  let bodyStartIndex = 1;
  
  // Check if first child is a heading
  let isHeadingToggle = false;
  if (firstChild.type === 'heading') {
    headingParam = `heading: ${firstChild.depth}`;
    // Get the heading text content
    toggleTitle = firstChild.children.map(child => processNode(child, context)).join('');
    isHeadingToggle = true;
  } else {
    // First child is the toggle title, rest is body
    toggleTitle = processNode(firstChild, context);
    bodyStartIndex = 1;
  }
  
  // Process the rest as toggle body
  const toggleBody = node.children.slice(bodyStartIndex).map(child => processNode(child, context)).join('');
  
  const toggleParams = headingParam ? `${headingParam}` : '';
  const toggleFunc = toggleParams ? `#toggle(${toggleParams})` : '#toggle';
  
  // Only add newline after title for heading toggles
  const titleNewline = isHeadingToggle ? '\n' : '';
  
  return `// Toggle block\n${toggleFunc}[${toggleTitle}${titleNewline}][${toggleBody}]`;
}
