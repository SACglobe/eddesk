// src/app/(marketing)/layout.tsx
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen selection:bg-indigo-500/30">
      {/* Background blobs — shared by all marketing pages */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-blob" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-purple-600/10 blur-[120px] rounded-full animate-blob animation-delay-2000" />
        <div className="absolute top-[40%] left-[20%] w-[25%] h-[25%] bg-blue-600/5 blur-[100px] rounded-full animate-blob animation-delay-4000" />
      </div>
      <div className="relative z-10">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
