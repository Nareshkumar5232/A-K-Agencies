import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, CheckCircle, PackageSearch } from 'lucide-react';
import LazyImage from '../components/LazyImage';
import { products as staticProducts, categories } from '../data/products';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../api/axiosInstance';

const ProductsPage = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const [allProducts, setAllProducts] = useState(staticProducts);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        // Assuming response.data contains the list of products
        setAllProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products from backend:", error);
        // Fallback to local storage/static for now if backend is not ready
        const customProducts = JSON.parse(localStorage.getItem('ak_custom_products') || '[]');
        setAllProducts([...customProducts, ...staticProducts]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = allProducts.filter(p => {
    const matchesCategory = filter === 'All' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-8 pb-24 bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Complete Catalog</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium max-w-2xl">
            Browse our full inventory of premium commercial kitchen equipment. From robust gas ranges to heavy-duty refrigeration.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-10 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${filter === cat ? 'bg-brand text-white shadow-md' : 'bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-gray-50 dark:bg-slate-700 dark:text-white font-medium"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
          </div>
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProducts.map(product => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden group border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <Link to={`/product/${product.id}`} className="relative h-56 overflow-hidden block">
                  <LazyImage src={product.img} alt={product.name} className="w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out" />
                  {product.stock < 10 && (
                    <div className="absolute top-3 right-3 z-20">
                      <span className="bg-orange-100 text-orange-700 px-2.5 py-1 text-xs font-bold rounded-lg border border-orange-200">
                        Low Stock
                      </span>
                    </div>
                  )}
                </Link>
                <div className="p-5 flex flex-col flex-grow">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{product.category}</span>
                  <Link to={`/product/${product.id}`} className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand transition-colors line-clamp-2">
                    {product.name}
                  </Link>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-extrabold text-brand">₹{product.price.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link to={`/product/${product.id}`} className="py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 text-center font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-sm">
                        Details
                      </Link>
                      <button 
                        onClick={() => addToCart(product)}
                        className="py-2.5 rounded-xl bg-brand text-white font-bold hover:bg-brand-dark transition-colors flex items-center justify-center gap-1.5 text-sm"
                      >
                        <ShoppingCart size={16} /> Add
                      </button>
                    </div>
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
            className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm mt-8"
          >
            <div className="bg-gray-50 dark:bg-slate-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <PackageSearch size={32} className="text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Matching Products</h3>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Try adjusting your filters or search term.</p>
            <button onClick={() => {setFilter('All'); setSearchQuery('');}} className="mt-6 px-6 py-2.5 bg-brand/10 text-brand font-bold rounded-xl hover:bg-brand hover:text-white transition-colors">
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
