import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { Trash2, UserCheck, Clock, Download, Search, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Subscribers() {
    const [subs, setSubs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchSubs();
    }, []);

    const fetchSubs = async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) return;
        try {
            const data = await api.get('/subscriptions', token);
            if (Array.isArray(data)) {
                setSubs(data);
            }
        } catch (err) {
            console.error('Error fetching subscribers');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Remove this subscriber from your list?')) return;
        const token = localStorage.getItem('adminToken');
        if (!token) return;
        try {
            await api.delete(`/subscriptions/${id}`, token);
            setSubs(subs.filter(s => s.id !== id));
        } catch (err) {
            alert('Operation failed');
        }
    };

    const filteredSubs = subs.filter(s =>
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <div className="relative h-16 w-16">
                <div className="absolute inset-0 border-4 border-coffee-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-coffee-800 rounded-full border-t-transparent animate-spin"></div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h3 className="text-3xl font-serif font-bold text-coffee-950 underline decoration-coffee-200 underline-offset-8">Audience Directory</h3>
                    <p className="text-coffee-600 mt-2">Manage your loyal coffee newsletter enthusiasts.</p>
                </div>
                <button
                    onClick={() => {
                        const csvContent = "data:text/csv;charset=utf-8,Email,Subscribed At\n" + subs.map(s => `${s.email},${s.createdAt}`).join("\n");
                        const encodedUri = encodeURI(csvContent);
                        const link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", "subscribers.csv");
                        document.body.appendChild(link);
                        link.click();
                    }}
                    className="w-full sm:w-auto bg-coffee-800 text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-xs uppercase tracking-widest hover:bg-coffee-950 transition-all shadow-xl active:scale-95"
                >
                    <Download className="h-4 w-4" />
                    Export CSV
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-coffee-400" />
                <input
                    type="text"
                    placeholder="Search by email..."
                    className="w-full pl-12 pr-4 py-4 bg-white border border-coffee-100 rounded-2xl focus:ring-2 focus:ring-coffee-500 focus:border-transparent outline-none shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-3xl border border-coffee-100 shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-coffee-50/50 border-b border-coffee-100 uppercase text-[10px] font-bold text-coffee-500 tracking-[0.2em]">
                            <tr>
                                <th className="px-8 py-6 whitespace-nowrap">Identity Status</th>
                                <th className="px-8 py-6 whitespace-nowrap">Access Point (Email)</th>
                                <th className="px-8 py-6 whitespace-nowrap">Onboarding Date</th>
                                <th className="px-8 py-6 text-right whitespace-nowrap">Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-coffee-50">
                            <AnimatePresence mode="popLayout">
                                {filteredSubs.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center text-coffee-400 bg-coffee-50/5">
                                            <div className="flex flex-col items-center gap-3">
                                                <Mail className="h-10 w-10 opacity-20" />
                                                <p className="italic">No digital coffee drinkers found.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredSubs.map((sub) => (
                                        <motion.tr
                                            key={sub.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="hover:bg-coffee-50/10 transition-colors group"
                                        >
                                            <td className="px-8 py-6">
                                                <span className="flex items-center gap-2 text-green-700 bg-green-50 w-fit px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-widest border border-green-100">
                                                    <UserCheck className="h-3 w-3" />
                                                    Verified
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 font-bold text-coffee-950 truncate max-w-[200px] sm:max-w-none">{sub.email}</td>
                                            <td className="px-8 py-6 text-sm text-coffee-500">
                                                <div className="flex items-center gap-2 font-medium">
                                                    <Clock className="h-4 w-4 text-coffee-300" />
                                                    {new Date(sub.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button
                                                    onClick={() => handleDelete(sub.id)}
                                                    className="p-3 text-coffee-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-100 lg:opacity-0 group-hover:opacity-100 active:scale-90"
                                                    title="Remove Subscriber"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            <p className="text-center text-[10px] text-coffee-400 font-bold uppercase tracking-[0.3em]">Total Membership: {filteredSubs.length}</p>
        </div>
    );
}
