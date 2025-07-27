"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { fetchSettings } from '../actions/server-actions';
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Dashboard/Topbar";

export default function DashboardLayout({ children }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initializeDashboard = async () => {
            const auth = sessionStorage.getItem('authenticated');
            if (!auth) {
                router.push('/login');
                return;
            }

            setIsAuthenticated(true);

            try {
                const settings = await fetchSettings();
                setIsDark(settings.preferences.darkMode);
            } catch (error) {
                console.error('Failed to load settings:', error);
            }

            setIsLoading(false);
        };

        initializeDashboard();
    }, [router]);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#24263A]">
                <div className="text-lg text-gray-600 dark:text-stone-200">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <main
            className={`grid gap-4 p-4 transition-all duration-300 min-h-screen ${isDark ? 'bg-[#24263A]' : 'bg-gray-50'
                } ${sidebarCollapsed
                    ? 'grid-cols-[60px_1fr]'
                    : 'grid-cols-[220px_1fr]'
                }`}
        >
            <Sidebar isDark={isDark} />
            <div className={`rounded-lg pb-4 shadow transition-colors duration-300 ${isDark ? 'bg-[#1D1E2C]' : 'bg-white'
                }`}>
                <Topbar isDark={isDark} />
                <div className="p-4">
                    {React.cloneElement(children, { isDark })}
                </div>
            </div>
        </main>
    );
}