import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('ak_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('ak_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    const existing = cartItems.find(item => item.id === product.id);
    
    if (existing) {
      toast.success(`Updated ${product.name} quantity!`, { id: `cart-${product.id}` });
      setCartItems(prev => prev.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      toast.success(`Added ${product.name} to cart!`, { id: `cart-${product.id}` });
      setCartItems(prev => [...prev, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const clearCart = () => setCartItems([]);

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getSubtotal, getItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
