import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Discover Excellence</h1>
        <p className="text-secondary-text">Curated premium items just for you.</p>
      </div>

      {products.length === 0 ? (
        <div className="glass-panel p-8 text-center rounded-2xl">
          <p className="text-lg text-gray-400">No products available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={product._id}
              className="glass-panel rounded-2xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden bg-white/5">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-3 left-3 bg-brand-600/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-semibold text-white">
                  ₹{product.price}
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-accent transition-colors">{product.name}</h3>
                <p className="text-secondary-text text-sm mb-6 flex-1 line-clamp-2">{product.description}</p>
                
                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-brand-500 text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 border border-white/10 hover:border-brand-400 group/btn"
                >
                  <ShoppingCart size={18} className="group-hover/btn:scale-110 transition-transform" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
