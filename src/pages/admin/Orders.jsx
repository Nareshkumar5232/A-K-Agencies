import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('ak_orders') || '[]');
    // Sort newest first
    setOrders(savedOrders.sort((a,b) => new Date(b.date) - new Date(a.date)));
  }, []);

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Customer Orders</h2>

      {orders.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl text-center border border-gray-100 dark:border-slate-700 shadow-sm">
          <p className="text-xl text-gray-500 dark:text-gray-400 font-bold">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.orderId} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 transition-all hover:shadow-md">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-100 dark:border-slate-700 pb-4 mb-4 gap-4">
                <div>
                  <span className="bg-brand/10 text-brand px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider">ORDER: {order.orderId}</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 font-medium">{new Date(order.date).toLocaleString()}</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-2xl font-extrabold text-brand">₹{order.totalAmount.toLocaleString('en-IN')}</p>
                  <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase mt-1">{order.paymentMethod}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 dark:bg-slate-900/50 p-4 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Customer Details</h4>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-bold">{order.customerDetails.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{order.customerDetails.phone} | {order.customerDetails.email || 'No email'}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{order.customerDetails.address}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{order.customerDetails.city} - {order.customerDetails.pincode}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-slate-900/50 p-4 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Ordered Items ({order.items.length})</h4>
                  <ul className="space-y-3">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="flex justify-between items-center border-b border-gray-200 dark:border-slate-700 pb-2 last:border-0 last:pb-0">
                        <div className="flex-1 pr-4">
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-200 line-clamp-1">{item.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
