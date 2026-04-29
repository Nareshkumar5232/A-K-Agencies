import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('ak_users') || '[]');
    const userExists = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    
    if (userExists) {
      toast.success("A password reset link has been sent to your email address!");
      setTimeout(() => navigate('/login'), 2000);
    } else {
      toast.error("No account found with that email address.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-soft dark:shadow-none border border-gray-100 dark:border-slate-700"
      >
        <div>
          <Link to="/login" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brand dark:text-gray-400 dark:hover:text-brand-light mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-1" /> Back to Login
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Forgot Password?
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            No worries! Enter your email address below and we'll send you a link to reset your password.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent sm:text-sm transition-colors"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-colors shadow-md shadow-brand/20"
            >
              Send Reset Link
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
