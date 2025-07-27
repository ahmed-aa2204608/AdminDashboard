import { cache } from 'react';
import { promises as fs } from 'fs';
import path from 'path';

const data = path.join(process.cwd(), 'public', 'data');

const FILES = {
    stats: 'stats.json',
    courses: 'courses.json',
    users: 'users.json',
    settings: 'adminSettings.json'
};

const readJSON = cache(async (filename) => {
    const filePath = path.join(data, filename);
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
});

export async function getStats() {
    return readJSON(FILES.stats);
}

export async function getCourses() {
    return readJSON(FILES.courses);
}

export async function getUsers() {
    return readJSON(FILES.users);
}

export async function getSettings() {
    return readJSON(FILES.settings);
}

export async function changeSettings(newSettings) {
    const filePath = path.join(data, FILES.settings);
    await fs.writeFile(filePath, JSON.stringify(newSettings, null, 2), 'utf-8');
    return getSettings();
}