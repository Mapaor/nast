import type { NBTBlock, NASTNode, NASTTableRow } from "../types";
import { transformRichText } from "../rich-text";

/**
 * Transforms a table block
 */
export function transformTable(
  blockId: string,
  properties: Record<string, any>,
  children?: NBTBlock[],
  preserveBlockId: boolean = false
): NASTNode {
  const hasColumnHeader = properties.has_column_header || false;
  const hasRowHeader = properties.has_row_header || false;

  const rows: NASTTableRow[] = [];
  
  if (children) {
    for (const child of children) {
      if (child.type === "table_row") {
        const row = transformTableRow(child.properties);
        rows.push(row);
      }
    }
  }

  const node: NASTNode = {
    type: "table",
    hasColumnHeader,
    hasRowHeader,
    children: rows,
  };

  if (preserveBlockId) {
    node.data = { blockId };
  }

  return node;
}

/**
 * Transforms a table row
 */
function transformTableRow(properties: Record<string, any>): NASTTableRow {
  const cells = properties.cells || [];
  const tableCells = cells.map((cellContent: any[]) => {
    // Each cell contains an array of rich text elements
    const cellChildren = transformRichText(cellContent);
    
    return {
      type: "tableCell" as const,
      children: cellChildren,
    };
  });

  return {
    type: "tableRow",
    children: tableCells,
  };
}
