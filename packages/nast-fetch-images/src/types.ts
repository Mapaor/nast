/**
 * NAST Fetch Images Type Definitions
 *
 * Re-exports canonical types from @nast/types for backward compatibility.
 */

export type {
  NASTImage,
  NASTNode,
  DownloadedImage,
  FetchImagesResult,
} from '@nast/types';

/**
 * Generic block type for traversal
 */
export interface Block {
  type: string;
  children?: Block[];
  [key: string]: any;
}
