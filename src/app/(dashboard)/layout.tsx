'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [explainMode, setExplainMode] = useState(false);

    // Make explainMode available to children via window
    useEffect(() => {
        if (typeof window !== 'undefined') {
            (window as Window & { explainMode?: boolean }).explainMode = explainMode;
            window.dispatchEvent(new CustomEvent('explainModeChange', { detail: explainMode }));
        }
    }, [explainMode]);

    return (
        <div className="min-h-screen bg-[var(--color-bg)] font-sans">
            {/* Admin Banner */}
            <div className="fixed top-0 left-0 right-0 z-[60] admin-banner">
                ⚠️ ADMINISTRATIVE USE ONLY — Internal Government Portal
            </div>

            <Sidebar />

            <div className="ml-[var(--sidebar-width)] pt-7 relative z-10">
                <Topbar explainMode={explainMode} onExplainModeToggle={() => setExplainMode(!explainMode)} />

                <main className="pt-20 min-h-[calc(100vh-140px)] animate-fade-in relative z-0">
                    {children}
                </main>

                <Footer />
            </div>
        </div>
    );
}
