import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products as staticProducts } from '../data/products';
import { ArrowLeft, ShoppingCart, CheckCircle, ShieldCheck, Truck, Minus, Plus } from 'lucide-react';
import LazyImage from '../components/LazyImage';
import { useCart } from '../context/CartContext';
import api from '../api/axiosInstance';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product from backend:", error);
        // Fallback to local storage/static for now
        const customProducts = JSON.parse(localStorage.getItem('ak_custom_products') || '[]');
        const allProducts = [...customProducts, ...staticProducts];
        setProduct(allProducts.find(p => p.id === id || p.id === Number(id)));
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h2>
        <Link to="/products" className="text-brand font-bold hover:underline">Return to Catalog</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="pb-24 pt-8 bg-gray-50 dark:bg-slate-900 min-h-[80vh] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand font-semibold mb-8 transition-colors">
          <ArrowLeft size={18} /> Back to Products
        </Link>
        
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            
            {/* Image Viewer */}
            <div className="p-8 lg:p-12 bg-gray-50/50 dark:bg-slate-900/50 flex items-center justify-center lg:border-r border-gray-100 dark:border-slate-700">
              <div className="w-full max-w-lg aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <LazyImage src={product.img} alt={product.name} className="w-full h-full object-cover" />
              </div>
            </div>
            
            {/* Details */}
            <div className="p-8 lg:p-12 flex flex-col">
              <div className="mb-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border border-green-200">
                  {product.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-4 mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-extrabold text-brand">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="text-sm font-bold text-gray-500 line-through">₹{(product.price * 1.15).toLocaleString('en-IN')}</span>
                <span className="bg-red-100 text-red-700 px-2 py-0.5 text-xs font-bold rounded">-15%</span>
              </div>
              
              <div className="bg-gray-50 dark:bg-slate-700 rounded-2xl p-5 mb-8 border border-gray-100 dark:border-slate-600">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Key Specifications:</h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed">{product.specs}</p>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Quantity & Actions */}
              <div className="mt-auto pt-6 border-t border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-bold text-gray-900 dark:text-white">Quantity:</span>
                  <div className="flex items-center border border-gray-200 dark:border-slate-600 rounded-xl overflow-hidden">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-3 bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 text-gray-600 dark:text-gray-300 font-bold transition-colors">
                      <Minus size={16} />
                    </button>
                    <div className="w-12 text-center font-bold text-lg text-gray-900 dark:text-white bg-white dark:bg-slate-800">
                      {quantity}
                    </div>
                    <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="px-4 py-3 bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 text-gray-600 dark:text-gray-300 font-bold transition-colors">
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="text-sm font-semibold text-gray-500">
                    {product.stock} units available
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button 
                    onClick={handleAddToCart}
                    className="py-4 rounded-xl flex items-center justify-center gap-2 font-extrabold border-2 border-brand text-brand hover:bg-brand hover:text-white transition-all"
                  >
                    <ShoppingCart size={20} /> Add to Order
                  </button>
                  <button 
                    onClick={handleBuyNow}
                    className="py-4 rounded-xl flex items-center justify-center gap-2 font-extrabold bg-brand text-white shadow-lg shadow-brand/30 hover:bg-brand-dark transition-all transform hover:-translate-y-0.5"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="bg-brand/10 p-2 rounded-lg text-brand"><ShieldCheck size={20} /></div>
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400">1 Year Warranty</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-brand/10 p-2 rounded-lg text-brand"><Truck size={20} /></div>
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Pan-India Freight</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-brand/10 p-2 rounded-lg text-brand"><CheckCircle size={20} /></div>
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Certified Quality</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
