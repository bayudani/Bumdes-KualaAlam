import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Toast({ show, message, type }) {
    if (!show) return null;

    return (
        <div className={`fixed bottom-5 right-5 z-50 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in text-white ${type === 'error' ? 'bg-rose-500' : 'bg-emerald-500'}`}>
            {type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
            <p className="font-medium text-sm">{message}</p>

            <style>{`
        @keyframes slide-in {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
        </div>
    );
}