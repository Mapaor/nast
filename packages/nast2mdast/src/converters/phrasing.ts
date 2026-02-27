import type { PhrasingContent } from 'mdast';
import type { NastNode } from '../types/nast';

/**
 * Convert phrasing (inline) content
 */
export function convertPhrasingContent(nodes: NastNode[]): PhrasingContent[] {
  const result: PhrasingContent[] = [];

  for (const node of nodes) {
    switch (node.type) {
      case 'text':
        result.push({
          type: 'text',
          value: node.value || '',
          data: node.data
        });
        break;

      case 'strong':
        result.push({
          type: 'strong',
          children: node.children ? convertPhrasingContent(node.children) : []
        });
        break;

      case 'emphasis':
        result.push({
          type: 'emphasis',
          children: node.children ? convertPhrasingContent(node.children) : []
        });
        break;

      case 'delete':
        result.push({
          type: 'delete',
          children: node.children ? convertPhrasingContent(node.children) : []
        } as any);
        break;

      case 'underline':
        // Underline doesn't exist in standard mdast, wrap in emphasis with data
        result.push({
          type: 'emphasis',
          children: node.children ? convertPhrasingContent(node.children) : [],
          data: {
            originalType: 'underline',
            ...node.data
          }
        });
        break;

      case 'inlineCode':
        result.push({
          type: 'inlineCode',
          value: node.value || ''
        });
        break;

      case 'inlineMath':
        result.push({
          type: 'inlineMath',
          value: node.value || '',
          data: node.data
        } as any);
        break;

      case 'link':
        result.push({
          type: 'link',
          url: node.url || '',
          title: node.title || null,
          children: node.children ? convertPhrasingContent(node.children) : [],
          data: node.data
        });
        break;

      case 'mention':
        result.push(convertMention(node));
        break;

      default:
        // Unknown inline type, convert to text
        result.push({
          type: 'text',
          value: node.value || `[${node.type}]`,
          data: {
            originalType: node.type,
            ...node.data
          }
        });
    }
  }

  return result;
}

/**
 * Convert mention to text or link
 */
export function convertMention(node: NastNode): PhrasingContent {
  switch (node.mentionType) {
    case 'user':
      return {
        type: 'text',
        value: node.value || '@User',
        data: {
          originalType: 'mention',
          mentionType: 'user',
          ...node.data
        }
      };

    case 'date':
      return {
        type: 'text',
        value: node.value || 'Date',
        data: {
          originalType: 'mention',
          mentionType: 'date',
          ...node.data
        }
      };

    case 'page':
      return {
        type: 'link',
        url: node.data?.url || '#',
        children: [{ type: 'text', value: node.value || 'Page' }],
        data: {
          originalType: 'mention',
          mentionType: 'page',
          pageId: node.data?.id,
          ...node.data
        }
      };

    default:
      return {
        type: 'text',
        value: node.value || '@Mention',
        data: {
          originalType: 'mention',
          ...node.data
        }
      };
  }
}
