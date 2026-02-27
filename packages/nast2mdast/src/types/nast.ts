/**
 * NAST to mdast Type Definitions
 *
 * Re-exports canonical types from @nast/types with aliases for backward compatibility.
 */

import type { NASTRoot, NASTNode } from '@nast/types';

/**
 * NAST Node type
 * @deprecated Use NASTNode from @nast/types instead
 */
export type NastNode = NASTNode;

/**
 * NAST Root type
 * @deprecated Use NASTRoot from @nast/types instead
 */
export type NastRoot = NASTRoot;

// Also re-export the canonical types for new code
export type { NASTRoot, NASTNode };
