'use client';
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
    FiHome,
    FiUsers,
} from "react-icons/fi";
import { RxComponent2 } from "react-icons/rx";

export default function RouteSelect({ isDark }) {
    const router = useRouter();
    const pathname = usePathname();

    const routes = [
        { Icon: FiHome, title: "Dashboard", path: "/statistics" },
        { Icon: FiUsers, title: "Users", path: "/users" },
        { Icon: RxComponent2, title: "Courses", path: "/courses" }
    ]

    return (
        <div className="space-y-1">
            {routes.map((route) => (
                <Route
                    key={route.title}
                    Icon={route.Icon}
                    selected={pathname === route.path}
                    title={route.title}
                    onClick={() => router.push(route.path)}
                    isDark={isDark}
                />
            ))}
        </div>
    )
}

const Route = ({ selected, Icon, title, onClick, isDark }) => {
    return (
        <button
            onClick={onClick}
            className={`flex gap-2 px-3 py-1.5 text-sm w-full rounded-full items-center
            transition-[box-shadow,_background-color,_color] duration-300
            ${selected
                    ? (isDark ? "bg-[#1D1E2C] text-sky-400" : "bg-blue-50 text-sky-600")
                    : (isDark
                        ? "hover:bg-gray-700 bg-transparent text-stone-200"
                        : "hover:bg-gray-100 bg-transparent text-gray-700"
                    )
                }`}
        >
            <Icon className={`translate-y-[-10%] ${selected ? "text-sky-400" : ""}`} />
            <span className='text-sm'>{title}</span>
        </button>
    )
}