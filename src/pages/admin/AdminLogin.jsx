import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Lock } from 'lucide-react';
import api from '../../api/axiosInstance';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/admin/login', { email: email.trim(), password: password.trim() });
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('isAdmin', 'true');
      toast.success("Welcome, Admin");
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid Admin Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <div className="flex justify-center mb-6">
          <div className="bg-brand/20 p-4 rounded-full">
            <Lock size={32} className="text-brand" />
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-center mb-8">Admin Portal</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-brand outline-none text-white" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-brand outline-none text-white" required />
          </div>
          <button type="submit" className="w-full py-4 bg-brand hover:bg-brand-dark rounded-xl font-extrabold transition-colors">
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
