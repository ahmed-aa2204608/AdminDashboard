'use client';
import StatCard from './StatCard';
import GrowthLine from './GrowthLine';
import GradeRadar from './GradeRadar';
import CountryPie from './CountryPie';
import TopCoursesBar from './TopCoursesBar';
import PriceBar from './PriceBar';

export default function DashboardGrid({ data, isDark }) {
    const { summary, trends, gradeHexogram, studentLocation,
        topCourses, coursePrices } = data;

    return (
        <div className="grid gap-6 
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-12
                    ">            {Object.entries(summary).map(([key, val]) => (
            <StatCard
                key={key}
                label={kebabToLabel(key)}
                value={val}
                className="lg:col-span-2"
                isDark={isDark}
            />
        ))}

            <div className="lg:col-span-6">
                <GrowthLine students={trends.students} courses={trends.courses} isDark={isDark} />
            </div>
            <div className="lg:col-span-6">
                <GradeRadar data={gradeHexogram} isDark={isDark} />
            </div>

            <div className="lg:col-span-6">
                <CountryPie data={studentLocation} isDark={isDark} />
            </div>
            <div className="lg:col-span-6">
                <TopCoursesBar data={topCourses} isDark={isDark} />
            </div>

            <div className="lg:col-span-12">
                <PriceBar data={coursePrices} isDark={isDark} />
            </div>
        </div>
    );
}

function kebabToLabel(str) {
    return str
        .replace(/([A-Z])/g, ' $1')
        .replace(/^\w/, (c) => c.toUpperCase())
        .replace('Usd', 'USD');
}
