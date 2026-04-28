import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package } from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || `AK-${Math.floor(Math.random()*90000) + 10000}`;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-4 py-20">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-inner"
      >
        <CheckCircle size={48} />
      </motion.div>
      
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">Order Placed Successfully!</h1>
      <p className="text-gray-500 font-medium text-lg mb-2 text-center">Thank you for choosing AK Agencies.</p>
      <p className="text-gray-600 mb-8 font-bold bg-white px-6 py-2 rounded-lg shadow-sm border border-gray-100">Order Reference: <span className="text-brand ml-2 tracking-wider">{orderId}</span></p>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-lg w-full text-center mb-10">
        <Package size={32} className="mx-auto text-brand/50 mb-4" />
        <h3 className="font-bold text-gray-900 mb-2">What happens next?</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          Our logistics team is reviewing your requirements. We will contact you shortly to confirm equipment dimensions and dispatch details. Expect delivery tracing details via WhatsApp and Email.
        </p>
      </div>
      
      <Link to="/" className="px-8 py-4 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 transition-all focus:ring-4 focus:ring-gray-200">
        Return to Home
      </Link>
    </div>
  );
};

export default OrderSuccess;
