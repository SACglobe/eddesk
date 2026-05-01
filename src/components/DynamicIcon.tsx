'use client';

import React from 'react';
import { Icon as IconifyIcon } from '@iconify/react';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';
import FluentIcon from './FluentIcon';

interface DynamicIconProps extends LucideProps {
    icon: string;
    className?: string;
    size?: string | number;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ icon: name, className, size, ...props }) => {
    if (!name) return <LucideIcons.HelpCircle className={className} {...(props as any)} />;

    // Normalize and trim
    let iconName = name.trim();

    // Support common educational keywords with safe mappings (Fallback/Enhancement)
    const safeMappings: Record<string, string> = {
        'school': 'material-symbols:school',
        'student': 'material-symbols:person',
        'teacher': 'material-symbols:school',
        'users': 'lucide:users',
        'graduation': 'lucide:graduation-cap',
        'book': 'material-symbols:book',
        'sports': 'material-symbols:sports-soccer',
        'soccer': 'material-symbols:sports-soccer',
    };

    const lowerName = iconName.toLowerCase();
    if (safeMappings[lowerName]) {
        iconName = safeMappings[lowerName];
    }

    // 1. Support Fluent 3D icons
    if (iconName.startsWith("fluent:")) {
        return <FluentIcon name={iconName} size={+(size || 24)} className={className} style={props.style} />;
    }

    // 2. Support generic Iconify icons (e.g. "streamline-plump-color:...")
    if (iconName.includes(':')) {
        return (
            <IconifyIcon 
                icon={iconName} 
                width={size || "1.1em"} 
                height={size || "1.1em"} 
                className={className}
                style={{ ...props.style, display: 'inline-block', verticalAlign: 'middle' }}
            />
        );
    }

    // 3. Try to find the icon by name in Lucide (Case-insensitive)
    const lucideName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    const IconComponent = (LucideIcons as any)[lucideName] || (LucideIcons as any)[iconName];

    if (!IconComponent) {
        // Fallback to a default
        return <LucideIcons.HelpCircle className={className} size={size} {...(props as any)} />;
    }

    return <IconComponent className={className} size={size} {...(props as any)} />;
};

export default DynamicIcon;
