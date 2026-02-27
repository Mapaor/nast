import type { NBTBlock, NASTNode } from "../types";
import { transformRichText } from "../rich-text";

/**
 * Transforms a bookmark block
 */
export function transformBookmark(
  blockId: string,
  properties: Record<string, any>,
  preserveBlockId: boolean = false
): NASTNode {
  const url = properties.url || "";
  const caption = properties.caption || [];

  const bookmarkNode: any = {
    type: "bookmark",
    url,
  };

  if (caption.length > 0 || preserveBlockId) {
    bookmarkNode.data = {};
    if (caption.length > 0) {
      bookmarkNode.data.caption = transformRichText(caption);
    }
    if (preserveBlockId) {
      bookmarkNode.data.blockId = blockId;
    }
  }

  return bookmarkNode;
}

/**
 * Transforms an embed block
 */
export function transformEmbed(
  blockId: string,
  properties: Record<string, any>,
  preserveBlockId: boolean = false
): NASTNode {
  const url = properties.url || "";
  const caption = properties.caption || [];

  const embedNode: any = {
    type: "embed",
    url,
  };

  if (caption.length > 0 || preserveBlockId) {
    embedNode.data = {};
    if (caption.length > 0) {
      embedNode.data.caption = transformRichText(caption);
    }
    if (preserveBlockId) {
      embedNode.data.blockId = blockId;
    }
  }

  return embedNode;
}
