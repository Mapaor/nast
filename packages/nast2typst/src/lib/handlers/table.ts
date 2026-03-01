import type { NASTTable } from '../../../src/types.js';
import type { ProcessingContext } from './utils.js';
import { processNode } from '../processor.js';

export function handleTable(node: NASTTable, context: ProcessingContext): string {
  const rows = node.children;
  if (rows.length === 0) return '';
  
  // Determine number of columns from first row
  const columnCount = rows[0].children.length;
  const columns = Array(columnCount).fill('1fr').join(', ');
  
  // Build the table
  let result = '#table(\n';
  result += `  columns: (${columns}),\n`;
  result += `  align: (${Array(columnCount).fill('left').join(', ')}),\n`;
  
  // Add fill parameter for headers
  if (node.hasColumnHeader && node.hasRowHeader) {
    result += `  fill: (x, y) => {\n`;
    result += `    if x == 0 or y == 0 {rgb("#f7f6f3")}\n`;
    result += `  },\n`;
  } else if (node.hasColumnHeader) {
    result += `  fill: (x, y) => {\n`;
    result += `    if y == 0 {rgb("#f7f6f3")}\n`;
    result += `  },\n`;
  } else if (node.hasRowHeader) {
    result += `  fill: (x, y) => {\n`;
    result += `    if x == 0 {rgb("#f7f6f3")}\n`;
    result += `  },\n`;
  }
  
  // Add all rows without bold formatting
  rows.forEach((row, rowIndex) => {
    const rowCells = row.children.map((cell) => {
      const content = cell.children.map(child => processNode(child, context)).join('');
      return `[${content}]`;
    });
    result += `  ${rowCells.join(', ')}${rowIndex < rows.length - 1 ? ',' : ''}\n`;
  });
  
  result += ')\n';
  return result;
}
