export interface RichTextNode {
  type: 'text' | 'equation' | 'mention'
  content: string
  annotations?: TextAnnotations
  href?: string
  mention?: MentionData
  equation?: EquationData
}

export interface TextAnnotations {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  color?: NotionColor
}

export type NotionColor =
  | 'default'
  | 'gray'
  | 'brown'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red'
  | 'gray_background'
  | 'brown_background'
  | 'orange_background'
  | 'yellow_background'
  | 'green_background'
  | 'blue_background'
  | 'purple_background'
  | 'pink_background'
  | 'red_background'

export interface EquationData {
  expression: string
}

export type MentionData = PageMention | LinkMention | DateMention | UserMention | DatabaseMention

export interface PageMention {
  type: 'page'
  page: {
    id: string
    title?: string
    icon?: string
  }
}

export interface LinkMention {
  type: 'link_mention'
  link_mention: {
    href: string
    title: string
    icon_url?: string
    description?: string
    link_author?: string
    link_provider?: string
    thumbnail_url?: string
  }
}

export interface DateMention {
  type: 'date'
  date: {
    start: string
    end?: string
    time_zone?: string | null
  }
}

export interface UserMention {
  type: 'user'
  user: {
    id: string
    name?: string
    avatar_url?: string
  }
}

export interface DatabaseMention {
  type: 'database'
  database: {
    id: string
    title?: string
  }
}
