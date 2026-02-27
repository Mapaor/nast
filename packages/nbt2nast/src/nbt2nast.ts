import type { NBTDocument, NBTBlock, NASTRoot, NASTNode } from "./types.js";
import { transformBlock } from "./block-transform.js";
import { transformRichText } from "./rich-text.js";

/**
 * Main converter function from NBT to NAST
 */
export function nbt2nast(
  page: NBTDocument,
  options: { preserveBlockId?: boolean } = {}
): NASTRoot {
  const { preserveBlockId = false } = options;

  // Extract page properties (title, icon, etc.)
  const pageProperties = page.properties;
  const pageTitle = pageProperties.title || "Untitled";
  const pageIcon = pageProperties.icon;

  // Transform child blocks to NAST nodes
  // Children are already nested in the page (no need to find them)
  const children = transformBlocks(page.children || [], preserveBlockId);

  // Build the root node
  const root: NASTRoot = {
    type: "root",
    children,
    data: {
      pageId: page.id,
      title: pageTitle,
      processedAt: page.processed_at || new Date().toISOString(),
    },
  };

  // Add icon if present
  if (pageIcon) {
    root.data.icon = {
      type: pageIcon.type,
      value: pageIcon.emoji || pageIcon.url || "",
    };
  }

  return root;
}

/**
 * Transforms an array of NBT blocks to NAST nodes
 */
function transformBlocks(blocks: NBTBlock[], preserveBlockId: boolean): NASTNode[] {
  const result: NASTNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    // Handle list items specially - group consecutive ones
    if (
      block.type === "bulleted_list_item" ||
      block.type === "numbered_list_item" ||
      block.type === "to_do"
    ) {
      const listNode = transformListSequence(blocks, i, preserveBlockId);
      result.push(listNode.node);
      i = listNode.nextIndex;
    } else {
      const transformed = transformBlock(block, preserveBlockId);
      if (transformed) {
        result.push(transformed);
      }
      i++;
    }
  }

  return result;
}

/**
 * Transforms a sequence of list items into a list node
 */
function transformListSequence(
  blocks: NBTBlock[],
  startIndex: number,
  preserveBlockId: boolean
): { node: NASTNode; nextIndex: number } {
  const firstBlock = blocks[startIndex];
  const isOrdered = firstBlock.type === "numbered_list_item";
  const isChecklist = firstBlock.type === "to_do";
  const listItems: NASTNode[] = [];

  let i = startIndex;

  // Collect consecutive list items of the same type
  const targetType = isChecklist
    ? "to_do"
    : isOrdered
    ? "numbered_list_item"
    : "bulleted_list_item";

  while (i < blocks.length && blocks[i].type === targetType) {
    const block = blocks[i];
    const listItem = transformListItem(block, isOrdered, isChecklist, preserveBlockId);
    listItems.push(listItem);
    i++;
  }

  const listNode: NASTNode = {
    type: "list",
    ordered: isOrdered,
    children: listItems as any,
  };

  return { node: listNode, nextIndex: i };
}

/**
 * Transforms a list item block
 */
function transformListItem(
  block: NBTBlock,
  isOrdered: boolean,
  isChecklist: boolean,
  preserveBlockId: boolean
): NASTNode {
  const richText = (block.properties.rich_text || []) as any[];
  const children: NASTNode[] = [];

  // Add the main content as a paragraph
  children.push({
    type: "paragraph",
    children: transformRichText(richText),
  });

  // Handle nested children (which may include nested lists)
  if (block.children && block.children.length > 0) {
    const nestedChildren = transformBlocks(block.children, preserveBlockId);
    children.push(...nestedChildren);
  }

  const listItem: any = {
    type: "listItem",
    children,
  };

  // Add checked property for checklists
  if (isChecklist) {
    listItem.checked = block.properties.checked || false;
  }

  if (preserveBlockId) {
    listItem.data = { blockId: block.id };
  }

  return listItem;
}

/**
 * Default export
 */
export default nbt2nast;
