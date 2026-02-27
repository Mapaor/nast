import type {
  NASTNode,
  NASTText,
  NASTStrong,
  NASTEmphasis,
  NASTUnderline,
  NASTDelete,
  NASTInlineCode,
} from '../../../src/types.js';
import { escapeTypstText, notionColorToTypst, type ProcessingContext } from './utils.js';
import { processNode } from '../processor.js';

export function handleText(node: NASTText): string {
  let text = escapeTypstText(node.value);
  
  // Handle text color and background color
  if (node.data?.color) {
    const color = notionColorToTypst(node.data.color);
    text = `#text(fill: ${color})[${text}]`;
  }
  
  if (node.data?.backgroundColor) {
    const bgColor = notionColorToTypst(node.data.backgroundColor);
    text = `#highlight(fill: ${bgColor})[${text}]`;
  }
  
  return text;
}

export function handleStrong(node: NASTStrong, context: ProcessingContext): string {
  const content = node.children.map(child => processNode(child, context)).join('');
  return `*${content}*`;
}

export function handleEmphasis(node: NASTEmphasis, context: ProcessingContext): string {
  const content = node.children.map(child => processNode(child, context)).join('');
  return `_${content}_`;
}

export function handleUnderline(node: NASTUnderline, context: ProcessingContext): string {
  const content = node.children.map(child => processNode(child, context)).join('');
  return `#underline[${content}]`;
}

export function handleDelete(node: NASTDelete, context: ProcessingContext): string {
  const content = node.children.map(child => processNode(child, context)).join('');
  return `#strike[${content}]`;
}

export function handleInlineCode(node: NASTInlineCode): string {
  return `\`${node.value}\``;
}
