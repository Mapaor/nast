
import type { NBTBlock, NASTNode } from "../types";
import { transformRichText } from "../rich-text";

import { transformBlock } from "../block-transform";

/**
 * Transforms a quote block
 */
export function transformQuote(
  blockId: string,
  properties: Record<string, any>,
  children?: NBTBlock[],
  preserveBlockId: boolean = false
): NASTNode {
  const richText = properties.rich_text || [];
  const quoteChildren: NASTNode[] = [
    {
      type: "paragraph",
      children: transformRichText(richText),
    },
  ];

  // Add nested children if any
  if (children && children.length > 0) {
    for (const child of children) {
      const transformed = transformBlock(child, preserveBlockId);
      if (transformed) {
        quoteChildren.push(transformed);
      }
    }
  }

  const node: NASTNode = {
    type: "blockquote",
    children: quoteChildren,
  };

  if (preserveBlockId) {
    node.data = { blockId };
  }

  return node;
}

/**
 * Transforms a callout block
 */
export function transformCallout(
  blockId: string,
  properties: Record<string, any>,
  children?: NBTBlock[],
  preserveBlockId: boolean = false
): NASTNode {
  const richText = properties.rich_text || [];
  const icon = properties.icon || null;
  const color = properties.color || "default";

  const calloutChildren: NASTNode[] = [];

  // Add main content as paragraph if exists
  if (richText.length > 0) {
    calloutChildren.push({
      type: "paragraph",
      children: transformRichText(richText),
    });
  }

  // Add nested children
  if (children && children.length > 0) {
    for (const child of children) {
      const transformed = transformBlock(child, preserveBlockId);
      if (transformed) {
        calloutChildren.push(transformed);
      }
    }
  }

  const dataObj: any = {
    icon: icon
      ? {
          type: icon.type,
          value: icon.emoji || icon.url || "",
        }
      : null,
    color,
  };

  if (preserveBlockId) {
    dataObj.blockId = blockId;
  }

  return {
    type: "callout",
    data: dataObj,
    children: calloutChildren,
  };
}




/**
 * Transforms a toggle block
 */
export function transformToggle(
  blockId: string,
  properties: Record<string, any>,
  children?: NBTBlock[],
  preserveBlockId: boolean = false
): NASTNode {
  const richText = properties.rich_text || [];
  const toggleChildren: NASTNode[] = [
    {
      type: "paragraph",
      children: transformRichText(richText),
    },
  ];

  // Add nested children
  if (children && children.length > 0) {
    for (const child of children) {
      const transformed = transformBlock(child, preserveBlockId);
      if (transformed) {
        toggleChildren.push(transformed);
      }
    }
  }

  const node: NASTNode = {
    type: "toggle",
    children: toggleChildren,
  };

  if (preserveBlockId) {
    node.data = { blockId };
  }

  return node;
}