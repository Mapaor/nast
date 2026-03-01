import type {
  NASTImage,
  NASTVideo,
  NASTFile,
  NASTPDF,
  NASTBookmark,
  NASTEmbed,
} from '../../../src/types.js';
import type { ProcessingContext } from './utils.js';
import { extractCleanAwsUrl, isAwsSignedUrl } from './utils.js';
import { processNode } from '../processor.js';

export function handleImage(node: NASTImage, context: ProcessingContext): string {
  let imagePath: string;
  let comment = '';

  if (node.data.fileType === 'file' && isAwsSignedUrl(node.url)) {
    // Internal AWS file - rename to images/image-n.ext
    imagePath = context.getNextImagePath(node.url);
    const cleanUrl = extractCleanAwsUrl(node.url);
    comment = `// Original file: ${cleanUrl}\n`;
  } else if (node.data.fileType === 'external') {
    // External image - also rename to images/image-n.ext
    imagePath = context.getNextImagePath(node.url);
    comment = `// Source URL: ${node.url}\n`;
  } else {
    // Fallback
    imagePath = node.url;
  }

  let result = comment;
  
  if (node.data.caption && node.data.caption.length > 0) {
    const caption = node.data.caption.map(child => processNode(child, context)).join('');
    result += `#figure(\n  image("${imagePath}"),\n  caption: [${caption}]\n)`;
  } else {
    result += `#image("${imagePath}")`;
  }
  
  return result + '\n';
}

export function handleVideo(node: NASTVideo, context: ProcessingContext): string {
  let videoUrl: string;
  let comment = '';

  if (node.data.fileType === 'file' && isAwsSignedUrl(node.url)) {
    // Internal AWS file - link to Notion page
    videoUrl = context.getNotionPageUrl();
    const cleanUrl = extractCleanAwsUrl(node.url);
    comment = `// Original file: ${cleanUrl}\n`;
  } else {
    // External video
    videoUrl = context.getNotionPageUrl();
    comment = `// Source URL: ${node.url}\n`;
  }

  const caption = node.data.caption && node.data.caption.length > 0
    ? node.data.caption.map(child => processNode(child, context)).join('')
    : 'Video';
  
  let result = comment;
  result += `#video("${videoUrl}", ext: "mp4")[${caption}]\n`;
  
  return result;
}

export function handleFile(node: NASTFile, context: ProcessingContext): string {
  let fileUrl: string;
  let comment = '';

  if (node.data.fileType === 'file' && isAwsSignedUrl(node.url)) {
    // Internal AWS file - link to Notion page
    fileUrl = context.getNotionPageUrl();
    const cleanUrl = extractCleanAwsUrl(node.url);
    comment = `// Original file: ${cleanUrl}\n`;
  } else {
    // External file
    fileUrl = context.getNotionPageUrl();
    comment = `// Source URL: ${node.url}\n`;
  }

  const fileName = node.name || 'File';
  
  // Extract file extension from name
  const extMatch = fileName.match(/\.([^.]+)$/);
  const ext = extMatch ? extMatch[1] : 'file';
  
  let result = comment;
  result += `#file("${fileUrl}", ext: "${ext}")[${fileName}]\n`;
  
  return result;
}

export function handlePDF(node: NASTPDF, context: ProcessingContext): string {
  let pdfUrl: string;
  let comment = '';

  if (node.data.fileType === 'file' && isAwsSignedUrl(node.url)) {
    // Internal AWS file - link to Notion page
    pdfUrl = context.getNotionPageUrl();
    const cleanUrl = extractCleanAwsUrl(node.url);
    comment = `// Original file: ${cleanUrl}\n`;
  } else {
    // External PDF
    pdfUrl = context.getNotionPageUrl();
    comment = `// Source URL: ${node.url}\n`;
  }

  const caption = node.data.caption && node.data.caption.length > 0
    ? node.data.caption.map(child => processNode(child, context)).join('')
    : 'PDF Document';
  
  let result = comment;
  result += `#pdf("${pdfUrl}")[${caption}]\n`;
  
  return result;
}