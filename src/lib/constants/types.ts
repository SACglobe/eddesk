import { SchoolContentV1 } from '../../../school-content.schema';

export type SchoolContent = Omit<{
    hero_media: {
        media_type: string;
        media_url: string;
        headline: string;
        subheadline: string;
        primary_button_text: string;
        primary_button_url: string;
        secondary_button_text: string;
        secondary_button_url: string;
        display_order: number;
        is_active: boolean;
    }[];
    meta: {
        motto?: string;
    };
    leadership: {
        management: {
            name: string;
            role: string;
            photo: string;
            message: string;
        }[];
    };
    statistics: {
        label: string;
        value: string;
    }[];
    achievements: {
        school: {
            title: string;
            description: string;
            year: string;
        }[];
        students: {
            title: string;
            category: string;
            year: string;
            image: string;
        }[];
    };
    broadcast: {
        runningMessage: string;
        announcements: {
            title: string;
            description: string;
            publishDate: string;
        }[];
    };
    infrastructure: {
        labs: string[];
        classrooms: string[];
        playground: string[];
    };
    faculty: {
        teachers: {
            name: string;
            subject: string;
            photo: string;
        }[];
    };
    academics: {
        curriculum: string;
        schoolTimings: {
            period: string;
            time: string;
        }[];
    };
    admission: {
        feePaymentUrl?: string;
        formFields: {
            label: string;
            type: string;
            required: boolean;
        }[];
    };
}, 'infrastructure'> & SchoolContentV1;
