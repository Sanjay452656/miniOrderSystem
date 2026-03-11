import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Package, CreditCard, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderSuccess() {
  const location = useLocation();

  if (!location.state) {
    return <Navigate to="/" />;
  }

  const { orderId, paymentMethod, total } = location.state;

  return (
    <div className="max-w-lg mx-auto mt-20">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="glass-panel p-10 rounded-3xl text-center border-t border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.1)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-32 bg-green-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>

        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle2 size={80} className="text-green-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
        </motion.div>
        
        <h1 className="text-3xl font-bold mb-3">Order Confirmed!</h1>
        <p className="text-gray-400 mb-8">Thank you for shopping with LuxeCart. Your order has been placed successfully.</p>

        <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left border border-white/5">
          <div className="flex justify-between items-center py-3 border-b border-white/5">
            <span className="text-gray-400 flex items-center gap-2">
              <Package size={16} /> Order ID
            </span>
            <span className="font-medium text-white">#{orderId.substring(orderId.length - 8).toUpperCase()}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-white/5">
            <span className="text-gray-400 flex items-center gap-2">
              <CreditCard size={16} /> Payment Method
            </span>
            <span className="font-medium text-white">{paymentMethod}</span>
          </div>
          <div className="flex justify-between items-center py-3 bg-white/5 rounded-lg px-4 -mx-4 mt-3">
            <span className="font-medium">Total Amount</span>
            <span className="font-bold text-xl text-accent">₹{total?.toLocaleString()}</span>
          </div>
        </div>

        <Link to="/" className="w-full bg-white text-gray-900 group font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
          Continue Shopping
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}
