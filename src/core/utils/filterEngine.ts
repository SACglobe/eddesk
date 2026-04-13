/**
 * Robust filtering engine for dynamic component data.
 * Supports legacy flat filters, new Logic/Conditions structure, and field mapping.
 */

export const evaluateFilters = (items: any[], filters: any): any[] => {
    if (!items || !Array.isArray(items)) return [];
    if (!filters || (!filters.conditions && Object.keys(filters).length === 0)) {
        return items;
    }

    // 1. Handle new Logic/Conditions structure
    if (filters.conditions && Array.isArray(filters.conditions)) {
        const { logic = 'AND', conditions } = filters;

        return items.filter(item => {
            const results = conditions.map((cond: any) => {
                const { field, operator, value } = cond;
                
                // Map logical field names to item keys if they differ
                let itemKey = field;
                if (field === 'contenttype') itemKey = (item.mediaType !== undefined) ? 'mediaType' : 'contenttype';
                if (field === 'category' && item.category === undefined && item.achievementType !== undefined) itemKey = 'achievementType';

                const itemValue = item[itemKey];

                switch (operator) {
                    case 'equals':
                        return String(itemValue || '').toLowerCase() === String(value || '').toLowerCase();
                    case 'notequals':
                        return String(itemValue || '').toLowerCase() !== String(value || '').toLowerCase();
                    case 'contains':
                        return String(itemValue || '').toLowerCase().includes(String(value || '').toLowerCase());
                    case 'in':
                        const values = Array.isArray(value) ? value : [value];
                        return values.some(v => String(v).toLowerCase() === String(itemValue || '').toLowerCase());
                    default:
                        return true;
                }
            });

            return logic === 'OR' ? results.some(r => r) : results.every(r => r);
        });
    }

    // 2. Handle legacy flat filters (e.g., { category: 'sports' })
    return items.filter(item => {
        return Object.entries(filters).every(([key, value]) => {
            let itemKey = key;
            if (key === 'contenttype') itemKey = (item.mediaType !== undefined) ? 'mediaType' : 'contenttype';
            if (key === 'category' && item.category === undefined && item.achievementType !== undefined) itemKey = 'achievementType';
            
            return String(item[itemKey] || '').toLowerCase() === String(value || '').toLowerCase();
        });
    });
};
