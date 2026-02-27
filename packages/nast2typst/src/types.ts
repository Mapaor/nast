// NAST Types
export interface NASTRoot {
  type: "root";
  children: NASTNode[];
  data: {
    pageId: string;
    title: string;
    icon?: {
      type: "emoji" | "file" | "external";
      value: string;
    };
    processedAt: string;
  };
}

export type NASTNode =
  | NASTParagraph
  | NASTHeading
  | NASTText
  | NASTStrong
  | NASTEmphasis
  | NASTUnderline
  | NASTDelete
  | NASTInlineCode
  | NASTLink
  | NASTMention
  | NASTMath
  | NASTInlineMath
  | NASTCode
  | NASTBlockquote
  | NASTCallout
  | NASTToggle
  | NASTList
  | NASTListItem
  | NASTColumnList
  | NASTColumn
  | NASTImage
  | NASTThematicBreak
  | NASTTable
  | NASTTableRow
  | NASTTableCell
  | NASTChildPage
  | NASTVideo
  | NASTFile
  | NASTPDF
  | NASTBookmark
  | NASTEmbed;

export interface NASTParagraph {
  type: "paragraph";
  children: NASTNode[];
  data?: {
    blockId?: string;
  };
}

export interface NASTHeading {
  type: "heading";
  depth: 1 | 2 | 3;
  children: NASTNode[];
  isToggleable?: boolean; // New property to indicate if this heading is also a toggle
  data?: {
    blockId?: string;
  };
}

export interface NASTText {
  type: "text";
  value: string;
  data?: {
    color?: string;
    backgroundColor?: string;
  };
}

export interface NASTStrong {
  type: "strong";
  children: NASTNode[];
}

export interface NASTEmphasis {
  type: "emphasis";
  children: NASTNode[];
}

export interface NASTUnderline {
  type: "underline";
  children: NASTNode[];
}

export interface NASTDelete {
  type: "delete";
  children: NASTNode[];
}

export interface NASTInlineCode {
  type: "inlineCode";
  value: string;
}

export interface NASTLink {
  type: "link";
  url: string;
  children: NASTNode[];
  data?: {
    title?: string;
    iconUrl?: string;
    description?: string;
    provider?: string;
    thumbnailUrl?: string;
  };
}

export interface NASTMention {
  type: "mention";
  mentionType: "user" | "date" | "page" | "database";
  value: string;
  data: unknown;
}

export interface NASTMath {
  type: "math";
  value: string;
  data?: {
    blockId?: string;
  };
}

export interface NASTInlineMath {
  type: "inlineMath";
  value: string;
}

export interface NASTCode {
  type: "code";
  lang: string;
  value: string;
  data?: {
    caption?: NASTNode[];
    blockId?: string;
  };
}

export interface NASTBlockquote {
  type: "blockquote";
  children: NASTNode[];
  data?: {
    blockId?: string;
  };
}

export interface NASTCallout {
  type: "callout";
  data: {
    icon: {
      type: "emoji";
      value: string;
    } | null;
    color: string;
    blockId?: string;
  };
  children: NASTNode[];
}

export interface NASTToggle {
  type: "toggle";
  children: NASTNode[];
  data?: {
    blockId?: string;
  };
}

export interface NASTList {
  type: "list";
  ordered: boolean;
  children: NASTListItem[];
}

export interface NASTListItem {
  type: "listItem";
  children: NASTNode[];
  checked?: boolean | undefined;
  data?: {
    blockId?: string;
  };
}

export interface NASTColumnList {
  type: "columnList";
  children: NASTColumn[];
  data?: {
    blockId?: string;
  };
}

export interface NASTColumn {
  type: "column";
  widthRatio: number;
  children: NASTNode[];
  data?: {
    blockId?: string;
  };
}

export interface NASTImage {
  type: "image";
  url: string;
  title: string | null | undefined;
  alt: string | null | undefined;
  data: {
    fileType: "file" | "external";
    expiryTime?: string;
    caption?: NASTNode[];
    blockId?: string;
  };
}

export interface NASTThematicBreak {
  type: "thematicBreak";
  data?: {
    blockId?: string;
  };
}

export interface NASTTable {
  type: "table";
  hasColumnHeader: boolean;
  hasRowHeader: boolean;
  children: NASTTableRow[];
  data?: {
    blockId?: string;
  };
}

export interface NASTTableRow {
  type: "tableRow";
  children: NASTTableCell[];
}

export interface NASTTableCell {
  type: "tableCell";
  children: NASTNode[];
}

export interface NASTChildPage {
  type: "childPage";
  title: string;
  pageId: string;
  data?: {
    blockId?: string;
  };
}

export interface NASTVideo {
  type: "video";
  url: string;
  data: {
    fileType: "file" | "external";
    expiryTime?: string;
    caption?: NASTNode[];
    blockId?: string;
  };
}

export interface NASTFile {
  type: "file";
  url: string;
  name: string;
  data: {
    fileType: "file" | "external";
    expiryTime?: string;
    caption?: NASTNode[];
    blockId?: string;
  };
}

export interface NASTPDF {
  type: "pdf";
  url: string;
  data: {
    fileType: "file" | "external";
    expiryTime?: string;
    caption?: NASTNode[];
    blockId?: string;
  };
}

export interface NASTBookmark {
  type: "bookmark";
  url: string;
  data?: {
    caption?: NASTNode[];
    blockId?: string;
  };
}

export interface NASTEmbed {
  type: "embed";
  url: string;
  data?: {
    caption?: NASTNode[];
    blockId?: string;
  };
}
