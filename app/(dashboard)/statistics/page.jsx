'use client';
import React, { useState, useEffect } from 'react'
import { fetchStats, fetchSettings } from '@/app/actions/server-actions'
import DashboardGrid from '@/app/components/Dashboard/Charts/Grid'
import { HiChartBar } from 'react-icons/hi';

export default function DashboardPage() {
    const [stats, setStats] = useState(null);
    const [isDark, setIsDark] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [statsData, settingsData] = await Promise.all([
                fetchStats(),
                fetchSettings()
            ]);

            setStats(statsData);
            setIsDark(settingsData.preferences.darkMode);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <main className={`min-h-screen p-6 transition-colors duration-300 ${isDark ? ' text-white' : 'bg-transparent text-gray-900'
                }`}>
                <div className={`text-center ${isDark ? 'text-stone-400' : 'text-gray-600'}`}>
                    Loading dashboard...
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className={`min-h-screen p-6 transition-colors duration-300 ${isDark ? 'bg-[#24263A] text-white' : 'bg-gray-50 text-gray-900'
                }`}>
                <div className="mb-6">
                    <h1 className={`text-2xl font-bold flex items-center transition-colors ${isDark ? 'text-stone-200' : 'text-gray-800'
                        }`}>
                        <HiChartBar className="mr-3 text-sky-400" />
                        Statistics Dashboard
                    </h1>
                    <p className={`transition-colors ${isDark ? 'text-stone-400' : 'text-gray-600'}`}>
                        Overview of your platform statistics
                    </p>
                </div>
                <div className={`p-6 rounded-xl border ${isDark
                    ? 'bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/30 text-red-300'
                    : 'bg-red-50 border-red-200 text-red-700'
                    }`}>
                    <p className="font-medium">Error Loading Data</p>
                    <p className="text-sm mt-1">{error}</p>
                </div>
            </main>
        );
    }

    return (
        <main className={`min-h-screen p-6 transition-colors duration-300 ${isDark ? 'bg-[#1D1E2C] text-white' : 'bg-gray-50 text-gray-900'
            }`}>
            <div className="mb-6">
                <h1 className={`text-2xl font-bold flex items-center transition-colors ${isDark ? 'text-stone-200' : 'text-gray-800'
                    }`}>
                    <HiChartBar className="mr-3 text-sky-400" />
                    Statistics Dashboard
                </h1>
                <p className={`transition-colors ${isDark ? 'text-stone-400' : 'text-gray-600'}`}>
                    Overview of your platform statistics and analytics
                </p>
            </div>

            <DashboardGrid data={stats} isDark={isDark} />
        </main>
    );
}