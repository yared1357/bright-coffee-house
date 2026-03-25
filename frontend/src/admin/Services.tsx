import React, { useState, useEffect, useRef } from 'react';
import { api } from '../lib/api';
import {
    Plus,
    Pencil,
    Trash2,
    Image as ImageIcon,
    DollarSign,
    FileText,
    X,
    Save,
    Coffee,
    Search,
    Upload,
    Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Service {
    id: number;
    title: string;
    price: number;
    image: string;
    content: string;
}

export default function Services() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewService, setViewService] = useState<Service | null>(null);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        content: ''
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const data = await api.get('/services');
            if (Array.isArray(data)) {
                setServices(data);
            }
        } catch (err) {
            console.error('Error fetching services');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (service: Service | null = null) => {
        if (service) {
            setEditingService(service);
            setFormData({
                title: service.title,
                price: service.price.toString(),
                content: service.content
            });
            setPreviewUrl(service.image);
            setSelectedFile(null);
        } else {
            setEditingService(null);
            setFormData({
                title: '',
                price: '',
                content: ''
            });
            setPreviewUrl('');
            setSelectedFile(null);
        }
        setIsModalOpen(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        if (!token) return;

        const data = new FormData();
        data.append('title', formData.title);
        data.append('price', formData.price);
        data.append('content', formData.content);
        if (selectedFile) {
            data.append('image', selectedFile);
        }

        try {
            if (editingService) {
                await api.put(`/services/${editingService.id}`, data, token);
            } else {
                await api.post('/services', data, token);
            }
            setIsModalOpen(false);
            fetchServices();
        } catch (err) {
            alert('Operation failed');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Permanently remove this service?')) return;
        const token = localStorage.getItem('adminToken');
        if (!token) return;

        try {
            await api.delete(`/services/${id}`, token);
            setServices(services.filter(s => s.id !== id));
        } catch (err) {
            alert('Delete failed');
        }
    };

    const filteredServices = services.filter(s =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="space-y-8 animate-in fade-in duration-700 relative">
            <div className="sticky top-0 z-20 bg-[#FAF9F6]/95 backdrop-blur-md pt-4 pb-6 w-full shadow-sm rounded-b-2xl border-b border-coffee-100 flex flex-row items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl sm:text-3xl font-serif font-bold text-coffee-950 underline decoration-coffee-200 underline-offset-4 sm:underline-offset-8 leading-tight">Menu & Services</h3>
                    <p className="text-[10px] sm:text-sm text-coffee-600 mt-1 sm:mt-2 hidden sm:block">Manage the coffee varieties and specialty services offered to customers.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex-shrink-0 bg-coffee-800 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 font-bold text-[10px] sm:text-xs uppercase tracking-widest hover:bg-coffee-950 transition-all shadow-xl active:scale-95"
                >
                    <Plus className="h-4 w-4" />
                    Launch<span className="hidden sm:inline"> New Service</span>
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-coffee-400" />
                <input
                    type="text"
                    placeholder="Search services by title..."
                    className="w-full pl-12 pr-4 py-4 bg-white border border-coffee-100 rounded-2xl focus:ring-2 focus:ring-coffee-500 focus:border-transparent outline-none shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredServices.length === 0 ? (
                        <div className="col-span-full py-20 text-center text-coffee-400 italic">
                            <Coffee className="h-12 w-12 mx-auto mb-4 opacity-10" />
                            No boutique services found. Start by launching one.
                        </div>
                    ) : (
                        filteredServices.map((service) => (
                            <motion.div
                                key={service.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-[2rem] border border-coffee-100 shadow-xl overflow-hidden group hover:shadow-2xl transition-all"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={service.image || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80'}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button
                                            onClick={() => setViewService(service)}
                                            className="p-2.5 bg-white/90 backdrop-blur-sm text-coffee-600 rounded-xl hover:bg-coffee-800 hover:text-white transition-all shadow-lg active:scale-90"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleOpenModal(service)}
                                            className="p-2.5 bg-white/90 backdrop-blur-sm text-coffee-600 rounded-xl hover:bg-coffee-800 hover:text-white transition-all shadow-lg active:scale-90"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(service.id)}
                                            className="p-2.5 bg-white/90 backdrop-blur-sm text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-lg active:scale-90"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <span className="bg-coffee-950 text-white px-4 py-1.5 rounded-full text-xs font-black tracking-widest shadow-lg">
                                            ${service.price.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h4 className="text-xl font-serif font-bold text-coffee-950 mb-3">{service.title}</h4>
                                    <p className="text-sm text-coffee-600 leading-relaxed line-clamp-3 mb-6">
                                        {service.content}
                                    </p>
                                    <div className="pt-6 border-t border-coffee-50 flex items-center justify-between">
                                        <span className="text-[10px] font-black text-coffee-400 uppercase tracking-widest">Active Offering</span>
                                        <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* View Modal */}
            <AnimatePresence>
                {viewService && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setViewService(null)}
                            className="absolute inset-0 bg-coffee-950/40 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-[32rem] rounded-[2rem] shadow-2xl relative z-10 max-h-[90vh] flex flex-col overflow-hidden"
                        >
                            <div className="h-48 md:h-64 overflow-hidden relative flex-shrink-0">
                                <img
                                    src={viewService.image || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80'}
                                    alt={viewService.title}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={() => setViewService(null)}
                                    className="absolute top-4 right-4 p-2.5 bg-black/50 backdrop-blur-md text-white rounded-xl hover:bg-black transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-coffee-950 text-white px-4 py-1.5 rounded-full text-xs font-black tracking-widest shadow-lg">
                                        ${viewService.price.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar bg-[#FAF9F6]">
                                <h3 className="text-2xl font-serif font-bold text-coffee-950 mb-4">{viewService.title}</h3>
                                <div className="bg-white p-6 rounded-2xl border border-coffee-100 text-coffee-900 leading-loose text-sm shadow-sm whitespace-pre-wrap font-medium">
                                    {viewService.content}
                                </div>
                            </div>

                            <div className="p-6 bg-white border-t border-coffee-50 flex justify-end">
                                <button
                                    onClick={() => {
                                        const s = viewService;
                                        setViewService(null);
                                        handleOpenModal(s);
                                    }}
                                    className="px-6 py-2.5 bg-coffee-950 text-white rounded-xl hover:bg-black transition-all shadow-lg active:scale-95 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mr-3"
                                >
                                    <Pencil className="h-3.5 w-3.5" />
                                    Edit Service
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-coffee-950/40 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-[32rem] rounded-[2rem] shadow-2xl relative z-10 max-h-[90vh] flex flex-col overflow-hidden"
                        >
                            <div className="p-6 md:p-8 border-b border-coffee-50 bg-coffee-50/20 flex items-center justify-between flex-shrink-0">
                                <div>
                                    <h3 className="text-xl font-serif font-bold text-coffee-950">
                                        {editingService ? 'Edit Experience' : 'New Service Offering'}
                                    </h3>
                                    <p className="text-[10px] text-coffee-500 mt-1 uppercase tracking-widest font-bold">
                                        Define the details of your service
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-coffee-100 rounded-xl transition-colors"
                                >
                                    <X className="h-5 w-5 text-coffee-400" />
                                </button>
                            </div>

                            <div className="overflow-y-auto custom-scrollbar flex-1">
                                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-coffee-500 uppercase tracking-widest flex items-center gap-2 ml-1">
                                                <FileText className="h-3 w-3" />
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 text-sm bg-coffee-50/30 border border-coffee-100 rounded-xl focus:ring-2 focus:ring-coffee-500 outline-none transition-all"
                                                placeholder="e.g., Gold Pour"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-coffee-500 uppercase tracking-widest flex items-center gap-2 ml-1">
                                                <DollarSign className="h-3 w-3" />
                                                Price ($)
                                            </label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                required
                                                className="w-full px-4 py-3 text-sm bg-coffee-50/30 border border-coffee-100 rounded-xl focus:ring-2 focus:ring-coffee-500 outline-none transition-all"
                                                placeholder="12.50"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-coffee-500 uppercase tracking-widest flex items-center gap-2 ml-1">
                                            <ImageIcon className="h-3 w-3" />
                                            Service Image
                                        </label>
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="relative h-32 w-full border-2 border-dashed border-coffee-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-coffee-500 hover:bg-coffee-50/50 transition-all group overflow-hidden bg-coffee-50/30"
                                        >
                                            {previewUrl ? (
                                                <img
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <>
                                                    <Upload className="h-6 w-6 text-coffee-300 group-hover:text-coffee-600 mb-2 transition-colors" />
                                                    <p className="text-[10px] font-bold text-coffee-400 group-hover:text-coffee-600 transition-colors uppercase tracking-widest">Select Image</p>
                                                </>
                                            )}
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleFileChange}
                                                className="hidden"
                                                accept="image/*"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-coffee-500 uppercase tracking-widest flex items-center gap-2 ml-1">
                                            <FileText className="h-3 w-3" />
                                            Description
                                        </label>
                                        <textarea
                                            required
                                            rows={3}
                                            className="w-full px-4 py-3 text-sm bg-coffee-50/30 border border-coffee-100 rounded-xl focus:ring-2 focus:ring-coffee-500 outline-none transition-all resize-none"
                                            placeholder="Describe the experience..."
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        />
                                    </div>

                                    <div className="pt-4 flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="flex-1 px-4 py-3.5 rounded-xl border border-coffee-100 font-bold text-[10px] uppercase tracking-widest text-coffee-600 hover:bg-coffee-50 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-[2] bg-coffee-950 text-white px-4 py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95"
                                        >
                                            <Save className="h-3.5 w-3.5" />
                                            {editingService ? 'Update' : 'Launch'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
