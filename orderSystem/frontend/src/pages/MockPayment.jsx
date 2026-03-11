import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { CreditCard, ShieldCheck } from 'lucide-react';

export default function MockPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [processing, setProcessing] = useState(false);

  // If user accesses directly without orderPayload, redirect back
  if (!location.state?.orderPayload) {
    navigate('/cart');
    return null;
  }

  const { orderPayload, cartTotal } = location.state;

  const handlePaymentResult = async (success) => {
    setProcessing(true);
    
    try {
      if (!success) {
        // Mock failed payment
        navigate('/failed', { state: { orderPayload } });
        return;
      }

      // If success, we actually place the order now.
      const res = await axios.post('http://localhost:5000/api/orders', orderPayload);
      const orderId = res.data.orderId;

      // In the real system, we'd also hit specific payment success endpoint
      await axios.post('http://localhost:5000/api/payment', { orderId, success: true });

      clearCart();
      navigate('/success', { state: { orderId, paymentMethod: 'Online', total: cartTotal } });

    } catch (err) {
      console.error(err);
      navigate('/failed', { state: { error: 'Server error processing order.' } });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-16 animate-in fade-in zoom-in-95 duration-500">
      <div className="glass-panel p-10 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-brand-500"></div>
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-4 ring-8 ring-accent/10">
            <CreditCard className="text-accent" size={32} />
          </div>
          <h1 className="text-2xl font-bold">Secure Mock Payment</h1>
          <p className="text-secondary-text mt-2 flex items-center justify-center gap-1">
            <ShieldCheck size={16} className="text-green-400" />
            Test Environment
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-center">
          <p className="text-gray-400 text-sm mb-1">Amount to pay</p>
          <p className="text-4xl font-bold text-white">₹{cartTotal.toLocaleString()}</p>
        </div>

        {processing ? (
          <div className="py-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-gray-300 font-medium animate-pulse">Processing your payment...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handlePaymentResult(false)}
              className="py-4 rounded-xl border border-white/10 hover:bg-white/5 font-medium transition-colors text-gray-300 hover:text-white"
            >
              Cancel Payment
            </button>
            <button 
              onClick={() => handlePaymentResult(true)}
              className="py-4 rounded-xl bg-accent hover:bg-accent/90 text-gray-900 font-bold transition-all shadow-[0_0_15px_rgba(56,189,248,0.4)]"
            >
              Pay Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
