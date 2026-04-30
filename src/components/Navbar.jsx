import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Utensils, ShoppingCart, Sun, Moon, LogOut, User as UserIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { getItemCount } = useCart();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const cartCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Products', href: '/products' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-400 ${scrolled ? 'glass-nav dark:bg-slate-900/95 dark:border-slate-800 py-3' : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm py-5 border-b border-gray-100 dark:border-slate-800'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="p-2.5 bg-brand rounded-xl text-white shadow-lg shadow-brand/20 group-hover:scale-105 transition-transform">
              <Utensils size={22} />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white uppercase mt-0.5">
              AK Agencies
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    isActive ? 'bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand-light' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <div className="pl-6 ml-2 border-l border-gray-200 dark:border-slate-700 flex items-center gap-5">
              <button 
                onClick={toggleTheme} 
                className="p-2 text-gray-600 hover:text-brand dark:text-gray-300 dark:hover:text-brand-light transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <Link to="/cart" className="relative p-2 text-gray-700 hover:text-brand dark:text-gray-300 dark:hover:text-brand-light transition-colors group">
                <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                    <UserIcon size={16} className="text-brand dark:text-brand-light" />
                    {user.name.split(' ')[0]}
                  </span>
                  <Link to="/my-orders" className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-brand dark:hover:text-brand-light transition-colors ml-2 mr-2">
                    Orders
                  </Link>
                  <button 
                    onClick={logout}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white font-bold text-sm hover:bg-gray-200 dark:hover:bg-slate-700 transition-all">
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button & Controls */}
          <div className="md:hidden flex items-center gap-3">
            <button 
              onClick={toggleTheme} 
              className="p-2 text-gray-600 dark:text-gray-300"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/cart" className="relative p-2 text-gray-700 dark:text-gray-300">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 rounded-lg"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 absolute w-full top-full left-0 shadow-2xl"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-bold transition-all ${
                    location.pathname === link.href ? 'bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand-light' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 mt-2 border-t border-gray-100 dark:border-slate-800 flex flex-col gap-3">
                {user ? (
                  <>
                    <div className="px-4 py-2 text-gray-600 dark:text-gray-400 font-medium">
                      Signed in as <span className="text-gray-900 dark:text-white font-bold">{user.name}</span>
                    </div>
                    <Link
                      to="/my-orders"
                      onClick={() => setIsOpen(false)}
                      className="flex justify-center w-full px-5 py-3.5 rounded-xl bg-brand/10 dark:bg-brand/20 text-brand dark:text-brand-light font-bold hover:bg-brand/20 transition-colors mb-2"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="flex justify-center w-full px-5 py-3.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-red-500 font-bold hover:bg-red-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center w-full px-5 py-3.5 rounded-xl bg-brand text-white font-bold hover:bg-brand-dark transition-colors shadow-md shadow-brand/20"
                  >
                    Login to Account
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
