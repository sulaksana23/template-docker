import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

interface TopbarProps {
    toggleSidebar: () => void;
    toggleMobile: () => void;
    isSidebarOpen: boolean;
}

export default function Topbar({ toggleSidebar, toggleMobile, isSidebarOpen }: TopbarProps) {
    const { auth } = usePage().props as any;
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-30 flex items-center justify-between h-20 px-4 bg-white/80 backdrop-blur-md border-b border-slate-200/60 lg:px-8">
            {/* Left Section: Toggle & Search */}
            <div className="flex items-center space-x-4">
                {/* Desktop Toggle */}
                <button 
                    onClick={toggleSidebar}
                    className="hidden lg:flex items-center justify-center w-10 h-10 text-slate-500 hover:bg-slate-100 rounded-xl transition-all active:scale-95"
                >
                    <svg className={`w-6 h-6 transition-transform duration-300 ${!isSidebarOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                </button>

                {/* Mobile Toggle */}
                <button 
                    onClick={toggleMobile}
                    className="lg:hidden flex items-center justify-center w-10 h-10 text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                <div className="relative hidden md:block group">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input 
                        type="text" 
                        placeholder="Cari..." 
                        className="w-64 py-2 pl-10 pr-4 text-sm bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/10 rounded-xl transition-all outline-none"
                    />
                </div>
            </div>

            {/* Right Section: Actions & Profile */}
            <div className="flex items-center space-x-2 md:space-x-4">
                {/* Night Mode Toggle Mockup */}
                <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                </button>

                <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-all relative">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
                </button>

                <div className="h-8 border-l border-slate-200 mx-2 hidden md:block" />

                {/* Profile Dropdown */}
                <div className="relative">
                    <button 
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center space-x-3 p-1 pl-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition-all group"
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-bold text-slate-800 leading-tight">{auth.user.name}</p>
                            <p className="text-[10px] text-slate-500">Administrator</p>
                        </div>
                        <div className="w-10 h-10 bg-indigo-100 rounded-xl border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                            <span className="text-indigo-600 font-bold text-sm">
                                {auth.user.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                             <div className="px-4 py-2 border-b border-slate-100 mb-2">
                                <p className="text-xs text-slate-400">Anda login sebagai</p>
                                <p className="text-sm font-bold truncate">{auth.user.email}</p>
                             </div>
                             <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-all">
                                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                                Profil Saya
                             </Link>
                             <Link href="/logout" method="post" as="button" className="w-full flex items-center px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-all">
                                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                                Keluar
                             </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
