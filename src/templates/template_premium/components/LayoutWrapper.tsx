import React from 'react';

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="font-sans selection:bg-signature-gold selection:text-white overflow-x-hidden">
            {children}
        </div>
    );
};

export default LayoutWrapper;
