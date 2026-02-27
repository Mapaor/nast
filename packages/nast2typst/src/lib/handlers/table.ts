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
  
  // Add header if present
  if (node.hasColumnHeader && rows.length > 0) {
    const headerCells = rows[0].children.map((cell) => {
      const content = cell.children.map(child => processNode(child, context)).join('');
      return `[*${content}*]`;
    });
    result += `  table.header(${headerCells.join(', ')}),\n`;
    
    // Add remaining rows (skip first row since it's the header)
    for (let i = 1; i < rows.length; i++) {
      const rowCells = rows[i].children.map((cell, colIndex) => {
        const content = cell.children.map(child => processNode(child, context)).join('');
        // First column with row header - make bold
        if (colIndex === 0 && node.hasRowHeader) {
          return `[*${content}*]`;
        }
        return `[${content}]`;
      });
      result += `  ${rowCells.join(', ')}${i < rows.length - 1 ? ',' : ''}\n`;
    }
  } else {
    // No header - format all rows
    rows.forEach((row, rowIndex) => {
      const rowCells = row.children.map((cell, colIndex) => {
        const content = cell.children.map(child => processNode(child, context)).join('');
        // First column with row header - make bold
        if (colIndex === 0 && node.hasRowHeader) {
          return `[*${content}*]`;
        }
        return `[${content}]`;
      });
      result += `  ${rowCells.join(', ')}${rowIndex < rows.length - 1 ? ',' : ''}\n`;
    });
  }
  
  result += ')\n';
  return result;
}
