'use client';
import React, { useState, useMemo } from 'react'
import { fetchCourses, fetchSettings } from '@/app/actions/server-actions';
import { HiSearch, HiEye, HiPencil, HiTrash, HiUsers, HiClock, HiCalendar, HiCurrencyDollar } from 'react-icons/hi';

export default function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [isDark, setIsDark] = useState(true);

    React.useEffect(() => {
        const loadCourses = async () => {
            try {
                const data = await fetchCourses();
                setCourses(data);
                const settings = await fetchSettings();
                setIsDark(settings.preferences.darkMode);
            } catch (error) {
                console.error('Error loading courses:', error);
            } finally {
                setLoading(false);
            }
        };
        loadCourses();
    }, []);

    const filteredCourses = useMemo(() => {
        return courses.filter(course =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [courses, searchTerm]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'in_progress':
                return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'finished':
                return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'planned':
                return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            default:
                return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    const formatStatus = (status) => {
        return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }; if (loading) {
        return (
            <div className="p-6">
                <div className={`text-center transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-gray-600'
                    }`}>Loading courses...</div>
            </div>
        );
    }

    return (
        console.log(),
        < div className="p-6" >
            < div className="mb-6" >
                <h2 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${isDark ? 'text-stone-200' : 'text-gray-800'
                    }`}>Courses Management</h2>
                <p className={`transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-gray-600'
                    }`}>Manage and monitor all your courses</p>
            </div >
            < div className="mb-6" >
                <div className="relative max-w-md">
                    <HiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-stone-400' : 'text-gray-500'
                        }`} size={20} />
                    <input
                        type="text"
                        placeholder="Search courses by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-300
                                 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent ${isDark
                                ? 'bg-[#2B2D42] border-stone-600 text-stone-200 placeholder-stone-400'
                                : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                            }`}
                    />
                </div>
            </div >
            < div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6" >
                <div className={`rounded-xl p-4 border transition-colors duration-300 ${isDark
                    ? 'bg-gradient-to-br from-[#2B2D42] to-[#1f2031] border-stone-600'
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
                    }`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-gray-600'
                                }`}>Total Courses</p>
                            <p className={`text-2xl font-bold transition-colors duration-300 ${isDark ? 'text-stone-200' : 'text-gray-800'
                                }`}>{courses.length}</p>
                        </div>
                        <HiClock className="text-sky-400" size={24} />
                    </div>
                </div>
                <div className={`rounded-xl p-4 border transition-colors duration-300 ${isDark
                    ? 'bg-gradient-to-br from-[#2B2D42] to-[#1f2031] border-stone-600'
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
                    }`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-gray-600'
                                }`}>In Progress</p>
                            <p className="text-2xl font-bold text-blue-400">
                                {courses.filter(c => c.status === 'in_progress').length}
                            </p>
                        </div>
                        <HiUsers className="text-blue-400" size={24} />
                    </div>
                </div>
                <div className={`rounded-xl p-4 border transition-colors duration-300 ${isDark
                    ? 'bg-gradient-to-br from-[#2B2D42] to-[#1f2031] border-stone-600'
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
                    }`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-gray-600'
                                }`}>Completed</p>
                            <p className="text-2xl font-bold text-green-400">
                                {courses.filter(c => c.status === 'finished').length}
                            </p>
                        </div>
                        <HiCalendar className="text-green-400" size={24} />
                    </div>
                </div>
                <div className={`rounded-xl p-4 border transition-colors duration-300 ${isDark
                    ? 'bg-gradient-to-br from-[#2B2D42] to-[#1f2031] border-stone-600'
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
                    }`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-gray-600'
                                }`}>Planned</p>
                            <p className="text-2xl font-bold text-yellow-400">
                                {courses.filter(c => c.status === 'planned').length}
                            </p>
                        </div>
                        <HiCurrencyDollar className="text-yellow-400" size={24} />
                    </div>
                </div>
            </div >
            < div className={`rounded-xl border overflow-hidden transition-colors duration-300 ${isDark
                ? 'bg-gradient-to-br from-[#2B2D42] to-[#1f2031] border-stone-600'
                : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
                }`
            }>
                < div className={`px-6 py-4 border-b transition-colors duration-300 ${isDark ? 'border-stone-600' : 'border-gray-200'
                    }`}>
                    <h3 className={`text-lg font-semibold transition-colors duration-300 ${isDark ? 'text-stone-200' : 'text-gray-800'
                        }`}>Course List</h3>
                </div >
                < div className="overflow-x-auto" >
                    <table className="w-full">
                        <thead>
                            <tr className={`border-b transition-colors duration-300 ${isDark ? 'border-stone-600' : 'border-gray-200'
                                }`}>
                                <th className={`text-left py-4 px-6 font-medium text-sm transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-gray-600'
                                    }`}>Course</th>
                                <th className={`text-left py-4 px-6 font-medium text-sm transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-gray-600'
                                    }`}>ID</th>
                                <th className={`text-left py-4 px-6 font-medium text-sm transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-gray-600'
                                    }`}>Status</th>
                                <th className={`text-left py-4 px-6 font-medium text-sm transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-gray-600'
                                    }`}>Students</th>
                                <th className={`text-left py-4 px-6 font-medium text-sm transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-gray-600'
                                    }`}>Price</th>
                                <th className={`text-left py-4 px-6 font-medium text-sm transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-gray-600'
                                    }`}>Dates</th>
                                <th className={`text-right py-4 px-6 font-medium text-sm transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-gray-600'
                                    }`}>Actions</th>
                            </tr>
                        </thead>                        <tbody>
                            {filteredCourses.map((course) => (
                                <tr key={course.id} className={`border-b transition-colors duration-300 ${isDark
                                    ? 'border-stone-700 hover:bg-stone-800/30'
                                    : 'border-gray-200 hover:bg-gray-50'
                                    }`}>
                                    <td className="py-4 px-6">
                                        <div>
                                            <h4 className={`font-medium transition-colors duration-300 ${isDark ? 'text-stone-200' : 'text-gray-800'
                                                }`}>{course.title}</h4>
                                            <p className={`text-sm transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-gray-600'
                                                }`}>Instructor: {course.instructorId}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sky-400 font-mono text-sm">{course.id}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(course.status)}`}>
                                            {formatStatus(course.status)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className={`flex items-center transition-colors duration-300 ${isDark ? 'text-stone-300' : 'text-gray-700'
                                            }`}>
                                            <HiUsers className={`mr-1 ${isDark ? 'text-stone-400' : 'text-gray-500'
                                                }`} size={16} />
                                            {course.studentsEnrolled || course.studentsCompleted || 'N/A'}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-green-400 font-semibold">${course.priceUSD}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className={`text-sm transition-colors duration-300 ${isDark ? 'text-stone-300' : 'text-gray-700'
                                            }`}>
                                            {course.startDate ? (
                                                <>
                                                    <div>{new Date(course.startDate).toLocaleDateString()}</div>
                                                    <div className={`${isDark ? 'text-stone-400' : 'text-gray-500'
                                                        }`}>to {new Date(course.endDate).toLocaleDateString()}</div>
                                                </>
                                            ) : course.plannedStartDate ? (
                                                <>
                                                    <div className="text-yellow-400">Planned: {new Date(course.plannedStartDate).toLocaleDateString()}</div>
                                                </>
                                            ) : (
                                                <span className={`${isDark ? 'text-stone-400' : 'text-gray-500'
                                                    }`}>No dates</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className={`p-2 rounded-lg transition-colors ${isDark
                                                ? 'text-stone-400 hover:text-sky-400 hover:bg-sky-400/10'
                                                : 'text-gray-500 hover:text-sky-500 hover:bg-sky-50'
                                                }`}>
                                                <HiEye size={16} />
                                            </button>
                                            <button className={`p-2 rounded-lg transition-colors ${isDark
                                                ? 'text-stone-400 hover:text-yellow-400 hover:bg-yellow-400/10'
                                                : 'text-gray-500 hover:text-yellow-500 hover:bg-yellow-50'
                                                }`}>
                                                <HiPencil size={16} />
                                            </button>
                                            <button className={`p-2 rounded-lg transition-colors ${isDark
                                                ? 'text-stone-400 hover:text-red-400 hover:bg-red-400/10'
                                                : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                                                }`}>
                                                <HiTrash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div >
                {
                    filteredCourses.length === 0 && (
                        <div className="text-center py-12">
                            <div className={`mb-2 transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-gray-600'
                                }`}>No courses found</div>
                            <div className={`text-sm transition-colors duration-300 ${isDark ? 'text-stone-500' : 'text-gray-500'
                                }`}>
                                {searchTerm ? `No courses match "${searchTerm}"` : 'No courses available'}
                            </div>
                        </div>
                    )
                }
            </div >

            {
                searchTerm && (
                    <div className={`mt-4 text-sm transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-gray-600'
                        }`}>
                        Showing {filteredCourses.length} of {courses.length} courses
                    </div>
                )
            }
        </div >
    );
}