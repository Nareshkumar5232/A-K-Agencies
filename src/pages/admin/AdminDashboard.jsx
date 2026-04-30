import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, ShoppingBag, LogOut, Package, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { products as staticProducts } from '../../data/products';
import api from '../../api/axiosInstance';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('isAdmin');
      toast.success('Logged out successfully');
      navigate('/admin/login');
    }
  };

  const navLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Add Product', path: '/admin/add-product', icon: PlusCircle },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Inquiries', path: '/admin/inquiries', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col md:flex-row font-sans text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white dark:bg-slate-800 shadow-xl border-r border-gray-200 dark:border-slate-700 flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <Link to="/" className="text-2xl font-extrabold text-brand flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Package /> AK Admin
          </Link>
        </div>
        <div className="flex-1 py-6 px-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${isActive ? 'bg-brand text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'}`}>
                <Icon size={20} />
                {link.name}
              </Link>
            )
          })}
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-slate-700 hidden md:block">
          <button onClick={handleLogout} className="flex items-center justify-center gap-3 px-4 py-3 w-full rounded-xl font-bold text-red-500 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-900">
        <Outlet />
      </div>
    </div>
  );
};

const DashboardStats = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch admin stats from backend:", error);
        // Fallback
        const customProducts = JSON.parse(localStorage.getItem('ak_custom_products') || '[]');
        const totalProducts = staticProducts.length + customProducts.length;
        
        const orders = JSON.parse(localStorage.getItem('ak_orders') || '[]');
        const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

        setStats({
          products: totalProducts,
          orders: orders.length,
          revenue: totalRevenue
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <p className="text-gray-500 dark:text-gray-400 font-bold mb-2 uppercase tracking-wide text-sm">Total Products</p>
          <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white">{stats.products}</h3>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <p className="text-gray-500 dark:text-gray-400 font-bold mb-2 uppercase tracking-wide text-sm">Total Orders</p>
          <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white">{stats.orders}</h3>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <p className="text-gray-500 dark:text-gray-400 font-bold mb-2 uppercase tracking-wide text-sm">Total Revenue</p>
          <h3 className="text-4xl font-extrabold text-brand">₹{stats.revenue.toLocaleString('en-IN')}</h3>
        </div>
      </div>
    </div>
  );
};

export { AdminLayout, DashboardStats };
