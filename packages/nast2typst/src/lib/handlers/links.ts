import type {
  NASTBookmark,
  NASTEmbed,
} from '../../types.js';
import type { ProcessingContext } from './utils.js';

export function handleBookmark(node: NASTBookmark, context: ProcessingContext): string {
  return `#bookmark(url: "${node.url}")\n`;
}

export function handleEmbed(node: NASTEmbed, context: ProcessingContext): string {
  return `#embed("${node.url}")\n`;
}
