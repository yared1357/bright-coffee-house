import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const menuCategories = [
  { id: 'coffee', name: 'Specialty Coffee', subtitle: 'Ethically sourced, masterfully roasted' },
  { id: 'tea', name: 'Artisan Tea', subtitle: 'Rare leaves and botanical infusions' },
  { id: 'pastries', name: 'Handcrafted Pastries', subtitle: 'Baked fresh every morning' },
  { id: 'brunch', name: 'Signature Brunch', subtitle: 'Elevated classics for your morning' },
];

const menuItems = [
  { id: 1, category: 'coffee', name: 'Signature Espresso', price: '4.50', description: 'Double shot of our house blend with notes of dark chocolate and citrus.', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600' },
  { id: 2, category: 'coffee', name: 'Velvet Latte', price: '5.25', description: 'Silky steamed milk poured over rich espresso, topped with micro-foam.', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=600' },
  { id: 3, category: 'coffee', name: 'Cold Brew Reserve', price: '5.50', description: 'Steeped for 18 hours for a smooth, low-acid finish with caramel undertones.', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=600' },
  { id: 4, category: 'tea', name: 'Ceremonial Matcha', price: '6.00', description: 'Premium grade Japanese matcha whisked with your choice of milk.', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=600' },
  { id: 5, category: 'tea', name: 'Earl Grey Lavender', price: '4.75', description: 'Classic black tea infused with fragrant bergamot and dried lavender.', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=600' },
  { id: 6, category: 'pastries', name: 'Almond Croissant', price: '4.95', description: 'Flaky, buttery layers filled with sweet almond cream and topped with toasted slivers.', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=600' },
  { id: 7, category: 'pastries', name: 'Pistachio Financier', price: '3.50', description: 'Dense, nutty French cake made with browned butter and ground pistachios.', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=600' },
  { id: 8, category: 'brunch', name: 'Avocado Tartine', price: '12.50', description: 'Sourdough toast with smashed avocado, heirloom tomatoes, and a poached egg.', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=600' },
  { id: 9, category: 'brunch', name: 'Shakshuka', price: '14.00', description: 'Spiced tomato and bell pepper sauce with poached eggs and feta cheese.', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=600' },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('coffee');

  const filteredItems = menuItems.filter(item => item.category === activeCategory);
  const currentCategory = menuCategories.find(cat => cat.id === activeCategory);

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
              className="text-coffee-600 font-medium uppercase tracking-[0.3em] text-xs mb-6 block"
            >
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
              Our menu is a living document, evolving with the seasons and the discoveries of our master roasters and pastry chefs.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Vertical Category Navigation */}
          <div className="lg:col-span-3">
            <div className="sticky top-32 flex flex-col gap-8">
              {menuCategories.map((cat, index) => (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className="group text-left"
                >
                  <div className="flex items-center gap-4 mb-1">
                    <span className={`text-xs font-mono transition-colors ${activeCategory === cat.id ? 'text-coffee-600' : 'text-coffee-300'}`}>
                      0{index + 1}
                    </span>
                    <h3 className={`text-2xl font-serif transition-all duration-500 ${
                      activeCategory === cat.id ? 'text-coffee-950 translate-x-2' : 'text-coffee-400 group-hover:text-coffee-600'
                    }`}>
                      {cat.name}
                    </h3>
                  </div>
                  <div className={`h-[1px] transition-all duration-500 bg-coffee-950 ${
                    activeCategory === cat.id ? 'w-full' : 'w-0'
                  }`} />
                </motion.button>
              ))}
              
              <div className="mt-12 pt-12 border-t border-coffee-100">
                <p className="text-xs text-coffee-400 uppercase tracking-widest leading-loose">
                  Daily from 7:00 AM <br />
                  to 9:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Dynamic Menu Content */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12"
              >
                {/* Featured Category Image */}
                <div className="md:col-span-2 mb-8 relative h-[400px] rounded-3xl overflow-hidden group">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-700 z-10" />
                  <img 
                    src={filteredItems[0].image} 
                    alt={currentCategory?.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-10 left-10 z-20">
                    <h4 className="text-white text-4xl font-serif mb-2">{currentCategory?.name}</h4>
                    <p className="text-white/80 font-light tracking-wide">{currentCategory?.subtitle}</p>
                  </div>
                </div>

                {/* Menu Items List */}
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="group"
                  >
                    <div className="flex justify-between items-end mb-4">
                      <h4 className="text-2xl font-serif text-coffee-950 group-hover:text-coffee-600 transition-colors">
                        {item.name}
                      </h4>
                      <div className="flex-1 mx-4 mb-2 border-b border-dotted border-coffee-200" />
                      <span className="text-xl font-mono text-coffee-800">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-coffee-600 font-light leading-relaxed italic mb-6">
                      {item.description}
                    </p>
                    <div className="relative h-[200px] rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-24 p-12 bg-coffee-950 rounded-[3rem] text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-coffee-500/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-6">Experience the Full Selection</h3>
                <p className="text-coffee-300 mb-10 max-w-xl mx-auto font-light">
                  Our complete menu includes seasonal specials, reserve coffee flights, and our full wine and craft beer list.
                </p>
                <button className="inline-flex items-center gap-4 bg-white text-coffee-950 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-coffee-100 transition-all shadow-2xl">
                  View Full Digital Menu
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

