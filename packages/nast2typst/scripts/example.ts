import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { nast2typst } from '../src';
import type { NASTRoot } from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputFile = 'nast-page-30511a9761ab802c808cdbb05b786986'; 

// Read the input JSON file
const inputPath = join(__dirname, '../input', `${inputFile}.json`);
const inputJson = readFileSync(inputPath, 'utf-8');
const nastRoot: NASTRoot = JSON.parse(inputJson);

// Convert to Typst
const typstCode = nast2typst(nastRoot);

// Write output
const outputDir = join(__dirname, '../output');
mkdirSync(outputDir, { recursive: true });

const outputPath = join(outputDir, `${inputFile}.typ`);
writeFileSync(outputPath, typstCode, 'utf-8');

console.log(`Successfully converted NAST to Typst!`);
console.log(`Input: ${inputPath}`);
console.log(`Output: ${outputPath}`);
console.log(`\nGenerated ${typstCode.split('\n').length} lines of Typst code.`);