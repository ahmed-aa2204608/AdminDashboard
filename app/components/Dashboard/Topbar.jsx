'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { HiOutlineLogout } from 'react-icons/hi'
import { getAdminName } from '@/app/actions/server-actions';

export default function Topbar({ isDark }) {
    const router = useRouter();
    const [adminName, setAdminName] = useState('');

    useEffect(() => {
        const fetchAdminName = async () => {
            const name = await getAdminName();
            setAdminName(name);
        };
        fetchAdminName();
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('authenticated');
        router.push('/login');
    };

    return (
        <div className='flex flex-col px-4 pt-4 rounded-lg'>
            <div className={`border-b mb-4 px-4 mt-4 pb-4 transition-colors duration-300 ${isDark ? 'border-sky-800' : 'border-gray-200'
                }`}>
                <div className='flex items-center justify-between p-0.5'>
                    <div>
                        <span className={`text-sm font-bold block transition-colors duration-300 ${isDark ? 'text-stone-200' : 'text-gray-800'
                            }`}>Good Morning, {adminName}!</span>
                        <span className={`text-xs block transition-colors duration-300 ${isDark ? 'text-stone-300' : 'text-gray-600'
                            }`}>Welcome back to your dashboard</span>
                    </div>
                    <div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-bl from-sky-300 to-sky-400 hover:bg-gradient-to-bl hover:from-sky-400 hover:to-sky-500
                                text-white text-xs rounded-lg transition-colors
                                duration-200"
                        >
                            <HiOutlineLogout />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}