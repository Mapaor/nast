import type { NBTBlock, NASTNode } from "../types";
import { transformRichText } from "../rich-text";
import { transformBlock } from "../block-transform";

/**
 * Transforms a paragraph block
 */
export function transformParagraph(
  blockId: string,
  properties: Record<string, any>,
  children?: NBTBlock[],
  preserveBlockId: boolean = false
): NASTNode {
  const richText = properties.rich_text || [];
  const paragraphChildren = transformRichText(richText);

  const node: NASTNode = {
    type: "paragraph",
    children: paragraphChildren,
  };

  if (preserveBlockId) {
    node.data = { blockId };
  }

  return node;
}


/**
 * Transforms a heading block
 */
export function transformHeading(
  blockId: string,
  type: "heading_1" | "heading_2" | "heading_3",
  properties: Record<string, any>,
  children?: NBTBlock[],
  preserveBlockId: boolean = false
): NASTNode {
  const depth = parseInt(type.split("_")[1]) as 1 | 2 | 3;
  const richText = properties.rich_text || [];
  const headingChildren = transformRichText(richText);
  const isToggleable = properties.is_toggleable || false;

  // If it's a toggle heading, return a toggle node with heading as first child
  if (isToggleable) {
    const headingNode: NASTNode = {
      type: "heading",
      depth,
      children: headingChildren,
    };

    const toggleChildren: NASTNode[] = [headingNode];

    // Add nested children to the toggle
    if (children && children.length > 0) {
      for (const child of children) {
        const transformed = transformBlock(child, preserveBlockId);
        if (transformed) {
          toggleChildren.push(transformed);
        }
      }
    }

    const toggleNode: NASTNode = {
      type: "toggle",
      children: toggleChildren,
    };

    if (preserveBlockId) {
      toggleNode.data = { blockId };
    }

    return toggleNode;
  }

  // Regular heading (non-toggleable)
  const node: NASTNode = {
    type: "heading",
    depth,
    children: headingChildren,
  };

  if (preserveBlockId) {
    node.data = { blockId };
  }

  return node;
}