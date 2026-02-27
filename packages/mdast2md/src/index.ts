import { toMarkdown } from 'mdast-util-to-markdown';
import { gfmToMarkdown } from 'mdast-util-gfm';
import { frontmatterToMarkdown } from 'mdast-util-frontmatter';
import { mathToMarkdown } from 'mdast-util-math';
import type { Root } from 'mdast';

export interface ConversionOptions {
  bullet?: '-' | '*' | '+';
  emphasis?: '_' | '*';
  strong?: '_' | '*';
  rule?: '-' | '*' | '_';
  fences?: boolean;
  incrementListMarker?: boolean;
}


// This function is just a wrapper around mdast-utils (toMarkdown function)
// The code is provided as an example and also to ensure the extensions for GFM, frontmatter, and math get used for the markdown rendering.
export function convertMdastToMarkdown(
  mdastTree: Root,
  options: ConversionOptions = {}
): string {
  const gfmExtension = gfmToMarkdown();
  const frontmatterExtension = frontmatterToMarkdown(['yaml']);
  const mathExtension = mathToMarkdown();

  // Convert with all extensions
  const markdown = toMarkdown(mdastTree, {
    extensions: [gfmExtension, frontmatterExtension, mathExtension],
    bullet: options.bullet || '-',
    emphasis: options.emphasis || '*',
    strong: options.strong || '*',
    rule: options.rule || '-',
    fences: options.fences !== undefined ? options.fences : true,
    incrementListMarker: options.incrementListMarker !== undefined ? options.incrementListMarker : true
  });

  return markdown;
}
