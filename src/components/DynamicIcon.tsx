'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import * as LucideIcons from 'lucide-react';

interface DynamicIconProps {
    icon: string;
    className?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ icon, className }) => {
    if (!icon) return null;

    // Check if it's an Iconify icon (usually has a colon like 'fluent:school-24-filled')
    if (icon.includes(':')) {
        return <Icon icon={icon} className={className} />;
    }

    // Try to find a Lucide icon (e.g. 'School', 'Book', etc.)
    // Note: Lucide icons are often PascalCase, while DB might store them in different formats.
    // We try a few common formats.
    const lucideName = icon.charAt(0).toUpperCase() + icon.slice(1);
    const LucideIcon = (LucideIcons as any)[lucideName] || (LucideIcons as any)[icon];

    if (LucideIcon) {
        return <LucideIcon className={className} />;
    }

    // Fallback: If it's a raw string that might be an Iconify icon without colon (unlikely but possible)
    // or if we just want to try rendering it as Iconify anyway.
    return <Icon icon={icon} className={className} />;
};

export default DynamicIcon;
