'use client';
import React from 'react'
import { useRouter } from 'next/navigation';
import { PiGearSix } from "react-icons/pi";

export default function SettingsSide({ isDark }) {
    const router = useRouter();

    const handleSettingsClick = () => {
        router.push('/settings');
    };

    return (
        <div className={`flex sticky top-[calc(100vh_-_48px_-_16px)] flex-col h-12 border-t px-4 py-2 justify-end text-xs transition-colors duration-300 ${isDark ? 'border-stone-600' : 'border-gray-200'
            }`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className={`text-sm transition-colors duration-300 ${isDark ? 'text-stone-200' : 'text-gray-700'
                        }`}>Settings</p>
                </div>

                <button
                    onClick={handleSettingsClick}
                    className={`px-2 py-1.5 font-medium transition-colors duration-300 rounded ${isDark
                            ? 'bg-transparent hover:bg-gray-600 text-stone-200'
                            : 'bg-transparent hover:bg-gray-100 text-gray-700'
                        }`}
                >
                    <PiGearSix />
                </button>
            </div>
        </div>
    )
}