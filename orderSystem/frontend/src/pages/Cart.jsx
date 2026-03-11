import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-20">
        <div className="glass-panel p-12 rounded-3xl text-center">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-secondary-text mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-xl font-medium transition-colors">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <ShoppingBag className="text-accent" /> Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.product_id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, height: 0 }}
                className="glass-panel p-4 rounded-2xl flex items-center gap-4 border border-white/5 relative overflow-hidden group"
              >
                <div className="w-24 h-24 bg-white/5 rounded-xl overflow-hidden flex-shrink-0">
                  {item.product.image_url ? (
                    <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-800"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold truncate pr-8">{item.product.name}</h3>
                  <p className="text-accent font-medium mt-1">₹{item.product.price.toLocaleString()}</p>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center bg-white/5 rounded-lg border border-white/10 p-1">
                      <button onClick={() => updateQuantity(item.product_id, -1)} className="p-1 hover:bg-white/10 rounded-md transition-colors text-gray-300 hover:text-white">
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product_id, 1)} className="p-1 hover:bg-white/10 rounded-md transition-colors text-gray-300 hover:text-white">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-right flex flex-col justify-between items-end h-full py-1">
                  <p className="font-bold text-lg hidden sm:block">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                  <button 
                    onClick={() => removeFromCart(item.product_id)}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors absolute top-4 right-4 sm:static sm:mt-auto"
                    title="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <div className="glass-panel p-6 rounded-3xl sticky top-24 border border-white/10">
            <h3 className="text-xl font-bold mb-6 pb-4 border-b border-white/10">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-4 mb-8 flex justify-between items-end">
              <span className="text-lg font-medium">Total Price</span>
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                ₹{cartTotal.toLocaleString()}
              </span>
            </div>
            
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-gradient-to-r from-brand-600 to-accent hover:from-brand-500 hover:to-accent/80 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] active:scale-[0.98]"
            >
              Proceed to Checkout
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
