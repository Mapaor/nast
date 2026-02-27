import type { NBTBlock, NASTNode } from "./types";
import {
  transformParagraph,
  transformHeading,
  transformCallout,
  transformQuote,
  transformToggle,
  transformCode,
  transformEquation,
  transformDivider,
  transformImage,
  transformVideo,
  transformFile,
  transformBookmark,
  transformEmbed,
  transformPDF,
  transformTable,
  transformChildPage,
  transformColumnList,
} from "./transformers";


/**
 * Transforms a NBT block to NAST node
 */
export function transformBlock(block: NBTBlock, preserveBlockId: boolean = false): NASTNode | null {
  const { id, type, properties, children } = block;

  switch (type) {
    case "paragraph":
      return transformParagraph(id, properties, children, preserveBlockId);

    case "heading_1":
    case "heading_2":
    case "heading_3":
      return transformHeading(id, type, properties, children, preserveBlockId);

    case "bulleted_list_item":
    case "numbered_list_item":
    case "to_do":
      // Lists are handled specially by grouping consecutive items
      return null;

    case "quote":
      return transformQuote(id, properties, children, preserveBlockId);

    case "callout":
      return transformCallout(id, properties, children, preserveBlockId);

    case "toggle":
      return transformToggle(id, properties, children, preserveBlockId);

    case "code":
      return transformCode(id, properties, preserveBlockId);

    case "equation":
      return transformEquation(id, properties, preserveBlockId);

    case "divider":
      return transformDivider(id, preserveBlockId);

    case "image":
      return transformImage(id, properties, preserveBlockId);

    case "video":
      return transformVideo(id, properties, preserveBlockId);

    case "file":
      return transformFile(id, properties, preserveBlockId);

    case "bookmark":
      return transformBookmark(id, properties, preserveBlockId);

    case "embed":
      return transformEmbed(id, properties, preserveBlockId);

    case "pdf":
      return transformPDF(id, properties, preserveBlockId);

    case "table":
      return transformTable(id, properties, children, preserveBlockId);

    case "column_list":
      return transformColumnList(id, properties, children, preserveBlockId);

    case "column":
      // Columns are handled by their parent column_list
      return null;

    case "child_page":
      return transformChildPage(id, properties, preserveBlockId);

    default:
      // Return a paragraph with the content if available
      if (properties.rich_text) {
        return transformParagraph(id, properties, children, preserveBlockId);
      }
      return null;
  }
}



