import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import { products as staticProducts } from '../data/products';
import { Link } from 'react-router-dom';
import LazyImage from '../components/LazyImage';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [allProducts, setAllProducts] = React.useState(staticProducts);

  React.useEffect(() => {
    const customProducts = JSON.parse(localStorage.getItem('ak_custom_products') || '[]');
    setAllProducts([...customProducts, ...staticProducts]);
  }, []);

  const featuredProducts = allProducts.slice(0, 3);
  const { addToCart } = useCart();

  return (
    <>
      <Hero />
      <section className="py-24 bg-gray-50 dark:bg-slate-900 relative z-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Featured Equipment</h2>
              <div className="w-20 h-1.5 bg-brand rounded-full"></div>
            </div>
            <Link to="/products" className="hidden sm:flex items-center gap-2 font-bold text-brand hover:text-brand-dark transition-colors">
              View All Catalog <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-soft dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(46,125,50,0.15)] transition-all duration-300 hover:-translate-y-1 group flex flex-col">
                <Link to={`/product/${product.id}`} className="relative h-64 overflow-hidden block">
                  <LazyImage src={product.img} alt={product.name} className="w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide rounded-lg text-brand dark:text-brand-light shadow-sm">
                      {product.category}
                    </span>
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <Link to={`/product/${product.id}`} className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand transition-colors line-clamp-1">
                    {product.name}
                  </Link>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-grow">{product.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                    <span className="text-xl font-extrabold text-gray-900 dark:text-white">₹{product.price.toLocaleString('en-IN')}</span>
                    <button 
                      onClick={(e) => { e.preventDefault(); addToCart(product); }}
                      className="p-2.5 bg-brand/10 text-brand rounded-xl hover:bg-brand hover:text-white transition-colors"
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center sm:hidden">
            <Link to="/products" className="inline-flex items-center gap-2 font-bold text-brand bg-brand/5 px-6 py-3 rounded-xl">
              View All Catalog <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <About />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;
