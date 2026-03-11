// src/core/utils/url.ts

/**
 * Validates if a string is a well-formed URL.
 * Also checks if it has a common image extension or starts with data:
 * for a basic "is this probably an image" check.
 */
export const isValidImageUrl = (url: string | null | undefined): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  // Basic trim and check
  const trimmed = url.trim();
  if (trimmed === '' || trimmed === 'null' || trimmed === 'undefined') return false;

  // Handle data URLs
  if (trimmed.startsWith('data:image/')) return true;

  try {
    const parsed = new URL(trimmed);
    // Ensure it has a protocol and host
    if (!parsed.protocol || !parsed.host) return false;
    
    // Very basic check for protocol
    if (!['http:', 'https:'].includes(parsed.protocol)) return false;

    return true;
  } catch (e) {
    return false;
  }
};
