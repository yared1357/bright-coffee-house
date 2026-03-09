import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-coffee-50 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1200" 
              alt="Coffee shop interior"
              className="w-full h-[600px] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-coffee-200 rounded-full -z-0 blur-3xl opacity-50" />
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-coffee-400 rounded-full -z-0 blur-3xl opacity-20" />
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-6 -left-6 bg-white p-8 rounded-2xl shadow-xl z-20 max-w-[240px]"
          >
            <span className="text-5xl font-serif font-bold text-coffee-800 block mb-2">15+</span>
            <p className="text-sm text-coffee-600 font-medium uppercase tracking-wider">Years of Crafting the Perfect Brew</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-coffee-500 font-semibold uppercase tracking-[0.2em] text-sm mb-4 block">Our Story</span>
          <h2 className="text-4xl md:text-6xl font-serif text-coffee-950 mb-8 leading-tight">
            Where Every Bean Tells a <span className="italic text-coffee-600">Unique Story</span>
          </h2>
          <p className="text-coffee-800 text-lg mb-6 leading-relaxed">
            Founded in 2009, Bright Coffee House began with a simple mission: to bring international coffee standards to our local community. We believe that coffee is more than just a drink—it's a ritual, a moment of peace, and a catalyst for connection.
          </p>
          <p className="text-coffee-700 mb-10 leading-relaxed">
            Our beans are ethically sourced from the high-altitude regions of Ethiopia, Colombia, and Vietnam, then roasted in small batches to preserve their distinct flavor profiles. From the first aroma to the last sip, we invite you to experience the passion we pour into every cup.
          </p>
          
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div>
              <h4 className="font-serif text-xl text-coffee-900 mb-2">Ethically Sourced</h4>
              <p className="text-sm text-coffee-600">Supporting farmers and sustainable practices globally.</p>
            </div>
            <div>
              <h4 className="font-serif text-xl text-coffee-900 mb-2">Master Roasters</h4>
              <p className="text-sm text-coffee-600">Precision roasting for complex, balanced flavors.</p>
            </div>
          </div>

          <button className="group flex items-center gap-3 text-coffee-900 font-bold uppercase tracking-widest text-sm hover:text-coffee-600 transition-colors">
            Learn More About Us
            <div className="w-12 h-[1px] bg-coffee-900 group-hover:w-16 transition-all" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
