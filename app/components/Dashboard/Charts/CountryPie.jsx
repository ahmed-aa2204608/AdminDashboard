'use client';
import {
    ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip
} from 'recharts';

export default function CountryPie({ data, isDark }) {
    const colors = ['#38bdf8', '#60c3ff', '#83caff', '#a6d0ff', '#c9d7ff', '#ecddff'];
    return (
        <div className={`rounded-xl p-4 aspect-[4/3] border transition-all ${isDark
            ? 'bg-gradient-to-br from-[#2B2D42] to-[#1f2031] border-stone-600'
            : 'bg-white border-gray-200 shadow-sm'
            }`}>
            <p className={`mb-2 font-medium ${isDark ? 'text-stone-200' : 'text-gray-800'}`}>
                Top Students by Location
            </p>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={data} dataKey="percentage" nameKey="country"
                        cx="50%" cy="50%" outerRadius="70%">
                        {data.map((_, i) => (
                            <Cell key={i} fill={colors[i % colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1f2937',
                            border: `1px solid  '#374151'`,
                            borderRadius: '8px',
                            color: '#f3f4f6'
                        }}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}