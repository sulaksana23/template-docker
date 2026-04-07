import React from 'react';
import { Link, usePage } from '@inertiajs/react';

interface SidebarProps {
    isOpen: boolean;
    isMobileOpen: boolean;
    toggleMobile: () => void;
}

const NavLink = ({ href, active, children, icon: Icon, collapsed }: any) => (
    <Link
        href={href}
        className={`flex items-center p-3 my-1 rounded-xl transition-all duration-200 group ${
            active 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
        }`}
    >
        <span className={`flex-shrink-0 w-6 h-6 transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
            {Icon}
        </span>
        <span className={`ml-3 font-medium transition-all duration-300 truncate ${collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
            {children}
        </span>
    </Link>
);

export default function Sidebar({ isOpen, isMobileOpen, toggleMobile }: SidebarProps) {
    const { url } = usePage();

    const sidebarClass = `fixed top-0 left-0 h-full bg-[#0a0c10] text-slate-100 transition-all duration-300 ease-in-out z-40 border-r border-slate-800/50 shadow-2xl ${
        isOpen ? 'w-72' : 'w-20'
    } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`;

    return (
        <aside className={sidebarClass}>
            {/* Logo Section */}
            <div className="flex items-center justify-center h-20 border-b border-slate-800/50">
                <Link href="/" className="flex items-center space-x-3 group px-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/40 transform group-hover:rotate-12 transition-all">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    {isOpen && (
                        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent truncate">
                            BALI TECH
                        </span>
                    )}
                </Link>
            </div>

            {/* Navigation Navigation */}
            <div className="p-4 space-y-8 overflow-y-auto h-[calc(100vh-80px)] scrollbar-hide">
                <div>
                    {!isOpen ? (
                        <div className="h-4 border-b border-slate-800 mb-4 mx-2" />
                    ) : (
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-4">Menu Utama</p>
                    )}
                    
                    <div className="space-y-1">
                        <NavLink 
                            href="/dashboard" 
                            active={url === '/dashboard'} 
                            collapsed={!isOpen}
                            icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>}
                        >
                            Dashboard
                        </NavLink>
                        <NavLink 
                            href="/profile" 
                            active={url === '/profile'} 
                            collapsed={!isOpen}
                            icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>}
                        >
                            Profile
                        </NavLink>
                    </div>
                </div>

                <div>
                    {!isOpen ? (
                        <div className="h-4 border-b border-slate-800 mb-4 mx-2" />
                    ) : (
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-4">Pengaturan</p>
                    )}
                    <div className="space-y-1">
                        <NavLink 
                            href="#" 
                            collapsed={!isOpen}
                            icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>}
                        >
                            Konfigurasi
                        </NavLink>
                    </div>
                </div>

                {/* Upgrade Pro Mockup */}
                {isOpen && (
                    <div className="mt-auto pt-8">
                        <div className="p-4 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl relative overflow-hidden group">
                           <div className="relative z-10">
                                <p className="text-sm font-bold mb-1">Butuh Bantuan?</p>
                                <p className="text-[11px] text-indigo-100 mb-3">Tingkatkan performa bisnis Anda ke level selanjutnya.</p>
                                <button className="w-full py-2 bg-white text-indigo-700 text-xs font-bold rounded-xl shadow-lg active:scale-95 transition-all">
                                    Hubungi Kami
                                </button>
                           </div>
                           <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700"></div>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}
