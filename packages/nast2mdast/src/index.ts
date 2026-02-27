/**
 * Convert NAST (Notion AST) to MDAST (Markdown AST)
 * 
 */

// CORE IDEAS:
// 1. Notion-specific blocks get converted to simpler mdast types with originalType in data
// 2. Root node data (page metadata) gets converted to YAML frontmatter as first child

import type { Root as MdastRoot, BlockContent, DefinitionContent } from 'mdast';
import type { NastRoot } from './types/nast';
import { generateYamlFrontmatter } from './utils/yaml';
import { convertNode } from './converters/node';

export function nast2mdast(nastTree: NastRoot): MdastRoot {
  const mdastChildren: (BlockContent | DefinitionContent)[] = [];

  // Add YAML frontmatter from root data
  if (nastTree.data) {
    const yamlContent = generateYamlFrontmatter(nastTree.data);
    if (yamlContent) {
      mdastChildren.push({
        type: 'yaml',
        value: yamlContent
      } as any);
    }
  }

  // Convert children nodes
  if (nastTree.children) {
    for (const child of nastTree.children) {
      const converted = convertNode(child);
      if (converted) {
        if (Array.isArray(converted)) {
          mdastChildren.push(...converted as any);
        } else {
          mdastChildren.push(converted as any);
        }
      }
    }
  }

  return {
    type: 'root',
    children: mdastChildren
  };
}

// Re-export types
export type { NastNode, NastRoot } from './types/nast';
