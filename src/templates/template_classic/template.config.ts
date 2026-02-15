// src/templates/template_classic/template.config.ts

export const templateId = 'template_classic'

export const routes = [
    '/',
    '/about',
    '/events',
    '/admissions',
    '/contact',
]

export function adaptData(schoolData: any) {
    // Phase 0: return static or lightly mapped data
    return {
        school: schoolData,
    }
}
