import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { cartItemCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-brand-500/20 p-2 rounded-xl text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
            <Package size={24} />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-accent">
            LuxeCart
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors font-medium">
            Shop
          </Link>
          <Link to="/cart" className="relative group flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-all duration-300">
            <ShoppingCart size={20} className="text-gray-300 group-hover:text-accent transition-colors" />
            <AnimatePresence>
              {cartItemCount > 0 && (
                <motion.span
                  key="count"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-2 -right-2 bg-accent text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>
    </nav>
  );
}
