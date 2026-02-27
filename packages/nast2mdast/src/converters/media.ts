/**
 * Media and embed converters
 */

import type { Content as MdastContent } from 'mdast';
import type { NastNode } from '../types/nast';
import { convertPhrasingContent } from './phrasing';

/**
 * Convert image node
 */
export function convertImage(node: NastNode): MdastContent | MdastContent[] {
  const imageNode: any = {
    type: 'image',
    url: node.url || '',
    title: node.title || null,
    alt: node.alt || null,
    data: {
      originalType: 'image',
      ...node.data
    }
  };

  // Wrap image in a paragraph (required by MDAST spec)
  const imagePara: any = {
    type: 'paragraph',
    children: [imageNode]
  };

  // If there's a caption, add it as a separate paragraph
  if (node.data?.caption && Array.isArray(node.data.caption)) {
    const captionPara: any = {
      type: 'paragraph',
      children: convertPhrasingContent(node.data.caption),
      data: {
        imageCaption: true
      }
    };
    return [imagePara, captionPara];
  }

  return imagePara;
}

/**
 * Convert bookmark to paragraph with link
 */
export function convertBookmark(node: NastNode): MdastContent {
  return {
    type: 'paragraph',
    children: [
      {
        type: 'link',
        url: node.url || '',
        children: [{ type: 'text', value: node.url || 'Bookmark' }]
      }
    ],
    data: {
      originalType: 'bookmark',
      ...node.data
    }
  };
}

/**
 * Convert file to paragraph with link
 */
export function convertFile(node: NastNode): MdastContent {
  const fileName = node.name || 'File';
  return {
    type: 'paragraph',
    children: [
      {
        type: 'link',
        url: node.url || '',
        children: [{ type: 'text', value: `📎 ${fileName}` }]
      }
    ],
    data: {
      originalType: 'file',
      ...node.data
    }
  };
}

/**
 * Convert video to paragraph with link
 */
export function convertVideo(node: NastNode): MdastContent {
  return {
    type: 'paragraph',
    children: [
      {
        type: 'link',
        url: node.url || '',
        children: [{ type: 'text', value: `🎥 Video` }]
      }
    ],
    data: {
      originalType: 'video',
      ...node.data
    }
  };
}

/**
 * Convert PDF to paragraph with link
 */
export function convertPdf(node: NastNode): MdastContent {
  return {
    type: 'paragraph',
    children: [
      {
        type: 'link',
        url: node.url || '',
        children: [{ type: 'text', value: `📄 PDF` }]
      }
    ],
    data: {
      originalType: 'pdf',
      ...node.data
    }
  };
}

/**
 * Convert embed to paragraph with link
 */
export function convertEmbed(node: NastNode): MdastContent {
  return {
    type: 'paragraph',
    children: [
      {
        type: 'link',
        url: node.url || '',
        children: [{ type: 'text', value: `🔗 Embed` }]
      }
    ],
    data: {
      originalType: 'embed',
      ...node.data
    }
  };
}
