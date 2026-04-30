import React, { useState, useEffect } from 'react';
import api from '../../api/axiosInstance';
import { Download, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await api.get('/inquiry');
        setInquiries(response.data);
      } catch (error) {
        console.error("Failed to fetch inquiries:", error);
        toast.error("Failed to load inquiries");
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  const downloadCSV = () => {
    if (inquiries.length === 0) return toast.error("No data to download");
    
    const headers = ['Date', 'Contact Name', 'Mobile Number', 'Email ID', 'Requirements'];
    const csvRows = [headers.join(',')];
    
    inquiries.forEach(inq => {
      const row = [
        new Date(inq.date).toLocaleString().replace(/,/g, ''),
        `"${inq.name}"`,
        `"${inq.phone}"`,
        `"${inq.email || 'N/A'}"`,
        `"${inq.message.replace(/"/g, '""')}"`
      ];
      csvRows.push(row.join(','));
    });
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `Inquiries_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
          <MessageSquare className="text-brand" size={32} /> Inquiries
        </h2>
        <button 
          onClick={downloadCSV}
          className="flex items-center gap-2 bg-brand text-white px-5 py-2.5 rounded-xl font-bold hover:bg-brand-dark transition-all shadow-md"
        >
          <Download size={20} /> Download CSV
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
        </div>
      ) : inquiries.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 p-12 rounded-2xl text-center border border-gray-200 dark:border-slate-700">
          <p className="text-gray-500 font-bold text-lg">No inquiries received yet.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-700/50 border-b border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300">
                  <th className="p-4 font-extrabold">Date</th>
                  <th className="p-4 font-extrabold">Name</th>
                  <th className="p-4 font-extrabold">Phone</th>
                  <th className="p-4 font-extrabold">Email</th>
                  <th className="p-4 font-extrabold w-1/3">Requirements</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq._id} className="border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="p-4 text-sm font-semibold text-gray-500">{new Date(inq.date).toLocaleDateString()}</td>
                    <td className="p-4 font-bold text-gray-900 dark:text-white">{inq.name}</td>
                    <td className="p-4 font-semibold text-gray-600 dark:text-gray-300">{inq.phone}</td>
                    <td className="p-4 text-sm text-gray-500">{inq.email || 'N/A'}</td>
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{inq.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inquiries;
