/**
 * Utility functions for NAST to Typst conversion
 */

/**
 * Escapes special characters in Typst text
 */
export function escapeTypstText(text: string): string {
  // In Typst, we need to escape: # $ \ @ < >
  // But we need to be careful not to double-escape
  return text
    .replace(/\\/g, '\\\\')
    .replace(/#/g, '\\#')
    .replace(/\$/g, '\\$')
    .replace(/@/g, '\\@');
}

/**
 * Converts Notion color names to Typst color references
 */
export function notionColorToTypst(notionColor: string): string {
  const colorMap: Record<string, string> = {
    // Text colors
    'gray': 'notion.gray_text',
    'brown': 'notion.brown_text',
    'orange': 'notion.orange_text',
    'yellow': 'notion.yellow_text',
    'green': 'notion.green_text',
    'blue': 'notion.blue_text',
    'purple': 'notion.purple_text',
    'pink': 'notion.pink_text',
    'red': 'notion.red_text',
    // Background colors
    'gray_background': 'notion.gray_bg',
    'brown_background': 'notion.brown_bg',
    'orange_background': 'notion.orange_bg',
    'yellow_background': 'notion.yellow_bg',
    'green_background': 'notion.green_bg',
    'blue_background': 'notion.blue_bg',
    'purple_background': 'notion.purple_bg',
    'pink_background': 'notion.pink_bg',
    'red_background': 'notion.red_bg',
  };

  return colorMap[notionColor] || notionColor;
}

/**
 * Adds proper indentation to lines of text
 */
export function indent(text: string, level: number = 1, spaces: number = 2): string {
  const indentStr = ' '.repeat(level * spaces);
  return text.split('\n').map(line => indentStr + line).join('\n');
}

/**
 * Processing context that tracks state during conversion
 */
export class ProcessingContext {
  imageCounter: number = 0;
  pageId: string;

  constructor(pageId: string) {
    this.pageId = pageId;
  }

  /**
   * Get the next image path and increment counter
   */
  getNextImagePath(url: string): string {
    this.imageCounter++;
    const extension = getFileExtension(url);
    return `images/image-${this.imageCounter}${extension}`;
  }

  /**
   * Get the Notion page URL for this page
   */
  getNotionPageUrl(): string {
    return `https://notion.so/${this.pageId}`;
  }
}

/**
 * Strips query parameters from a URL
 */
export function stripUrlParameters(url: string): string {
  const urlObj = new URL(url);
  return urlObj.origin + urlObj.pathname;
}

/**
 * Extracts the clean AWS URL without parameters
 */
export function extractCleanAwsUrl(url: string): string {
  try {
    return stripUrlParameters(url);
  } catch {
    return url;
  }
}

/**
 * Determines if a URL is an AWS signed URL
 */
export function isAwsSignedUrl(url: string): boolean {
  return url.includes('prod-files-secure.s3') || url.includes('amazonaws.com');
}

/**
 * Extracts file extension from a URL
 */
export function getFileExtension(url: string): string {
  try {
    // Remove query parameters first
    const cleanUrl = url.split('?')[0];
    // Get the last part after the last slash
    const filename = cleanUrl.split('/').pop() || '';
    // Extract extension
    const match = filename.match(/\.(\w+)$/);
    return match ? match[0] : '';
  } catch {
    return '';
  }
}

/**
 * Fixes minor KaTeX-specific issues in converted Typst math
 */
export function fixKatexToTypstConversion(typstMath: string): string {
  let result = typstMath;

  // 1. Remove size commands (KaTeX size commands that don't translate well to Typst)
  const sizeCommands = [
    'Huge', 'huge', 'LARGE', 'Large', 'large',
    'normalsize', 'small', 'footnotesize', 'scriptsize', 'tiny'
  ];
  for (const cmd of sizeCommands) {
    result = result.replace(new RegExp(cmd, 'g'), '');
  }

  // 2. Remove parentheses size modifiers
  const parenSizeCommands = ['big', 'Big', 'bigg', 'Bigg'];
  for (const cmd of parenSizeCommands) {
    result = result.replace(new RegExp(cmd, 'g'), '');
  }

  // const verticalSeparationCommands = [
  //   '\\ [0 e m]',
  //   '\\ [0.1 e m]',
  //   '\\ [0.2 e m]',
  //   '\\ [0.3 e m]',
  //   '\\ [0.4 e m]',
  //   '\\ [0.5 e m]',
  //   '\\ [0.6 e m]',
  //   '\\ [0.7 e m]',
  //   '\\ [0.8 e m]',
  //   '\\ [0.9 e m]',
  //   '\\ [1 e m]',
  //   '\\ [1.1 e m]',
  //   '\\ [1.2 e m]',
  //   '\\ [1.3 e m]',
  //   '\\ [1.4 e m]',
  //   '\\ [1.5 e m]',
  //   '\\ [1.6 e m]',
  //   '\\ [1.7 e m]',
  //   '\\ [1.8 e m]',
  //   '\\ [1.9 e m]',
  //   '\\ [2 e m]',
  //   '\\ [2.5 e m]',
  //   '\\ [3 e m]',
  //   '\\ [3.5 e m]',
  //   '\\ [4 e m]',
  //   '\\ [4.5 e m]',
  //   '\\ [5 e m]',
  //   '\\ [5.5 e m]',
  //   '\\ [6 e m]',
  //   '\\ [6.5 e m]',
  //   '\\ [7 e m]',
  //   '\\ [7.5 e m]',
  //   '\\ [8 e m]'
  // ];
  // for (const cmd of verticalSeparationCommands) {
  //   result = result.replace(new RegExp(cmd, 'g'), '\\');
  // }

  const otherCommandsToRemove = ['vphantom', 'hphantom' ,'displaystyle', 'textstyle', 'scriptstyle'];
  for (const cmd of otherCommandsToRemove) {
    result = result.replace(new RegExp(cmd, 'g'), '');
  }

  // 3. Convert xrightarrow to Typst stretch syntax
  result = result.replace(/xrightarrow /g, 'stretch(->)^');

  return result;
}
