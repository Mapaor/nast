/**
 * Process types re-exported from @nast/types for backward compatibility
 */
export type {
  NBTProcessResult as ProcessResult,
  NBTProcessMetadata as ProcessMetadata,
  NBTProcessError as ProcessError,
  NBTProcessOptions as ProcessOptions,
  NBTGetPageOptions as GetPageOptions,
} from '@nast/types';

// Re-export NotionBlock for backward compatibility
export type { NBTBlock as NotionBlock } from '@nast/types';
