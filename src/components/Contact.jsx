import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, Send, Loader2, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim() || !/^\+?[0-9\s-]{10,}$/.test(formData.phone)) newErrors.phone = 'Valid phone number is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.message.trim()) newErrors.message = 'Please specify your requirements';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setStatus('loading');
    
    // Simulate API submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-gray-50 relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          >
            Request a Consultation
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1.5 bg-brand mx-auto rounded-full mb-6 shadow-sm"
          ></motion.div>
          <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto">
            Share your floor plan or equipment requirements. Our specialists will provide a custom quotation within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-extrabold text-gray-900 mb-8">Direct Inquiry Form</h3>
            
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
              >
                <CheckCircle size={48} className="text-brand mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h4>
                <p className="text-gray-600 font-medium">Thank you for reaching out. Our team will contact you shortly.</p>
              </motion.div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Contact Name *</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full px-5 py-3.5 rounded-xl border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-brand'} focus:ring-2 focus:border-transparent outline-none font-medium transition-all bg-gray-50`} 
                      placeholder="e.g. M. Suresh" 
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number *</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className={`w-full px-5 py-3.5 rounded-xl border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-brand'} focus:ring-2 focus:border-transparent outline-none font-medium transition-all bg-gray-50`} 
                      placeholder="+91 9XXXX XXXXX" 
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email ID (Optional)</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-5 py-3.5 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-brand'} focus:ring-2 focus:border-transparent outline-none font-medium transition-all bg-gray-50`} 
                    placeholder="purchase@restaurant.in" 
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Equipment Requirements *</label>
                  <textarea 
                    rows="4" 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={`w-full px-5 py-3.5 rounded-xl border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-brand'} focus:ring-2 focus:border-transparent outline-none font-medium transition-all bg-gray-50 resize-none`} 
                    placeholder="E.g. Need a quote for a 4-burner gas range and a 500L display fridge..."
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.message}</p>}
                </div>
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-xl bg-brand text-white font-extrabold flex items-center justify-center gap-2 hover:bg-brand-dark transition-all transform hover:-translate-y-0.5 shadow-lg shadow-brand/30 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {status === 'loading' ? (
                    <><Loader2 size={20} className="animate-spin" /> Submitting...</>
                  ) : (
                    <>Submit Requirements <Send size={20} /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-8 h-full"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex-grow">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-8">Business Details</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className="bg-brand/10 p-3.5 rounded-xl text-brand shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Sales Office</h4>
                    <p className="text-gray-600 mt-1.5 font-medium leading-relaxed">7/20, Mariyamman Koil Street,<br/>Cumbum - 625516, Tamil Nadu, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className="bg-brand/10 p-3.5 rounded-xl text-brand shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Phone Inquiry</h4>
                    <p className="text-gray-600 mt-1.5 font-medium leading-relaxed">
                      <a href="tel:+919080391868" className="hover:text-brand transition-colors">+91 9080391868</a><br/>
                      <span className="text-sm font-semibold">Proprietor: A. Abbas Ali</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className="bg-brand/10 p-3.5 rounded-xl text-brand shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Email Accounts</h4>
                    <p className="text-gray-600 mt-1.5 font-medium">
                      <a href="mailto:akagenciescbm@gmail.com" className="hover:text-brand transition-colors">akagenciescbm@gmail.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embedded */}
            <div className="h-[250px] rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative group bg-gray-200">
              {/* Note: Iframe styling requires no pointer-events to let users drag properly when needed, but pointer-events-none overlay for aesthetic */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15730.010468305886!2d77.27663242750604!3d9.734399999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b070433d7b87fa1%3A0x6b7eaa48dd80df7a!2sCumbum%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1689700000000!5m2!1sen!2sin" 
                className="w-full h-full border-0 grayscale-[20%] contrast-125 opacity-90 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100" 
                allowFullScreen="" 
                loading="lazy"
                title="Cumbum Location Map"
              ></iframe>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
