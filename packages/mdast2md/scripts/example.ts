import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { Root } from 'mdast';
import { convertMdastToMarkdown } from '../src';

const pageId = '30511a9761ab802c808cdbb05b786986';

// Define input and output directories
const inputDir = join(__dirname, '../input');
const outputDir = join(__dirname, '../output');

// Read the MDAST JSON file
const inputPath = join(inputDir, `mdast-page-${pageId}.json`);

console.log('Reading MDAST file from:', inputPath);
const mdastContent = readFileSync(inputPath, 'utf-8');
const mdastTree: Root = JSON.parse(mdastContent);

console.log('Converting MDAST to Markdown...');

// Convert using the mdast2md package
const markdown = convertMdastToMarkdown(mdastTree);

// Write markdown file
const outputPath = join(outputDir, `page-${pageId}.md`);
console.log('Writing Markdown file to:', outputPath);
writeFileSync(outputPath, markdown, 'utf-8');

console.log('Conversion complete!');
console.log('Output file:', outputPath);
