import React from 'react';
import { LayoutDashboard, LogOut } from 'lucide-react';

export default function Navbar({ onLogout }) {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Logo Section */}
                <div className="flex items-center gap-2">
                    <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-indigo-200 shadow-lg">
                        <LayoutDashboard size={20} />
                    </div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 hidden sm:block">
                        UMKM Dashboard
                    </h1>
                </div>

                {/* Logout Button (Sekarang di sini!) */}
                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 text-rose-500 hover:bg-rose-50 px-4 py-2 rounded-full text-sm font-bold transition-all border border-transparent hover:border-rose-100 cursor-pointer active:scale-95"
                    title="Keluar Aplikasi"
                >
                    <span className="hidden sm:inline">Logout</span>
                    <LogOut size={18} />
                </button>
            </div>
        </header>
    );
}