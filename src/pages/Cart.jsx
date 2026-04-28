import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, ShieldCheck } from 'lucide-react';
import LazyImage from '../components/LazyImage';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getSubtotal } = useCart();
  const navigate = useNavigate();
  
  const subtotal = getSubtotal();
  const tax = subtotal * 0.18; // 18% GST typical for equipment
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
        <div className="bg-gray-100 dark:bg-slate-800 p-8 rounded-full mb-6">
          <ShoppingBag size={64} className="text-gray-400" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 font-medium mb-8">Looks like you haven't added any equipment to your setup yet.</p>
        <Link to="/products" className="px-8 py-4 bg-brand text-white font-bold rounded-xl shadow-lg hover:bg-brand-dark hover:-translate-y-1 transition-all">
          Browse Equipment Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-50 rounded-2xl overflow-hidden shadow-inner hidden sm:block">
                  <LazyImage src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow w-full">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.category}</span>
                      <Link to={`/product/${item.id}`} className="block text-lg font-bold text-gray-900 dark:text-white hover:text-brand line-clamp-1 mt-1 transition-colors">
                        {item.name}
                      </Link>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-end mt-6">
                    <div className="flex items-center border border-gray-200 dark:border-slate-600 rounded-xl overflow-hidden bg-gray-50 dark:bg-slate-700">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 sm:px-4 py-2 hover:bg-white dark:hover:bg-slate-600 text-gray-600 dark:text-gray-300 font-bold transition-colors border-r border-gray-200 dark:border-slate-600">
                        <Minus size={16} />
                      </button>
                      <div className="w-10 sm:w-12 text-center font-bold text-sm text-gray-900 dark:text-white">
                        {item.quantity}
                      </div>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 sm:px-4 py-2 hover:bg-white dark:hover:bg-slate-600 text-gray-600 dark:text-gray-300 font-bold transition-colors border-l border-gray-200 dark:border-slate-600">
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs font-semibold text-gray-500 mb-1">₹{item.price.toLocaleString('en-IN')} / unit</span>
                      <span className="text-xl font-extrabold text-brand">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-700 sticky top-32">
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-slate-700 pb-4">Order Summary</h2>
              
              <div className="space-y-4 font-medium text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-bold text-gray-900 dark:text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>GST (18%)</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600 font-semibold">
                  <span>Shipping Standard (Tamil Nadu)</span>
                  <span>Free</span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 dark:border-slate-700 pt-6 mb-8 flex justify-between items-end">
                <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                <span className="text-3xl font-extrabold text-brand">₹{total.toLocaleString('en-IN')}</span>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-brand text-white font-extrabold rounded-xl shadow-lg shadow-brand/30 hover:bg-brand-dark hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight size={20} />
              </button>
              
              <p className="text-xs text-center font-semibold text-gray-400 mt-6 flex items-center justify-center gap-2">
                <ShieldCheck size={16}/> Secure SSL Checkout
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Cart;
