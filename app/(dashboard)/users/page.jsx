'use client';
import React, { useEffect, useState } from 'react'
import { fetchUsers, fetchSettings } from '@/app/actions/server-actions';
import Image from 'next/image';
import { HiUser, HiGlobeAlt, HiAcademicCap } from 'react-icons/hi';

export default function UsersPage() {
    const [isDark, setIsDark] = useState(true);
    const [students, setStudents] = useState([]);
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const settings = await fetchSettings();
                setIsDark(settings.preferences.darkMode);
                const users = await fetchUsers();
                setStudents(users.students);
                setInstructors(users.instructors);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };
        loadData();
    }, []);

    return (
        <div className="p-4">
            <div className='grid grid-cols-2 gap-4 mt-6'>
                <div className="mx-4">
                    <h1 className={`text-xl font-bold mb-4 transition-colors duration-300 ${isDark ? 'text-stone-200' : 'text-gray-800'
                        }`}>Students</h1>
                    {students.map((user) => (
                        <StudentCard key={user.id} user={user} isDark={isDark} />
                    ))}
                </div>
                <div className="mx-4">
                    <h1 className={`text-xl font-bold mb-4 transition-colors duration-300 ${isDark ? 'text-stone-200' : 'text-gray-800'
                        }`}>Instructors</h1>
                    {instructors.map((user) => (
                        <InstructorCard key={user.id} instructor={user} isDark={isDark} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function StudentCard({ user, isDark }) {
    return (
        <div className={`mb-4 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 group ${isDark
            ? 'bg-gradient-to-br from-[#2B2D42] to-[#1f2031] border border-stone-600 hover:border-sky-400'
            : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-sky-400'
            }`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                    <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {user.name.charAt(0)}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 ${isDark ? 'border-[#2B2D42]' : 'border-white'
                            }`}></div>
                    </div>
                    <div className="ml-3">
                        <h3 className={`text-lg font-semibold group-hover:text-sky-600 transition-colors ${isDark ? 'text-stone-200 group-hover:text-white' : 'text-gray-800'
                            }`}>
                            {user.name}
                        </h3>
                        <p className={`text-sm ${isDark ? 'text-stone-400' : 'text-gray-600'}`}>{user.email}</p>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className={`rounded-lg p-3 text-center ${isDark ? 'bg-black/20' : 'bg-gray-100'
                    }`}>
                    <div className="text-sky-400 font-semibold text-lg">
                        {user.enrolledCourses.length}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-stone-400' : 'text-gray-600'}`}>Courses</div>
                </div>
                <div className={`rounded-lg p-3 text-center flex items-center justify-center ${isDark ? 'bg-black/20' : 'bg-gray-100'
                    }`}>
                    <HiGlobeAlt className={`mr-1 ${isDark ? 'text-stone-400' : 'text-gray-600'}`} size={16} />
                    <span className={`text-sm ${isDark ? 'text-stone-300' : 'text-gray-700'}`}>{user.country}</span>
                </div>
            </div>

            {/* Course Pills */}
            <div className="space-y-2">
                <p className={`text-xs font-medium ${isDark ? 'text-stone-400' : 'text-gray-600'}`}>Enrolled Courses:</p>
                <div className="flex flex-wrap gap-1">
                    {user.enrolledCourses.slice(0, 3).map((courseId, index) => (
                        <span key={index} className="px-2 py-1 bg-sky-400/10 text-sky-400 text-xs rounded-full border border-sky-400/20">
                            {courseId}
                        </span>
                    ))}
                    {user.enrolledCourses.length > 3 && (
                        <span className={`px-2 py-1 text-xs rounded-full ${isDark ? 'bg-stone-700 text-stone-300' : 'bg-gray-200 text-gray-600'
                            }`}>
                            +{user.enrolledCourses.length - 3} more
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

function InstructorCard({ instructor, isDark }) {
    return (
        <div className={`mb-4 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 group ${isDark
            ? 'bg-gradient-to-br from-[#2B2D42] to-[#1f2031] border border-stone-600 hover:border-green-400'
            : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-green-400'
            }`}>
            {/* Header with Avatar and Basic Info */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                    <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {instructor.name.charAt(0)}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${isDark ? 'border-[#2B2D42]' : 'border-white'
                            } ${instructor.isActive ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    </div>
                    <div className="ml-3">
                        <h3 className={`text-lg font-semibold group-hover:text-green-600 transition-colors ${isDark ? 'text-stone-200 group-hover:text-white' : 'text-gray-800'
                            }`}>
                            {instructor.name}
                        </h3>
                        <p className={`text-sm ${isDark ? 'text-stone-400' : 'text-gray-600'}`}>{instructor.email}</p>
                    </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${instructor.isActive
                    ? 'bg-green-400/10 text-green-400 border border-green-400/20'
                    : 'bg-red-400/10 text-red-400 border border-red-400/20'
                    }`}>
                    {instructor.isActive ? 'Active' : 'Inactive'}
                </span>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className={`rounded-lg p-3 text-center ${isDark ? 'bg-black/20' : 'bg-gray-100'
                    }`}>
                    <div className="text-green-400 font-semibold text-lg">
                        {instructor.coursesTeaching.length}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-stone-400' : 'text-gray-600'}`}>Teaching</div>
                </div>
                <div className={`rounded-lg p-3 text-center flex items-center justify-center ${isDark ? 'bg-black/20' : 'bg-gray-100'
                    }`}>
                    <HiGlobeAlt className={`mr-1 ${isDark ? 'text-stone-400' : 'text-gray-600'}`} size={16} />
                    <span className={`text-sm ${isDark ? 'text-stone-300' : 'text-gray-700'}`}>{instructor.country}</span>
                </div>
            </div>

            {/* Course Pills */}
            <div className="space-y-2">
                <p className={`text-xs font-medium ${isDark ? 'text-stone-400' : 'text-gray-600'}`}>Teaching Courses:</p>
                <div className="flex flex-wrap gap-1">
                    {instructor.coursesTeaching.slice(0, 3).map((courseId, index) => (
                        <span key={index} className="px-2 py-1 bg-green-400/10 text-green-400 text-xs rounded-full border border-green-400/20">
                            {courseId}
                        </span>
                    ))}
                    {instructor.coursesTeaching.length > 3 && (
                        <span className={`px-2 py-1 text-xs rounded-full ${isDark ? 'bg-stone-700 text-stone-300' : 'bg-gray-200 text-gray-600'
                            }`}>
                            +{instructor.coursesTeaching.length - 3} more
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}