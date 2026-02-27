import type { NBTBlock, NASTNode } from "../types";
import { transformRichText } from "../rich-text";

/**
 * Transforms a code block
 */
export function transformCode(
  blockId: string,
  properties: Record<string, any>,
  preserveBlockId: boolean = false
): NASTNode {
  const richText = properties.rich_text || [];
  const language = properties.language || "plain text";
  const caption = properties.caption || [];
  const value = richText.map((rt: any) => rt.content).join("");

  const codeNode: any = {
    type: "code",
    lang: language,
    value,
  };

  if (caption.length > 0 || preserveBlockId) {
    codeNode.data = {};
    if (caption.length > 0) {
      codeNode.data.caption = transformRichText(caption);
    }
    if (preserveBlockId) {
      codeNode.data.blockId = blockId;
    }
  }

  return codeNode;
}


/**
 * Transforms an equation block
 */
export function transformEquation(
  blockId: string,
  properties: Record<string, any>,
  preserveBlockId: boolean = false
): NASTNode {
  const expression = properties.expression || "";

  const node: NASTNode = {
    type: "math",
    value: expression,
  };

  if (preserveBlockId) {
    node.data = { blockId };
  }

  return node;
}

/**
 * Transforms a divider block
 */
export function transformDivider(
  blockId: string,
  preserveBlockId: boolean = false
): NASTNode {
  const node: NASTNode = {
    type: "thematicBreak",
  };

  if (preserveBlockId) {
    node.data = { blockId };
  }

  return node;
}
