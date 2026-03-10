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

import ContactForm from './components/ContactForm';

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

        {/* Contact & Map Section */}
        <section id="contact" className="py-24 px-6 bg-coffee-50/50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contact Form on the Left */}
            <div className="order-2 lg:order-1">
              <ContactForm />
            </div>

            {/* Map on the Right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-[500px] rounded-3xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 border-4 border-white order-1 lg:order-2"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.718873426732!2d38.78853757577543!3d8.995995490987452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b850029b46505%3A0x290d235c5c6396f4!2sBole%20Rwanda%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1709971000000!5m2!1sen!2set"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
