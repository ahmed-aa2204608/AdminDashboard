import React from 'react'
import Search from './Search';
import Image from 'next/image';
import RouteSelect from './RouteSelect';
import SettingsSide from './SettingsSide';

export default function Sidebar({ isDark }) {
    return (
        <div className={`transition-colors duration-300 ${isDark ? 'bg-[#24263A]' : 'bg-white'} rounded-lg`}>
            <div className="sticky top-4 h-[calc(100vh-32px-48px)] p-4">
                <div className="flex items-center justify-start mb-24">
                    <Image
                        src="/Comp-1_00000.png"
                        alt="Logo"
                        width={50}
                        height={50}
                        className="flex-shrink-0"
                    />
                    <div className={`text-1xl font-bold relative ml-1 p-0 transition-colors duration-300 ${isDark ? 'text-stone-200' : 'text-gray-800'
                        }`}>
                        <p className='text-sm absolute top-1/2 transform -translate-y-[calc(+30%+7px)]'>Admin</p>
                        <p className='text-sm absolute top-1/2 transform -translate-y-[calc(+30%-7px)]'>Dashboard</p>
                    </div>
                </div>
                <RouteSelect isDark={isDark} />
            </div>
            <SettingsSide isDark={isDark} />
        </div>
    );
}