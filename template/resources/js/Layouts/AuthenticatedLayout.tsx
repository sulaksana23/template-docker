import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import Topbar from '@/Components/Dashboard/Topbar';

interface Props {
    header?: React.ReactNode;
    children: React.ReactNode;
}

export default function AuthenticatedLayout({ header, children }: Props) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex text-slate-900">
            {/* Sidebar Desktop & Mobile */}
            <Sidebar 
                isOpen={isSidebarOpen} 
                isMobileOpen={isMobileOpen} 
                toggleMobile={toggleMobile} 
            />

            {/* Main Content Area */}
            <div className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
                {/* Header / Topbar */}
                <Topbar 
                    toggleSidebar={toggleSidebar} 
                    toggleMobile={toggleMobile} 
                    isSidebarOpen={isSidebarOpen} 
                />

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-8">
                    {header && (
                        <header className="mb-8">
                            <div className="mx-auto max-w-7xl">
                                {header}
                            </div>
                        </header>
                    )}
                    
                    <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-6 px-8 bg-white border-t border-slate-200">
                    <div className="flex justify-between items-center text-sm text-slate-500">
                        <p>© 2026 Bali Techsolution. All rights reserved.</p>
                        <div className="flex space-x-4">
                            <Link href="#" className="hover:text-indigo-600 transition-colors">Support</Link>
                            <Link href="#" className="hover:text-indigo-600 transition-colors">Purchase</Link>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden"
                    onClick={toggleMobile}
                />
            )}
        </div>
    );
}
