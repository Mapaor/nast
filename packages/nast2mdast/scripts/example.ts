import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { nast2mdast } from '../src/index';

// Read the input NAST file
const inputPath = join(__dirname, '../input', 'nast-page-30511a9761ab802c808cdbb05b786986.json');
const outputPath = join(__dirname, '../output', 'mdast-page-30511a9761ab802c808cdbb05b786986.json');

console.log('Reading NAST file from:', inputPath);
const nastContent = readFileSync(inputPath, 'utf-8');
const nastTree = JSON.parse(nastContent);

console.log('Converting NAST to MDAST...');
const mdastTree = nast2mdast(nastTree);

console.log('Writing MDAST file to:', outputPath);
writeFileSync(outputPath, JSON.stringify(mdastTree, null, 2), 'utf-8');

console.log('Conversion complete!');
console.log('Input nodes:', nastTree.children?.length || 0);
console.log('Output nodes:', mdastTree.children?.length || 0);
