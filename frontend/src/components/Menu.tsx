import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Coffee } from 'lucide-react';
import { api } from '../lib/api';

interface Service {
  id: number;
  title: string;
  price: number;
  image: string;
  content: string;
}

const ServiceCard = ({ service, index }: { service: Service, index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const charLimit = 30;
  const isLong = service.content.length > charLimit;

  return (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-[2rem] border border-coffee-100 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col"
    >
      {/* Image Top */}
      <div className="h-72 overflow-hidden relative bg-[#FAF9F6]">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Content Bottom */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-serif font-bold text-coffee-950 pr-4 leading-tight">{service.title}</h3>
          <span className="bg-coffee-50 text-coffee-900 font-mono text-xl font-bold px-4 py-2 rounded-xl whitespace-nowrap shadow-sm border border-coffee-100 text-center">
            ${service.price.toFixed(2)}
          </span>
        </div>
        <div className="text-coffee-600 font-light leading-relaxed mb-8 flex-1 text-base">
          {isLong && !isExpanded ? `${service.content.substring(0, charLimit)}...` : service.content}
          {isLong && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-2 text-coffee-900 font-bold hover:underline text-sm inline-block"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>
        <button className="w-full py-4 rounded-xl border-2 border-coffee-100 text-coffee-900 font-bold uppercase tracking-widest text-xs hover:bg-coffee-900 hover:text-white transition-all hover:border-coffee-900 mt-auto">
          Experience Now
        </button>
      </div>
    </motion.div>
  );
};

export default function Menu() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchServices();
  }, []);

  return (
    <section id="menu" className="py-16 px-6 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Header */}
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-4xl font-serif text-coffee-950 tracking-tight"
          >
            Our Menu
          </motion.h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-900"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-16 text-coffee-400">
            <Coffee className="h-16 w-16 mx-auto mb-4 opacity-20" />
            <p className="text-xl font-serif">Our curated menu is currently being updated...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence>
              {services.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
