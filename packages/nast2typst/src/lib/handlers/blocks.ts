import type {
  NASTParagraph,
  NASTBlockquote,
  NASTThematicBreak,
  NASTCallout,
  NASTCode,
} from '../../../src/types.js';
import { processNode } from '../processor.js';
import { notionColorToTypst, type ProcessingContext } from './utils.js';

export function handleParagraph(node: NASTParagraph, context: ProcessingContext): string {
  const content = node.children.map(child => processNode(child, context)).join('');
  return content + '\\' + '\n';
}

export function handleBlockquote(node: NASTBlockquote, context: ProcessingContext): string {
  const content = node.children.map(child => processNode(child, context)).join('');
  return `#quote[\n${content}]\n`;
}

export function handleThematicBreak(node: NASTThematicBreak): string {
  return `#line(length: 100%, stroke: 0.1pt)\n`;
}

export function handleCallout(node: NASTCallout, context: ProcessingContext): string {
  const icon = node.data.icon?.value || null;
  const bgColor = notionColorToTypst(node.data.color);
  
  let params: string[] = [];
  if (icon) {
    params.push(`icon: "${icon}"`);
  }
  params.push(`bg: ${bgColor}`);
  
  const content = node.children.map(child => processNode(child, context)).join('');
  return `#callout(${params.join(', ')})[\n${content}]\n`;
}

export function handleCode(node: NASTCode): string {
  const lang = node.lang || '';
  const caption = '';
  
  let result = `\`\`\`${lang}\n${node.value}\n\`\`\`\n`;
  
  if (caption) {
    result += `_${caption}_\n`;
  }
  
  return result;
}

