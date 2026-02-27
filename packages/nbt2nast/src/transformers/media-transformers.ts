import type { NASTNode } from "../types";
import { transformRichText } from "../rich-text";

/**
 * Transforms an image block
 */
export function transformImage(
  blockId: string,
  properties: Record<string, any>,
  preserveBlockId: boolean = false
): NASTNode {
  const file = properties.file || {};
  const caption = properties.caption || [];

  const imageNode: any = {
    type: "image",
    url: file.url || "",
    title: null,
    alt: null,
    data: {
      fileType: file.type || "external",
    },
  };

  if (file.expiry_time) {
    imageNode.data.expiryTime = file.expiry_time;
  }

  if (caption.length > 0) {
    imageNode.data.caption = transformRichText(caption);
  }

  if (preserveBlockId) {
    imageNode.data.blockId = blockId;
  }

  return imageNode;
}

/**
 * Transforms a video block
 */
export function transformVideo(
  blockId: string,
  properties: Record<string, any>,
  preserveBlockId: boolean = false
): NASTNode {
  const file = properties.file || {};
  const caption = properties.caption || [];

  const videoNode: any = {
    type: "video",
    url: file.url || "",
    data: {
      fileType: file.type || "external",
    },
  };

  if (file.expiry_time) {
    videoNode.data.expiryTime = file.expiry_time;
  }

  if (caption.length > 0) {
    videoNode.data.caption = transformRichText(caption);
  }

  if (preserveBlockId) {
    videoNode.data.blockId = blockId;
  }

  return videoNode;
}

/**
 * Transforms a file block
 */
export function transformFile(
  blockId: string,
  properties: Record<string, any>,
  preserveBlockId: boolean = false
): NASTNode {
  const file = properties.file || {};
  const caption = properties.caption || [];

  const fileNode: any = {
    type: "file",
    url: file.url || "",
    name: properties.name || "",
    data: {
      fileType: file.type || "external",
    },
  };

  if (file.expiry_time) {
    fileNode.data.expiryTime = file.expiry_time;
  }

  if (caption.length > 0) {
    fileNode.data.caption = transformRichText(caption);
  }

  if (preserveBlockId) {
    fileNode.data.blockId = blockId;
  }

  return fileNode;
}


/**
 * Transforms a PDF block
 */
export function transformPDF(
  blockId: string,
  properties: Record<string, any>,
  preserveBlockId: boolean = false
): NASTNode {
  const file = properties.file || {};
  const caption = properties.caption || [];

  const pdfNode: any = {
    type: "pdf",
    url: file.url || "",
    data: {
      fileType: file.type || "external",
    },
  };

  if (file.expiry_time) {
    pdfNode.data.expiryTime = file.expiry_time;
  }

  if (caption.length > 0) {
    pdfNode.data.caption = transformRichText(caption);
  }

  if (preserveBlockId) {
    pdfNode.data.blockId = blockId;
  }

  return pdfNode;
}
