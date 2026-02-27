/**
 * Type definitions for NAST (Notion AST)
 */

export interface NastNode {
  type: string;
  children?: NastNode[];
  value?: string;
  [key: string]: any;
}

export interface NastRoot extends NastNode {
  type: 'root';
  children: NastNode[];
  data?: {
    pageId?: string;
    title?: string;
    processedAt?: string;
    icon?: {
      type: string;
      value: string;
    };
  };
}
