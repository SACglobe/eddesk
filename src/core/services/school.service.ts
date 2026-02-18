// src/core/services/school.service.ts

export interface SchoolTenant {
    id: string
    domain: string
    templateId: 'template_classic' | 'template_modern' | 'template_premium'
}

const LOCAL_SCHOOLS: SchoolTenant[] = [
    {
        id: 'demo-school-1',
        domain: 'crescentthoothukudi.in',
        templateId: 'template_classic',
    },
]

export async function getSchoolByDomain(
    domain: string
): Promise<SchoolTenant | null> {
    return LOCAL_SCHOOLS.find(s => s.domain === domain) ?? null
}
