import React, { useState } from 'react';
import { motion } from 'motion/react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add logic here to send the form data
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', phone: '', email: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-coffee-100"
        >
            <h3 className="text-2xl font-serif text-coffee-900 mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-coffee-800 mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-coffee-200 focus:ring-2 focus:ring-coffee-500 focus:border-transparent outline-none transition-all bg-coffee-50/30"
                        placeholder="Your name"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-coffee-800 mb-1">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-coffee-200 focus:ring-2 focus:ring-coffee-500 focus:border-transparent outline-none transition-all bg-coffee-50/30"
                            placeholder="Your phone number"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-coffee-800 mb-1">Email <span className="text-coffee-400 font-normal">(Optional)</span></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-coffee-200 focus:ring-2 focus:ring-coffee-500 focus:border-transparent outline-none transition-all bg-coffee-50/30"
                            placeholder="your@email.com"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-coffee-800 mb-1">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-coffee-200 focus:ring-2 focus:ring-coffee-500 focus:border-transparent outline-none transition-all bg-coffee-50/30 resize-none"
                        placeholder="How can we help you?"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-coffee-800 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-coffee-950 transition-all shadow-lg active:scale-[0.98]"
                >
                    Send Message
                </button>
            </form>
        </motion.div>
    );
};

export default ContactForm;
