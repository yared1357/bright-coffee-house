import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1920',
    title: 'Wake Up to Perfection',
    subtitle: 'Expertly roasted beans, brewed with passion for the ultimate coffee experience.',
    cta: 'Explore Our Menu'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1920',
    title: 'The Art of Brewing',
    subtitle: 'Discover the delicate balance of flavors in every cup of our specialty coffee.',
    cta: 'Our Story'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1920',
    title: 'Your Daily Sanctuary',
    subtitle: 'A warm, inviting space designed for moments of connection and inspiration.',
    cta: 'Find Us'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section id="home" className="relative h-[calc(100vh-72px)] w-full overflow-hidden bg-coffee-950">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={slides[currentSlide].image} 
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6">
        <motion.span
          key={`subtitle-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-coffee-200 uppercase tracking-[0.3em] text-sm font-semibold mb-4"
        >
          Welcome to Bright Coffee House
        </motion.span>
        
        <motion.h1
          key={`title-${currentSlide}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-5xl md:text-8xl font-serif text-white mb-8 max-w-4xl leading-tight"
        >
          {slides[currentSlide].title}
        </motion.h1>

        <motion.p
          key={`text-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-coffee-100 text-lg md:text-xl max-w-2xl mb-10 font-light leading-relaxed"
        >
          {slides[currentSlide].subtitle}
        </motion.p>

        <motion.div
          key={`cta-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button className="bg-coffee-500 text-white px-10 py-4 rounded-full font-semibold hover:bg-coffee-600 transition-all shadow-2xl hover:shadow-coffee-500/40">
            {slides[currentSlide].cta}
          </button>
          <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full font-semibold hover:bg-white/20 transition-all">
            Book a Table
          </button>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-10 right-10 z-30 flex gap-4">
        <button 
          onClick={prevSlide}
          className="p-4 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="p-4 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-10 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 transition-all duration-500 rounded-full ${
              currentSlide === index ? 'w-12 bg-coffee-400' : 'w-6 bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
