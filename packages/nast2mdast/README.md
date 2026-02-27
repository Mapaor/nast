# nast2mdast

It is a very simple and minimal transformation which can be summed up into 2 main things:

1. Notion block types (like Callout, File, Embed and similar) that are not present in mdast get transformed to simpler types (like Paragraph, Link, BlockQoute or similar), and a `originalType` property gets added (along other rellevant information of the original block) to the `data` object of the new simple block.
2. The root node `data` which is the page title, page icon and so on, gets converted to YAML values and added as a first (head block) with type "yaml" (remark frontmatter mdast spec).

## Usage
It's main use is in the package [`mdast2md`](../mdast2md/README.md), this package is sort of an intermediate step between `nast` and markdown.