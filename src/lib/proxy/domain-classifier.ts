/**
 * Domain classification utilities for proxy routing
 */

/**
 * Determines if a hostname is an owner domain (EdDesk platform domain)
 * 
 * Owner domains are identified by containing "localhost" or "eddesk" (case-insensitive).
 * This includes:
 * - localhost (with or without port)
 * - eddesk.in and any subdomains
 * 
 * @param hostname - The hostname to check (e.g., "localhost:3000", "www.eddesk.in")
 * @returns true if the hostname is an owner domain, false otherwise
 * 
 * @example
 * isOwnerDomain("localhost:3000") // true
 * isOwnerDomain("eddesk.in") // true
 * isOwnerDomain("www.eddesk.in") // true
 * isOwnerDomain("crescentthoothukudi.in") // false
 */
export function isOwnerDomain(hostname: string): boolean {
  const lowerHostname = hostname.toLowerCase();
  return (
    lowerHostname.includes('localhost') || 
    lowerHostname.includes('eddesk') || 
    lowerHostname.includes('127.0.0.1') || 
    lowerHostname.includes('::1')
  );
}
