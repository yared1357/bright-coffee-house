import React, { useState } from 'react';
import { api } from '../lib/api';
import { ShieldCheck, Lock, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

export default function Settings() {
    const [formData, setFormData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            setStatus({ type: 'error', message: 'Passwords do not match!' });
            return;
        }

        setLoading(true);
        setStatus(null);
        const token = localStorage.getItem('adminToken');
        if (!token) return;

        try {
            const res = await api.put('/auth/change-password', {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            }, token);

            if (res.message === 'Password updated successfully') {
                setStatus({ type: 'success', message: 'Password changed! Stay secure.' });
                setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                setStatus({ type: 'error', message: res.message || 'Update failed' });
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'Connection error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl">
            <div className="mb-10">
                <h3 className="text-3xl font-serif font-bold text-coffee-950 underline decoration-coffee-200 underline-offset-8">Account Settings</h3>
                <p className="text-coffee-600 mt-2">Update your administrative credentials and security preferences.</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-coffee-100 shadow-2xl p-10"
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-coffee-50 p-3 rounded-xl border border-coffee-100">
                        <ShieldCheck className="h-6 w-6 text-coffee-600" />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-coffee-950">Security Access</h4>
                        <p className="text-sm text-coffee-500">Ensure your administrative password is strong.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-coffee-800 ml-1 uppercase tracking-widest text-[10px]">Current Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-coffee-400" />
                            <input
                                type={showPasswords.current ? "text" : "password"}
                                required
                                className="w-full pl-12 pr-12 py-4 rounded-xl border border-coffee-200 focus:ring-2 focus:ring-coffee-500 focus:border-transparent outline-none transition-all bg-coffee-50/20"
                                placeholder="••••••••"
                                value={formData.currentPassword}
                                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-coffee-400 hover:text-coffee-600 transition-colors"
                            >
                                {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-coffee-800 ml-1 uppercase tracking-widest text-[10px]">New Password</label>
                            <div className="relative">
                                <input
                                    type={showPasswords.new ? "text" : "password"}
                                    required
                                    className="w-full px-4 pr-12 py-4 rounded-xl border border-coffee-200 focus:ring-2 focus:ring-coffee-500 focus:border-transparent outline-none transition-all bg-coffee-50/20"
                                    placeholder="New secret"
                                    value={formData.newPassword}
                                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-coffee-400 hover:text-coffee-600 transition-colors"
                                >
                                    {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-coffee-800 ml-1 uppercase tracking-widest text-[10px]">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showPasswords.confirm ? "text" : "password"}
                                    required
                                    className="w-full px-4 pr-12 py-4 rounded-xl border border-coffee-200 focus:ring-2 focus:ring-coffee-500 focus:border-transparent outline-none transition-all bg-coffee-50/20"
                                    placeholder="Repeat new secret"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-coffee-400 hover:text-coffee-600 transition-colors"
                                >
                                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {status && (
                        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {status.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                            {status.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-coffee-800 text-white font-bold uppercase tracking-[0.2em] text-xs py-5 rounded-2xl hover:bg-coffee-950 transition-all shadow-xl active:scale-95 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Processing...' : 'Save New Security Key'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
