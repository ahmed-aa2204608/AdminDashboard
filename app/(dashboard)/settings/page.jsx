'use client';
import React, { useState, useEffect } from 'react'
import { fetchSettings, updateSettings } from '@/app/actions/server-actions';
import { HiUser, HiCog, HiMail, HiKey, HiGlobe, HiBell, HiMoon, HiSun, HiSave, HiX } from 'react-icons/hi';

export default function SettingsPage() {
    const [settings, setSettings] = useState(null);
    const [formData, setFormData] = useState({
        adminProfile: {
            name: '',
            email: '',
            password: ''
        },
        preferences: {
            darkMode: true,
            notifications: true,
            language: 'en-US'
        }
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await fetchSettings();
            setSettings(data);
            setFormData({
                adminProfile: {
                    name: data.adminProfile.name,
                    email: data.adminProfile.email,
                    password: data.adminProfile.password
                },
                preferences: { ...data.preferences }
            });
        } catch (error) {
            console.error('Error loading settings:', error);
            setMessage('Error loading settings');
        } finally {
            setLoading(false);
        }
    };

    const handleProfileChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            adminProfile: {
                ...prev.adminProfile,
                [field]: value
            }
        }));
    };

    const handlePreferenceChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                [field]: value
            }
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');

        try {
            const updatedSettings = {
                ...settings,
                adminProfile: {
                    ...settings.adminProfile,
                    ...formData.adminProfile
                },
                preferences: {
                    ...settings.preferences,
                    ...formData.preferences
                }
            };

            await updateSettings(updatedSettings);
            setMessage('Settings saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error saving settings:', error);
            setMessage('Error saving settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className={`p-6 min-h-screen ${formData.preferences.darkMode ? 'bg-transparent' : 'bg-gray-100'}`}>
                <div className={`text-center ${formData.preferences.darkMode ? 'text-stone-400' : 'text-gray-600'}`}>
                    Loading settings...
                </div>
            </div>
        );
    }

    const isDark = formData.preferences.darkMode;

    return (
        <div className={`p-6 min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-[#1D1E2C]' : 'bg-gray-50'}`}>
            <div className="mb-8">
                <h2 className={`text-2xl font-bold mb-2 flex items-center transition-colors ${isDark ? 'text-stone-200' : 'text-gray-800'
                    }`}>
                    <HiCog className="mr-3 text-sky-400" />
                    Settings
                </h2>
                <p className={`transition-colors ${isDark ? 'text-stone-400' : 'text-gray-600'}`}>
                    Manage your account and application preferences
                </p>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg border transition-colors ${message.includes('Error')
                    ? 'bg-red-500/10 border-red-500/50 text-red-300'
                    : 'bg-green-500/10 border-green-500/50 text-green-300'
                    }`}>
                    {message}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className={`rounded-xl p-6 border transition-all duration-300 ${isDark
                    ? 'bg-gradient-to-br from-[#2B2D42] to-[#1f2031] border-stone-600 hover:border-sky-400'
                    : 'bg-white border-gray-200 hover:border-sky-400 shadow-sm'
                    }`}>
                    <div className="flex items-center mb-4">
                        <HiUser className="text-sky-400 mr-3" size={24} />
                        <h3 className={`text-lg font-semibold transition-colors ${isDark ? 'text-stone-200' : 'text-gray-800'
                            }`}>Full Name</h3>
                    </div>
                    <input
                        type="text"
                        value={formData.adminProfile.name}
                        onChange={(e) => handleProfileChange('name', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border transition-all ${isDark
                            ? 'bg-[#1D1E2C] border-stone-600 text-stone-200 placeholder-stone-400 focus:ring-sky-400'
                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-sky-400'
                            } focus:outline-none focus:ring-2 focus:border-transparent`}
                        placeholder="Enter your full name"
                    />
                </div>

                <div className={`rounded-xl p-6 border transition-all duration-300 ${isDark
                    ? 'bg-gradient-to-br from-[#2B2D42] to-[#1f2031] border-stone-600 hover:border-green-400'
                    : 'bg-white border-gray-200 hover:border-green-400 shadow-sm'
                    }`}>
                    <div className="flex items-center mb-4">
                        <HiMail className="text-green-400 mr-3" size={24} />
                        <h3 className={`text-lg font-semibold transition-colors ${isDark ? 'text-stone-200' : 'text-gray-800'
                            }`}>Email Address</h3>
                    </div>
                    <input
                        type="email"
                        value={formData.adminProfile.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border transition-all ${isDark
                            ? 'bg-[#1D1E2C] border-stone-600 text-stone-200 placeholder-stone-400 focus:ring-green-400'
                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-green-400'
                            } focus:outline-none focus:ring-2 focus:border-transparent`}
                        placeholder="Enter your email"
                    />
                </div>

                <div className={`rounded-xl p-6 border transition-all duration-300 ${isDark
                    ? 'bg-gradient-to-br from-[#2B2D42] to-[#1f2031] border-stone-600 hover:border-yellow-400'
                    : 'bg-white border-gray-200 hover:border-yellow-400 shadow-sm'
                    }`}>
                    <div className="flex items-center mb-4">
                        <HiKey className="text-yellow-400 mr-3" size={24} />
                        <h3 className={`text-lg font-semibold transition-colors ${isDark ? 'text-stone-200' : 'text-gray-800'
                            }`}>Password</h3>
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={formData.adminProfile.password}
                            onChange={(e) => handleProfileChange('password', e.target.value)}
                            className={`w-full px-4 py-3 pr-12 rounded-lg border transition-all ${isDark
                                ? 'bg-[#1D1E2C] border-stone-600 text-stone-200 placeholder-stone-400 focus:ring-yellow-400'
                                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-yellow-400'
                                } focus:outline-none focus:ring-2 focus:border-transparent`}
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors ${isDark ? 'text-stone-400 hover:text-stone-200' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {showPassword ? <HiX size={20} /> : <HiKey size={20} />}
                        </button>
                    </div>
                </div>


                <div className={`rounded-xl p-6 border transition-all duration-300 ${isDark
                    ? 'bg-gradient-to-br from-[#2B2D42] to-[#1f2031] border-stone-600 hover:border-yellow-400'
                    : 'bg-white border-gray-200 hover:border-yellow-400 shadow-sm'
                    }`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <HiBell className="text-yellow-400 mr-3" size={24} />
                            <h3 className={`text-lg font-semibold transition-colors ${isDark ? 'text-stone-200' : 'text-gray-800'
                                }`}>Notifications</h3>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm transition-colors ${isDark ? 'text-stone-400' : 'text-gray-600'
                                }`}>Enable system notifications</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer ml-4">
                            <input
                                type="checkbox"
                                checked={formData.preferences.notifications}
                                onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className={`w-11 h-6 rounded-full peer transition-all
                                          peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-400
                                          peer-checked:after:translate-x-full peer-checked:after:border-white 
                                          after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                          after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${formData.preferences.notifications ? 'bg-yellow-400' : 'bg-gray-300'
                                } peer-checked:bg-yellow-400`}></div>
                        </label>
                    </div>
                </div>

                <div className={`rounded-xl p-6 border transition-all duration-300 ${isDark
                    ? 'bg-gradient-to-br from-[#2B2D42] to-[#1f2031] border-stone-600 hover:border-blue-400'
                    : 'bg-white border-gray-200 hover:border-blue-400 shadow-sm'
                    }`}>
                    <div className="flex items-center mb-4">
                        <HiGlobe className="text-blue-400 mr-3" size={24} />
                        <h3 className={`text-lg font-semibold transition-colors ${isDark ? 'text-stone-200' : 'text-gray-800'
                            }`}>Language</h3>
                    </div>
                    <select
                        value={formData.preferences.language}
                        onChange={(e) => handlePreferenceChange('language', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border transition-all ${isDark
                            ? 'bg-[#1D1E2C] border-stone-600 text-stone-200 focus:ring-blue-400'
                            : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-400'
                            } focus:outline-none focus:ring-2 focus:border-transparent`}
                    >
                        <option value="en-US">English (US)</option>
                        <option value="en-GB">English (UK)</option>
                        <option value="es-ES">Spanish</option>
                        <option value="fr-FR">French</option>
                        <option value="de-DE">German</option>
                        <option value="ar-SA">Arabic</option>
                    </select>
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-bl from-sky-300 to-sky-400 
                             hover:bg-gradient-to-bl hover:from-sky-400 hover:to-sky-500
                             text-white text-sm rounded-lg transition-colors duration-200 font-medium
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <HiSave size={16} />
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
            </div>
        </div>
    );
}