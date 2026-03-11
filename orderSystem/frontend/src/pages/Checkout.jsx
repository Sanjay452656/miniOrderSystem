import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    payment_method: 'COD'
  });

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (formData.payment_method === 'Online') {
        const orderPayload = {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          payment_method: formData.payment_method,
          cart: cart.map(item => ({ product_id: item.product_id, quantity: item.quantity }))
        };
        // In real world, we'd save "pending" order and then go to payment gateway
        // For this, we just go to mock payment page and pass order data state
        navigate('/payment', { state: { orderPayload, cartTotal } });
      } else {
        // Handle COD directly
        const orderPayload = {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          payment_method: 'COD',
          cart: cart.map(item => ({ product_id: item.product_id, quantity: item.quantity }))
        };

        const res = await axios.post('http://localhost:5000/api/orders', orderPayload);
        clearCart();
        navigate('/success', { state: { orderId: res.data.orderId, paymentMethod: 'COD', total: cartTotal } });
      }
    } catch (err) {
      console.error(err);
      setError('Failed to process order. Please try again.');
    } finally {
      if (formData.payment_method !== 'Online') {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold mb-8">Secure Checkout</h1>
      
      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <form className="glass-panel p-8 rounded-3xl border border-white/5" onSubmit={handleSubmit} id="checkout-form">
            <h2 className="text-xl font-bold mb-6">Delivery Details</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-white placeholder-gray-500 transition-all" placeholder="John Doe" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-white placeholder-gray-500 transition-all" placeholder="+91 9876543210" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Delivery Address</label>
                <textarea required name="address" value={formData.address} onChange={handleChange} rows="3" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-white placeholder-gray-500 transition-all resize-none" placeholder="123 Main St, Apartment 4B, City, Country"></textarea>
              </div>
            </div>

            <h2 className="text-xl font-bold mt-10 mb-6">Payment Method</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <label className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center gap-3 transition-all ${formData.payment_method === 'COD' ? 'bg-brand-500/20 border-brand-400' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                <input type="radio" name="payment_method" value="COD" checked={formData.payment_method === 'COD'} onChange={handleChange} className="sr-only" />
                <Truck size={28} className={formData.payment_method === 'COD' ? 'text-brand-400' : 'text-gray-400'} />
                <span className={`font-medium ${formData.payment_method === 'COD' ? 'text-white' : 'text-gray-400'}`}>Cash on Delivery</span>
              </label>

              <label className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center gap-3 transition-all ${formData.payment_method === 'Online' ? 'bg-accent/20 border-accent' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                <input type="radio" name="payment_method" value="Online" checked={formData.payment_method === 'Online'} onChange={handleChange} className="sr-only" />
                <CreditCard size={28} className={formData.payment_method === 'Online' ? 'text-accent' : 'text-gray-400'} />
                <span className={`font-medium ${formData.payment_method === 'Online' ? 'text-white' : 'text-gray-400'}`}>Online Payment</span>
              </label>
            </div>
          </form>
        </div>

        <div>
          <div className="glass-panel p-8 rounded-3xl sticky top-24 border border-white/10">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="max-h-60 overflow-y-auto pr-2 space-y-4 mb-6 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.product_id} className="flex gap-4">
                  <div className="w-16 h-16 bg-white/5 rounded-lg flex-shrink-0 overflow-hidden">
                     {item.product.image_url ? (
                        <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-800"></div>
                      )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{item.product.name}</h4>
                    <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium whitespace-nowrap">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-white/10 pt-4 space-y-3 mb-8 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end mb-8 pt-4 border-t border-white/10">
              <span className="text-lg font-medium">Total</span>
              <span className="text-3xl font-bold text-accent">₹{cartTotal.toLocaleString()}</span>
            </div>
            
            <button 
              type="submit"
              form="checkout-form"
              disabled={loading}
              className="w-full bg-gradient-to-r from-brand-600 to-accent hover:from-brand-500 hover:to-accent/80 text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
            >
              {loading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full"></span>
              ) : (
                formData.payment_method === 'COD' ? 'Place Order' : 'Proceed to Payment'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
