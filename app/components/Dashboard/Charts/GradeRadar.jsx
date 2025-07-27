'use client';
import {
    ResponsiveContainer, Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, Tooltip
} from 'recharts';

export default function GradeRadar({ data, isDark }) {
    const arr = Object.entries(data).map(([grade, count]) => ({
        grade, count
    }));
    return (
        <div className={`rounded-xl p-4 aspect-[4/3] border transition-all ${isDark
                ? 'bg-gradient-to-br from-[#2B2D42] to-[#1f2031] border-stone-600'
                : 'bg-white border-gray-200 shadow-sm'
            }`}>
            <p className={`mb-2 font-medium ${isDark ? 'text-stone-200' : 'text-gray-800'}`}>
                Student Grades
            </p>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={arr}>
                    <PolarGrid stroke={isDark ? "#444" : "#e5e7eb"} />
                    <PolarAngleAxis
                        dataKey="grade"
                        tick={{ fill: isDark ? '#a8a29e' : '#6b7280' }}
                    />
                    <PolarRadiusAxis tick={{ fill: isDark ? '#a8a29e' : '#6b7280' }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: isDark ? '#1f2937' : '#ffffff',
                            border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                            borderRadius: '8px',
                            color: isDark ? '#f3f4f6' : '#111827'
                        }}
                    />
                    <Radar dataKey="count" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.3} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}