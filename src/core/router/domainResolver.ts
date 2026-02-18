// src/core/router/domainResolver.ts
import domain_data from '../../lib/constants/constants'

export type RoutingMode = 'marketing' | 'demo' | 'tenant' | 'unknown'

export interface DomainResolutionResult {
    mode: RoutingMode
    domain?: string
    templateId?: string
}

export function resolveDomain(hostname: string): DomainResolutionResult {
    // normalize
    const domain = hostname.replace(/^www\./, '').toLowerCase()

    // Find matching domain in constants
    const match = domain_data.find(d => d.domain.toLowerCase() === domain)

    if (match) {
        return {
            mode: match.type === 'owner' ? 'marketing' : 'tenant',
            domain: match.domain,
            templateId: match.template_id
        }
    }

    return {
        mode: 'unknown',
        domain
    }
}
