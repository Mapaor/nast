import type { PhrasingContent } from 'mdast';
import type {
  NASTNode,
  NASTText,
  NASTStrong,
  NASTEmphasis,
  NASTDelete,
  NASTUnderline,
  NASTInlineCode,
  NASTInlineMath,
  NASTLink,
  NASTMention
} from '../types/nast';

/**
 * Convert phrasing (inline) content
 */
export function convertPhrasingContent(nodes: NASTNode[]): PhrasingContent[] {
  const result: PhrasingContent[] = [];

  for (const node of nodes) {
    switch (node.type) {
      case 'text': {
        const textNode = node as NASTText;
        result.push({
          type: 'text',
          value: textNode.value || '',
          data: textNode.data
        });
        break;
      }

      case 'strong': {
        const strongNode = node as NASTStrong;
        result.push({
          type: 'strong',
          children: strongNode.children ? convertPhrasingContent(strongNode.children) : []
        });
        break;
      }

      case 'emphasis': {
        const emphasisNode = node as NASTEmphasis;
        result.push({
          type: 'emphasis',
          children: emphasisNode.children ? convertPhrasingContent(emphasisNode.children) : []
        });
        break;
      }

      case 'delete': {
        const deleteNode = node as NASTDelete;
        result.push({
          type: 'delete',
          children: deleteNode.children ? convertPhrasingContent(deleteNode.children) : []
        } as any);
        break;
      }

      case 'underline': {
        const underlineNode = node as NASTUnderline;
        // Underline doesn't exist in standard mdast, wrap in emphasis with data
        result.push({
          type: 'emphasis',
          children: underlineNode.children ? convertPhrasingContent(underlineNode.children) : [],
          data: {
            originalType: 'underline'
          }
        });
        break;
      }

      case 'inlineCode': {
        const inlineCodeNode = node as NASTInlineCode;
        result.push({
          type: 'inlineCode',
          value: inlineCodeNode.value || ''
        });
        break;
      }

      case 'inlineMath': {
        const inlineMathNode = node as NASTInlineMath;
        result.push({
          type: 'inlineMath',
          value: inlineMathNode.value || ''
        } as any);
        break;
      }

      case 'link': {
        const linkNode = node as NASTLink;
        result.push({
          type: 'link',
          url: linkNode.url || '',
          title: linkNode.data?.title || null,
          children: linkNode.children ? convertPhrasingContent(linkNode.children) : [],
          data: linkNode.data
        });
        break;
      }

      case 'mention':
        result.push(convertMention(node as NASTMention));
        break;

      default:
        // Unknown inline type, convert to text
        result.push({
          type: 'text',
          value: `[${node.type}]`,
          data: {
            originalType: node.type
          }
        });
    }
  }

  return result;
}

/**
 * Convert mention to text or link
 */
export function convertMention(node: NASTMention): PhrasingContent {
  switch (node.mentionType) {
    case 'user':
      return {
        type: 'text',
        value: node.value || '@User',
        data: {
          originalType: 'mention',
          mentionType: 'user',
          mentionData: node.data
        }
      };

    case 'date':
      return {
        type: 'text',
        value: node.value || 'Date',
        data: {
          originalType: 'mention',
          mentionType: 'date',
          mentionData: node.data
        }
      };

    case 'page': {
      const pageData = node.data as { url?: string; id?: string } | undefined;
      return {
        type: 'link',
        url: pageData?.url || '#',
        children: [{ type: 'text', value: node.value || 'Page' }],
        data: {
          originalType: 'mention',
          mentionType: 'page',
          pageId: pageData?.id,
          mentionData: node.data
        }
      };
    }

    default:
      return {
        type: 'text',
        value: node.value || '@Mention',
        data: {
          originalType: 'mention',
          mentionData: node.data
        }
      };
  }
}
