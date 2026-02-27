import type { NASTRoot } from './types.js';
import { processNode } from './lib/processor.js';
import { ProcessingContext } from './lib/handlers/utils.js';

const _PREAMBLE = '#import "@preview/notionly:0.1.0": *\n\n';

const TEMPORAL_PREAMBLE = `
#import "src/lib.typ": *
#show: notionly
`;


/**
 * Converts a NAST (Unified-like Notion Abstract Syntax Tree) to Typst markup.
 * 
 * @param root - The NAST root node
 * @returns Typst markup string
 */
export function nast2typst(root: NASTRoot): string {
  let result = TEMPORAL_PREAMBLE;
  
  // Add frontmatter with title and icon
  if (root.data.title) {
    result += `#set document(title: [${root.data.title}])\n\n`;
    
    result += `#align(center)[\n`;
    if (root.data.icon && root.data.icon.type === 'emoji') {
      result += `  #scale(160%)[${root.data.icon.value}] \\\n`;
    }
    result += `  #title() \\\n`;
    result += `]\n\n`;
  }
  
  // Create processing context
  const context = new ProcessingContext(root.data.pageId);
  
  // Process all children
  for (const child of root.children) {
    result += processNode(child, context);
  }
  
  return result;
}

// Re-export types
export * from './types.js';