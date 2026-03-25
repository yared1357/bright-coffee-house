import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
    Coffee,
    MessageSquare,
    Users,
    Settings as SettingsIcon,
    LogOut,
    LayoutDashboard,
    Menu,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [adminUser, setAdminUser] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Close sidebar on mobile when navigating
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const user = localStorage.getItem('adminUser');
        if (!token) {
            navigate('/admin/login');
        } else {
            setAdminUser(user || 'Admin');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    };

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
        { name: 'Messages', icon: MessageSquare, path: '/admin/messages' },
        { name: 'Services', icon: Coffee, path: '/admin/services' },
        { name: 'Subscribers', icon: Users, path: '/admin/subscribers' },
        { name: 'Settings', icon: SettingsIcon, path: '/admin/settings' },
    ];

    return (
        <div className="min-h-screen bg-coffee-50 flex flex-col lg:flex-row h-screen overflow-hidden">
            {/* Mobile Header */}
            <header className="lg:hidden h-16 bg-coffee-950 text-white flex items-center justify-between px-6 z-50 shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="bg-coffee-500 p-1.5 rounded-lg">
                        <Coffee className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-serif font-bold tracking-tight">Admin Hub</span>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                    <Menu className="h-6 w-6" />
                </button>
            </header>

            {/* Sidebar Overlay (Mobile) */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/60 z-[60] lg:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-[70] w-72 bg-coffee-950 text-white flex flex-col shadow-2xl transition-transform duration-300 transform
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <div className="p-8 hidden lg:flex items-center gap-3 border-b border-coffee-900/50">
                    <div className="bg-coffee-500 p-2 rounded-xl shadow-inner">
                        <Coffee className="h-6 w-6" />
                    </div>
                    <span className="text-xl font-serif font-bold tracking-tight">Admin Hub</span>
                </div>

                <div className="lg:hidden p-6 flex items-center justify-between border-b border-coffee-900/50">
                    <span className="font-bold text-coffee-400 uppercase tracking-widest text-[10px]">Management Menu</span>
                    <button onClick={() => setIsSidebarOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg text-coffee-500 hover:text-white transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
                    <p className="px-4 mb-4 text-[10px] font-bold text-coffee-600 uppercase tracking-[0.2em] hidden lg:block">Main Navigation</p>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                    ? 'bg-coffee-500 text-white shadow-lg translate-x-1'
                                    : 'text-coffee-400 hover:bg-coffee-900 hover:text-white hover:translate-x-1'
                                }`
                            }
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="font-medium">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-6 border-t border-coffee-900/50 bg-black/20">
                    <div className="flex items-center gap-3 mb-6 px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-coffee-400 to-coffee-600 flex items-center justify-center font-bold text-coffee-950 shadow-lg">
                            {adminUser[0]?.toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-white leading-none truncate">{adminUser}</p>
                            <p className="text-[10px] text-coffee-500 mt-1.5 uppercase tracking-widest font-black">Super Admin</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="group w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-bold text-xs uppercase tracking-widest"
                    >
                        <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Terminate Session</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden bg-coffee-50/50">
                <header className="hidden lg:flex h-20 bg-white border-b border-coffee-100 items-center justify-between px-10 shadow-sm sticky top-0 z-30">
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-coffee-950">System Overview</h2>
                        <p className="text-[10px] text-coffee-400 font-bold uppercase tracking-widest mt-0.5">Real-time management dashboard</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 group cursor-default">
                            <div className="relative">
                                <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25"></span>
                                <div className="h-2 w-2 bg-green-500 rounded-full relative"></div>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-green-600">Secure Connection</span>
                        </div>
                        <div className="h-8 w-[1px] bg-coffee-100"></div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-coffee-950">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                            <p className="text-[10px] text-coffee-400 font-bold uppercase tracking-tighter">Server Local Time</p>
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-4 sm:p-10 overflow-y-auto custom-scrollbar relative">
                    <div className="max-w-6xl mx-auto pb-10">
                        <Outlet />
                    </div>
                </div>
            </main>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(139, 92, 71, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(139, 92, 71, 0.2);
                }
            `}</style>
        </div>
    );
}
