/**
 * NBT Utility Functions
 */

import type {
  RichTextNode,
  TextAnnotations,
  MentionData,
  PageMention,
  LinkMention,
  DateMention,
  FileInfo,
  IconInfo,
  NodeMetadata,
} from '../types/nbt-types'

// Types imported from the old notion types (will need to adapt)
type NotionRichText = any // Will be replaced with proper import
type NotionBlock = any // Will be replaced with proper import

// Page info cache for mentions (migrated from old code)
const pageInfoCache = new Map<string, { title: string; icon: string }>()

/**
 * Extract metadata from a Notion block
 * @param block - The Notion block
 * @param includeMetadata - Whether to include metadata (default: false)
 */
export function extractMetadata(block: NotionBlock, includeMetadata: boolean = false): NodeMetadata | undefined {
  if (!includeMetadata) {
    return undefined
  }
  
  return {
    created_time: block.created_time,
    last_edited_time: block.last_edited_time,
    created_by: block.created_by?.id,
    last_edited_by: block.last_edited_by?.id,
    archived: block.archived,
    in_trash: block.in_trash,
  }
}

/**
 * Process Notion rich text array into NBT RichTextNode array
 */
export function processRichText(richText: NotionRichText[]): RichTextNode[] {
  if (!Array.isArray(richText)) return []
  
  return richText.map(chunk => {
    if (chunk.type === 'text') {
      const href = chunk.href || chunk.text?.link?.url
      const node: RichTextNode = {
        type: 'text',
        content: chunk.plain_text || chunk.text?.content || '',
        annotations: processAnnotations(chunk.annotations),
      }
      if (href) node.href = href
      return node
    } else if (chunk.type === 'equation') {
      const href = chunk.href
      const node: RichTextNode = {
        type: 'equation',
        content: chunk.plain_text || '',
        annotations: processAnnotations(chunk.annotations),
        ...(href && { href }),
        equation: {
          expression: chunk.equation?.expression || '',
        },
      }
      return node
    } else if (chunk.type === 'mention') {
      const href = chunk.href
      const node: RichTextNode = {
        type: 'mention',
        content: chunk.plain_text || '',
        annotations: processAnnotations(chunk.annotations),
        ...(href && { href }),
        mention: processMention(chunk.mention),
      }
      return node
    }
    
    // Fallback for unknown types
    const href = chunk.href
    const node: RichTextNode = {
      type: 'text',
      content: chunk.plain_text || '',
      annotations: processAnnotations(chunk.annotations),
    }
    if (href) node.href = href
    return node
  })
}

/**
 * Process Notion annotations into NBT TextAnnotations
 */
export function processAnnotations(
  annotations: any
): TextAnnotations | undefined {
  if (!annotations) return undefined
  
  const result: TextAnnotations = {}
  
  if (annotations.bold) result.bold = true
  if (annotations.italic) result.italic = true
  if (annotations.underline) result.underline = true
  if (annotations.strikethrough) result.strikethrough = true
  if (annotations.code) result.code = true
  if (annotations.color && annotations.color !== 'default') {
    result.color = annotations.color
  }
  
  return Object.keys(result).length > 0 ? result : undefined
}

/**
 * Process Notion mention into NBT MentionData
 */
export function processMention(mention: any): MentionData {
  if (!mention) {
    return {
      type: 'page',
      page: { id: 'unknown' },
    } as PageMention
  }
  
  if (mention.type === 'page') {
    const pageId = mention.page?.id || 'unknown'
    const cached = pageInfoCache.get(pageId)
    
    return {
      type: 'page',
      page: {
        id: pageId,
        title: cached?.title,
        icon: cached?.icon,
      },
    } as PageMention
  } else if (mention.type === 'link_mention') {
    return {
      type: 'link_mention',
      link_mention: {
        href: mention.link_mention?.href || '',
        title: mention.link_mention?.title || '',
        icon_url: mention.link_mention?.icon_url,
        description: mention.link_mention?.description,
        link_author: mention.link_mention?.link_author,
        link_provider: mention.link_mention?.link_provider,
        thumbnail_url: mention.link_mention?.thumbnail_url,
      },
    } as LinkMention
  } else if (mention.type === 'date') {
    return {
      type: 'date',
      date: {
        start: mention.date?.start || '',
        end: mention.date?.end,
        time_zone: mention.date?.time_zone,
      },
    } as DateMention
  } else if (mention.type === 'user') {
    return {
      type: 'user',
      user: {
        id: mention.user?.id || 'unknown',
        name: mention.user?.name,
        avatar_url: mention.user?.avatar_url,
      },
    }
  } else if (mention.type === 'database') {
    return {
      type: 'database',
      database: {
        id: mention.database?.id || 'unknown',
      },
    }
  }
  
  // Fallback
  return {
    type: 'page',
    page: { id: 'unknown' },
  } as PageMention
}

/**
 * Process Notion file/external into NBT FileInfo
 */
export function processFileInfo(fileData: any): FileInfo {
  if (!fileData) {
    return {
      type: 'external',
      url: '',
    }
  }
  
  if (fileData.type === 'file') {
    return {
      type: 'file',
      url: fileData.file?.url || '',
      expiry_time: fileData.file?.expiry_time,
    }
  } else if (fileData.type === 'external') {
    return {
      type: 'external',
      url: fileData.external?.url || '',
    }
  }
  
  // Fallback - check if url is directly on fileData
  if (fileData.url) {
    return {
      type: 'external',
      url: fileData.url,
    }
  }
  
  return {
    type: 'external',
    url: '',
  }
}

/**
 * Process Notion icon into NBT IconInfo
 */
export function processIconInfo(icon: any): IconInfo | undefined {
  if (!icon) return undefined
  
  if (icon.type === 'emoji') {
    return {
      type: 'emoji',
      emoji: icon.emoji || '',
    }
  } else if (icon.type === 'external') {
    return {
      type: 'external',
      url: icon.external?.url || '',
    }
  } else if (icon.type === 'file') {
    return {
      type: 'file',
      url: icon.file?.url || '',
    }
  }
  
  return undefined
}

/**
 * Cache page info for mentions
 */
export function cachePageInfo(pageId: string, title: string, icon: string): void {
  pageInfoCache.set(pageId, { title, icon })
}

/**
 * Get cached page info
 */
export function getCachedPageInfo(pageId: string): { title: string; icon: string } | undefined {
  return pageInfoCache.get(pageId)
}

/**
 * Clear page info cache
 */
export function clearPageInfoCache(): void {
  pageInfoCache.clear()
}
