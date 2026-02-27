export interface NotionBlock {
  id: string
  type: string
  properties: Record<string, any>
  children?: NotionBlock[]
  metadata?: NodeMetadata
  processed_at?: string
}

export interface NodeMetadata {
  created_time?: string
  last_edited_time?: string
  created_by?: string
  last_edited_by?: string
  archived?: boolean
  in_trash?: boolean
}
