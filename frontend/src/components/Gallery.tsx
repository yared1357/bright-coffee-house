import { motion } from 'motion/react';

const images = [
  { url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800', size: 'large' },
  { url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800', size: 'small' },
  { url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800', size: 'small' },
  { url: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&q=80&w=800', size: 'medium' },
  { url: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=800', size: 'small' },
  { url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=800', size: 'medium' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6 bg-coffee-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-coffee-500 font-semibold uppercase tracking-[0.2em] text-sm mb-4 block">Visuals</span>
            <h2 className="text-4xl md:text-6xl font-serif text-coffee-950 leading-tight">
              Captured Moments of <span className="italic text-coffee-600">Pure Bliss</span>
            </h2>
          </div>
          <p className="text-coffee-700 max-w-sm font-light">
            A glimpse into our world—where the aroma of fresh beans meets the warmth of community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group overflow-hidden rounded-2xl ${
                img.size === 'large' ? 'md:row-span-2 md:col-span-1' : 
                img.size === 'medium' ? 'md:col-span-2' : ''
              }`}
            >
              <div className="absolute inset-0 bg-coffee-950/20 group-hover:bg-coffee-950/40 transition-all duration-500 z-10" />
              <img 
                src={img.url} 
                alt="Gallery" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-white text-xs font-bold uppercase tracking-widest bg-coffee-800/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  Bright Coffee House
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
