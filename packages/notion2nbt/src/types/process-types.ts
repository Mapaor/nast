import type { NotionBlock } from './core-types'

export interface ProcessResult {
  nodes: NotionBlock[]
  metadata: ProcessMetadata
}

export interface ProcessMetadata {
  processed_blocks: number
  total_blocks: number
  errors: ProcessError[]
  warnings: string[]
  processing_time_ms?: number
}

export interface ProcessError {
  block_id?: string
  block_type?: string
  message: string
  error?: any
}

export interface ProcessOptions {
  /** Maximum depth for recursive children processing (default: unlimited) */
  maxDepth?: number
  
  /** Whether to include metadata (default: false) */
  includeMetadata?: boolean
  
  /** Progress callback */
  onProgress?: (current: number, total: number) => void
  
  /** Error callback */
  onError?: (error: ProcessError) => void
}

export interface GetPageOptions extends ProcessOptions {
  /** Whether to fetch missing blocks recursively (default: true) */
  fetchMissingBlocks?: boolean
  
  /** Whether to fetch collections/databases (default: false) */
  fetchCollections?: boolean
  
  /** Force refresh and bypass cache (default: false) */
  forceRefresh?: boolean
  
  /** Whether to sign file URLs (default: false) */
  signFileUrls?: boolean
  
  /** Whether to fetch relation pages (default: false) */
  fetchRelationPages?: boolean
}
