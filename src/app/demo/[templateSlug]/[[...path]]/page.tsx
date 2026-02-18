"use client";

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { templateRegistry } from '@/lib/template/registry';
import { demoSchoolData } from '@/lib/constants/demo-data';

export default function TemplateDemoPage({
    params,
}: {
    params: Promise<{ templateSlug: string; path?: string[] }>
}) {
    const { templateSlug, path: pathSegments } = use(params);

    const slug = templateSlug;
    const path = '/' + (pathSegments?.join('/') ?? '');

    const template = templateRegistry[slug];

    if (!template) {
        return notFound();
    }

    const { Renderer } = template;

    return (
        <Renderer
            data={demoSchoolData}
            path={path}
        />
    );
}
