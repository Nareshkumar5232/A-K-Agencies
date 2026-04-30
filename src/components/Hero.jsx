import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChefHat, Package, CheckCircle } from 'lucide-react';
import LazyImage from './LazyImage';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-gradient-to-b from-white to-brand-light/40 dark:from-slate-900 dark:to-black transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] rounded-full bg-brand/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-light dark:bg-brand/20 text-brand-dark dark:text-brand-light mb-8 shadow-sm dark:shadow-[0_0_10px_rgba(46,125,50,0.2)] border border-brand/10 dark:border-brand/30 transition-colors duration-300">
              <span className="flex h-2.5 w-2.5 rounded-full bg-brand dark:bg-brand-light animate-pulse"></span>
              <span className="text-xs font-bold tracking-wider uppercase">Trusted by 500+ Indian Restaurants</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-[1.1] mb-6 transition-colors duration-300">
              Industrial <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-green-500 dark:from-green-400 dark:to-brand-light">Kitchen & Refrigeration</span> Solutions
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-lg leading-relaxed font-medium pb-2 transition-colors duration-300">
              Equip your commercial kitchen with heavy-duty, stainless steel appliances built for Indian culinary high-volume demands. From setup to service, we are your partners in growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#products" className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-xl bg-brand text-white font-bold text-lg hover:bg-brand-dark dark:hover:bg-brand transition-all transform hover:-translate-y-0.5 shadow-lg shadow-brand/30 dark:shadow-[0_0_15px_rgba(46,125,50,0.4)]">
                Browse Equipment
                <ArrowRight size={20} />
              </a>
              <a href="#contact" className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 font-bold text-lg hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-gray-300 dark:hover:border-slate-600 transition-all shadow-sm">
                Request Quote
              </a>
            </div>

            {/* Quick Stats */}
            <div className="mt-14 grid grid-cols-3 gap-6 pt-10 border-t border-gray-200 dark:border-slate-800 transition-colors duration-300">
              <div>
                <h4 className="text-3xl font-extrabold text-gray-900 dark:text-white">15+</h4>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-wide">Years Exp.</p>
              </div>
              <div>
                <h4 className="text-3xl font-extrabold text-gray-900 dark:text-white">1k+</h4>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-wide">Products</p>
              </div>
              <div>
                <h4 className="text-3xl font-extrabold text-gray-900 dark:text-white">100%</h4>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-wide">Quality Assured</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Main Hero Image/Grid */}
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-5 pt-12">
                <div className="rounded-3xl overflow-hidden shadow-2xl dark:shadow-[0_0_20px_rgba(255,255,255,0.05)] bg-white/95 dark:bg-slate-800/90 backdrop-blur-md border border-gray-100 dark:border-slate-700 p-2.5 transform transition-all hover:-translate-y-2 duration-300">
                  <LazyImage src="/images/hero_kitchen.png" alt="Commercial Kitchen Setup" className="w-full h-56 rounded-2xl" />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-xl dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] bg-white/95 dark:bg-slate-800/90 backdrop-blur-md border border-gray-100 dark:border-slate-700 p-8 flex flex-col items-center justify-center transform transition-all hover:-translate-y-2 duration-300 text-gray-900 dark:text-white">
                  <ChefHat size={48} className="text-brand dark:text-brand-light mb-4 stroke-[1.5]" />
                  <h3 className="font-extrabold text-lg text-center">Expert Layouts</h3>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mt-2">End-to-end spatial planning</p>
                </div>
              </div>
              <div className="space-y-5">
                <div className="rounded-3xl overflow-hidden shadow-xl dark:shadow-[0_0_20px_rgba(46,125,50,0.3)] p-8 bg-brand dark:bg-slate-800 text-white flex flex-col justify-center transform transition-all hover:-translate-y-2 duration-300 relative border border-green-600 dark:border-brand/40">
                  <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-5">
                    <Package size={80} />
                  </div>
                  <Package size={40} className="mb-4 text-brand-light relative z-10" />
                  <h3 className="font-extrabold text-lg relative z-10">Fast Dispatch</h3>
                  <ul className="mt-4 space-y-3 text-sm text-brand-light font-medium relative z-10">
                    <li className="flex items-center gap-2"><CheckCircle size={18} className="text-white dark:text-brand-light" /> Tamil Nadu & Kerala</li>
                    <li className="flex items-center gap-2"><CheckCircle size={18} className="text-white dark:text-brand-light" /> Secured Transport</li>
                  </ul>
                </div>
                <div className="rounded-3xl overflow-hidden shadow-2xl dark:shadow-[0_0_20px_rgba(255,255,255,0.05)] bg-white/95 dark:bg-slate-800/90 backdrop-blur-md border border-gray-100 dark:border-slate-700 p-2.5 transform transition-all hover:-translate-y-2 duration-300">
                  <LazyImage src="/images/hero_equipment.png" alt="Commercial Kitchen Equipment" className="w-full h-64 rounded-2xl" />
                </div>
              </div>
            </div>
            
            {/* Floating Element */}
            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-gray-100 dark:border-slate-700 rounded-2xl p-4 shadow-2xl dark:shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center gap-4 text-gray-900 dark:text-white transition-colors duration-300"
            >
              <div className="bg-brand-light dark:bg-brand/20 p-3.5 rounded-full text-brand dark:text-brand-light shadow-inner">
                <CheckCircle size={28} />
              </div>
              <div className="pr-2">
                <p className="font-extrabold text-sm">Authorized Reseller</p>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">Top Indian Brands</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
