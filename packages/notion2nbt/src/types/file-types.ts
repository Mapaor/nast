export interface FileInfo {
  type: 'file' | 'external'
  url: string
  expiry_time?: string
}

export interface IconInfo {
  type: 'emoji' | 'external' | 'file'
  emoji?: string
  url?: string
}
