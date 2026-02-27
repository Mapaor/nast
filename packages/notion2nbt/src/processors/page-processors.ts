/**
 * Page Processor
 */

import type { PageNode, PageProperties } from '../types/page-node-types'
import type { NotionBlock } from '../types/core-types'
import { processIconInfo, processFileInfo, extractMetadata } from '../utils/nbt-utils'

/** 
 * @param pageResponse - Raw Notion API page response
 * @param children - Array of child blocks (already processed as NotionBlocks)
 * @param includeMetadata - Whether to include metadata fields
 * @returns PageNode with type: 'page' and children array
 */
export function processPageToNBT(
  pageResponse: any,
  children: NotionBlock[] = [],
  includeMetadata: boolean = false
): PageNode {
  const pageId = pageResponse.id

  // Extract title
  let title = 'Untitled'
  try {
    if (pageResponse.properties?.title?.title) {
      // Standard page title: properties.title.title is the array of rich text
      const titleArray = pageResponse.properties.title.title
      if (Array.isArray(titleArray)) {
        const titleText = titleArray
          .map((chunk: any) => chunk.plain_text || '')
          .join('')
        if (titleText.trim()) {
          title = titleText.trim()
        }
      }
    } else if (pageResponse.properties?.Name) {
      // For database pages (Not fully implemented yet)
      const nameProp = pageResponse.properties.Name
      if (nameProp.title && Array.isArray(nameProp.title)) {
        const nameText = nameProp.title
          .map((chunk: any) => chunk.plain_text || '')
          .join('')
        if (nameText.trim()) {
          title = nameText.trim()
        }
      }
    }
  } catch (error) {
    console.warn('Error extracting page title:', error)
  }

  // Build page properties
  const properties: PageProperties = {
    title,
  }

  // Extract icon
  if (pageResponse.icon) {
    properties.icon = processIconInfo(pageResponse.icon)
  }

  // Extract cover
  if (pageResponse.cover) {
    properties.cover = processFileInfo(pageResponse.cover)
  }

  // Store all other properties for reference (e.g., database properties)
  if (pageResponse.properties) {
    // Add all Notion properties to the page properties
    // This preserves database properties and other custom fields
    Object.assign(properties, { notionProperties: pageResponse.properties })
  }

  // Build the page node
  const pageNode: PageNode = {
    id: pageId,
    type: 'page',
    properties,
    children: children.length > 0 ? children : undefined,
  }

  // Add metadata if requested
  if (includeMetadata) {
    pageNode.metadata = extractMetadata(pageResponse, true)
  }

  return pageNode
}
