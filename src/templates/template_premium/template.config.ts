// src/templates/template_premium/template.config.ts

export const templateId = 'template_premium'

export const routes = [
    '/',
    '/about',
    '/events',
    '/portrait',
    '/contact',
    '/academics',
    '/activities',
    '/infrastructure',
    '/faculty',
]

export function adaptData(schoolData: any) {
    return {
        school: schoolData,
    }
}
