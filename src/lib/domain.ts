/**
 * Domain and Multi-tenancy Utilities
 */

export const OWNER_DOMAINS = ['eddesk.in', 'localhost', '127.0.0.1', '192.168.1.6'];
export const OWNER_BASE_URL = 'https://www.eddesk.in';

/**
 * Normalizes a host string for domain comparison.
 * Removes 'www.' prefix and any port suffix.
 */
export function normalizeDomain(host: string): string {
    if (!host) return '';
    return host.toLowerCase().replace(/^www\./, '').split(':')[0];
}

/**
 * Checks if a normalized domain is one of the owner/marketing domains.
 */
export function isOwnerDomain(domain: string): boolean {
    return OWNER_DOMAINS.includes(domain);
}

/**
 * Returns the correct base URL for a given host.
 */
export function getBaseUrl(host: string): string {
    const domain = normalizeDomain(host);
    if (isOwnerDomain(domain)) {
        return OWNER_BASE_URL;
    }
    // For tenants, we assume HTTPS unless it's localhost (which should be handled via OWNER_DOMAINS)
    return `https://${host}`;
}
