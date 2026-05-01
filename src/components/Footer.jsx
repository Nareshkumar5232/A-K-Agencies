import React from 'react';
import { Utensils } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import darkLogo from '../logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={darkLogo} alt="AK Agencies Logo" className="h-14 w-auto object-contain brightness-110 scale-110" />
              <span className="font-extrabold text-xl tracking-tight uppercase">AK Agencies</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              Your dependable wholesale distribution partner for premium commercial kitchen equipment across Tamil Nadu and strictly adhering to Indian food safety hardware standards.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand transition-colors">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand transition-colors">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand transition-colors">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 border-b border-gray-800 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-brand transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-brand transition-colors">About Us</a></li>
              <li><a href="#products" className="text-gray-400 hover:text-brand transition-colors">Products</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-brand transition-colors">Testimonials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 border-b border-gray-800 pb-2 inline-block">Categories</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-brand transition-colors">Commercial Kitchen</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand transition-colors">Refrigeration</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand transition-colors">Preparation Tools</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand transition-colors">Storage Solutions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 border-b border-gray-800 pb-2 inline-block">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex">
              <input type="email" placeholder="Enter your email" className="bg-gray-800 text-white px-4 py-2 rounded-l-lg outline-none w-full focus:ring-1 focus:ring-brand border border-gray-700" />
              <button className="bg-brand hover:bg-brand-dark px-4 py-2 rounded-r-lg transition-colors font-medium">Subscribe</button>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} AK Agencies. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
