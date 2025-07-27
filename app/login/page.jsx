"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { authenticateUser } from '../actions/server-actions';

export default function LoginPage() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await authenticateUser(credentials.email, credentials.password);
            if (result.success) {
                sessionStorage.setItem('authenticated', 'true');
                router.push('/');
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError('Incorrect email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#24263A] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-[#1D1E2C] border border-stone-700 rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <Image
                                src="/Comp-1_00000.svg"
                                alt="Logo"
                                width={60}
                                height={60}
                                className="drop-shadow-lg"
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-stone-200 mb-2">Admin Dashboard</h1>
                        <p className="text-stone-400 text-sm">Sign in to access your dashboard</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-stone-300 block">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={credentials.email}
                                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                className="w-full px-4 py-3 bg-stone-200 border border-stone-600 rounded-lg 
                                         text-stone-950 placeholder-stone-500 focus:outline-none focus:ring-2 
                                         focus:ring-sky-400 focus:border-transparent transition-all"
                                placeholder="admin@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-stone-300 block">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    className="w-full px-4 py-3 bg-stone-200 border border-stone-600 rounded-lg 
                                             text-stone-950 placeholder-stone-500 focus:outline-none focus:ring-2 
                                             focus:ring-sky-400 focus:border-transparent transition-all pr-12"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-500 
                                             hover:text-stone-700 transition-colors"
                                >
                                    {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-sky-400 hover:bg-sky-500 text-stone-950 font-semibold py-3 px-4 rounded-lg 
                                     transition-all duration-200 shadow-lg hover:shadow-xl
                                     disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-stone-950 mr-2"></div>
                                    Signing in...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 p-4 bg-stone-700/30 border border-stone-600 rounded-lg">
                        <p className="text-xs text-stone-400 mb-2">Demo Credentials:</p>
                        <p className="text-xs text-stone-300">Email: admin@elearn.com</p>
                        <p className="text-xs text-stone-300">Password: 123456</p>
                    </div>
                </div>
            </div>
        </div>
    );
}