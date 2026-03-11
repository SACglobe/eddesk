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

/**
 * Resolves an image URL. If the URL is relative (doesn't start with http/https/data:),
 * it prepends the Supabase public storage base URL.
 */
export const resolveImageUrl = (url: string | null | undefined, bucket: string = 'public'): string => {
  if (!url || typeof url !== 'string') return '';
  
  const trimmed = url.trim();
  if (trimmed === '' || trimmed === 'null' || trimmed === 'undefined') return '';

  // Return as-is if it's already a full URL or data URL
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:')) {
    return trimmed;
  }

  // Otherwise, assume it's a relative path in a Supabase storage bucket
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return trimmed;

  // Clean slash to avoid double slashes
  const base = supabaseUrl.replace(/\/$/, '');
  const path = trimmed.replace(/^\//, '');
  
  return `${base}/storage/v1/object/public/${bucket}/${path}`;
};
