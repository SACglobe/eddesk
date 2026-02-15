
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
        Renderer: dynamic(() => import('../../templates/template_classic/renderer')), // Lazy load renderer
        routes: ['/', '/about', '/admission']
    }
};

