import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { categories } from '../../data/products';
import api from '../../api/axiosInstance';

const AddProduct = () => {
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: categories[1], img: ''
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        return toast.error("Image size must be less than 2MB");
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, img: reader.result });
        toast.success("Image attached successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.img) {
      return toast.error('Please fill all required fields');
    }

    const newProduct = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      img: form.img,
      stock: 10,
      specs: "Custom Added Product"
    };

    try {
      await api.post('/products', newProduct);
      toast.success('Product added successfully!');
    } catch (error) {
      console.error("Failed to add product to backend:", error);
      // Fallback
      newProduct.id = `prod_custom_${Date.now()}`;
      const existing = JSON.parse(localStorage.getItem('ak_custom_products') || '[]');
      localStorage.setItem('ak_custom_products', JSON.stringify([newProduct, ...existing]));
      toast.success('Product added successfully! (Fallback mode)');
    }
    
    setForm({ name: '', description: '', price: '', category: categories[1], img: '' });
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Add New Product</h2>
      
      <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Product Name *</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-brand outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Price (₹) *</label>
              <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-brand outline-none" required min="1" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Category *</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-brand outline-none">
                {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Image (URL or Upload File) *</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  value={form.img.startsWith('data:') ? 'Local file attached' : form.img} 
                  onChange={e => setForm({...form, img: e.target.value})} 
                  placeholder="https://images.unsplash.com/..." 
                  className="flex-1 p-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-brand outline-none" 
                  disabled={form.img.startsWith('data:')}
                />
                <label className="cursor-pointer bg-brand/10 text-brand px-6 py-3 rounded-xl hover:bg-brand hover:text-white font-bold whitespace-nowrap transition-colors flex items-center justify-center">
                  Upload File
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              {form.img && (
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-16 w-16 rounded-xl border border-gray-200 dark:border-slate-600 overflow-hidden bg-gray-50 dark:bg-slate-800">
                    <img src={form.img} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                  {form.img.startsWith('data:') && (
                    <button type="button" onClick={() => setForm({...form, img: ''})} className="text-xs font-bold text-red-500 hover:text-red-700">Remove File</button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Description *</label>
            <textarea rows="4" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-brand outline-none resize-none" required></textarea>
          </div>

          <button type="submit" className="w-full md:w-auto px-8 py-4 bg-brand text-white font-extrabold rounded-xl hover:bg-brand-dark transition-colors shadow-lg shadow-brand/20">
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
