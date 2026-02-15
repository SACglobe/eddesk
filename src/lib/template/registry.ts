
import { SchoolContent } from '../constants/types';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

export interface TemplateConfig {
    id: string;
    name: string;
    // Renderer accepts data and optional path
    Renderer: ComponentType<{ data: SchoolContent; path?: string }>;
    routes: string[];
}

export const templateRegistry: Record<string, TemplateConfig> = {
    template_classic: {
        id: 'template_classic',
        name: 'Classic School',
        Renderer: dynamic(() => import('../../templates/template_classic').then(mod => mod.Renderer)), // Lazy load renderer
        routes: ['/', '/about', '/admission', '/contact', '/broadcast']
    },
    template_modern: {
        id: 'template_modern',
        name: 'Modern School',
        Renderer: dynamic(() => import('../../templates/template_modern').then(mod => mod.Renderer)),
        routes: ['/', '/about', '/admission', '/contact', '/academics']
    },
    template_premium: {
        id: 'template_premium',
        name: 'Premium School',
        Renderer: dynamic(() => import('../../templates/template_premium').then(mod => mod.Renderer)),
        routes: ['/', '/about', '/admission', '/contact']
    }
};

