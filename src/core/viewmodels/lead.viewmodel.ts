/**
 * lead.viewmodel.ts
 * Logic for capturing and persisting leads in the demo environment.
 */

export interface LeadData {
    name: string;
    email: string;
    phone: string;
    message: string;
    templateSlug: string;
    timestamp: string;
}

const STORAGE_KEY = 'eddesk_demo_leads';

export const leadViewModel = {
    /**
     * Submit a lead and persist to localStorage (simulating an API).
     */
    async submitLead(data: LeadData): Promise<{ success: boolean; message: string }> {
        try {
            const existingLeads: LeadData[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            existingLeads.push(data);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(existingLeads));

            return { success: true, message: 'Thank you! We will contact you soon.' };
        } catch (error) {
            console.error('Lead submission failed:', error);
            return { success: false, message: 'Something went wrong. Please try again.' };
        }
    },

    /**
     * Check if the lead capture popup should be shown.
     * Only hidden if user has already submitted a lead.
     */
    shouldShowPopup(): boolean {
        if (typeof window === 'undefined') return false;
        const leads = localStorage.getItem(STORAGE_KEY);
        return !leads || JSON.parse(leads).length === 0;
    }
};
