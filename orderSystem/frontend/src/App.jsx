import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MockPayment from './pages/MockPayment';
import OrderSuccess from './pages/OrderSuccess';
import PaymentFailed from './pages/PaymentFailed';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-background text-primary-text flex flex-col relative overflow-hidden">
          {/* Subtle animated background blobs */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>
          
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 relative z-10">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<MockPayment />} />
              <Route path="/success" element={<OrderSuccess />} />
              <Route path="/failed" element={<PaymentFailed />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
