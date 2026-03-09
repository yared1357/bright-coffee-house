import { Coffee, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-coffee-950 text-coffee-50 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-coffee-500 p-2 rounded-lg">
                <Coffee className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight text-white">
                Bright Coffee
              </span>
            </div>
            <p className="text-coffee-300 font-light leading-relaxed">
              Crafting premium coffee experiences since 2009. Join us for a cup of excellence in the heart of the city.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-coffee-800 flex items-center justify-center hover:bg-coffee-800 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-coffee-800 flex items-center justify-center hover:bg-coffee-800 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-coffee-800 flex items-center justify-center hover:bg-coffee-800 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-8 text-white">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="#home" className="text-coffee-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-coffee-400 hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#menu" className="text-coffee-400 hover:text-white transition-colors">Menu</a></li>
              <li><a href="#gallery" className="text-coffee-400 hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#" className="text-coffee-400 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-8 text-white">Contact Us</h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-coffee-500 shrink-0" />
                <span className="text-coffee-300">123 Artisan Way, Coffee District, NY 10001</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-coffee-500 shrink-0" />
                <span className="text-coffee-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-coffee-500 shrink-0" />
                <span className="text-coffee-300">hello@brightcoffee.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-8 text-white">Newsletter</h4>
            <p className="text-coffee-300 mb-6 text-sm">Subscribe to get special offers and coffee brewing tips.</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your email address"
                className="bg-coffee-900 border border-coffee-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-coffee-500 transition-colors"
              />
              <button className="bg-coffee-500 text-white py-3 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-coffee-600 transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-coffee-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-coffee-600 text-sm">
           Copyrights © {new Date().getFullYear()} Bright Coffee House. Developed by Y-Global System Solution. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-coffee-600 uppercase tracking-widest">
            <a href="#" className="hover:text-coffee-400">Privacy Policy</a>
            <a href="#" className="hover:text-coffee-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
