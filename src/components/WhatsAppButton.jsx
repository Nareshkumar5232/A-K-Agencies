import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <motion.a
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      href="https://wa.me/919080391868?text=Hello,%20I'm%20interested%20in%20your%20restaurant%20equipment!%20Can%20we%20chat?"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-green-500 text-white shadow-lg shadow-green-500/40 hover:bg-green-600 hover:scale-110 transition-all flex items-center justify-center group"
    >
      <MessageCircle size={32} />
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-gray-900 text-white text-sm py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl border border-gray-800">
        Chat with us
        <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45 border-r border-t border-gray-800"></div>
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
