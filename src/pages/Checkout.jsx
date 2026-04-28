import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle, ShieldCheck, MapPin, Truck, Landmark } from 'lucide-react';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, getSubtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [method, setMethod] = useState('upi');

  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    address: '', city: '', pincode: ''
  });
  const [errors, setErrors] = useState({});

  const subtotal = getSubtotal();
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  // Render protection
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const validate = () => {
    const err = {};
    if(!form.name.trim()) err.name = "Required";
    if(!form.phone.trim() || form.phone.length < 10) err.phone = "Valid phone required";
    if(!form.address.trim()) err.address = "Required";
    if(!form.city.trim()) err.city = "Required";
    if(!form.pincode.trim() || form.pincode.length !== 6) err.pincode = "Valid 6-digit PIN required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (validate()) {
      toast.loading("Processing order...");
      setTimeout(() => {
        toast.dismiss();
        clearCart();
        navigate('/order-success', { state: { orderId: `AK-${Math.floor(Math.random()*90000) + 10000}` } });
      }, 2000);
    } else {
      toast.error("Please correctly fill all mandatory fields.");
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Secure Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <form onSubmit={handlePlaceOrder} className="space-y-8">
              
              {/* Customer Details */}
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><MapPin className="text-brand"/> Delivery Information</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Business/Contact Name *</label>
                    <input type="text" value={form.name} onChange={e => setForm({...form, name:e.target.value})} className={`w-full p-3 rounded-xl border bg-gray-50 ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-brand outline-none`} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number *</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} className={`w-full p-3 rounded-xl border bg-gray-50 ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-brand outline-none`} />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address (Optional)</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-brand outline-none" />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Complete Address *</label>
                  <textarea rows="3" value={form.address} onChange={e => setForm({...form, address:e.target.value})} className={`w-full p-3 rounded-xl border bg-gray-50 ${errors.address ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-brand outline-none resize-none`}></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">City/Town *</label>
                    <input type="text" value={form.city} onChange={e => setForm({...form, city:e.target.value})} className={`w-full p-3 rounded-xl border bg-gray-50 ${errors.city ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-brand outline-none`} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Pincode *</label>
                    <input type="text" maxLength="6" value={form.pincode} onChange={e => setForm({...form, pincode:e.target.value})} className={`w-full p-3 rounded-xl border bg-gray-50 ${errors.pincode ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-brand outline-none`} />
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><ShieldCheck className="text-brand"/> Payment Method</h3>
                <div className="space-y-4">
                  
                  <label className={`block border p-5 rounded-2xl cursor-pointer transition-all ${method === 'upi' ? 'border-brand bg-brand/5 ring-1 ring-brand' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <div className="flex items-center">
                      <input type="radio" value="upi" checked={method === 'upi'} onChange={() => setMethod('upi')} className="scale-125 text-brand focus:ring-brand" />
                      <span className="ml-4 font-bold text-gray-900 text-lg">UPI / QR Code</span>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="ml-auto h-5 opacity-70"/>
                    </div>
                  </label>
                  
                  <label className={`block border p-5 rounded-2xl cursor-pointer transition-all ${method === 'card' ? 'border-brand bg-brand/5 ring-1 ring-brand' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <div className="flex items-center">
                      <input type="radio" value="card" checked={method === 'card'} onChange={() => setMethod('card')} className="scale-125 text-brand focus:ring-brand" />
                      <span className="ml-4 font-bold text-gray-900 text-lg">Credit / Debit Card</span>
                      <Landmark className="ml-auto text-gray-400" />
                    </div>
                    {method === 'card' && (
                      <div className="mt-4 pt-4 border-t border-brand/20 grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Card Number" className="col-span-2 w-full p-3 rounded-lg border border-gray-200 bg-white" />
                        <input type="text" placeholder="MM/YY" className="w-full p-3 rounded-lg border border-gray-200 bg-white" />
                        <input type="text" placeholder="CVC" className="w-full p-3 rounded-lg border border-gray-200 bg-white" />
                      </div>
                    )}
                  </label>

                  <label className={`block border p-5 rounded-2xl cursor-pointer transition-all ${method === 'cod' ? 'border-brand bg-brand/5 ring-1 ring-brand' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <div className="flex items-center">
                      <input type="radio" value="cod" checked={method === 'cod'} onChange={() => setMethod('cod')} className="scale-125 text-brand focus:ring-brand" />
                      <span className="ml-4 font-bold text-gray-900 text-lg">Cash on Delivery</span>
                      <Truck className="ml-auto text-gray-400" />
                    </div>
                  </label>

                </div>
              </div>

            </form>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-700 sticky top-32">
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-slate-700 pb-4">Order Review</h2>
              
              <div className="space-y-4 font-medium text-gray-600 mb-6 max-h-60 overflow-y-auto pr-2">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="truncate pr-4">{item.quantity} x {item.name}</span>
                    <span className="font-bold text-gray-900 dark:text-white whitespace-nowrap">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 font-medium text-gray-600 dark:text-gray-400 mb-6 border-t border-gray-100 dark:border-slate-700 pt-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900 dark:text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>GST (18%)</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600 font-semibold">
                  <span>Freight Forwarding</span>
                  <span>Free</span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 dark:border-slate-700 pt-6 mb-8 flex justify-between items-end">
                <span className="text-lg font-bold text-gray-900 dark:text-white">Total Payable</span>
                <span className="text-3xl font-extrabold text-brand">₹{total.toLocaleString('en-IN')}</span>
              </div>
              
              <button 
                onClick={handlePlaceOrder}
                className="w-full py-5 bg-brand text-white font-extrabold text-lg rounded-xl shadow-xl shadow-brand/30 hover:bg-brand-dark hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle size={24} /> Place Final Order 
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
