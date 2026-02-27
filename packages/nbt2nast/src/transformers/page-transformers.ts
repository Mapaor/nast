import type { NASTNode } from "../types";

/**
 * Transforms a child_page block
 */
export function transformChildPage(
  blockId: string,
  properties: Record<string, any>,
  preserveBlockId: boolean = false
): NASTNode {
  const title = properties.title || "";
  const pageId = blockId;

  const node: NASTNode = {
    type: "childPage",
    title,
    pageId,
  };

  if (preserveBlockId) {
    node.data = { blockId };
  }

  return node;
}
