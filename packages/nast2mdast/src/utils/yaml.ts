/**
 * Generate YAML frontmatter from root data
 */
export function generateYamlFrontmatter(data: any): string {
  const yamlLines: string[] = [];

  if (data.title) {
    yamlLines.push(`title: ${JSON.stringify(data.title)}`);
  }
  if (data.pageId) {
    yamlLines.push(`pageId: ${JSON.stringify(data.pageId)}`);
  }
  if (data.icon) {
    yamlLines.push(`icon: ${JSON.stringify(data.icon)}`);
  }
  if (data.processedAt) {
    yamlLines.push(`processedAt: ${JSON.stringify(data.processedAt)}`);
  }

  return yamlLines.join('\n');
}
