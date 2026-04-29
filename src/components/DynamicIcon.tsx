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

    // Normalize icon name and trim whitespace
    let iconName = icon.trim();

    // Check if it's an Iconify icon (usually has a colon)
    if (iconName.includes(':')) {
        // Fix common missing suffixes for Fluent icons
        if (iconName.startsWith('fluent:') && !iconName.includes('-')) {
            // "fluent:school" is a common incomplete name, map it to building-school for better reliability
            if (iconName === 'fluent:school') {
                iconName = 'fluent:building-school-24-filled';
            } else {
                iconName = `${iconName}-24-regular`;
            }
        }
        return <Icon icon={iconName} className={className} width="1em" height="1em" />;
    }

    // Try to find a Lucide icon (e.g. 'School', 'Book', etc.)
    const lucideName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    const LucideIcon = (LucideIcons as any)[lucideName] || (LucideIcons as any)[iconName];

    if (LucideIcon) {
        return <LucideIcon className={className} />;
    }

    // Fallback: If it's a raw string, try rendering it as Iconify anyway
    return <Icon icon={iconName} className={className} width="1em" height="1em" />;
};

export default DynamicIcon;
