/**
 * Domain lookup utilities for middleware routing
 */

import domain_data from '../constants/constants';

/**
 * Domain configuration interface
 */
export interface DomainConfig {
  domain: string;
  template_id: string;
  type: 'owner' | 'tenant';
}

/**
 * Normalizes a hostname by converting to lowercase and removing www prefix
 * 
 * @param hostname - The hostname to normalize
 * @returns Normalized hostname
 * 
 * @example
 * normalizeHostname("WWW.EXAMPLE.COM") // "example.com"
 * normalizeHostname("www.example.com") // "example.com"
 * normalizeHostname("example.com") // "example.com"
 */
function normalizeHostname(hostname: string): string {
  const lower = hostname.toLowerCase();
  return lower.startsWith('www.') ? lower.slice(4) : lower;
}

/**
 * Finds domain configuration in the school array
 * 
 * Searches the domain_data array for an exact match on the domain field.
 * Normalizes the hostname by converting to lowercase and removing www prefix
 * before matching.
 * 
 * @param hostname - The hostname to look up (e.g., "crescentthoothukudi.in", "www.eddesk.in")
 * @returns The matching DomainConfig or null if not found
 * 
 * @example
 * findDomainConfig("crescentthoothukudi.in") // { domain: "crescentthoothukudi.in", template_id: "template_modern", type: "tenant" }
 * findDomainConfig("www.crescentthoothukudi.in") // { domain: "crescentthoothukudi.in", template_id: "template_modern", type: "tenant" }
 * findDomainConfig("unknown-domain.com") // null
 */
export function findDomainConfig(hostname: string): DomainConfig | null {
  const normalized = normalizeHostname(hostname);
  
  // Search domain_data array for exact match
  const config = domain_data.find((entry) => {
    const entryDomain = normalizeHostname(entry.domain);
    return entryDomain === normalized;
  });
  
  return config ? (config as DomainConfig) : null;
}
