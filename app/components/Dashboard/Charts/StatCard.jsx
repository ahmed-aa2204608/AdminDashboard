import React from 'react'

export default function StatCard({ label, value, className = '', isDark }) {
    return (
        <div
            className={`rounded-xl shadow p-4 flex flex-col border transition-all hover:border-sky-400 ${isDark
                    ? 'bg-gradient-to-br from-[#2B2D42] to-[#1f2031] border-stone-600'
                    : 'bg-white border-gray-200 shadow-sm'
                } ${className}`}
        >
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{label}</span>
            <span className="text-3xl font-semibold text-sky-400 mt-2">
                {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
        </div>
    );
}

