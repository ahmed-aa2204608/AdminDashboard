'use server';

import {
    getStats,
    getCourses,
    getUsers,
    getSettings,
    changeSettings
} from '@/app/repo/repo';

export async function fetchStats() { return getStats(); }
export async function fetchCourses() { return getCourses(); }
export async function fetchUsers() { return getUsers(); }
export async function fetchSettings() { return getSettings(); }
export async function updateSettings(newSettings) { return changeSettings(newSettings); }

export async function authenticateUser(email, password) {
    try {
        const settings = await getSettings();
        const adminProfile = settings.adminProfile;

        if (adminProfile.email === email && adminProfile.password === password) {
            return {
                success: true,
                user: {
                    id: adminProfile.id,
                    name: adminProfile.name,
                    email: adminProfile.email,
                    avatarUrl: adminProfile.avatarUrl
                },
                message: 'Login successful'
            };
        } else {
            return {
                success: false,
                message: 'Invalid email or password'
            };
        }
    } catch (error) {
        return {
            success: false,
            message: 'Authentication error occurred'
        };
    }
}

export async function getAdminName() {
    const settings = await getSettings();
    return settings.adminProfile.name;
}
