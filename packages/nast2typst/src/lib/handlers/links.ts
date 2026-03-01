import type {
  NASTBookmark,
  NASTEmbed,
} from '../../types.js';
import type { ProcessingContext } from './utils.js';
import { processNode } from '../processor.js';

export function handleBookmark(node: NASTBookmark, context: ProcessingContext): string {
  // Future: will have title, description, and previewImage
  // For now, just URL
  return `#bookmark(url: "${node.url}")\n`;
}

export function handleEmbed(node: NASTEmbed, context: ProcessingContext): string {
  let result = `#embed("${node.url}")\n`;
  
  // Render caption as a new paragraph if present
  if (node.data?.caption && node.data.caption.length > 0) {
    const captionText = node.data.caption.map(child => processNode(child, context)).join('');
    result += `\n${captionText}\\ \n`;
  }
  
  return result;
}
