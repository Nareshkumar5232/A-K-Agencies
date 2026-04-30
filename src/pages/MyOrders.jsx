import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { PackageSearch, Clock } from 'lucide-react';
import api from '../api/axiosInstance';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const response = await api.get('/orders/me');
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch my orders from backend:", error);
        // Fallback to local storage
        if (user) {
          const allOrders = JSON.parse(localStorage.getItem('ak_orders') || '[]');
          // Filter by matching email
          const userOrders = allOrders.filter(o => 
            o.customerDetails?.email === user.email
          );
          setOrders(userOrders.sort((a, b) => new Date(b.date) - new Date(a.date)));
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Please Login to View Orders</h2>
        <Link to="/login" className="mt-4 text-brand font-bold">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-24 bg-gray-50 dark:bg-slate-900 min-h-[80vh] transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">My Orders</h1>
          <p className="text-gray-600 dark:text-gray-400 font-medium">View and track your previous and current orders.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl text-center border border-gray-100 dark:border-slate-700 shadow-sm mt-8">
            <div className="bg-gray-50 dark:bg-slate-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <PackageSearch size={32} className="text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Orders Found</h3>
            <p className="text-gray-500 dark:text-gray-400 font-medium">You haven't placed any orders with us yet.</p>
            <Link to="/products" className="mt-6 inline-block px-6 py-2.5 bg-brand text-white font-bold rounded-xl hover:bg-brand-dark transition-colors">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.orderId} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 transition-all hover:shadow-md">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-100 dark:border-slate-700 pb-4 mb-4 gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="bg-brand/10 text-brand px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider">ORDER: {order.orderId}</span>
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded">
                        <Clock size={12} /> Processing
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 font-medium">{new Date(order.date).toLocaleString()}</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-2xl font-extrabold text-brand">₹{order.totalAmount.toLocaleString('en-IN')}</p>
                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase mt-1">{order.paymentMethod}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Items ({order.items?.length || 0})</h4>
                  <ul className="space-y-3">
                    {order.items?.map((item, idx) => (
                      <li key={idx} className="flex justify-between items-center bg-gray-50 dark:bg-slate-900/50 p-3 rounded-xl border border-gray-100 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                          {item.img && (
                            <div className="w-12 h-12 rounded bg-white overflow-hidden flex-shrink-0">
                              <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200 line-clamp-1">{item.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white ml-4">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
