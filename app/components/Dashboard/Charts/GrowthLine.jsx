'use client';
import {
    ResponsiveContainer, LineChart, Line, CartesianGrid,
    XAxis, YAxis, Tooltip, Legend
} from 'recharts';

export default function GrowthLine({ students, courses, isDark }) {
    const merged = students.map((s, i) => ({
        month: s.month,
        Students: s.count,
        Courses: courses[i]?.count || 0
    }));
    return (
        <div className={`rounded-xl p-4 aspect-[4/3] border transition-all ${isDark
                ? 'bg-gradient-to-br from-[#2B2D42] to-[#1f2031] border-stone-600'
                : 'bg-white border-gray-200 shadow-sm'
            }`}>
            <p className={`mb-2 font-medium ${isDark ? 'text-stone-200' : 'text-gray-800'}`}>
                Growth (Students vs Courses)
            </p>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={merged}>
                    <CartesianGrid stroke={isDark ? "#444" : "#e5e7eb"} />
                    <XAxis
                        dataKey="month"
                        tick={{ fill: isDark ? '#a8a29e' : '#6b7280' }}
                    />
                    <YAxis tick={{ fill: isDark ? '#a8a29e' : '#6b7280' }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: isDark ? '#1f2937' : '#ffffff',
                            border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                            borderRadius: '8px',
                            color: isDark ? '#f3f4f6' : '#111827'
                        }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="Students" stroke="#38bdf8" />
                    <Line type="monotone" dataKey="Courses" stroke="#7dd3fc" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}