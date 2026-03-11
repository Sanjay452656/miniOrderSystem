import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { XCircle, RefreshCcw, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaymentFailed() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const orderPayload = location.state?.orderPayload;

  return (
    <div className="max-w-lg mx-auto mt-20">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-panel p-10 rounded-3xl text-center border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.1)]"
      >
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle size={48} className="text-red-500 drop-shadow-md" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Payment Failed</h1>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto">
          We couldn't process your payment. Your account has not been charged.
        </p>

        <div className="flex flex-col gap-4">
          <button 
            onClick={() => orderPayload ? navigate('/payment', { state: { orderPayload, cartTotal: location.state?.cartTotal || 0 } }) : navigate('/checkout')}
            className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCcw size={18} />
            Retry Payment
          </button>
          
          <Link to="/cart" className="w-full py-4 rounded-xl font-medium border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-gray-300 hover:text-white">
            <ArrowLeft size={18} />
            Return to Cart
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
