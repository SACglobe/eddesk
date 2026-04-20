/**
 * sectionValidator.ts
 * Logic to ensure required sections have data before rendering.
 */

import { TenantViewModel } from '../viewmodels/tenant.viewmodel';
import { evaluateFilters } from './filterEngine';

/** Result of the validation */
export interface ValidationResult {
    isValid: boolean;
    missingSection?: string; // The code of the first missing required section
}

export function validateRequiredSections(tenant: TenantViewModel): ValidationResult {
    // 1. Get components for the current screen (home, about, etc.)
    const components = tenant.components || [];

    // 2. Filter for enabled and required components
    const requiredComponents = components.filter(c => c.isActive && c.isRequired);

    for (const comp of requiredComponents) {
        const code = comp.componentCode?.toLowerCase();
        const config = comp.config || {};
        const filters = config.filters || {};

        // Perform existence check based on component code
        let hasData = false;
        let data: any = null;

        // Map component code to data check
        switch (code) {
            case 'hero':
                data = tenant.heroMedia;
                break;
            case 'broadcast':
                data = tenant.broadcast;
                break;
            case 'academics':
            case 'academicresults':
                data = tenant.academicResults;
                break;
            case 'achievements':
            case 'schoolachievements': {
                data = evaluateFilters(tenant.schoolAchievements || [], filters);
                break;
            }
            case 'faculty':
                data = tenant.faculty;
                break;
            case 'leadership':
            case 'principalmessage':
            case 'governance': {
                // Handle complex filters or legacy designation filter
                if (filters.conditions) {
                    data = evaluateFilters(tenant.leadership || [], filters);
                } else if (filters.designation === 'Principal') {
                    data = tenant.principal;
                } else if (filters.designation === 'Chairman') {
                    data = tenant.chairman;
                } else {
                    data = tenant.leadership;
                }
                break;
            }
            case 'schoolidentity':
            case 'identity':
            case 'visionmission':
                // identity is an object - check if it has any actual content strings
                data = (tenant.identity?.vision || tenant.identity?.mission || tenant.identity?.motto || tenant.identity?.aboutTitle) ? tenant.identity : null;
                break;
            case 'stats':
            case 'stats_premium':
            case 'schoolstats':
                data = tenant.stats;
                break;
            case 'infrastructure':
            case 'facilities':
                data = tenant.infrastructure;
                break;
            case 'activities':
                data = tenant.activities;
                break;
            case 'gallery': {
                data = evaluateFilters(tenant.gallery || [], filters);
                break;
            }
            case 'events':
            case 'recentnews':
                data = tenant.events;
                break;
            case 'contact':
            case 'contactdetails':
                data = tenant.contactDetails;
                break;
            case 'testimonials':
            case 'testimonial':
                data = tenant.testimonials;
                break;
            case 'boardmembers':
            case 'boardmembersmessage':
                data = evaluateFilters(tenant.leadership || [], filters);
                // Fallback to boardmembers if local table still exists in some payloads
                if ((!data || data.length === 0) && tenant.boardMembers?.length > 0) {
                    data = tenant.boardMembers;
                }
                break;
            case 'whychooseus':
                data = tenant.whyChooseUs;
                break;
            case 'admissioninstructions':
                data = tenant.admissionInstructions;
                break;
            default:
                // Fallback: try to find it at top level if it's dynamic
                data = (tenant as any)[code];
        }

        // Existence check
        if (Array.isArray(data)) {
            hasData = data.length > 0;
        } else if (data && typeof data === 'object') {
            hasData = Object.keys(data).length > 0;
        } else {
            hasData = !!data;
        }

        // 4. If required but no data, it's invalid
        if (!hasData) {
            console.warn(`[validator] Required section "${code}" is missing data.`);
            console.debug(`[validator] Details for "${code}":`, {
                hasData,
                dataType: Array.isArray(data) ? 'array' : typeof data,
                dataLength: Array.isArray(data) ? data.length : 'n/a',
                isRequired: comp.isRequired,
                isActive: comp.isActive
            });
            return {
                isValid: false,
                missingSection: comp.label || code,
            };
        }
    }

    return { isValid: true };
}
