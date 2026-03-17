/**
 * sectionValidator.ts
 * Logic to ensure required sections have data before rendering.
 */

import { TenantViewModel } from '../viewmodels/tenant.viewmodel';

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
                const results = tenant.schoolAchievements || [];
                // Respect both 'category' and 'type' filters, prioritizing 'category' (EdDesk v2.0)
                const filterVal = comp.config?.filters?.category || comp.config?.filters?.type;
                if (filterVal) {
                    data = results.filter(a => a.category?.toLowerCase() === filterVal.toLowerCase());
                } else {
                    data = results;
                }
                break;
            }
            case 'faculty':
                data = tenant.faculty;
                break;
            case 'leadership':
            case 'governance': {
                const results = tenant.leadership || [];
                const designationFilter = comp.config?.filters?.designation;
                if (designationFilter === 'Principal') {
                    data = tenant.principal;
                } else if (designationFilter === 'Chairman') {
                    data = tenant.chairman;
                } else if (designationFilter) {
                    data = results.filter(l => 
                        l.role?.toLowerCase() === designationFilter.toLowerCase() ||
                        l.designation?.toLowerCase() === designationFilter.toLowerCase()
                    );
                } else {
                    data = results;
                }
                break;
            }
            case 'schoolidentity':
            case 'identity':
                data = tenant.identity;
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
                const results = tenant.gallery || [];
                const contentTypeFilter = comp.config?.filters?.contenttype;
                if (contentTypeFilter) {
                    data = results.filter(g => g.mediaType?.toLowerCase() === contentTypeFilter.toLowerCase());
                } else {
                    data = results;
                }
                break;
            }
            case 'events':
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
                data = tenant.boardMembers;
                break;
            case 'whychooseus':
                data = tenant.whyChooseUs;
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
            return {
                isValid: false,
                missingSection: code,
            };
        }
    }

    return { isValid: true };
}
