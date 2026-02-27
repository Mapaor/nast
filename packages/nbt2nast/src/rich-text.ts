import type { NBTRichText, NASTNode } from "./types.js";

/**
 * Transforms NBT rich text array to NAST inline nodes
 */
export function transformRichText(richTextArray: NBTRichText[]): NASTNode[] {
  const result: NASTNode[] = [];

  for (const richText of richTextArray) {
    const node = transformSingleRichText(richText);
    result.push(node);
  }

  return result;
}

/**
 * Transforms a single NBT rich text element to NAST node
 */
function transformSingleRichText(richText: NBTRichText): NASTNode {
  // Handle equation (inline math)
  if (richText.type === "equation") {
    return {
      type: "inlineMath",
      value: richText.content,
    };
  }

  // Handle mention
  if (richText.type === "mention" && richText.mention) {
    return transformMention(richText);
  }

  // Handle text with annotations
  const annotations = richText.annotations || {};
  const hasColor = annotations.color && annotations.color !== "default";
  const colorMatch = hasColor ? annotations.color?.match(/^(.+?)(?:_background)?$/) : null;
  
  let baseNode: NASTNode;

  // Create base text node with color data if applicable
  if (hasColor) {
    const isBackground = annotations.color?.includes("_background");
    const colorValue = colorMatch ? colorMatch[1] : annotations.color;
    
    baseNode = {
      type: "text",
      value: richText.content,
      data: isBackground
        ? { backgroundColor: colorValue }
        : { color: colorValue },
    };
  } else {
    baseNode = {
      type: "text",
      value: richText.content,
    };
  }

  // Handle href (link)
  if (richText.href) {
    const linkNode: NASTNode = {
      type: "link",
      url: richText.href,
      children: [baseNode],
    };
    return wrapWithAnnotations(linkNode, annotations);
  }

  // Wrap with annotations
  return wrapWithAnnotations(baseNode, annotations);
}

/**
 * Wraps a node with annotation nodes (bold, italic, underline, strikethrough, code)
 */
function wrapWithAnnotations(
  node: NASTNode,
  annotations: NBTRichText["annotations"]
): NASTNode {
  if (!annotations) return node;

  let result = node;

  // Apply annotations in order: code -> bold -> italic -> underline -> strikethrough
  if (annotations.code) {
    // For inline code, extract the text value
    const textValue = extractTextValue(result);
    return {
      type: "inlineCode",
      value: textValue,
    };
  }

  if (annotations.bold) {
    result = {
      type: "strong",
      children: [result],
    };
  }

  if (annotations.italic) {
    result = {
      type: "emphasis",
      children: [result],
    };
  }

  if (annotations.underline) {
    result = {
      type: "underline",
      children: [result],
    };
  }

  if (annotations.strikethrough) {
    result = {
      type: "delete",
      children: [result],
    };
  }

  return result;
}

/**
 * Extracts text value from a node (for inline code conversion)
 */
function extractTextValue(node: NASTNode): string {
  if ("value" in node && typeof node.value === "string") {
    return node.value;
  }
  if ("children" in node && Array.isArray(node.children)) {
    return node.children.map(extractTextValue).join("");
  }
  return "";
}

/**
 * Transforms a mention rich text element
 */
function transformMention(richText: NBTRichText): NASTNode {
  const mention = richText.mention as any;

  if (!mention || !mention.type) {
    // Fallback to text
    return {
      type: "text",
      value: richText.content,
    };
  }

  // Handle link_mention mentions (external links with metadata)
  if (mention.type === "link_mention") {
    const linkData: any = {};
    
    if (mention.link_mention) {
      const preview = mention.link_mention;
      if (preview.title) linkData.title = preview.title;
      if (preview.icon_url) linkData.iconUrl = preview.icon_url;
      if (preview.description) linkData.description = preview.description;
      if (preview.link_provider) linkData.provider = preview.link_provider;
      if (preview.thumbnail_url) linkData.thumbnailUrl = preview.thumbnail_url;
    }

    return {
      type: "link",
      url: richText.href || richText.content,
      children: [
        {
          type: "text",
          value: richText.content,
        },
      ],
      data: Object.keys(linkData).length > 0 ? linkData : undefined,
    };
  }

  // Handle link_preview mentions (external links) - legacy support
  if (mention.type === "link_preview") {
    const linkData: any = {};
    
    if (mention.link_preview) {
      const preview = mention.link_preview;
      if (preview.title) linkData.title = preview.title;
      if (preview.icon_url) linkData.iconUrl = preview.icon_url;
      if (preview.description) linkData.description = preview.description;
      if (preview.provider) linkData.provider = preview.provider;
      if (preview.thumbnail_url) linkData.thumbnailUrl = preview.thumbnail_url;
    }

    return {
      type: "link",
      url: richText.href || richText.content,
      children: [
        {
          type: "text",
          value: richText.content,
        },
      ],
      data: Object.keys(linkData).length > 0 ? linkData : undefined,
    };
  }

  // Handle user mentions
  if (mention.type === "user") {
    const userData: any = {
      id: mention.user.id,
      name: mention.user.name,
    };
    if (mention.user.avatar_url) {
      userData.avatarUrl = mention.user.avatar_url;
    }

    return {
      type: "mention",
      mentionType: "user",
      value: richText.content,
      data: userData,
    };
  }

  // Handle date mentions
  if (mention.type === "date") {
    return {
      type: "mention",
      mentionType: "date",
      value: richText.content,
      data: {
        start: mention.date.start,
        end: mention.date.end || null,
        timeZone: mention.date.time_zone || null,
      },
    };
  }

  // Handle page mentions
  if (mention.type === "page") {
    const pageData: any = {
      ...mention.page,
    };
    
    // Add url if available
    if (richText.href) {
      pageData.url = richText.href;
    }

    return {
      type: "mention",
      mentionType: "page",
      value: richText.content,
      data: pageData,
    };
  }

  // Handle database mentions
  if (mention.type === "database") {
    return {
      type: "mention",
      mentionType: "database",
      value: richText.content,
      data: mention.database,
    };
  }

  // Fallback
  return {
    type: "text",
    value: richText.content,
  };
}
