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
    <section id="menu" className="py-32 px-6 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-end">
          <div className="lg:col-span-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-coffee-600 font-medium uppercase tracking-[0.3em] text-xs mb-6 flex items-center gap-3"
            >
              <Sparkles className="h-4 w-4" />
              The Gastronomy
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-serif text-coffee-950 leading-[0.9] tracking-tight"
            >
              A Symphony of <br />
              <span className="italic text-coffee-500">Flavors & Craft</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-coffee-800 font-light leading-relaxed text-lg border-l border-coffee-200 pl-8"
            >
              Our exclusive menu is a living document, dynamically crafted by our master roasters and updated in real-time.
            </motion.p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-900"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-32 text-coffee-400">
            <Coffee className="h-16 w-16 mx-auto mb-4 opacity-20" />
            <p className="text-xl font-serif">Our curated menu is currently being updated...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence>
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-[2rem] border border-coffee-100 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col"
                >
                  {/* Image Top */}
                  <div className="h-72 overflow-hidden relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
                    <p className="text-coffee-600 font-light leading-relaxed mb-8 flex-1 text-base">
                      {service.content}
                    </p>
                    <button className="w-full py-4 rounded-xl border-2 border-coffee-100 text-coffee-900 font-bold uppercase tracking-widest text-xs hover:bg-coffee-900 hover:text-white transition-all hover:border-coffee-900">
                      Experience Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
