import type { NBTBlock, NASTNode } from "../types";
import { transformBlock } from "../block-transform";

/**
 * Transforms a column_list block into a columnList node
 */
export function transformColumnList(
  blockId: string,
  properties: Record<string, any>,
  children?: NBTBlock[],
  preserveBlockId: boolean = false
): NASTNode {
  const columns: NASTNode[] = [];

  if (children) {
    for (const child of children) {
      if (child.type === "column") {
        const column = transformColumn(
          child.id,
          child.properties,
          child.children,
          preserveBlockId
        );
        columns.push(column);
      }
    }
  }

  const node: any = {
    type: "columnList",
    children: columns,
  };

  if (preserveBlockId) {
    node.data = { blockId };
  }

  return node;
}

/**
 * Transforms a column block into a column node
 */
export function transformColumn(
  blockId: string,
  properties: Record<string, any>,
  children?: NBTBlock[],
  preserveBlockId: boolean = false
): NASTNode {
  const widthRatio = properties.width_ratio || 0.5;
  const columnChildren: NASTNode[] = [];

  // Transform all nested children
  if (children && children.length > 0) {
    for (const child of children) {
      const transformed = transformBlock(child, preserveBlockId);
      if (transformed) {
        columnChildren.push(transformed);
      }
    }
  }

  const node: any = {
    type: "column",
    widthRatio,
    children: columnChildren,
  };

  if (preserveBlockId) {
    node.data = { blockId };
  }

  return node;
}
