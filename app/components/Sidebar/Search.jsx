import React from 'react'
import { FiSearch } from 'react-icons/fi'

export default function Search({ isDark }) {
    return (
        <>
            <div className={`mb-4 relative rounded-lg flex items-center px-2 py-1.5 text-sm border transition-colors duration-300 ${isDark
                    ? 'bg-[#1D1E2C] border-gray-700'
                    : 'bg-gray-100 border-gray-200'
                }`}>
                <FiSearch className={`mr-2 transition-colors duration-300 ${isDark ? 'text-stone-200' : 'text-gray-600'
                    }`} />
                <input
                    type='text'
                    placeholder='Search'
                    className={`w-full bg-transparent focus:outline-none focus:placeholder:invisible transition-colors duration-300 ${isDark
                            ? 'placeholder:text-stone-400 text-stone-200'
                            : 'placeholder:text-gray-500 text-gray-800'
                        }`}
                />
            </div>
        </>
    )
}
