import type { NASTMath, NASTInlineMath } from '../../../src/types.js';
import { tex2typst } from 'tex2typst';
import { fixKatexToTypstConversion } from './utils.js';

export function handleMath(node: NASTMath): string {
  try {
    // Convert LaTeX math to Typst math
    let typstMath = tex2typst(node.value);
    // Fix KaTeX-specific conversion issues
    typstMath = fixKatexToTypstConversion(typstMath);
    return `$\n${typstMath}\n$\n`;
  } catch (error) {
    // If conversion fails, output the original LaTeX as a comment
    return `/*\nFailed to convert the following LaTeX to Typst:\n$\n${node.value}\n$\n*/\n`;
  }
}

export function handleInlineMath(node: NASTInlineMath): string {
  try {
    // Convert LaTeX math to Typst math
    let typstMath = tex2typst(node.value);
    // Fix KaTeX-specific conversion issues
    typstMath = fixKatexToTypstConversion(typstMath);
    return `$${typstMath}$`;
  } catch (error) {
    // If conversion fails, output the original LaTeX as a comment
    return `/*\nFailed to convert the following LaTeX to Typst:\n$${node.value}$\n*/\n`;
  }
}
