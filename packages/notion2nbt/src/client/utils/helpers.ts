/**
 * Clean a Notion page/block ID by removing dashes
 */
export function cleanId(id: string): string {
  return id.replace(/-/g, '')
}

/**
 * Format a Notion ID with dashes (8-4-4-4-12 format)
 */
export function formatId(id: string): string {
  const clean = cleanId(id)
  if (clean.length !== 32) {
    return id // Return as-is if not a valid UUID
  }
  return `${clean.slice(0, 8)}-${clean.slice(8, 12)}-${clean.slice(12, 16)}-${clean.slice(16, 20)}-${clean.slice(20)}`
}

/**
 * Validate if a string is a valid Notion ID
 */
export function isValidId(id: string): boolean {
  const clean = cleanId(id)
  return /^[a-f0-9]{32}$/i.test(clean)
}
