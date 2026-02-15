
"use client";
import React, { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { TEMPLATE_REGISTRY } from '@/templates/registry';
import { demoSchoolData } from '@/lib/constants/demo-data';

export default function TemplateDemoPage() {
    const params = useParams();
    const [Renderer, setRenderer] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const slug = typeof params.templateSlug === 'string' ? params.templateSlug : params.templateSlug?.[0];
    const pathSegments = params.path as string[] || [];
    const currentPath = '/' + pathSegments.join('/');

    useEffect(() => {
        if (slug && TEMPLATE_REGISTRY[slug as keyof typeof TEMPLATE_REGISTRY]) {
            TEMPLATE_REGISTRY[slug as keyof typeof TEMPLATE_REGISTRY]().then((mod: any) => {
                setRenderer(() => mod.Renderer);
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [slug]);

    if (loading) return <div>Loading Template...</div>;

    if (!slug || !Renderer) {
        return notFound();
    }

    return (
        <Renderer
            data={demoSchoolData}
            path={currentPath}
        />
    );
}
