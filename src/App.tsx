/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-coffee-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <About />
        </motion.div>

        <Menu />
        
        <Gallery />
        
        {/* Testimonial / Quote Section */}
        <section className="py-32 px-6 bg-coffee-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=1920" 
              alt="Coffee beans"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="text-coffee-400 text-6xl font-serif block mb-8">“</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white italic leading-relaxed mb-12">
              Coffee is a language in itself. It speaks of mornings, of quiet moments, and of the vibrant energy of a new day.
            </h2>
            <div className="w-16 h-[1px] bg-coffee-500 mx-auto mb-6" />
            <p className="text-coffee-400 uppercase tracking-widest text-sm font-bold">Bright Coffee Philosophy</p>
          </div>
        </section>

        {/* Location / Hours Section */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-coffee-500 font-semibold uppercase tracking-[0.2em] text-sm mb-4 block">Visit Us</span>
              <h2 className="text-4xl md:text-5xl font-serif text-coffee-950 mb-8">Come Say Hello</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-coffee-50 flex items-center justify-center shrink-0">
                    <span className="text-coffee-800 font-bold">01</span>
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-coffee-900 mb-2">Our Location</h4>
                    <p className="text-coffee-600">Ethiopia, Addis Ababa, Bole Rwanda</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-coffee-50 flex items-center justify-center shrink-0">
                    <span className="text-coffee-800 font-bold">02</span>
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-coffee-900 mb-2">Opening Hours</h4>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                      <span className="text-coffee-600">Mon - Fri</span>
                      <span className="text-coffee-900 font-medium">7:00 AM - 8:00 PM</span>
                      <span className="text-coffee-600">Sat - Sun</span>
                      <span className="text-coffee-900 font-medium">8:00 AM - 9:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="mt-12 bg-coffee-800 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-coffee-900 transition-all shadow-xl">
                Get Directions
              </button>
            </div>
            <div className="h-[500px] rounded-3xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.617543867613!2d-73.985428!3d40.748440!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a145!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

