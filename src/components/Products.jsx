import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, CheckCircle } from 'lucide-react';
import LazyImage from './LazyImage';

const Products = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Cooking', 'Refrigeration', 'Preparation', 'Storage'];

  const products = [
    { id: 1, name: "Heavy Duty 4-Burner Gas Range", category: "Cooking", specs: "Stainless Steel, 304 Grade", img: "https://images.unsplash.com/photo-1590846406792-0adc7f138fbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Visi Cooler (Double Door)", category: "Refrigeration", specs: "800L Capacity, Frost Free", img: "https://images.unsplash.com/photo-1584283459954-4050e64c1bd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Commercial SS Prep Table", category: "Preparation", specs: "Sink Attached, Custom Sizes", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Convection Bakery Oven", category: "Cooking", specs: "Digital Control, 4 Trays", img: "https://images.unsplash.com/photo-1584283459986-e8dd627c26fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Spiral Dough Mixer", category: "Preparation", specs: "20kg Capacity, Heavy Motor", img: "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "SS Storage Rack 4-Tier", category: "Storage", specs: "Adjustable Height, Anti-rust", img: "https://images.unsplash.com/photo-1621293954908-907159247fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = filter === 'All' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products" className="py-24 bg-gray-50 border-t border-gray-100 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          >
            Industrial Equipment
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1.5 bg-brand mx-auto rounded-full mb-8 shadow-sm"
          ></motion.div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">
            Browse our catalog of highly durable commercial kitchen setups designed for continuous operations in restaurants and catering halls.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${filter === cat ? 'bg-brand text-white shadow-md transform scale-105' : 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80">
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent shadow-inner font-medium transition-colors"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
          </div>
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProducts.map(product => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: {duration: 0.2} }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl overflow-hidden group border border-gray-100 shadow-soft hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                    <a href="#contact" className="bg-brand text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                      <ShoppingCart size={18} /> Get Quote
                    </a>
                  </div>
                  <LazyImage src={product.img} alt={product.name} className="w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide rounded-lg text-brand shadow-sm border border-gray-100">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand transition-colors line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle size={14} className="text-brand" />
                    <span className="text-sm font-medium text-gray-500">{product.specs}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm font-bold text-brand">Wholesale Pricing</span>
                    <a href="#contact" className="text-sm font-semibold text-gray-700 hover:text-brand transition-colors underline underline-offset-4 decoration-2 decoration-transparent hover:decoration-brand">
                      Enquire Now
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-24 bg-white rounded-3xl border border-gray-100"
          >
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Equipment Found</h3>
            <p className="text-gray-500 text-base font-medium">Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default Products;
