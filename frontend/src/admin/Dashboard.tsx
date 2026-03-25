import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { Trash2, Phone, Mail, User, Clock, MessageSquareText, RefreshCw, Eye, X, Coffee, Users, Bell, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface Stats {
    services: number;
    unreadMessages: number;
    totalMessages: number;
    subscribers: number;
}

export default function Dashboard() {
    const [messages, setMessages] = useState<any[]>([]);
    const [stats, setStats] = useState<Stats>({ services: 0, unreadMessages: 0, totalMessages: 0, subscribers: 0 });
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [selectedMessage, setSelectedMessage] = useState<any | null>(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setIsRefreshing(true);
        const token = localStorage.getItem('adminToken');
        if (!token) return;
        try {
            const [contactsData, statsData] = await Promise.all([
                api.get('/contacts', token),
                api.get('/stats', token)
            ]);

            if (Array.isArray(contactsData)) setMessages(contactsData);
            if (statsData) setStats(statsData);

        } catch (err) {
            console.error('Error fetching dashboard data');
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    const handleReadMessage = async (msg: any) => {
        setSelectedMessage(msg);
        if (!msg.isRead) {
            const token = localStorage.getItem('adminToken');
            if (!token) return;
            try {
                await api.put(`/contacts/${msg.id}/read`, {}, token);
                setMessages(messages.map(m => m.id === msg.id ? { ...m, isRead: true } : m));
                setStats(prev => ({ ...prev, unreadMessages: Math.max(0, prev.unreadMessages - 1) }));
            } catch (err) {
                console.error('Failed to mark as read');
            }
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Permanently delete this inquiry?')) return;
        const token = localStorage.getItem('adminToken');
        if (!token) return;
        try {
            await api.delete(`/contacts/${id}`, token);
            setMessages(messages.filter(m => m.id !== id));
            // Refetch stats to keep counts accurate
            fetchDashboardData();
            if (selectedMessage?.id === id) setSelectedMessage(null);
        } catch (err) {
            alert('Delete failed');
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <div className="relative h-16 w-16">
                <div className="absolute inset-0 border-4 border-coffee-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-coffee-800 rounded-full border-t-transparent animate-spin"></div>
            </div>
        </div>
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {/* Services Card */}
                <Link to="/admin/services" className="block focus:outline-none col-span-1">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-coffee-100 shadow-xl flex flex-col xl:flex-row items-start xl:items-center justify-between group flex-1 cursor-pointer hover:border-coffee-300 transition-colors h-full gap-4 xl:gap-0"
                    >
                        <div>
                            <p className="text-[10px] font-black text-coffee-400 uppercase tracking-[0.2em] mb-2 truncate">Services</p>
                            <h3 className="text-3xl md:text-4xl font-serif font-bold text-coffee-950">{stats.services}</h3>
                        </div>
                        <div className="bg-coffee-50 p-4 md:p-5 rounded-2xl group-hover:bg-coffee-950 group-hover:text-white transition-all duration-500 self-end xl:self-auto">
                            <Coffee className="h-6 w-6 md:h-8 md:w-8 text-coffee-600 group-hover:text-coffee-100" />
                        </div>
                    </motion.div>
                </Link>

                {/* Subscribers Card */}
                <Link to="/admin/subscribers" className="block focus:outline-none col-span-1">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-coffee-100 shadow-xl flex flex-col xl:flex-row items-start xl:items-center justify-between group flex-1 cursor-pointer hover:border-coffee-300 transition-colors h-full gap-4 xl:gap-0"
                    >
                        <div>
                            <p className="text-[10px] font-black text-coffee-400 uppercase tracking-[0.2em] mb-2 truncate">Subscribers</p>
                            <h3 className="text-3xl md:text-4xl font-serif font-bold text-coffee-950">{stats.subscribers}</h3>
                        </div>
                        <div className="bg-coffee-50 p-4 md:p-5 rounded-2xl group-hover:bg-coffee-950 group-hover:text-white transition-all duration-500 self-end xl:self-auto">
                            <Users className="h-6 w-6 md:h-8 md:w-8 text-coffee-600 group-hover:text-coffee-100" />
                        </div>
                    </motion.div>
                </Link>

                {/* Messages Card */}
                <Link to="/admin/messages" className="block focus:outline-none col-span-2 md:col-span-1">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="relative bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-coffee-100 shadow-xl flex items-center justify-between group flex-1 cursor-pointer hover:border-coffee-300 transition-colors h-full"
                    >
                        {stats.unreadMessages > 0 && (
                            <div className="absolute -top-2 -right-2 bg-red-500 text-white min-w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-lg animate-bounce z-10">
                                {stats.unreadMessages}
                            </div>
                        )}
                        <div>
                            <p className="text-[10px] font-black text-coffee-400 uppercase tracking-[0.2em] mb-2 truncate">Inquiries</p>
                            <div className="flex items-end gap-3">
                                <h3 className="text-3xl md:text-4xl font-serif font-bold text-coffee-950">{stats.totalMessages}</h3>
                                {stats.unreadMessages > 0 && (
                                    <span className="text-xs md:text-sm font-bold text-red-500 mb-1 flex items-center gap-1">
                                        <Bell className="h-3 w-3 md:h-3.5 md:w-3.5" />
                                        {stats.unreadMessages} new
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="bg-coffee-50 p-4 md:p-5 rounded-2xl group-hover:bg-coffee-950 group-hover:text-white transition-all duration-500">
                            <MessageSquareText className="h-6 w-6 md:h-8 md:w-8 text-coffee-600 group-hover:text-coffee-100" />
                        </div>
                    </motion.div>
                </Link>
            </div>

            {/* Messages Feed */}
            <div className="bg-white rounded-[2.5rem] border border-coffee-100 shadow-2xl overflow-hidden">
                <div className="p-8 sm:p-10 border-b border-coffee-50 bg-coffee-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-coffee-950">Recent Communication</h3>
                        <p className="text-xs text-coffee-500 mt-1 uppercase tracking-widest font-bold">Latest customer messages and feedback</p>
                    </div>
                    <button
                        onClick={fetchDashboardData}
                        disabled={isRefreshing}
                        className="flex items-center justify-center gap-2 bg-white px-5 py-2.5 rounded-full border border-coffee-100 text-[10px] font-black text-coffee-600 uppercase tracking-widest hover:bg-coffee-950 hover:text-white transition-all shadow-sm active:scale-95 disabled:opacity-50"
                    >
                        <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                        {isRefreshing ? 'Syncing...' : 'Sync Feed'}
                    </button>
                </div>

                <div className="divide-y divide-coffee-50">
                    <AnimatePresence mode="popLayout">
                        {messages.length === 0 ? (
                            <div className="p-20 text-center text-coffee-400 italic bg-coffee-50/5">
                                <MessageSquareText className="h-12 w-12 mx-auto mb-4 opacity-10" />
                                No inquiries detected in the system.
                            </div>
                        ) : (
                            messages.slice(0, 3).map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className={`p-6 sm:p-8 transition-all flex flex-col gap-4 ${!item.isRead ? 'bg-coffee-50/40 border-l-4 border-l-coffee-500 hover:bg-coffee-50/60' : 'hover:bg-coffee-50/10'}`}
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <div className="flex items-center gap-2.5 text-coffee-950 font-black text-sm bg-white px-4 py-2 rounded-xl border border-coffee-200/50 shadow-sm">
                                                <User className="h-4 w-4 text-coffee-600" />
                                                {item.name}
                                            </div>
                                            <a href={`tel:${item.phone}`} className="flex items-center gap-2 text-xs font-bold text-coffee-600 hover:text-coffee-950 transition-colors bg-white px-3 py-1.5 rounded-lg border border-coffee-100 hover:border-coffee-300 shadow-sm">
                                                <Phone className="h-3.5 w-3.5" />
                                                {item.phone}
                                            </a>
                                            {item.email && (
                                                <a href={`mailto:${item.email}`} className="flex items-center gap-2 text-xs font-bold text-coffee-600 hover:text-coffee-950 transition-colors bg-white px-3 py-1.5 rounded-lg border border-coffee-100 hover:border-coffee-300 shadow-sm">
                                                    <Mail className="h-3.5 w-3.5" />
                                                    {item.email}
                                                </a>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {!item.isRead && (
                                                <span className="bg-red-500 text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-sm">
                                                    New
                                                </span>
                                            )}
                                            <div className="flex items-center gap-2 text-[10px] text-coffee-400 font-black uppercase tracking-widest mr-2">
                                                <Clock className="h-3.5 w-3.5" />
                                                {new Date(item.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 mt-2 bg-white p-4 rounded-2xl border border-coffee-100">
                                        <div className="flex-1 text-coffee-800 text-sm font-medium line-clamp-1 italic mr-4">
                                            "{item.message}"
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <button
                                                onClick={() => handleReadMessage(item)}
                                                className="p-2.5 bg-coffee-50 text-coffee-600 rounded-xl hover:bg-coffee-950 hover:text-white transition-all shadow-sm active:scale-95 border border-coffee-100 text-xs font-bold flex items-center gap-2"
                                                title="View Full Message"
                                            >
                                                <Eye className="h-4 w-4" />
                                                View
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95 border border-red-100/50"
                                                title="Delete Message"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {messages.length > 3 ? (
                <Link to="/admin/messages" className="flex items-center gap-2 text-xs font-black text-coffee-600 uppercase tracking-widest hover:text-coffee-950 transition-colors bg-white px-6 py-3 rounded-xl border border-coffee-100 shadow-sm hover:shadow-md">
                    See All Inquiries
                    <ChevronRight className="h-4 w-4" />
                </Link>
            ) : (
                <div className="flex items-center gap-2 text-[10px] font-black text-coffee-300 uppercase tracking-[0.3em]">
                    End of Records
                </div>
            )}

            {/* View Message Modal */}
            <AnimatePresence>
                {selectedMessage && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedMessage(null)}
                            className="absolute inset-0 bg-coffee-950/40 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="bg-white w-full max-w-[36rem] rounded-[2rem] shadow-2xl relative z-10 flex flex-col overflow-hidden max-h-[90vh]"
                        >
                            <div className="p-6 md:p-8 border-b border-coffee-50 bg-coffee-50/30 flex justify-between items-start flex-shrink-0">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="h-8 w-8 rounded-full bg-coffee-950 text-white flex items-center justify-center font-bold font-serif text-sm">
                                            {selectedMessage.name.charAt(0).toUpperCase()}
                                        </div>
                                        <h3 className="text-xl font-serif font-bold text-coffee-950 ml-2">
                                            {selectedMessage.name}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-4 mt-3">
                                        <a href={`tel:${selectedMessage.phone}`} className="flex items-center gap-1.5 text-xs font-bold text-coffee-600 hover:text-coffee-950 transition-colors">
                                            <Phone className="h-3 w-3" />
                                            {selectedMessage.phone}
                                        </a>
                                        {selectedMessage.email && (
                                            <a href={`mailto:${selectedMessage.email}`} className="flex items-center gap-1.5 text-xs font-bold text-coffee-600 hover:text-coffee-950 transition-colors">
                                                <Mail className="h-3 w-3" />
                                                {selectedMessage.email}
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-3">
                                    <button
                                        onClick={() => setSelectedMessage(null)}
                                        className="p-2 hover:bg-coffee-100 rounded-xl transition-colors text-coffee-400"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                    <div className="flex items-center gap-1.5 text-[10px] text-coffee-400 font-black uppercase tracking-widest bg-white px-2 py-1 rounded shadow-sm border border-coffee-100">
                                        <Clock className="h-3 w-3" />
                                        {new Date(selectedMessage.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 md:p-10 bg-[#FAF9F6] flex-1 overflow-y-auto custom-scrollbar">
                                <h4 className="text-[10px] font-black text-coffee-400 uppercase tracking-[0.2em] mb-4">Message Content</h4>
                                <div className="bg-white p-6 rounded-2xl border border-coffee-100 text-coffee-900 leading-loose text-sm shadow-sm whitespace-pre-wrap font-medium">
                                    {selectedMessage.message}
                                </div>
                            </div>

                            <div className="p-6 bg-white border-t border-coffee-50 flex justify-end gap-3">
                                <button
                                    onClick={() => handleDelete(selectedMessage.id)}
                                    className="px-5 py-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95 border border-red-100/50 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    Delete
                                </button>
                                <button
                                    onClick={() => setSelectedMessage(null)}
                                    className="px-6 py-2.5 bg-coffee-950 text-white rounded-xl hover:bg-black transition-all shadow-lg active:scale-95 text-[10px] font-bold uppercase tracking-widest"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
