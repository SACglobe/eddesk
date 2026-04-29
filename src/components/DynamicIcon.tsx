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

    // Normalize and trim
    let iconName = icon.trim();

    // 1. Safe Mapping for common school keywords and problematic shorthand
    // This ensures that even if a user types "school" or "student", we show a high-quality icon.
    const safeMappings: Record<string, string> = {
        'school': 'material-symbols:school',
        'student': 'material-symbols:person',
        'teacher': 'material-symbols:school',
        'users': 'lucide:users',
        'graduation': 'lucide:graduation-cap',
        'book': 'material-symbols:book',
        'sports': 'material-symbols:sports-soccer',
        'soccer': 'material-symbols:sports-soccer',
        'fluent:school': 'material-symbols:school',
        'fluent:student': 'material-symbols:person',
        'fluent:teacher': 'material-symbols:school',
    };

    const lowerName = iconName.toLowerCase();
    if (safeMappings[lowerName]) {
        iconName = safeMappings[lowerName];
    } else if (iconName.startsWith('fluent:') && !iconName.includes('-')) {
        // Broad fix for other Fluent icons: append standard suffix if missing
        iconName = `${iconName}-24-regular`;
    }

    // 2. Lucide Direct Check (Case-insensitive)
    const lucideName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    const LucideIcon = (LucideIcons as any)[lucideName] || (LucideIcons as any)[iconName];

    if (LucideIcon) {
        return <LucideIcon className={className} />;
    }

    // 3. Iconify / General Render
    // We use 1.1em to give it slightly more presence while remaining parent-controlled
    return (
        <Icon 
            icon={iconName} 
            className={className} 
            width="1.1em" 
            height="1.1em" 
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
        />
    );
};

export default DynamicIcon;
